/*
  Filet de sécurité des révélations.

  Un visuel masqué qui n'est jamais révélé disparaît purement et
  simplement de la page : la révélation ne peut donc pas dépendre d'un
  seul mécanisme. IntersectionObserver reste le déclencheur normal, mais
  il ne tourne pas dans un onglet qui ne compose pas — et alors plus rien
  ne s'affiche. Ce module tient la liste des éléments en attente et les
  vérifie aussi à la main, sur défilement, sur redimensionnement et par
  balayage régulier. Un seul écouteur pour toute la page, et tout s'arrête
  dès qu'il n'y a plus rien à révéler.
*/
const attente = new Set();
let branche = false;
let minuteur = null;
let dernier = 0;

function balaye() {
  const hauteur = window.innerHeight;
  for (const item of [...attente]) {
    const r = item.el.getBoundingClientRect();
    const dansLeCadre = r.top < hauteur * 0.92 && r.bottom > 0;
    // Un élément déjà dépassé compte aussi : on ne laisse jamais un
    // visuel masqué derrière soi.
    if (dansLeCadre || r.bottom <= 0) {
      attente.delete(item);
      item.reveler();
    }
  }
  if (attente.size === 0) debranche();
}

function surEvenement() {
  const now = Date.now();
  if (now - dernier < 80) return;
  dernier = now;
  balaye();
}

function branche_() {
  if (branche) return;
  branche = true;
  window.addEventListener("scroll", surEvenement, { passive: true });
  window.addEventListener("resize", surEvenement, { passive: true });
  minuteur = setInterval(balaye, 500);
}

function debranche() {
  if (!branche) return;
  branche = false;
  window.removeEventListener("scroll", surEvenement);
  window.removeEventListener("resize", surEvenement);
  clearInterval(minuteur);
  minuteur = null;
}

export function surveille(el, reveler) {
  const item = { el, reveler };
  attente.add(item);
  branche_();
  balaye();
  return () => attente.delete(item);
}
