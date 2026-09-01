HORS CADRE — comment ajouter une pièce
======================================

Créer un dossier par pièce dans ce répertoire, par exemple :

  hors-cadre/
    affiche-nuit-blanche/
      content.json      -> { "order": 1, "title": "Nuit Blanche" }
      cover.jpg         -> le visuel affiché dans la galerie
      01.jpg            -> les visuels suivants, vus en plein écran
      02.mp4
      03.jpg

Le fichier "cover" est obligatoire : c'est lui qui apparaît dans la grille,
et il ouvre la série en plein écran. Les autres fichiers sont classés par
ordre alphabétique, d'où les préfixes numériques.

Une pièce sans autre fichier que sa couverture s'affiche quand même : le
plein écran montre alors une seule image.

Formats acceptés : jpg, jpeg, png, gif, webp, avif, mp4, webm, mov.
Rien d'autre à modifier dans le code.
