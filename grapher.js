var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

document.getElementById("input_0").value = "x^3+5x^2+6x";

var mathFunction;
var rawFunction;
var orgFunction;
var numFunctions = 1;

function getMathFunction(num){

  orgFunction = document.getElementById("input_" + num).value.toLowerCase();
  rawFunction = orgFunction.split("");

  for(var i = 0; i < rawFunction.length; i++){
    var f = rawFunction;

    if(f[i] === "^"){
      var toPwr = "";
      for(var l = i+1; !isNaN(f[l]) && f[i] != "."; l++){
        toPwr += f[l];
        var lastPos = l;
      }
      f[i] = "Math.pow(" + f[i-1] + ", " + toPwr + ")";
      f[i-1] = ""; // Clear
      for(l = i+1; l <= lastPos; l++){
       f[l] = "";
      }
    }
    if(f[i] == "x" && !isNaN(f[i-1])){
      f[i-1] += "*";
    }
    //TODO
  }

  mathFunction = rawFunction.join("");
}


function draw(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear
  for(var num = 0; num < numFunctions; num++){
    getMathFunction(num); // Translate function
    // Draw grid
    for(var i = 0; i < canvas.width; i += 100){
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      if(i == canvas.width / 2) ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(i, 0, 1, canvas.height);
      ctx.fillRect(0, i-200, canvas.width, 1);
    }

    // Draw graph
    var d = 0;
    ctx.beginPath();
    for(var x = -(canvas.width / 2)/100; x < (canvas.width / 2)/100; x+=0.05){
      var y = eval(mathFunction);
      var X = (x * 100) + (canvas.width / 2);
      var Y = (-y) * 100 + (canvas.height/2);
      ctx.lineTo(X, Y);
      ctx.strokeStyle="red";
      ctx.stroke();
      d++;
    }

  }
  // Debug
  console.log("Drew " + d + " dots.");
  console.log("Input >>> " + orgFunction);
  console.log("Output >>> " + mathFunction);
}

function newFunction(id){
  var newID = id.substr(5);
  var func = document.getElementById("input_"+newID).value;

  console.log(newID + " - " + func);
  document.getElementById("wrap").innerHTML += '<input id="input_' + (Number(newID)+1) + '" value="' + func + '" type="text" oninput="draw()"><img id="plus_' + (Number(newID)+1) + '" onclick="newFunction(this.id)" class="plus" src="img/plus.png"><br>';
  numFunctions++;
}

draw(); // Draw on load
