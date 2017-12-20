var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

document.getElementById("graphInput").value = "x^3";
document.getElementById("quality").value = "1";


var mathFunction;
var rawFunction;
var orgFunction;

function getMathFunction(){

  orgFunction = document.getElementById("graphInput").value.toLowerCase();
  rawFunction = orgFunction.split("");
  
  for(var i = 0; i < rawFunction.length; i++){
    var f = rawFunction;
    
    if(f[i] === "^"){
      var toPwr = ""; 
      for(var l = i+1; !isNaN(f[l]); l++){
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
  
  getMathFunction(); // Translate function
  
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
 
  for(var i = 0; i < canvas.width; i += 100){
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    if(i == canvas.width / 2) ctx.fillStyle = "rgba(0,0,0,1)"; 
    ctx.fillRect(i, 0, 1, canvas.height);
    ctx.fillRect(0, i-200, canvas.width, 1);
  }
  
  // Draw graph
  var d = 0;
  var q = document.getElementById("quality").value;
  for(var x = -(canvas.width / 2)/100; x < (canvas.width / 2)/100; x+=(0.05/q)){
    var y = eval(mathFunction);
    ctx.fillStyle = "red";
    ctx.fillRect(x*100 + (canvas.width / 2), (-y)*100 + (canvas.height/2), 5, 5);
    d++;
  }
  // Debug
  console.log("Drew " + d + " dots.");
  console.log("Input >>> " + orgFunction);
  console.log("Output >>> " + mathFunction);
}

draw(); // Draw on load