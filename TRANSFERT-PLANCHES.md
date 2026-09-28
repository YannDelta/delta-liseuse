# Transférer une planche depuis ChatGPT

**Destination : `YannDelta/delta-liseuse`, branche `main`, dossier `images/`.**

La page blanche est un affichage de secours, pas un fichier à supprimer. La liseuse cherche automatiquement chaque fichier courant et autorise son ouverture dès qu'il est disponible, même si le texte indiquait auparavant « À illustrer ».

## Contrat des fichiers

| Planche | Chemin exact |
| --- | --- |
| P07 | `images/P07-selection.jpg` |
| P08 | `images/P08-selection.jpg` |
| P09 | `images/P09-selection.jpg` |
| P14 | `images/P14-selection.jpg` |

Même règle pour P01 à P48, avec deux chiffres et la casse indiquée. Remplacer le même nom pour une correction ; ne pas ajouter `-v2` ou `-v3`.

Prendre la version retenue dans le dossier demandé. Vérifier visuellement son numéro : le nom du dossier seul ne garantit pas que l'image corresponde. Convertir en vrai JPEG, environ 600 × 900, qualité 82, proportions conservées. Renommer un PNG en `.jpg` n'est pas une conversion.

## Transfert par le connecteur GitHub

Utiliser la capacité d'envoi de fichiers binaires lorsqu'elle est disponible. Sinon, la méthode Git Data suivante a servi avec succès pour P04–P06 :

1. Lire le dernier commit de `main` et son arbre Git.
2. Lire les octets de chaque JPEG préparé et les encoder intégralement en Base64, sans les recopier manuellement dans le dialogue.
3. Créer un blob Git avec `encoding: "base64"` et ce contenu complet. Une URL, un identifiant de fichier ChatGPT ou un chemin local ne sont pas le contenu de l'image. Ne pas créer un blob UTF-8 contenant le Base64.
4. Créer un arbre fondé sur l'arbre actuel, avec les entrées `path: "images/Pxx-selection.jpg"`, `mode: "100644"`, `type: "blob"` et les SHA des blobs.
5. Créer un commit ayant le dernier commit de `main` comme parent, puis avancer `main` sans forcer. Plusieurs planches peuvent être réunies dans un commit. Si `main` a avancé entre-temps, reconstruire le commit sur sa nouvelle tête.

Avec l'API Contents, fournir aussi le SHA du fichier existant lors d'un remplacement. Ne pas confondre ce SHA de fichier avec le SHA du commit.

Si le chat ne dispose pas de l'accès aux octets ou de l'écriture GitHub, il doit le dire et fournir le JPEG préparé à télécharger ; une réponse textuelle ne téléverse pas une image.

## Vérification

- Le commit doit contenir uniquement les JPEG concernés, avec des tailles plausibles et des images décodables.
- Attendre la publication GitHub Pages, puis vérifier l'adresse publique du fichier, par exemple `https://yanndelta.github.io/delta-liseuse/images/P07-selection.jpg`.
- Ouvrir la liseuse, choisir la planche et cliquer **Actualiser les planches**. Ce bouton recharge les images avec une nouvelle adresse de cache, sans changer la planche sélectionnée.
- Vérifier l'image principale, sa miniature et son ouverture agrandie. Une ancienne version absente dans les archives est indépendante de la planche courante ; ne pas la remplacer sans demande.

Aucune modification de `data.js`, `assets.js` ou `index.html` n'est nécessaire pour les prochains transferts.

## Consigne courte à donner au chat

> Dans YannDelta/delta-liseuse, lis TRANSFERT-PLANCHES.md. Transfère les versions retenues des planches PXX, PYY et PZZ en vrais JPEG légers dans images/PXX-selection.jpg, images/PYY-selection.jpg et images/PZZ-selection.jpg sur main. Remplace les fichiers existants sous les mêmes noms. Ne modifie pas le texte ni le code de la liseuse. Vérifie la publication et l'affichage ; indique clairement tout accès manquant.
