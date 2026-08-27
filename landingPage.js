/*----------------------------------------------------------------------------*/
// Get the canvas element and its 2D context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Set canvas dimensions to match the viewport size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Function to calculate the scale factor based on the window size
function getScaleFactor() {
    const scaleX = canvas.width / window.innerWidth;
    const scaleY = canvas.height / window.innerHeight;
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


// Define the complex shape path as a constant
const clippingShapePath = [
    { type: 'moveTo', x: 800, y: 670 }, // Bottom-left point
    { type: 'lineTo', x: 2240, y: 0 }, // Top point
    { type: 'lineTo', x: 2540, y: 670 }, // Bottom-right point
    { type: 'closePath' } // Close the shape
];




// Function to draw the triangle path
function drawTriangle(ctx) {
    ctx.beginPath();
    trianglePath.forEach(segment => {
        switch (segment.type) {
            case 'moveTo':
                ctx.moveTo(segment.x, segment.y);
                break;
            case 'lineTo':
                ctx.lineTo(segment.x, segment.y);
                break;
            case 'closePath':
                ctx.closePath();
                break;
        }
    });
    ctx.fillStyle = 'black'; // Example fill color
    ctx.fill();
}

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
    
    // Draw a polygon with a different color
    ctx.beginPath();
    ctx.moveTo(1436, 1000); // Moved down 200px from 800
    ctx.lineTo(1588, 883); // Moved down 200px from 683
    ctx.lineTo(1588, 1000); // Moved down 200px from 800
    ctx.lineTo(1506, 1062); // Moved down 200px from 862
    ctx.lineTo(1436, 1000); // Moved down 200px from 800
    ctx.closePath();
    ctx.fillStyle = lightGrey;
    ctx.fill();

// Draw a black parallelogram
// Draw a black parallelogram
ctx.beginPath();
ctx.moveTo(383, 1181); // Moved right 250px from 133
ctx.lineTo(495, 1181); // Moved right 250px from 245
ctx.lineTo(742, 940); // Moved right 250px from 492
ctx.lineTo(634, 942); // Moved right 250px from 384
ctx.lineTo(383, 1181); // Moved right 250px from 133
ctx.closePath();
ctx.fillStyle = black;
ctx.fill();

// Draw another polygon
ctx.beginPath();
ctx.moveTo(1081, 1181); // Moved right 250px from 831
ctx.lineTo(1550, 1181); // Moved right 250px from 1300
ctx.lineTo(1081, 753); // Moved right 250px from 831
ctx.closePath();
ctx.fillStyle = black;
ctx.fill();

// Draw a yellow triangle with cubic Bézier curves
ctx.beginPath();
ctx.moveTo(900, 866); // Moved right 250px from 650
ctx.bezierCurveTo(900, 840, 909, 815, 926, 796); // Moved right 250px from 659
ctx.lineTo(1010, 720); // Moved right 250px from 760
ctx.bezierCurveTo(1055, 700, 1065, 692 , 1091, 718); // Moved right 250px from 795
ctx.lineTo(1175, 796); // Moved right 250px from 925
ctx.bezierCurveTo(1205, 830, 1201, 840 , 1201, 866); // Moved right 250px from 955
ctx.lineTo(900, 866); // Moved right 250px from 650
ctx.closePath();
ctx.fillStyle = black;
ctx.fill();

ctx.beginPath();
ctx.moveTo(1466, 599); // Moved right 150px from 1316
ctx.bezierCurveTo(1410, 599, 1366, 640, 1366, 699); // Moved right 150px from 1216
ctx.lineTo(1366, 845); // Moved right 150px from 1216
ctx.bezierCurveTo(1366, 885, 1415, 905 , 1447, 884); // Moved right 150px from 1297
ctx.lineTo(1698, 688); // Moved right 150px from 1548
ctx.bezierCurveTo(1740, 660, 1710, 599 , 1697, 599); // Moved right 150px from 1547
ctx.lineTo(1466, 599); // Moved right 150px from 1316
ctx.closePath();
ctx.fillStyle = lightOrange;
ctx.fill();

// Draw another complex shape with cubic Bézier curves and lines
ctx.beginPath();
ctx.moveTo(550, 1020); // Moved right 250px from 300
ctx.moveTo(662, 915); // Moved right 250px from 412
ctx.bezierCurveTo(692, 880, 755, 866, 785, 866); // Moved right 250px from 442
ctx.lineTo(1060, 866); // Moved right 250px from 810
ctx.lineTo(896, 1020); // Moved right 250px from 646
ctx.lineTo(820, 1020); // Moved right 250px from 570
ctx.bezierCurveTo(815, 980, 780, 949, 741, 942); // Moved right 250px from 565
ctx.bezierCurveTo(737, 942, 735, 942, 729, 941); // Moved right 250px from 487
ctx.bezierCurveTo(710, 942, 690, 950, 673, 961); // Moved right 250px from 460
ctx.lineTo(610, 1020); // Moved right 250px from 360
ctx.lineTo(550, 1020); // Moved right 250px from 300
ctx.closePath();
ctx.fillStyle = lightOrange;
ctx.fill();

// Draw a black rectangle
ctx.beginPath();
ctx.moveTo(1600, 980); // Moved right 250px from 1350
ctx.lineTo(1838, 800); // Moved right 250px from 1588
ctx.lineTo(1838, 1181); // Moved right 250px from 1588
ctx.lineTo(1600, 1181); // Moved right 250px from 1350
ctx.closePath();
ctx.fillStyle = black;
ctx.fill();

// Draw a complex polygon with multiple lines
ctx.beginPath();
ctx.moveTo(1600, 980); // Moved right 250px from 1350
ctx.lineTo(1756, 862); // Moved right 250px from 1506
ctx.lineTo(1621, 741); // Moved right 250px from 1371
ctx.lineTo(1756, 640); // Moved right 250px from 1506
ctx.lineTo(1621, 525); // Moved right 250px from 1371
ctx.lineTo(1600, 543); // Moved right 250px from 1350
ctx.closePath();
ctx.fillStyle = darkOrange;
ctx.fill();

// Draw a white polygon
ctx.beginPath();
ctx.moveTo(1621, 741); // Moved right 250px from 1371
ctx.lineTo(1756, 862); // Moved right 250px from 1506
ctx.lineTo(2050, 641); // Moved right 250px from 1800
ctx.lineTo(1909, 535); // Moved right 250px from 1659
ctx.lineTo(1756, 640); // Moved right 250px from 1506
ctx.closePath();
ctx.fillStyle = lightGrey;
ctx.fill();

// Draw another white polygon
ctx.beginPath();
ctx.moveTo(1621, 525); // Moved right 250px from 1371
ctx.lineTo(1756, 640); // Moved right 250px from 1506
ctx.lineTo(1909, 535); // Moved right 250px from 1659
ctx.lineTo(1756, 429); // Moved right 250px from 1506
ctx.lineTo(1621, 525); // Moved right 250px from 1371
ctx.closePath();
ctx.fillStyle = lightGrey;
ctx.fill();


// Draw a yellow triangle with cubic Bézier curves
// Draw a shape with cubic Bézier curves
ctx.beginPath();
ctx.moveTo(605, 1055); // Moved right 250px from 355
ctx.bezierCurveTo(605, 1235, 825, 1235, 825, 1055); // Moved right 250px from 575
ctx.moveTo(605, 1055); // Moved right 250px from 355
ctx.closePath();
ctx.fillStyle = lightGrey;
ctx.fill();

// Draw a black parallelogram
ctx.beginPath();
ctx.moveTo(833, 1181); // Moved right 250px from 583
ctx.lineTo(945, 1181); // Moved right 250px from 695
ctx.lineTo(1192, 940); // Moved right 250px from 942
ctx.lineTo(1084, 942); // Moved right 250px from 834
ctx.lineTo(833, 1181); // Moved right 250px from 583
ctx.closePath();
ctx.fillStyle = black;
ctx.fill();


// Draw a polygon
ctx.beginPath();
ctx.moveTo(1686, 800); // Moved right 250px from 1436
ctx.lineTo(1838, 683); // Moved right 250px from 1588
ctx.lineTo(1838, 578); // Moved right 250px from 1588
ctx.lineTo(1621, 741); // Moved right 250px from 1371
ctx.lineTo(1686, 800); // Moved right 250px from 1436
ctx.closePath();
ctx.fillStyle = black;
ctx.fill();


/*     // Draw the orange shape on top of the wave
    ctx.beginPath();
    ctx.moveTo(1050, 702);
    ctx.bezierCurveTo(1065, 702, 1080, 705, 1091, 718);
    ctx.lineTo(1175, 796);
    ctx.bezierCurveTo(1220, 830, 1220, 900, 1175, 930);
    ctx.bezierCurveTo(1135, 960, 1135, 1000, 1175, 1020);
    ctx.bezierCurveTo(1220, 1050, 1220, 1150, 1175, 1182);
    ctx.lineTo(1081, 1182);
    ctx.lineTo(1081, 720);
    ctx.bezierCurveTo(1080, 710, 1065, 702, 1050, 702);
    ctx.closePath();
    ctx.fillStyle = darkOrange;
    ctx.fill();

    ctx.restore(); */

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
const moveRightAmount = 100;   
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
    ctx.arc(1500, 300, 50, 0, 2 * Math.PI);
    ctx.fillStyle = lightOrange;
    ctx.fill();


// Draw the complex shape before the animation loop
ctx.beginPath();
ctx.moveTo(1281, 670); // Moved right 300px from 981
ctx.bezierCurveTo(1320, 410, 1540, 200, 1888, 200); // Moved right 300px from 1240 and 1588
ctx.lineTo(1940, 200); // Moved right 300px from 1640
ctx.bezierCurveTo(2270, 200, 2550, 450, 2540, 670); // Moved right 300px from 2250 and 2240
ctx.lineTo(1281, 670); // Moved right 300px from 981
ctx.closePath();
ctx.fillStyle = black;
ctx.fill();


    // Save the current canvas state
    ctx.save();

    // Apply translation to move the set of wave lines to the right
    ctx.translate(moveRightAmount, 0);

    // Create a clipping path using the complex shape
    ctx.beginPath();
    ctx.moveTo(clippingShapePath[0].x, clippingShapePath[0].y);
    for (let i = 1; i < clippingShapePath.length; i++) {
        ctx.lineTo(clippingShapePath[i].x, clippingShapePath[i].y);
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
        ctx.restore();/*  */
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
/* 
 function drawSecondWaveAnimation() {
    // Save the current canvas state
    ctx.save();

    // Clear the area where the wave lines are drawn
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the wave position based on time
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const secondWaveMoveUpAmount = (elapsedTime / 1000) % secondWavePeriod * secondWaveHeight;

    // Create a clipping path using the complex Bézier curve shape
    ctx.beginPath();
    ctx.moveTo(650, 566);
    ctx.bezierCurveTo(650, 540, 659, 515, 676, 496);
    ctx.lineTo(760, 420);
    ctx.bezierCurveTo(795, 400, 805, 392, 841, 418);
    ctx.lineTo(925, 496);
    ctx.bezierCurveTo(955, 530, 951, 540, 951, 566);
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

    // Temporarily remove the clipping or restore canvas state before drawing the orange shape
    ctx.save();

    // Draw the orange shape on top of the wave
    ctx.beginPath();
    ctx.moveTo(1050, 702);
    ctx.bezierCurveTo(1065, 702, 1080, 705, 1091, 718);
    ctx.lineTo(1175, 796);
    ctx.bezierCurveTo(1220, 830, 1220, 900, 1175, 930);
    ctx.bezierCurveTo(1135, 960, 1135, 1000, 1175, 1020);
    ctx.bezierCurveTo(1220, 1050, 1220, 1150, 1175, 1182);
    ctx.lineTo(1081, 1182);
    ctx.lineTo(1081, 720);
    ctx.bezierCurveTo(1080, 710, 1065, 702, 1050, 702);
    ctx.closePath();
    ctx.fillStyle = darkOrange;
    ctx.fill();

    ctx.restore();
}  */

    function drawSecondWaveAnimation() {
        // Save the current canvas state
        ctx.save();
    
        // Update the wave position based on time
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const secondWaveMoveUpAmount = (elapsedTime / 1000) % secondWavePeriod * secondWaveHeight;
    
        // Create a clipping path using the Bézier curve shape
        ctx.beginPath();
        ctx.moveTo(900, 866); // Moved right 250px from 650
        ctx.bezierCurveTo(900, 840, 909, 815, 926, 796); // Moved right 250px from 659
        ctx.lineTo(1010, 720); // Moved right 250px from 760
        ctx.bezierCurveTo(1055, 700, 1065, 692, 1091, 718); // Moved right 250px from 795
        ctx.lineTo(1175, 796); // Moved right 250px from 925
        ctx.bezierCurveTo(1205, 830, 1201, 840, 1201, 866); // Moved right 250px from 955
        ctx.lineTo(900, 866); // Moved right 250px from 650
        ctx.closePath();
        ctx.clip(); // Apply the clipping region
    
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
    
        // Restore the canvas state (removing the clipping region)
        ctx.restore();
    
        // Draw the orange shape on top of the wave
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(1050, 702);
        ctx.bezierCurveTo(1065, 702, 1080, 705, 1091, 718);
        ctx.lineTo(1175, 796);
        ctx.bezierCurveTo(1220, 830, 1220, 900, 1175, 930);
        ctx.bezierCurveTo(1135, 960, 1135, 1000, 1175, 1020);
        ctx.bezierCurveTo(1220, 1050, 1220, 1150, 1175, 1182);
        ctx.lineTo(1081, 1182);
        ctx.lineTo(1081, 720);
        ctx.bezierCurveTo(1080, 710, 1065, 702, 1050, 702);
        ctx.closePath();
        ctx.fillStyle = darkOrange;
        ctx.fill();
    
        ctx.restore();
    }
    
    
// Initialize and start the animation
updateCanvasSize();
// Start both animations
animateAnimations();


