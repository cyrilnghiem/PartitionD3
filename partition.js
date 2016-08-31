// code de Cyril Nghiem

Partition =
{
	// portees multiples
	portee: [50, 60, 70, 80, 90],

	// pour chaque note : nom, hauteur axe y, hauteur queue, placement queue : 7 = droite, -7 = gauche
	notes: [
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
	],

	placementX: [],

	//nom note 
	//regexNote: /[\S]{2,3}[1|2|3]/g,

	//bémol ou dièse
	//regexAlteration: /#|b/,

	//durée note : blanche, ronde, croche
	regexDuree: /!|\?|%/,

	//durée note : pointée 
	regexPointee: /\*/,

	regex5: /\+/,

	ptLiaison: [[]],

	partition()
	{
		var that = this;

		//"vidage" du contenu HTML et ré-ajout de la portée et clé de Sol
		//document.getElementById("svg").innerHTML = '';
		$('#svg').html('');
		console.log(document.getElementById("svg").innerHTML);

		that.draw_portee(0)

		that.draw_line(0, that.portee[0], 0, that.portee[4])

		that.image_key(0)

		//numéro de portée
		var noPortee = 0

		//compteur temporel
		var count = 0

		//début première mesure
		var count0X = 75

		var liaison = 0

		//temps des mesures et chiffrage
		//mesures à 3 temps
		if (document.getElementById("chiffrage").value=="3/4"){
			//chiffrage
			that.draw_text("3", 50, 70, "black", "30px")
			that.draw_text("4", 50, 90, "black", "30px")

			temps = 3
		}

		//mesures à 4 temps
		if (document.getElementById("chiffrage").value=="4/4"){
			//chiffrage
			that.draw_text("4", 50, 70, "black", "30px")
			that.draw_text("4", 50, 90, "black", "30px")

			temps = 4
		}

		var data = document.getElementById("input").value.split(" ")

		for (let i = 0; i < data.length; i++){ 

			//remplissage tableau définissant placement axe x
			//premiere note toujours située à 50 
			if (i==0){
				that.placementX[i]=100
			}
			//traitement des autres notes 
			//ajouter % croche 
			else {
				if (that.regexDuree.exec(data[i-1])=="!"){
					//blanche pointée
					if (that.regexPointee.exec(data[i-1])=="*"){
						that.placementX[i] = that.placementX[i-1]+150
					}
					//blanche
					else {
						that.placementX[i] = that.placementX[i-1]+100
					}
				}
				else if (that.regexDuree.exec(data[i-1])=="?"){
					//ronde pointée
					if (that.regexPointee.exec(data[i-1])=="*"){
						that.placementX[i] = that.placementX[i-1]+300
					}
					//ronde
					else {
						that.placementX[i] = that.placementX[i-1]+200
					}
				}
				/*
				//croche
				else if (regexDuree.exec(data[i-1])=="%"){
					placementX[i]=placementX[i-1]+50
				}
				*/
				else {
					//noire pointée
					if (that.regexPointee.exec(data[i-1])=="*"){
						that.placementX[i] = that.placementX[i-1]+75
					}
					//noire
					else {
						that.placementX[i] = that.placementX[i-1]+50
					}
				}
			}

			//hors portee => nouvelle portee
			if (that.placementX[i] >= 750)
			{
				noPortee += 1;
				//placement premiere note sur la nouvelle portee
				that.placementX[i] = 70;

				count0X = 45;

				//ajout portee supplementaire
				//fonctionne pas : that.draw_portee(noPortee)
				for (z = 0; z < that.portee.length; z++){
					that.draw_line(0, that.portee[z]+(noPortee*100), 800, that.portee[z]+(noPortee*100))
				}

				that.draw_line(0, that.portee[0]+(noPortee*100), 0, that.portee[4]+(noPortee*100))

				that.image_key(noPortee)
			}

			for (let j = 0; j < that.notes.length; j++){ 
				//if (that.regexNote.exec(data[i]) == that.notes[j][0]){
				if (data[i].indexOf(that.notes[j][0]) >= 0){
				//if (regexNote.exec(data[i])==notes[j][0] && regex5.exec(data[i])!="+"){

					console.log(that.notes[j][0]);
					console.log(data[i].indexOf(that.notes[j][0]))
					console.log(data[i].charAt((0)+1))
					console.log(data[i].charAt((data[i].indexOf(that.notes[j][0]))+3))

					//placementY hauteur selon noPortee
					that.placementY = that.notes[j][1]+(noPortee*100);
					that.placementY2 = that.notes[j][2]+(noPortee*100);

					//rotations ellipses
					rotation1 = "rotate(-20 " + that.placementX[i]+"," + that.placementY+")";
					rotation2 = "rotate(50 " + that.placementX[i]+"," + that.placementY+")";

					//blanche
					if (that.regexDuree.exec(data[i])=="!"){

						count += 2

						that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, rotation1)

						//ellipse interieure
						that.draw_ellipse(that.placementX[i], that.placementY, 7, 3, rotation1, "fill:white")
					}
					//ronde
					else if (that.regexDuree.exec(data[i])=="?"){

						count += 4

						that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, null, "fill:black;stroke:black;stroke-width:3")

						//ellipse interieure
						that.draw_ellipse(that.placementX[i], that.placementY, 6, 4, rotation2, "fill:white")
					}
					//noire ou croche
					else
					{
						that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, rotation1)

						//croche
						if (that.regexDuree.exec(data[i])=="%"){
							count += 0.5
							
							//add arrays at all of the positions in the outer array for which they are needed
							if (!that.ptLiaison[liaison]) {
    							that.ptLiaison[liaison] = [];
							}

							//stockage des points de liaison sur axe X et Y (haut ou bas de la queue de note)
							that.ptLiaison[liaison][0] = that.placementX[i] + that.notes[j][3]
							that.ptLiaison[liaison][1] = that.placementY2

							console.log("Liaison : "+ liaison + " "+ that.ptLiaison)

							liaison += 1
							
						}
						//noire
						else {
							count += 1
						}
					}

					//queue de note sauf pour rondes
					if (that.regexDuree.exec(data[i]) != "?"){
						that.draw_line(that.placementX[i]+that.notes[j][3], that.placementY, that.placementX[i]+that.notes[j][3], that.placementY2)
					}

					// barre horizontale sur les notes en dehors de la portee
					if (that.notes[j][1]>=100){
						for (k = 100; k <= that.notes[j][1]; k+=10){
							that.draw_line(that.placementX[i]-15, k+(noPortee*100), that.placementX[i]+15, k+(noPortee*100))
						}
					}

					//dièse
					if (data[i].charAt((data[i].indexOf(that.notes[j][0]))+3) == "#" || data[i].charAt((data[i].indexOf(that.notes[j][0]))+4) == "#"){
					//if (that.regexAlteration.exec(data[i])=="#"){
						that.draw_text("♯", that.placementX[i]-30, that.placementY+10, "black", "23px")
					}

					//bémol
					//if (that.regexAlteration.exec(data[i])=="b"){
					if (data[i].charAt((data[i].indexOf(that.notes[j][0]))+3) == "b" || data[i].charAt((data[i].indexOf(that.notes[j][0]))+4) == "b"){
						that.draw_text("♭", that.placementX[i]-30, that.placementY+10, "black", "23px")
					}

					//pointée
					if (that.regexPointee.exec(data[i])=="*"){
						canevas.append("circle")
							.attr("cx", that.placementX[i]+15)
							.attr("cy", that.placementY-4)
							.attr("r", 2.5)

						//ajout temporalité selon type note
						if (that.regexDuree.exec(data[i])=="!"){
							count += 1
						}
						else if (that.regexDuree.exec(data[i])=="?"){
							count += 2 
						}
						/*
						croche pointée
						else if (regexDuree.exec(data[i-1])=="%"){
							placementX[i]=placementX[i-1]+25
						}
						*/
						else {
							count += 0.5
						}
					}
					/*
					//croche : liaisons automatiques
					if (that.regexDuree.exec(data[i])=="%"){ 
						//croche isolée : 1
						if (that.regexDuree.exec(data[i-1])!="%" && that.regexDuree.exec(data[i+1])!="%"){
							//queue en haut
							if (that.notes[j][3]=="7"){
								croche = "M "+(that.placementX[i] + that.notes[j][3])+" " + that.notes[j][2]+" q 20 20 5 25"
								canevas.append("path")
									.attr("d", croche)
									.attr("style", "stroke:black;stroke-width:1;fill:none")
							}
							//queue en bas
							else {
								croche = "M "+(that.placementX[i] + that.notes[j][3])+" " + that.notes[j][2]+" q 20 -20 5 -25"
								canevas.append("path")
									.attr("d", croche)
									.attr("style", "stroke:black;stroke-width:1;fill:none")
							}
						}

						//2 croches liées : 2
						if (that.regexDuree.exec(data[i-2])!="%" && that.regexDuree.exec(data[i-1])=="%" && that.regexDuree.exec(data[i+1])!="%"){
							canevas.append("line")
								.attr("x1", that.placementX[i-1] + that.notes[j][3]-1)
								.attr("y1", that.notes[j][2])
								.attr("x2", that.placementX[i] + that.notes[j][3]+1)
								.attr("y2", that.notes[j][2])
								.attr("style", "stroke:black;stroke-width:6")
						}

						//4 croches liées
						if (that.regexDuree.exec(data[i-4])!="%" && that.regexDuree.exec(data[i-3])=="%" && that.regexDuree.exec(data[i-2])=="%" && that.regexDuree.exec(data[i-1])=="%" && that.regexDuree.exec(data[i+1])!="%"){
							canevas.append("line")
								.attr("x1", that.placementX[i-3] + that.notes[j][3])
								.attr("y1", that.notes[j][2])
								.attr("x2", that.placementX[i] + that.notes[j][3])
								.attr("y2", that.notes[j][2])
								.attr("style", "stroke:black;stroke-width:6")
						}
					}
					*/
					
				}
				/*
				//notes simultanées
				if (regex5.exec(data[i])=="+"){
				}
				*/
			}

			console.log("i = "+i+"; count = "+count+"; " + that.placementX[i])

			//séparation mesures
			if (count >= temps){
				console.log("mesure")
				//count0X : redéfinition séparation = début prochaine mesure
				if (that.placementX[i] - count0X >= temps*50){
					count0X = that.placementX[i]+25
				}
				//cas mi2?*
				else {
					count0X = count0X+temps*50
				}

				that.draw_line(count0X, that.portee[0]+(noPortee*100), count0X, that.portee[4]+(noPortee*100))

				//liaisons croches
				/*
				var values = that.ptLiaison[0].map(function(elt) { return elt[1]; });
				var max = Math.max.apply(null, values);
				console.log(max)
				*/
				that.getMinMaxOf2DIndex(that.ptLiaison, 1)

				that.draw_line(that.ptLiaison[0][0], min, that.ptLiaison.slice(-1)[0][0], min)

				//a faire : for Liaison 0 à last : queue de note (dans fonction)
				
				//ré-initialisation 
				count = 0
				that.ptLiaison = [[]]
			}
			if (count > temps){
				alert("Attention !\nErreur de temporalité");
			}
		}
	},

	getMinMaxOf2DIndex (arr, idx) {
		min = Math.min.apply(null, arr.map(function (e) { return e[idx]})),
		max = Math.max.apply(null, arr.map(function (e) { return e[idx]}))
	},

	draw_line(x1, y1, x2, y2){
		canevas.append("line")
			.attr("x1", x1)
			.attr("y1", y1)
			.attr("x2", x2)
			.attr("y2", y2)
			.attr("style", "stroke:black;stroke-width:1")
	},

	draw_ellipse(cx, cy, rx, ry, rotation, style){
		canevas.append("ellipse")
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("rx", rx)
			.attr("ry", ry)
			.attr("transform", rotation)
			.attr("style", style)
	},

	draw_text(text, x, y, color, size){
		canevas.append("text")
			.text(text)
			.attr("x", x)
			.attr("y", y)
			.attr("fill", color)
			.style("font-size", size)
	},

	draw_portee(noPortee){
		var that = this;

		canevas.selectAll("line")
			.data(that.portee)
			.enter()
			.append("line")
			.attr("x1", 0)
			.attr("y1", function(d){return d+(noPortee*100)})
			.attr("x2", 800)
			.attr("y2", function(d){return d+(noPortee*100)})
			.attr("style", "stroke:black;stroke-width:1")
	},

	image_key(noPortee){
		var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
			svgimg.setAttributeNS(null,'height','85');
			svgimg.setAttributeNS(null,'width','85');
			svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'Music_Sign_clip_art.svg');
			svgimg.setAttributeNS(null,'x','-20');
			svgimg.setAttributeNS(null,'y', 25+(noPortee*100));
			svgimg.setAttributeNS(null, 'visibility', 'visible');
			$('svg').append(svgimg);
	},

	init_canevas()
	{
		var that = this;

		canevas = d3.select("svg")
			.attr({"width":800, "height":350})

		//ajout de la portee musicale visible initialement 
		//cle sol ajoutée dans html
		that.draw_portee(0)

		that.draw_line(0, that.portee[0], 0, that.portee[4])

		that.draw_text("Exemple : do2 mi3b fa1 sol2!* mi2do2 do1 si1", 80, 30, "blue", "30px")
	},

	event()
	{
		var that = this;

		$('#input').mouseup(function(e)
		{	
			that.partition();	
		});
	},

	init()
	{
		this.event();
		this.init_canevas();
	}
}

Partition.init();








