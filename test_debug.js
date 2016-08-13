// code de Cyril Nghiem
//Test pour 1 input

Partition =
{
	// portees multiples
	portee: [50, 60, 70, 80, 90],

	// pour chaque note : nom, hauteur axe y, hauteur queue, placement queue : 7 = droite, -7 = gauche
	notes: [
		["do2", 100, 65, 7],
	],

	placementX: [],

	//nom note 
	regex1: /[\S]{2,3}[1|2|3]/g,

	//bémol ou dièse
	regex2: /#|b/,

	//durée note : blanche, ronde, croche
	regex3: /!|\?|%/,

	//durée note : pointée 
	regex4: /\*/,

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

		//temps des mesures et chiffrage
		//mesures à 3 temps
		if (document.getElementById("chiffrage").value=="3/4"){
			//chiffrage
			that.draw_text("3", 50, 70, "black", "30px")
			that.draw_text("4", 50, 90, "black", "30px")

			temps = 3
		}

		var data = document.getElementById("input").value.split(" ")

		for (let i = 0; i < data.length; i++){ 

			//remplissage tableau définissant placement axe x
			//premiere note toujours située à 50 
			if (i==0){
				that.placementX[i]=100
			}
			else {
				if (that.regex3.exec(data[i-1])=="!"){
					//blanche pointée
					if (that.regex4.exec(data[i-1])=="*"){
						that.placementX[i] = that.placementX[i-1]+150
					}
					//blanche
					else {
						that.placementX[i] = that.placementX[i-1]+100
					}
				}
				else if (that.regex3.exec(data[i-1])=="?"){
					//ronde pointée
					if (that.regex4.exec(data[i-1])=="*"){
						that.placementX[i] = that.placementX[i-1]+300
					}
					//ronde
					else {
						that.placementX[i] = that.placementX[i-1]+200
					}
				}
				/*
				//croche
				else if (regex3.exec(data[i-1])=="%"){
					placementX[i]=placementX[i-1]+50
				}
				*/
				else {
					//noire pointée
					if (that.regex4.exec(data[i-1])=="*"){
						that.placementX[i] = that.placementX[i-1]+75
					}
					//noire
					else {
						that.placementX[i] = that.placementX[i-1]+50
					}
				}
			}

			for (let j = 0; j < that.notes.length; j++){ 
				//if (that.regex1.exec(data[i]) == that.notes[j][0]){
				if (that.regex1.exec(data[i]) == "do2"){
				//if (regex1.exec(data[i])==notes[j][0] && regex5.exec(data[i])!="+"){

					console.log(that.notes[j][0]);

					that.draw_ellipse(that.placementX[i], that.placementY, 8, 6, null)

					count += 1

					//placementY hauteur selon noPortee
					that.placementY = that.notes[j][1]+(noPortee*100);
					that.placementY2 = that.notes[j][2]+(noPortee*100);
				}

				else {
					console.log("error = "+that.regex1.exec(data[i]))
					
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
				
				//ré-initialisation 
				count = 0
			}
			if (count > temps){
				alert("Attention !\nErreur de temporalité");
			}
		}
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




















