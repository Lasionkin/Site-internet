# Heavenly Places Productions

Site éditorial français, HTML/CSS/JavaScript sans framework en production. Les fichiers prêts à héberger sont dans `dist/`. Aucune clé, compte Google ou session Termux n’est nécessaire pour afficher ce site.

## Développement

Node 22.12+ et npm. `npm ci`, puis `npm run dev`. `npm run check` vérifie la syntaxe JavaScript. L’hébergement de production sert simplement `dist/`; aucun serveur Node n’est nécessaire.

## Contenu

- Identité originale Heavenly Places Productions conservée.
- Œuvres liées aux publications officielles `@heavenlyplaces.film`.
- Contact direct par courriel, sans formulaire factice ni collecte sur le site.
- Pas de statistiques de succès, avis clients, partenaires ou réalisations inventés.
- Domaine souhaité : heavenlyplacesproductions.com. Son achat et sa configuration DNS restent distincts de ce code.

## Animation

`assets/hpp-vision.mp4` est une animation de huit secondes du visuel illustré existant `hero-luminous.png`, pas une nouvelle prise de vue ni un extrait d’un film HPP. Le défilement commande `video.currentTime` dans les deux sens. La lecture manuelle, la pause et le gel de l’image restent disponibles. Une image statique est conservée si la vidéo échoue, si JavaScript est désactivé, ou si une préférence de réduction des animations/économie de données est détectée.

Pour remplacer la séquence, fournir un MP4 H.264 muet, avec images clés fréquentes, puis actualiser l’affiche WebP. Ne pas activer de son automatique. Vérifier le défilement inverse et le rendu portrait après chaque remplacement.

Commande de génération de la séquence actuelle (FFmpeg) :

```sh
ffmpeg -i dist/assets/hero-luminous.png -vf "scale=2560:-1,zoompan=z='1+0.12*on/239':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1280x720:fps=30" -frames:v 240 -c:v libx264 -preset fast -crf 26 -g 6 -keyint_min 6 -pix_fmt yuv420p -movflags +faststart -an dist/assets/hpp-vision.mp4
```

## Provenance et droits

Le logo, l’affiche Deux orientations et le visuel d’ouverture proviennent des ressources HPP préexistantes fournies pour ce travail. L’affiche est intégrale, simplement redimensionnée et compressée en WebP. Les œuvres et les marques ne sont pas offertes sous licence libre par la présence de ce dépôt.

## Confidentialité

Aucun secret dans le dépôt. Ne jamais ajouter de clés API, cookies, profils Firefox ou fichiers de configuration privés Termux. Les liens sociaux s’ouvrent dans un nouvel onglet avec `noopener noreferrer`. Aucune intégration tierce n’est chargée pour les afficher.

## Extension du portfolio — septembre 2026

Trois pages : accueil, `services.html`, `realisations.html`. Les pages intérieures comportent un index latéral sur ordinateur, remis dans le flux sur mobile. Les services sont regroupés en quatre familles : images/production, identité/édition, applications/IA, création textile. Les projets numériques BreniCall et Le Grand Cerveau sont explicitement en développement ou prototypes, pas des produits livrés à des clients.

Le logo The Excellence et les deux illustrations du portfolio sont extraits du syllabus 2026 fourni par le propriétaire. Attribution à HPP confirmée par le propriétaire. Conversion WebP uniquement, sans retouche créative. Le syllabus complet n’est pas publié. Les images représentent des scènes illustrées, pas des clients photographiés.

Roar for Canada est une réalisation textile, pas une boutique. Les originaux photo restent à recevoir dans un format accessible ; aucune image de remplacement, affiche de pasteur ni lien vers l’album privé n’est publié. L’intégration web de Tel esprit, tel hôte attend le ZIP/source de l’application et son audit ; les règles éditoriales seules ne sont pas une application fonctionnelle.

Le domaine a été acheté par le propriétaire. Les enregistrements web ont été configurés séparément dans Namecheap ; l’état HTTPS se vérifie auprès de l’hébergeur. Aucun réglage de messagerie n’est livré dans ce dépôt.
