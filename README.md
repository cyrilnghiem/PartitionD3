# Musicalize

Musicalize est un outil conçu afin de visualiser des notes de musique sur une partition. Contrairement à d'autres services proposant la génération de partitions musicales, Musicalize ne se base pas sur une entrée sonore (clavier MIDI) ou encore une interface de type point-and-click mais sur des données de types textuelles.

##Description
###Données: Input
L'interface permet à l'utilisateur de sélectionner le chiffrage ainsi que d'introduire les notes de musique à visualiser.

####Chiffrage
Par défaut, le chiffrage est réglé sur 3/4, c'est-à-dire de 3 temps par mesure. L'utilisateur a la possibilité de basculer le chiffrage en 4/4 en faisant défiler la liste déroulante.

####Notes
Les 

do1
ré1
mi1 
[...]
sol3
la3 
si3

####Altération
A ces notes peuvent être ajouté un bémol (b) ou un dièse (#).

####Durée
Par défaut, chaque note a la valeur d'une noire, soit de 1 temps. La durée d'une note peut cependant être modifiée de la façon suivante :

* % croche : 1/2 temps
* ! blanche : 2 temps
* ? ronde : 4 temps
* * pointée : temps*1.5

####Temporalité
Les notes sont automatiquement placées temporellement (horizontalement) selon le chiffrage sélectionné. Un **espace** permet de séparer deux notes non-simultanées (cf. Notes simultanées). 

####Notes simultanées
Lorsque plusieurs notes sont jouées simultanément l'espace entre notes est omis. 
Exemple : l'utilisateur souhaite visualiser un do et un mi partageant le même placement temporel, la syntaxe est : *do2mi2*. 

###Visualisation de la partition

####Envoi des données
La partition est générée lorsque l'utilisateur déplace le curseur de la souris et clique en dehors de la zone d'input.

####Partition



####Message d'erreur
Dans le cas où les données introduites par l'utilisateur ne respectent pas ... une boîte de dialogue transmet le message suivant : 


