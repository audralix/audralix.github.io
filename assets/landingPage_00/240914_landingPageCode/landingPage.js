/*----------------------------------------------------------------------------*/
// Get the canvas element and its 2D context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define the base canvas dimensions
const baseCanvasWidth = 1920; // Original width
const baseCanvasHeight = 1080; // Original height

// Set canvas dimensions to match the viewport size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to calculate the scale factor based on the window size
function getScaleFactor() {
    const scaleX = canvas.width / baseCanvasWidth;
    const scaleY = canvas.height / baseCanvasHeight;
    return Math.min(scaleX, scaleY); // Keep the aspect ratio intact
}

// Function to update the canvas size on window resize
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


// Define colors
const black = '#1D1E23';    
const darkOrange = '#FF6C20';  
const lightOrange = '#FD9D21';
const lightGrey = '#F0EFEE';


// Define the complex shape coordinates for clipping
const complexShapePath = [
    { x: 981, y: 520 },
    { x: 1020, y: 260 },
    { x: 1240, y: 50 },
    { x: 1588, y: 50 },
    { x: 1640, y: 50 },
    { x: 1970, y: 50 },
    { x: 2250, y: 300 },
    { x: 2240, y: 520 }
];

const complexShapePath2 = [
    { x: 650, y: 566 },
    { x: 650, y: 496 },
    { x: 760, y: 420 },
    { x: 925, y: 496 },
    { x: 951, y: 566 }
];

// Define circles
let circles = [
    { x: 900, y: 300, radius: 15, color: darkOrange },
    { x: 830, y: 280, radius: 10, color: black },
    { x: 850, y: 350, radius: 5, color: darkOrange },
    { x: 450, y: 550, radius: 5, color: lightOrange },
    { x: 1050, y: 200, radius: 5, color: lightOrange },
    { x: 1030, y: 100, radius: 15, color: black },
    { x: 280, y: 650, radius: 5, color: lightOrange },
    { x: 100, y: 400, radius: 3, color: black },
    { x: 50, y: 300, radius: 3, color: black },
    { x: 50, y: 200, radius: 10, color: darkOrange },
];

let mousePos = { x: canvas.width / 2, y: canvas.height / 2 };

 // Add mousemove event listener
 canvas.addEventListener('mousemove', function(event) {
    mousePos = getMousePos(canvas, event);
});

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}



function drawStaticShapes(scale){
    ctx.save();
    ctx.scale(scale, scale);

    // Draw a polygon with a different color
    ctx.beginPath();
    ctx.moveTo(1436, 500);
    ctx.lineTo(1588, 383);
    ctx.lineTo(1588, 500);
    ctx.lineTo(1506, 562);
    ctx.lineTo(1436, 500);
    ctx.closePath();
    ctx.fillStyle = lightGrey;
    ctx.fill();

    // Draw a black parallelogram
    ctx.beginPath();
    ctx.moveTo(133, 881);
    ctx.lineTo(245, 881);
    ctx.lineTo(492, 640);
    ctx.lineTo(384, 642);
    ctx.lineTo(133, 881);
    ctx.closePath();
    ctx.fillStyle = black;
    ctx.fill();

    // Draw another polygon
    ctx.beginPath();
    ctx.moveTo(831, 881);
    ctx.lineTo(1300, 881);
    ctx.lineTo(831, 453);
    ctx.closePath();
    ctx.fillStyle = black;
    ctx.fill();

    // Draw a yellow triangle with cubic Bézier curves
    ctx.beginPath();
    ctx.moveTo(650, 566);
    ctx.bezierCurveTo(650, 540, 659, 515, 676, 496);
    ctx.lineTo(760, 420);
    ctx.bezierCurveTo(795, 400, 805, 392 , 841, 418);
    ctx.lineTo(925, 496);
    ctx.bezierCurveTo(955, 530, 951, 540 , 951, 566);
    ctx.lineTo(650, 566);
    ctx.closePath();
    ctx.fillStyle = black;
    ctx.fill();  

    // Draw another shape with cubic Bézier curves
    ctx.beginPath();
    ctx.moveTo(1316, 299);
    ctx.bezierCurveTo(1260, 299, 1216, 340, 1216, 399);
    ctx.lineTo(1216, 545);
    ctx.bezierCurveTo(1216, 585, 1265, 605 , 1297, 584);
    ctx.lineTo(1548, 388);
    ctx.bezierCurveTo(1590, 360, 1560, 299 , 1547, 299);
    ctx.lineTo(1316, 299);
    ctx.closePath();
    ctx.fillStyle = lightOrange;
    ctx.fill();

    // Draw another complex shape with cubic Bézier curves and lines
    ctx.beginPath();
    ctx.moveTo(300, 720);
    ctx.moveTo(412, 615);
    ctx.bezierCurveTo(442, 580, 505, 566, 535, 566);
    ctx.lineTo(810, 566);
    ctx.lineTo(646, 720);
    ctx.lineTo(570, 720);
    ctx.bezierCurveTo(565, 680, 530, 649, 491, 642);
    ctx.bezierCurveTo(487, 642, 485, 642, 479, 641);
    ctx.bezierCurveTo(460, 642, 440, 650, 423, 661);
    ctx.lineTo(360, 720);
    ctx.lineTo(300, 720);
    ctx.closePath();
    ctx.fillStyle = lightOrange;
    ctx.fill();

    // Draw a black rectangle
    ctx.beginPath();
    ctx.moveTo(1350, 680);
    ctx.lineTo(1588, 500);
    ctx.lineTo(1588, 881);
    ctx.lineTo(1350, 881);
    ctx.closePath();
    ctx.fillStyle = black;
    ctx.fill();

    // Draw a complex polygon with multiple lines
    ctx.beginPath();
    ctx.moveTo(1350, 680);
    ctx.lineTo(1506, 562);
    ctx.lineTo(1371, 441);
    ctx.lineTo(1506, 340);
    ctx.lineTo(1371, 225);
    ctx.lineTo(1350, 243);
    ctx.closePath();
    ctx.fillStyle = darkOrange;
    ctx.fill();


        // Draw a white polygon
        ctx.beginPath();
        ctx.moveTo(1371, 441);
        ctx.lineTo(1506, 562);
        ctx.lineTo(1800, 341);
        ctx.lineTo(1659, 235);
        ctx.lineTo(1506, 340);
        ctx.closePath();
        ctx.fillStyle = lightGrey;
        ctx.fill();

    // Draw a white polygon
    ctx.beginPath();
    ctx.moveTo(1371, 225);
    ctx.lineTo(1506, 340);
    ctx.lineTo(1659, 235);
    ctx.lineTo(1506, 129);
    ctx.lineTo(1371, 225);
    ctx.closePath();
    ctx.fillStyle = lightGrey;
    ctx.fill();


   
   
      // Draw a yellow triangle with cubic Bézier curves
      ctx.beginPath();
      ctx.moveTo(355, 755);
      ctx.bezierCurveTo(355, 935, 575, 935, 575, 755);
      ctx.moveTo(355, 755);
      ctx.closePath();
      ctx.fillStyle = lightGrey;
      ctx.fill(); 


// Draw a black parallelogram
ctx.beginPath();
ctx.moveTo(133 + 450, 881);  // 583, 881
ctx.lineTo(245 + 450, 881);  // 695, 881
ctx.lineTo(492 + 450, 640);  // 942, 640
ctx.lineTo(384 + 450, 642);  // 834, 642
ctx.lineTo(133 + 450, 881);  // 583, 881
ctx.closePath();
ctx.fillStyle = 'black';
ctx.fill();


   // Draw a polygon
   ctx.beginPath();
   ctx.moveTo(1436, 500);
   ctx.lineTo(1588, 383);
   ctx.lineTo(1588, 278);
   ctx.lineTo(1371, 441);
   ctx.lineTo(1436, 500);
   ctx.closePath();
   ctx.fillStyle = lightGrey;
   ctx.fill();

    ctx.restore();

}

function drawCircles() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
        ctx.fill();
    });

    ctx.restore();



}

function updateCircles() {
    circles.forEach(circle => {
        const dx = mousePos.x - circle.x;
        const dy = mousePos.y - circle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / dist;
        const forceDirectionY = dy / dist;
        const maxDistance = 100;
        const force = (maxDistance - dist) / maxDistance;
        const directionX = (forceDirectionX * force * 0.6);
        const directionY = (forceDirectionY * force * 0.6);

        if (dist < maxDistance) {
            circle.x -= directionX;
            circle.y -= directionY;
        } else {
            circle.x += (Math.random() - 0.5) * 0.5;
            circle.y += (Math.random() - 0.5) * 0.5;
        }
    });
}

// Apply translation to move the set of wave lines to the right
const moveRightAmount = 50;   
ctx.translate(moveRightAmount, 0);

// Define animation parameters
const numberOfTimes = 10;
const waveHeight = 50; // Define the height of each wave line
const rotationAngle = Math.PI / 180 * 135; // Define the rotation angle in radians
const wavePeriod = 4; // Adjust the period of the wave animation in seconds
const startY = canvas.height - 75; // Define the starting position of the offset wave lines from the bottom



// Define animation parameters
const startTime = Date.now(); // Define startTime globally
const rotationSpeed = 0.01; // Define rotation speed globally


// Define a function to animate both the wave and rotation animations
function animateAnimations() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get the scale factor
    const scale = getScaleFactor();
    // Draw static shapes
    drawStaticShapes(scale);
    
    
    
    // Draw the wave animation
    drawWaveAnimation(scale);
    
   // Draw the second wave animation
   drawSecondWaveAnimation(scale);
    
   
   drawCircles(scale);
   updateCircles();
    // Request the next animation frame
    requestAnimationFrame(animateAnimations);
}

// Resize listener to update the canvas size
window.addEventListener('resize', () => {
    updateCanvasSize();
});

// Initialize and start the animation
updateCanvasSize();

// Define functions to draw the wave and rotation animations separately
function drawWaveAnimation() {
    // Code for drawing wave animation (same as before)
    // Clear only the area where the wave lines are drawn
    ctx.clearRect(moveRightAmount, 0, canvas.width - moveRightAmount, canvas.height);
  
    ctx.beginPath();
    ctx.arc(1200, 150, 50, 0, 2 * Math.PI);
    ctx.fillStyle = lightOrange;
    ctx.fill();


   // Draw the complex shape before the animation loop
  ctx.beginPath();
  ctx.moveTo(981, 520);
  ctx.bezierCurveTo(1020, 260, 1240, 50, 1588, 50);
  ctx.lineTo(1640, 50);
  ctx.bezierCurveTo(1970, 50, 2250, 300, 2240, 520);
  ctx.lineTo(981, 520);
  ctx.closePath();
  ctx.fillStyle = black;
  ctx.fill();

    // Save the current canvas state
    ctx.save();

    // Apply translation to move the set of wave lines to the right
    ctx.translate(moveRightAmount, 0);

    // Create a clipping path using the complex shape
    ctx.beginPath();
    ctx.moveTo(complexShapePath[0].x, complexShapePath[0].y);
    for (let i = 1; i < complexShapePath.length; i++) {
        ctx.lineTo(complexShapePath[i].x, complexShapePath[i].y);
    }
    ctx.closePath();
    ctx.clip();

    // Update the wave position based on time
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const moveUpAmount = (elapsedTime / 1000) % wavePeriod * waveHeight;

    // Loop to draw and rotate the wave line multiple times
    for (let times = 0; times < numberOfTimes; times++) {
        // Save the current canvas state
        ctx.save();

        // Apply translation and rotation transformation
        ctx.translate(canvas.width / 2, startY);
        ctx.rotate(rotationAngle);
        ctx.translate(-canvas.width / 2, -startY);

        // Draw a wave
        ctx.beginPath();
        ctx.moveTo(0, startY - moveUpAmount);
        const wavelength = 50;
        const amplitude = 30;
        for (let i = 0; i < canvas.width; i += 5) {
            const y = startY - moveUpAmount + amplitude * Math.sin(i / wavelength);
            ctx.lineTo(i, y);
        }
        ctx.strokeStyle = '#FD9D21';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Restore the canvas state
        ctx.restore();
    }

    // Restore the canvas state
    ctx.restore();
    drawStaticShapes();
    // Request the next animation frame
    //requestAnimationFrame(animateOffsetWaveLines);
}

// Define animation parameters for the second wave
const secondWavePeriod = 5; // Adjust the period of the second wave animation in seconds
const secondWaveHeight = 20; // Define the height of each wave line for the second wave

function drawSecondWaveAnimation() {
    // Save the current canvas state
    ctx.save();

    // Apply translation to move the set of wave lines to the right
    //ctx.translate(moveRightAmount, 0);

    // Update the wave position based on time
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const secondWaveMoveUpAmount = (elapsedTime / 1000) % secondWavePeriod * secondWaveHeight;

     // Create a clipping path using the complex Bézier curve shape
     ctx.beginPath();
     ctx.moveTo(650, 566);
     ctx.bezierCurveTo(650, 540, 659, 515, 676, 496);
     ctx.lineTo(760, 420);
     ctx.bezierCurveTo(795, 400, 805, 392 , 841, 418);
     ctx.lineTo(925, 496);
     ctx.bezierCurveTo(955, 530, 951, 540 , 951, 566);
     ctx.lineTo(650, 566);
     ctx.closePath();
     ctx.clip();
    
    
    // Apply translation and rotation transformation for the second wave
   ctx.translate(canvas.width / 2.5, startY);
   ctx.rotate(rotationAngle);
   ctx.translate(-canvas.width / 2, -startY);


    // Draw the second wave line
    ctx.beginPath();
    ctx.moveTo(0, startY - secondWaveMoveUpAmount);
    const secondWaveWavelength = 50;
    const secondWaveAmplitude = 20;
    for (let i = 0; i < canvas.width; i += 5) {
        const y = startY - secondWaveMoveUpAmount + secondWaveAmplitude * Math.sin(i / secondWaveWavelength);
        ctx.lineTo(i, y);
    }
    ctx.strokeStyle = '#FD9D21';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Restore the canvas state
    ctx.restore();


       // Draw the shape on top of the second wave line
       ctx.beginPath();
       ctx.moveTo(800, 402);
       ctx.bezierCurveTo(815, 402, 830, 405, 841, 418);
       ctx.lineTo(925, 496);
       ctx.bezierCurveTo(970, 530, 970, 600, 925, 630);
       ctx.bezierCurveTo(890, 660, 890, 700, 925, 720);
       ctx.bezierCurveTo(970, 750, 970, 850 , 925, 882);
       
       
       ctx.lineTo(831, 882);
       ctx.lineTo(831, 420);
       ctx.bezierCurveTo(830, 410, 815, 402, 800, 402);
       ctx.closePath();
       ctx.fillStyle = darkOrange;
       ctx.fill();
}

// Start both animations
animateAnimations();




