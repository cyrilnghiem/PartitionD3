// code de Cyril Nghiem
var canevas = d3.select("svg")
  .attr({"width":800, "height":150})

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

//durée note : pointée, croche, blanche, ronde
var regex3 = /!|\?|\*|%/

function partition(){
  var data = document.getElementById("input").value.split(" ")
  
  for (let i = 0; i < data.length; i++){ 
    
    //remplissage tableau définissant placement axe x : (i+1)*50
    //premiere note toujours située à 50 
    if (i==0){
      placementX[i]=100
    }
    //traitement des autres notes 
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
      else if (regex3.exec(data[i-1])=="%"){
        placementX[i]=placementX[i-1]+25
      }
      else {
        placementX[i]=placementX[i-1]+50
        console.log("b "+i+" "+placementX[i])
      }
    }
      
    for (let j = 0; j < notes.length; j++){ 
      if (regex1.exec(data[i])==notes[j][0]){
        //blanche
        if (regex3.exec(data[i])=="!"){
          canevas.append("ellipse")
            .attr("cx", placementX[i])
            .attr("cy", notes[j][1])
            .attr("rx", 8)
            .attr("ry", 6)
            .attr("style", "fill:none;stroke:black;stroke-width:1.3")
        }
        //ronde
        else if (regex3.exec(data[i])=="?"){
          canevas.append("ellipse")
            .attr("cx", placementX[i])
            .attr("cy", notes[j][1])
            .attr("rx", 8)
            .attr("ry", 6)
            .attr("style", "fill:none;stroke:black;stroke-width:3")
        }
        //noire
        else {
          canevas.append("ellipse")
            .attr("cx", placementX[i])
            .attr("cy", notes[j][1])
            .attr("rx", 8)
            .attr("ry", 6)
            //.attr("style", "transform:rotate(-45 100 100)")
        }
        
        //queue de note sauf pour rondes
        if (regex3.exec(data[i])!="?"){
          canevas.append("line")
            .attr("x1", placementX[i]+notes[j][3])
            .attr("y1", notes[j][1])
            .attr("x2", placementX[i]+notes[j][3])
            .attr("y2", notes[j][2])
            .attr("style", "stroke:black;stroke-width:1")
        }
          
        // barre verticale sur les notes en dehors de la portee
        if (notes[j][1]>=100){
          for (k = 100; k <= notes[j][1]; k+=10){
            canevas.append("line")
              .attr("x1", placementX[i]-15)
              .attr("y1", k)
              .attr("x2", placementX[i]+15)
              .attr("y2", k)
              .attr("style", "stroke:black;stroke-width:1")
          }
        }

        //dièse
        if (regex2.exec(data[i])=="#"){
          //canevas.append("image") dièse sous forme img svg?
          canevas.append("text")
            .text("♯")
            .attr("x", placementX[i]-30)
            .attr("y", (notes[j][1])+10)
            .attr("fill", "black")
            .style("font-size","23px")
        }
        
        //bémol
        if (regex2.exec(data[i])=="b"){
          canevas.append("text")
            .text("♭")
            .attr("x", placementX[i]-30)
            .attr("y", (notes[j][1])+10)
            .attr("fill", "black")
            .style("font-size","23px")
        }
        
        //pointée
        if (regex3.exec(data[i])=="*"){
          canevas.append("circle")
            .attr("cx", placementX[i]+15)
            .attr("cy", notes[j][1])
            .attr("r", 2.5)
        }
        
        //croche
        if (regex3.exec(data[i])=="%"){ 
          //croche isolée : 1
          if (regex3.exec(data[i-1])!="%" && regex3.exec(data[i+1])!="%"){
            croche = "M "+(placementX[i]+notes[j][3])+" "+notes[j][2]+" q 20 20 5 25"
            canevas.append("path")
              .attr("d", croche)
              .attr("style", "stroke:black;stroke-width:1;fill:none")
          }
          
          //2 croches liées : 2
          if (regex3.exec(data[i-2])!="%" && regex3.exec(data[i-1])=="%" && regex3.exec(data[i+1])!="%"){
            
            canevas.append("line")
              .attr("x1", placementX[i-1]+notes[j][3])
              .attr("y1", notes[j][2])
              .attr("x2", placementX[i]+notes[j][3])
              .attr("y2", notes[j][2])
              .attr("style", "stroke:black;stroke-width:4")
          }
          
          //4 croches liées
          if (regex3.exec(data[i-4])!="%" && regex3.exec(data[i-3])=="%" && regex3.exec(data[i-2])=="%" && regex3.exec(data[i-1])=="%" && regex3.exec(data[i+1])!="%"){
            
            canevas.append("line")
              .attr("x1", placementX[i-3]+notes[j][3])
              .attr("y1", notes[j][2])
              .attr("x2", placementX[i]+notes[j][3])
              .attr("y2", notes[j][2])
              .attr("style", "stroke:black;stroke-width:4")
          }
        }
      }
    }
  }
  
  //ajout des séparations de mesures et chiffrage
  
  //mesures à 3 temps
  if (document.getElementById("chiffrage").value=="3/4"){
 
    if (placementX[data.length-1]!=""){
      
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
      
      //premiere séparation 
      canevas.append("line")
        .attr("x1", 225)
        .attr("y1", portee[0])
        .attr("x2", 225)
        .attr("y2", portee[4])
        .attr("style", "stroke:black;stroke-width:1")
      
       //autres séparations
      for (l = 225; l <= placementX[data.length-1]; l+=150){
        canevas.append("line")
          .attr("x1", l+150)
          .attr("y1", portee[0])
          .attr("x2", l+150)
          .attr("y2", portee[4])
          .attr("style", "stroke:black;stroke-width:1")
      }
    }
  }
  
  //mesures à 4 temps
  if (document.getElementById("chiffrage").value=="4/4"){
 
    if (placementX[data.length-1]!=""){
      
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
      
      //premiere séparation 
      canevas.append("line")
        .attr("x1", 275)
        .attr("y1", portee[0])
        .attr("x2", 275)
        .attr("y2", portee[4])
        .attr("style", "stroke:black;stroke-width:1")
      
       //autres séparations
      for (l = 275; l <= placementX[data.length-1]; l+=200){
        canevas.append("line")
          .attr("x1", l+200)
          .attr("y1", portee[0])
          .attr("x2", l+200)
          .attr("y2", portee[4])
          .attr("style", "stroke:black;stroke-width:1")
      }
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
}

//ajout de la portee musicale
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



