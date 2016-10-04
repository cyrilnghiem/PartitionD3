# Musicalize

Musicalize est un outil conçu afin de visualiser des notes de musique sur une partition. Contrairement à d'autres services proposant la génération de partitions musicales, Musicalize ne se base ni sur une entrée sonore (p. ex. clavier MIDI) ni sur une interface de type point-and-click mais sur des données de types textuelles.

##Description
###Données: input
L'interface permet à l'utilisateur de sélectionner le chiffrage ainsi que d'introduire les notes de musique à visualiser.

####Chiffrage
Par défaut, le chiffrage de la mesure est de 3/4, c'est-à-dire de trois temps par mesure. L'utilisateur a la possibilité de basculer le chiffrage en 4/4 (quatre temps par mesure) en faisant défiler la liste déroulante.

####Notes
En couvrant trois octaves, Musicalize offre la possibilité d'afficher vingt-et-une différentes notes de musique en partant du *do* (appelé ici **do1**), situé une octave en dessous du *do central* (**do2**), jusqu'au *si* deux octaves plus haut (**si3**). 

Les systèmes de notations latins ainsi qu'anglo-allemands sont tous deux pris en charge et peuvent être utilisés simultanément. Le respect de la casse doit cependant être observé. 

#####Notation latine

do1, ré1, mi1, fa1, [...], sol3, la3, si3

#####Notation anglo-allemande

C1, D1, E1, F1, [...], G3, A3, B3

####Altération
Les notes peuvent être annexée par un bémol (b) ou un dièse (#).


*Exemple : mi2b*

####Durée
Par défaut, chaque note a la valeur d'une noire, soit de 1 temps. La durée d'une note peut cependant être modifiée de la façon suivante :

* % croche : 1/2 temps
* ! blanche : 2 temps
* ? ronde : 4 temps
* * pointée : temps*1.5


*Exemples : sol1?, ré3!* *

####Temporalité
Les notes sont automatiquement placées temporellement (horizontalement) selon le chiffrage sélectionné. Un **espace** permet de séparer deux notes non-simultanées (cf. Notes simultanées). 

####Notes simultanées
Lorsque plusieurs notes sont jouées simultanément l'espace entre notes est omis. 


*Exemple : l'utilisateur souhaite visualiser un do et un mi partageant le même placement temporel. La syntaxe est : do2mi2.* 

###Visualisation de la partition

####Envoi des données
La partition est générée lorsque l'utilisateur déplace le curseur de la souris et clique en dehors de la zone d'input.

####Partition
#####Notes
Les notes sont placées sur l'axe horizontal de sorte à représenter visuellement leurs durées. L'espacement entre une blanche et une noire est par conséquent deux fois plus important que celui séparant deux noires. 


Les croches consécutives sont automatiquement liées entre elles si leurs hampes sont situées du même côté. Dans le cas contraire, chaque croche est représentée individuellement.
#####Mesures
Afin de permettre à l'utilisateur de se repérer au sein de la partition ainsi que de corriger d'éventuelles erreurs (cf. Message d'erreur) les mesures sont numérotées. 
#####Portées
Une portée supplémentaire est ajoutée lorsque la précédente est remplie. 


####Impression
Lors de l'impression, la mise en page se voit modifiée de sorte à ne conserver que la partition. La zone d'input ainsi que le bouton **Aide** n'apparaissent ainsi pas à l'impression.  

####Message d'erreur
Dans le cas où les données introduites par l'utilisateur ne respectent pas les règles de temporalité une boîte de dialogue transmet le message suivant : 
> Attention !
> Erreur de temporalité survenue dans la mesure x. Veuillez modifier votre input.

Bien que la partition soit temporellement erronnée, elle est toutefois présentée à l'utilisateur afin de lui permettre de visualiser la faute à corriger.

####Aide
L'utilisateur peut, à tout moment, afficher une boîte d'aide en cliquant sur le bouton **Aide**.




