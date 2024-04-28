// Global variable to store the classifier
let classifier;

// Label
let label = 'listening...';

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/qz8yxVBHU/';

const initialImagePath = '/assets/bulb.png';

const imagePaths = {
    // Hintergrundgeräusche: '/assets/bulb.png',
    C: '/assets/bulb1.png',
    D: '/assets/bulb2.png',
    E: '/assets/bulb3.png',
    F: '/assets/bulb4.png',
    G: '/assets/bulb5.png',
    A: '/assets/bulb6.png',
    H: '/assets/bulb7.png',
}

function showImageForClass(label){
    const imagePath = imagePaths[label] || initialImagePath;

    if (imagePath){
        const img = new Image();
        img.src =imagePath;
        img.classList.add('show');

        const container = document.getElementById('imageContainer');
        container.innerHTML = '';
        container.appendChild(img);
    } else {
       console.error('Kein Bildpfad für das Label gefunden.')
    }
}

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}


function setup() {
  noCanvas();
}

function micro() {
    // Start classifying
    // The sound model will continuously listen to the microphone
    classifier.classify(gotResult);
    showImageForClass('initial');
    startImage.remove();
    microButton.remove();
}

function draw() {  
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
   console.log(results[0]);
  label = results[0].label;
  showImageForClass(label);
}