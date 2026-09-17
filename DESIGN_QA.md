# Direction artistique et vérifications — 17 septembre 2026

## Référence d’implémentation

Trois maquettes générées et inspectées : accueil, créations, studio/contact. Elles ont servi de référence interne de réalisation, sans prétendre à une validation explicite de l’utilisateur.

- Palette : blanc, marine #10243a, or lisible #95680e.
- Grands titres à empattements, accents italiques or, textes secondaires sans empattements.
- Accueil : en-tête fin, titre éditorial hors image, grande scène lumineuse.
- Créations : affiche originale intacte à gauche, projet principal et index éditorial à droite.
- Studio : deux colonnes aérées ; contact marine avec logo et liens réels.
- Mobile : une colonne, menu repliable, cadrage adapté, textes et boutons natifs.

## Écarts intentionnels par rapport aux maquettes

Logo original conservé plutôt que version redessinée dans une maquette. Une seule navigation cohérente, sans deuxième en-tête. Année corrigée à 2026 plutôt que l’année inventée par la génération. Tous les textes, liens, commandes et séparateurs sont natifs ; aucune capture de maquette utilisée comme page. Ajout des commandes d’accessibilité du mouvement et d’une légende fonctionnelle au défilement.

## Vérifications exécutées

- Syntaxe JavaScript : `node --check`, réussie.
- Dépendances npm : audit sans vulnérabilité signalée au moment du test.
- Vidéo : MP4 H.264, sans piste audio, huit secondes ; lecture navigateur effective.
- Navigation Créations : arrivée à la section, temps vidéo 7,95 s ; Retour en haut : retour à 0 s.
- Lecture manuelle : `paused=false` ; Figer l’image : arrêt effectif et suppression de la séquence sticky.
- Visuel ordinateur comparé aux trois maquettes par captures réelles.
- Mobile : viewport embarqué de 390 px (375 px utiles avec barre de défilement), aucun débordement horizontal ; menu ouvert puis automatiquement refermé après Contact.
- Courriel et liens officiels inspectés dans le DOM. Aucun envoi de courriel ni nouvelle publication sociale pendant ces tests.
- Les erreurs capturées dans la console appartenaient à l’extension du navigateur de test, pas aux fichiers du site.

## Limites

Le test mobile est un viewport navigateur, pas un test matériel sur tous les Samsung/iPhone. Le geste de défilement synthétique du navigateur de test a expiré ; les sauts de navigation ont confirmé les extrémités du scrubbing. Un essai tactile sur le téléphone de l’utilisateur reste utile. La préférence système de réduction du mouvement et le mode sans JavaScript sont pris en charge dans le code, mais n’ont pas fait l’objet d’une émulation système dans cette session.
