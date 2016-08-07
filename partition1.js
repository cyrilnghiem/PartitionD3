// code de Cyril Nghiem
// portees multiples
var canevas = d3.select("svg")
	.attr({"width":800, "height":350})

var portee = [50, 60, 70, 80, 90]

// pour chaque note : nom, hauteur axe y, hauteur queue, placement queue : 7 = droite, -7 = gauche
var notes = [
	["do1", 135, 100, 7],
	["ré1", 130, 95, 7],
	["mi1", 125, 90, 7],
	["fa1", 120, 85, 7],
	["sol1", 115, 80, 7],
	["la1", 110, 75, 7],
	["si1", 105, 70, 7],
	["do2", 100, 65, 7],
	["ré2", 95, 60, 7],
	["mi2", 90, 55, 7],
	["fa2", 85, 50, 7],
	["sol2", 80, 45, 7],
	["la2", 75, 40, 7],
	["si2", 70, 105, -7],
	["do3", 65, 100, -7],
	["ré3", 60, 95, -7],
	["mi3", 55, 90, -7],
	["fa3", 50, 85, -7],
	["sol3", 45, 80, -7],
	["la3", 40, 75, -7],
	["si3", 45, 70, -7]
]

var placementX = []

//nom note 
var regex1 = /[\S]{2,3}[1|2|3]/

//bémol ou dièse
var regex2 = /#|b/

//durée note : blanche, ronde, croche
var regex3 = /!|\?|%/

//durée note : pointée 
var regex4 = /\*/

var ptLiaison = [[]]

function partition(){

	//"vidage" du contenu HTML et ré-ajout de la portée et clé de Sol
	//document.getElementById("svg").innerHTML = '';
	$('#svg').html('');
	console.log(document.getElementById("svg").innerHTML);

	canevas.selectAll("line")
		.data(portee)
		.enter()
		.append("line")
		.attr("x1", 0)
		.attr("y1", function(d){return d})
		.attr("x2", 800)
		.attr("y2", function(d){return d})
		.attr("style", "stroke:black;stroke-width:1")

	canevas.append("line")
		.attr("x1", 0)
		.attr("y1", portee[0])
		.attr("x2", 0)
		.attr("y2", portee[4])
		.attr("style", "stroke:black;stroke-width:1")

	var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
		svgimg.setAttributeNS(null,'height','85');
		svgimg.setAttributeNS(null,'width','85');
		svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'Music_Sign_clip_art.svg');
		svgimg.setAttributeNS(null,'x','-20');
		svgimg.setAttributeNS(null,'y','25');
		svgimg.setAttributeNS(null, 'visibility', 'visible');
		$('svg').append(svgimg);

	//numéro de portée
	var noPortee = 0

	//compteur temporel
	var count = 0

	//début première mesure
	var count0X = 75

	//temps des mesures et chiffrage
	//mesures à 3 temps
	if (document.getElementById("chiffrage").value=="3/4"){
		//chiffrage
		canevas.append("text")
			.text("3")
			.attr("x", 50)
			.attr("y", 70)
			.attr("fill", "black")
			.style("font-size","30px")
		canevas.append("text")
			.text("4")
			.attr("x", 50)
			.attr("y", 90)
			.attr("fill", "black")
			.style("font-size","30px")

		temps = 3
	}

	//mesures à 4 temps
	if (document.getElementById("chiffrage").value=="4/4"){
		//chiffrage
		canevas.append("text")
			.text("4")
			.attr("x", 50)
			.attr("y", 70)
			.attr("fill", "black")
			.style("font-size","30px")
		canevas.append("text")
			.text("4")
			.attr("x", 50)
			.attr("y", 90)
			.attr("fill", "black")
			.style("font-size","30px")

		temps = 4
	}

	var data = document.getElementById("input").value.split(" ")

	for (let i = 0; i < data.length; i++){ 

		//remplissage tableau définissant placement axe x
		//premiere note toujours située à 50 
		if (i==0){
			placementX[i]=100
		}
		//traitement des autres notes 
		//ajouter * 
		else {
			if (regex3.exec(data[i-1])=="*"){
				placementX[i]=placementX[i-1]+75
			}
			else if (regex3.exec(data[i-1])=="!"){
				placementX[i]=placementX[i-1]+100
			}
			else if (regex3.exec(data[i-1])=="?"){
				placementX[i]=placementX[i-1]+200
			}
			/*
			else if (regex3.exec(data[i-1])=="%"){
				placementX[i]=placementX[i-1]+50
			}
			*/
			else {
				placementX[i]=placementX[i-1]+50
			}
		}

		//hors portee => nouvelle portee
		if (placementX[i]>=750){
			noPortee+=1
			//placement premiere note sur la nouvelle portee
			placementX[i]=70

			count0X = 45

			//ajout portee supplementaire : mettre ici ou ailleurs?
			for (z = 0; z < portee.length; z++){
				canevas.append("line")
					.attr("x1", 0)
					.attr("y1", portee[z]+(noPortee*100))
					.attr("x2", 800)
					.attr("y2", portee[z]+(noPortee*100))
					.attr("style", "stroke:black;stroke-width:1")
			}

			canevas.append("line")
				.attr("x1", 0)
				.attr("y1", portee[0]+(noPortee*100))
				.attr("x2", 0)
				.attr("y2", portee[4]+(noPortee*100))
				.attr("style", "stroke:black;stroke-width:1")

			var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
				svgimg.setAttributeNS(null,'height','85');
				svgimg.setAttributeNS(null,'width','85');
				svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'Music_Sign_clip_art.svg');
				svgimg.setAttributeNS(null,'x','-20');
				svgimg.setAttributeNS(null,'y', 25+(noPortee*100));
				svgimg.setAttributeNS(null, 'visibility', 'visible');
				$('svg').append(svgimg);
		}

		for (let j = 0; j < notes.length; j++){ 
			if (regex1.exec(data[i])==notes[j][0]){

				//placementY hauteur selon noPortee
				placementY = notes[j][1]+(noPortee*100)
				placementY2 = notes[j][2]+(noPortee*100)

				//rotations ellipses
				rotation1 = "rotate(-20 "+placementX[i]+","+placementY+")"
				rotation2 = "rotate(50 "+placementX[i]+","+placementY+")"

				//blanche
				if (regex3.exec(data[i])=="!"){

					count += 2

					canevas.append("ellipse")
						.attr("cx", placementX[i])
						.attr("cy", placementY)
						.attr("rx", 8)
						.attr("ry", 6)
						.attr("transform", rotation1)

					//ellipse interieure
					canevas.append("ellipse")
						.attr("cx", placementX[i])
						.attr("cy", placementY)
						.attr("rx", 7)
						.attr("ry", 3)
						.attr("style", "fill:white")
						.attr("transform", rotation1)
				}
				//ronde
				else if (regex3.exec(data[i])=="?"){

					count += 4

					canevas.append("ellipse")
						.attr("cx", placementX[i])
						.attr("cy", placementY)
						.attr("rx", 8)
						.attr("ry", 6)
						.attr("style", "fill:black;stroke:black;stroke-width:3")

					//ellipse interieure
					canevas.append("ellipse")
						.attr("cx", placementX[i])
						.attr("cy", placementY)
						.attr("rx", 6)
						.attr("ry", 4)
						.attr("style", "fill:white")
						.attr("transform", rotation2)
				}
				//noire ou croche
				else {
					canevas.append("ellipse")
						.attr("cx", placementX[i])
						.attr("cy", placementY)
						.attr("rx", 8)
						.attr("ry", 6)
						.attr("transform", rotation1)

					//croche
					if (regex3.exec(data[i])=="%"){
						count += 0.5
						
						//stockage des points de liaison sur axe X et Y (haut ou bas de la queue de note)
						ptLiaison[0][0] = placementX[i]+notes[j][3]
						ptLiaison[0][1] = placementY2

						console.log("Liaison : "+ptLiaison[0][1])
					}
					//noire
					else {
						count += 1
					}
				}

				//queue de note sauf pour rondes
				if (regex3.exec(data[i])!="?"){
					canevas.append("line")
						.attr("x1", placementX[i]+notes[j][3])
						.attr("y1", placementY)
						.attr("x2", placementX[i]+notes[j][3])
						.attr("y2", placementY2)
						.attr("style", "stroke:black;stroke-width:1")
				}

				// barre horizontale sur les notes en dehors de la portee
				if (notes[j][1]>=100){
					for (k = 100; k <= notes[j][1]; k+=10){
						canevas.append("line")
							.attr("x1", placementX[i]-15)
							.attr("y1", k+(noPortee*100))
							.attr("x2", placementX[i]+15)
							.attr("y2", k+(noPortee*100))
							.attr("style", "stroke:black;stroke-width:1")
					}
				}

				//dièse
				if (regex2.exec(data[i])=="#"){
					//canevas.append("image") dièse sous forme img svg?
					canevas.append("text")
						.text("♯")
						.attr("x", placementX[i]-30)
						.attr("y", placementY+10)
						.attr("fill", "black")
						.style("font-size","23px")
				}

				//bémol
				if (regex2.exec(data[i])=="b"){
					canevas.append("text")
						.text("♭")
						.attr("x", placementX[i]-30)
						.attr("y", placementY+10)
						.attr("fill", "black")
						.style("font-size","23px")
				}

				//pointée
				if (regex4.exec(data[i])=="*"){
					canevas.append("circle")
						.attr("cx", placementX[i]+15)
						.attr("cy", placementY-4)
						.attr("r", 2.5)

					//ajout temporalité selon type note
					if (regex3.exec(data[i])=="!"){
						count += 1
					}
					else if (regex3.exec(data[i])=="?"){
						count += 2 
					}
					/*
					croche pointée
					else if (regex3.exec(data[i-1])=="%"){
						placementX[i]=placementX[i-1]+25
					}
					*/
					else {
						count += 0.5
					}
				}
				
				//croche : liaisons automatiques
				if (regex3.exec(data[i])=="%"){ 
					//croche isolée : 1
					if (regex3.exec(data[i-1])!="%" && regex3.exec(data[i+1])!="%"){
						//queue en haut
						if (notes[j][3]=="7"){
							croche = "M "+(placementX[i]+notes[j][3])+" "+notes[j][2]+" q 20 20 5 25"
							canevas.append("path")
								.attr("d", croche)
								.attr("style", "stroke:black;stroke-width:1;fill:none")
						}
						//queue en bas
						else {
							croche = "M "+(placementX[i]+notes[j][3])+" "+notes[j][2]+" q 20 -20 5 -25"
							canevas.append("path")
								.attr("d", croche)
								.attr("style", "stroke:black;stroke-width:1;fill:none")
						}
					}

					//2 croches liées : 2
					if (regex3.exec(data[i-2])!="%" && regex3.exec(data[i-1])=="%" && regex3.exec(data[i+1])!="%"){
						canevas.append("line")
							.attr("x1", placementX[i-1]+notes[j][3]-1)
							.attr("y1", notes[j][2])
							.attr("x2", placementX[i]+notes[j][3]+1)
							.attr("y2", notes[j][2])
							.attr("style", "stroke:black;stroke-width:6")
					}

					//4 croches liées
					if (regex3.exec(data[i-4])!="%" && regex3.exec(data[i-3])=="%" && regex3.exec(data[i-2])=="%" && regex3.exec(data[i-1])=="%" && regex3.exec(data[i+1])!="%"){
						canevas.append("line")
							.attr("x1", placementX[i-3]+notes[j][3])
							.attr("y1", notes[j][2])
							.attr("x2", placementX[i]+notes[j][3])
							.attr("y2", notes[j][2])
							.attr("style", "stroke:black;stroke-width:6")
					}
				}
				
			}
		}

		console.log("i = "+i+"; count = "+count+"; "+placementX[i])

		//séparation mesures
		if (count >= temps){
			console.log("yes")
			//count0X : redéfinition séparation = début prochaine mesure
			if (placementX[i] - count0X >= temps*50){
				count0X = placementX[i]+25
			}
			//cas mi2?*
			else {
				count0X = count0X+temps*50
			}
			canevas.append("line")
				.attr("x1", count0X)
				.attr("y1", portee[0]+(noPortee*100))
				.attr("x2", count0X)
				.attr("y2", portee[4]+(noPortee*100))
				.attr("style", "stroke:black;stroke-width:1")
			
			//ré-initialisation 
			count = 0
		}
	}

	/*
	update(data)
	}

	function update(d){
	var selection = d3.select("svg")
	.selectAll("ellipse")

	selection.data(d).exit()
	.remove()
	*/

	//ajout de la portee musicale

}

//ajout de la portee musicale visible initialement 
//cle sol ajoutée dans html
canevas.selectAll("line")
	.data(portee)
	.enter()
	.append("line")
	.attr("x1", 0)
	.attr("y1", function(d){return d})
	.attr("x2", 800)
	.attr("y2", function(d){return d})
	.attr("style", "stroke:black;stroke-width:1")

canevas.append("line")
	.attr("x1", 0)
	.attr("y1", portee[0])
	.attr("x2", 0)
	.attr("y2", portee[4])
	.attr("style", "stroke:black;stroke-width:1")



