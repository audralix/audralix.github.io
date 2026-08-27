const textItems = ['Three Cats', 'Coffee Drinker', 'Nature Lover', 'Sigma'];
const backgrounds = {
    'Three Cats': '../Asset 1.png',
    'Coffee Drinker': '../Asset 1.png',
    'Nature Lover': '../Asset 1.png',
    'Sigma': '../Asset 1.png',
};
const tagImages = {
    'Three Cats': [
        { src: './assets/aboutAssets/Asset 17.png', top: '50%', left: '150%', animation: 'slide', class: 'behind' },
        { src: './assets/aboutAssets/Asset 16.png', top: '25%', left: '80%', animation: 'slide-fade', class: 'behind' },
        { src: './assets/aboutAssets/Asset 12.png', top: '75%', left: '-20%', animation: 'bounce', class: 'front' }
    ],
    'Coffee Drinker': [{ src: './assets/aboutAssets/Asset 21.png', top: '68%', left: '0%', class: 'front' }],
    'Nature Lover': [{ src: './assets/aboutAssets/Asset 14.png', top: '20%', left: '-10%', class: 'front' }],
    'Sigma':[{ src: './assets/aboutAssets/Asset 15.png', top: '2%', left: '12%', class: 'front' }],
};

const sliderText = document.querySelector('.slider-text');
const behindContainer = document.querySelector('.tag-image-behind-container');
const frontContainer = document.querySelector('.tag-image-front-container');
const imageWrapper = document.querySelector('.image-wrapper');

// Populate the slider with text items from the array
textItems.forEach(text => {
    const textItemDiv = document.createElement('div');
    textItemDiv.classList.add('text-item');
    textItemDiv.textContent = text;
    sliderText.appendChild(textItemDiv);
});

let currentIndex = 0;
const items = document.querySelectorAll('.text-item');

function updateTagImage() {
    const currentText = textItems[currentIndex];
    // Update the background image
    imageWrapper.style.backgroundImage = `url(${backgrounds[currentText]})`;

    // Clear previous tag images
    while (behindContainer.firstChild) {
        behindContainer.removeChild(behindContainer.firstChild);
    }
    while (frontContainer.firstChild) {
        frontContainer.removeChild(frontContainer.firstChild);
    }

    // Add new tag images to the appropriate container
    if (tagImages[currentText]) {
        tagImages[currentText].forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.className = `tag-image ${image.animation || ''} ${image.class || ''}`; // Set class for z-index
            imgElement.style.top = image.top;
            imgElement.style.left = image.left; 
            imgElement.style.display = 'block';
            imgElement.style.position = 'absolute'; // Ensure absolute positioning for z-index
            
            if (image.class === 'front') {
                frontContainer.appendChild(imgElement);
            } else {
                behindContainer.appendChild(imgElement);
            }
        });
    }
}

function updateSliderPosition() {
    sliderText.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateTagImage();
}

function changeBackgroundWithAnimation(imageUrl) {
    // Temporarily add a class to trigger animation
    imageWrapper.classList.add('animate-background');
    // Change the background image
    imageWrapper.style.backgroundImage = `url(${imageUrl})`;
    // Remove the class after animation ends
    setTimeout(() => {
        imageWrapper.classList.remove('animate-background');
    }, 1000); // Duration of the animation
}

document.getElementById('prevBtn').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + textItems.length) % textItems.length;
    updateSliderPosition();
});

document.getElementById('nextBtn').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % textItems.length;
    updateSliderPosition();
});

// Initialize with the first tag image
updateSliderPosition();
changeBackgroundWithAnimation('./assets/aboutAssets/240902_room-07.png');
