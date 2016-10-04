// code de Cyril Nghiem

Partition =
{
	portee: [150, 160, 170, 180, 190],

	// pour chaque note : nom, hauteur axe y, hauteur queue, placement queue : 7 = droite, -7 = gauche
	notes: [
		["do1", 235, 200, 7],
		["ré1", 230, 195, 7],
		["mi1", 225, 190, 7],
		["fa1", 220, 185, 7],
		["sol1", 215, 180, 7],
		["la1", 210, 175, 7],
		["si1", 205, 170, 7],
		["do2", 200, 165, 7],
		["ré2", 195, 160, 7],
		["mi2", 190, 155, 7],
		["fa2", 185, 150, 7],
		["sol2", 180, 145, 7],
		["la2", 175, 140, 7],
		["si2", 170, 205, -7],
		["do3", 165, 200, -7],
		["ré3", 160, 195, -7],
		["mi3", 155, 190, -7],
		["fa3", 150, 185, -7],
		["sol3", 145, 180, -7],
		["la3", 140, 175, -7],
		["si3", 145, 170, -7],


		["C1", 235, 200, 7],
		["D1", 230, 195, 7],
		["E1", 225, 190, 7],
		["F1", 220, 185, 7],
		["G1", 215, 180, 7],
		["A1", 210, 175, 7],
		["B1", 205, 170, 7],
		["C2", 200, 165, 7],
		["D2", 195, 160, 7],
		["E2", 190, 155, 7],
		["F2", 185, 150, 7],
		["G2", 180, 145, 7],
		["A2", 175, 140, 7],
		["B2", 170, 205, -7],
		["C3", 165, 200, -7],
		["D3", 160, 195, -7],
		["E3", 155, 190, -7],
		["F3", 150, 185, -7],
		["G3", 145, 180, -7],
		["A3", 140, 175, -7],
		["B3", 145, 170, -7]
	],

	placementX: [],

	//durée note : blanche, ronde, croche
	regexDuree: /!|\?|%/,

	//durée note : pointée 
	regexPointee: /\*/,

	regex5: /\+/,

	ptLiaison: [[]],

	croche: 0,

	noPortee: 0,

	noMesure: 1,

	count: [],

	countMesure: 0,

	delimiteurMesure: 75,

	clic: 1,

	partition()
	{
		var that = this;

		//"vidage" du contenu HTML et ré-ajout de la portée et clé de Sol
		//document.getElementById("svg").innerHTML = '';
		$('#svg').html('');

		that.draw_logo()

		that.draw_portee(0)

		that.draw_line(0, that.portee[0], 0, that.portee[4])

		that.image_key(0)

		var placementNext = 0 

		//temps des mesures et chiffrage
		//mesures à 3 temps
		if (document.getElementById("chiffrage").value=="3/4"){
			//chiffrage
			that.draw_text("3", 50, 170, "black", "30px")
			that.draw_text("4", 50, 190, "black", "30px")

			temps = 3
		}

		//mesures à 4 temps
		if (document.getElementById("chiffrage").value=="4/4"){
			//chiffrage
			that.draw_text("4", 50, 170, "black", "30px")
			that.draw_text("4", 50, 190, "black", "30px")

			temps = 4
		}

		var data = document.getElementById("input").value.split(" ")

		for (let i = 0; i < data.length; i++){ 

			//remplissage tableau définissant placement axe x
			//premiere note toujours située à 50 
			if (i==0){
				that.placementX[i] = 100
			}
			//traitement des autres notes 
			else {
				that.placementX[i] = placementNext
			}

			//hors portee => nouvelle portee
			if (that.placementX[i] >= 750)
			{
				that.noPortee += 1
				//placement premiere note sur la nouvelle portee
				that.placementX[i] = 70

				that.delimiteurMesure = 45

				that.draw_portee()

				that.draw_line(0, that.portee[0]+(that.noPortee*100), 0, that.portee[4]+(that.noPortee*100))

				that.image_key(that.noPortee)

				that.test_croche(i)
			}

			for (let j = 0; j < that.notes.length; j++){ 

				if (data[i].indexOf(that.notes[j][0]) >= 0){

					//placementY hauteur selon that.noPortee
					that.placementY = that.notes[j][1]+(that.noPortee*100);
					that.placementY2 = that.notes[j][2]+(that.noPortee*100);

					//rotations ellipses
					rotation1 = "rotate(-20 " + that.placementX[i]+"," + that.placementY+")";
					rotation2 = "rotate(50 " + that.placementX[i]+"," + that.placementY+")";

					//croche
					if (that.regexDuree.exec(data[i])=="%"){

						that.count[i] = 0.5

						that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, rotation1)

						placementNext = that.placementX[i] + 50
						
						//add arrays at all of the positions in the outer array for which they are needed
						if (!that.ptLiaison[that.croche]) {
							that.ptLiaison[that.croche] = [];
						}

						//stockage des points de liaison sur axe X et Y (haut ou bas de la queue de note) + indice dans notes[[]]
						that.ptLiaison[that.croche][0] = that.placementX[i] + that.notes[j][3]
						that.ptLiaison[that.croche][1] = that.placementY2
						//that.ptLiaison[that.croche][2] = j
						that.ptLiaison[that.croche][2] = that.notes[j][3]

						that.croche += 1
						
					}

					//chaque non-croche 
					else {
						that.test_croche(i)

						//blanche
						if (that.regexDuree.exec(data[i])=="!"){

							that.count[i] = 2

							that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, rotation1)

							//ellipse interieure
							that.draw_ellipse(that.placementX[i], that.placementY, 7, 3, rotation1, "fill:white")
						
							placementNext = that.placementX[i] + 100
						}
						//ronde
						else if (that.regexDuree.exec(data[i])=="?"){

							that.count[i] = 4

							that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, null, "fill:black;stroke:black;stroke-width:3")

							//ellipse interieure
							that.draw_ellipse(that.placementX[i], that.placementY, 6, 4, rotation2, "fill:white")
						
							placementNext = that.placementX[i] + 200
						}
						//noire
						else {

							that.count[i] = 1

							that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, rotation1)

							placementNext = that.placementX[i] + 50
						}
					}

					//queue de note sauf pour rondes
					if (that.regexDuree.exec(data[i]) != "?"){
						that.draw_line(that.placementX[i]+that.notes[j][3], that.placementY, that.placementX[i]+that.notes[j][3], that.placementY2)
					}

					// barre horizontale sur les notes en dehors de la portee
					if (that.notes[j][1]>=200){
						for (k = 200; k <= that.notes[j][1]; k+=10){
							that.draw_line(that.placementX[i]-15, k+(that.noPortee*100), that.placementX[i]+15, k+(that.noPortee*100))
						}
					}

					//dièse
					if (data[i].charAt((data[i].indexOf(that.notes[j][0]))+2) == "#" || data[i].charAt((data[i].indexOf(that.notes[j][0]))+3) == "#" || data[i].charAt((data[i].indexOf(that.notes[j][0]))+4) == "#"){
						that.draw_text("♯", that.placementX[i]-30, that.placementY+10, "black", "23px")
					}

					//bémol
					if (data[i].charAt((data[i].indexOf(that.notes[j][0]))+2) == "b" || data[i].charAt((data[i].indexOf(that.notes[j][0]))+3) == "b" || data[i].charAt((data[i].indexOf(that.notes[j][0]))+4) == "b"){
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
							that.count[i] += 1
							placementNext += 50
						}
						else if (that.regexDuree.exec(data[i])=="?"){
							that.count[i] += 2 
							placementNext += 100
						}
						else {
							that.count[i] += 0.5
							placementNext += 25
						}
					}
				}
			}

			//séparation mesures
			that.countMesure = that.countMesure + that.count[i]

			if (that.countMesure >= temps){
				//that.delimiteurMesure : redéfinition séparation = début prochaine mesure
				that.delimiteurMesure = placementNext - 25

				that.endMesure(temps, i)				
				
				//ré-initialisation
				that.countMesure = 0

			}

			//dernier élément input
			if (i == data.length - 1) {
				if (that.countMesure == 0) {
					that.draw_line(that.delimiteurMesure + 5, that.portee[0]+(that.noPortee*100), that.delimiteurMesure + 5, that.portee[4]+(that.noPortee*100), 4)
				}

				else {
					that.delimiteurMesure = that.placementX[i] + 50
					that.draw_line(that.delimiteurMesure, that.portee[0]+(that.noPortee*100), that.delimiteurMesure, that.portee[4]+(that.noPortee*100))
					that.draw_line(that.delimiteurMesure + 5, that.portee[0]+(that.noPortee*100), that.delimiteurMesure + 5, that.portee[4]+(that.noPortee*100), 4)
				
					that.endMesure(temps, i)
				}
				that.noMesure = 1
				that.noPortee = 0
				that.countMesure = 0
				
			}
		}

	},

	endMesure (temps, i) {
		var that = this 

		that.draw_line(that.delimiteurMesure, that.portee[0]+(that.noPortee*100), that.delimiteurMesure, that.portee[4]+(that.noPortee*100))

		that.draw_text(that.noMesure, that.delimiteurMesure-10, (that.portee[0]+(that.noPortee*100))-10, null, 10)

		that.test_croche(i+1)
		
		if (that.countMesure > temps){
			alert("Attention !\nErreur de temporalité survenue dans la mesure "+that.noMesure+". Veuillez modifier votre input.");
		}

		that.noMesure += 1

	},

	getMinMaxOf2DIndex (arr, idx) {
		min = Math.min.apply(null, arr.map(function (e) { return e[idx]})),
		max = Math.max.apply(null, arr.map(function (e) { return e[idx]}))
	},

	test_croche(i) {
		var that = this;

		if (that.croche != 0){
			//croche isolée
			if (that.croche == 1){
				a = 0
				t = i-1
				that.draw_croche(a, t)
			}

			//croches liées 
			else{
				that.getMinMaxOf2DIndex(that.ptLiaison, 1)

				var droite = that.ptLiaison.every(function(arr) {
					return arr[2] == 7
				})

				var gauche = that.ptLiaison.every(function(arr) {
					return arr[2] == -7
				})

				if (droite) {
					that.draw_croches_liees(min)
				}

				else if (gauche) {
					that.draw_croches_liees(max)
				}

				else {
					t = i - that.croche
					for (a = 0; a < that.croche; a++){
						that.draw_croche(a, t)
						t++
					}
				}

			}

			that.ptLiaison = [[]]
		}

		that.croche = 0
	},

	draw_croche(a, t){
		var that = this

		//queue à droite
		if (that.ptLiaison[a][2]=="7"){
			crocheIsolee = "M "+(that.placementX[t] + 7)+" " +that.ptLiaison[a][1]+" q 20 20 5 25"
			canevas.append("path")
				.attr("d", crocheIsolee)
				.attr("style", "stroke:black;stroke-width:1;fill:none")
		}
		//queue à gauche
		else {
			crocheIsolee = "M "+(that.placementX[t] - 7)+" " +that.ptLiaison[a][1]+" q 20 -20 5 -25"
			canevas.append("path")
				.attr("d", crocheIsolee)
				.attr("style", "stroke:black;stroke-width:1;fill:none")
		}
	},

	draw_croches_liees(minmax){
		var that = this

		//-1 et +1 pixel de chaque côté de la ligne
		that.draw_line(that.ptLiaison[0][0]-1, minmax, that.ptLiaison.slice(-1)[0][0]+1, minmax, 6)

		for (a = 0; a < that.croche; a++){
			that.draw_line(that.ptLiaison[a][0], that.ptLiaison[a][1], that.ptLiaison[a][0], minmax) 
		}
	},

	draw_line(x1, y1, x2, y2, strokeWidth){
		canevas.append("line")
			.attr("x1", x1)
			.attr("y1", y1)
			.attr("x2", x2)
			.attr("y2", y2)
			.attr("style", "stroke:black;stroke-width:"+strokeWidth)
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

	draw_portee(){
		var that = this

		for (z = 0; z < that.portee.length; z++){
					that.draw_line(0, that.portee[z]+(that.noPortee*100), 800, that.portee[z]+(that.noPortee*100))
		}
	},

	image_key(){
		var that = this
		var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
			svgimg.setAttributeNS(null,'height','85');
			svgimg.setAttributeNS(null,'width','85');
			svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'Music_Sign_clip_art.svg');
			svgimg.setAttributeNS(null,'x','-20');
			svgimg.setAttributeNS(null,'y', 125+(that.noPortee*100));
			svgimg.setAttributeNS(null, 'visibility', 'visible');
			$('svg').append(svgimg);
	},

	draw_logo(){
		var that = this

		that.draw_text("Musica "+" ize", 80, 50, "#404040", "50px")
		that.draw_line(234, 5, 234, 64, 4)
		that.draw_ellipse(224.2, 64, 12, 9, "rotate(-20 224.2, 64)")
	},

	init_canevas()
	{
		var that = this

		canevas = d3.select("svg")
			.attr({"width":800, "height":700})

		that.draw_logo()

		//ajout de la portee musicale visible initialement 
		that.draw_portee(0)

		that.draw_line(0, that.portee[0], 0, that.portee[4])

		that.image_key(0)

	},

	event()
	{
		var that = this

		$('#input').blur(function(e){	
			that.partition()	
		});
	},

	init()
	{
		this.event();
		this.init_canevas();
	}
}

Partition.init();










