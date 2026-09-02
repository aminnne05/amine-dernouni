import { useLocation } from "react-router-dom";

/*
  Changement de page : le nouveau contenu se pose en montant. On ne
  retient pas la page sortante — react-router remplace la vue avant
  qu'une sortie ait le temps de se jouer, et l'attendre ne ferait que
  produire un battement. La clé sur le chemin relance l'entrée, et
  rejoue au passage les révélations de la page.
*/
export default function PageTransition({ children }) {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="page-entre">
      {children}
    </div>
  );
}
