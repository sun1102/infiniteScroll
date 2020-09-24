// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const imageContainer = document.getElementById('image-container');
const count = 10;
const apiKey = 'bcuLotAIS1ENB95b5zkzlZZgqMls8OKCzUnobIUdJf4';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;
let ready = false;
let  imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoaded() {
    console.log('image loaded');
    // increase the loaded images count
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        console.log('ready = ', ready);
        ready = true;
    }
}

// Get Photos from unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        photosArray = data;
        displayPhoto(photosArray);
    } catch(error) {
        console.log(error);
    }
}

function displayPhoto(array) {
    imagesLoaded = 0;
    totalImages = array.length;
    let imageStr = '';
    array.forEach(photo => {
        imageStr += `
        <a href="${photo.links.html}">
            <img src="${photo.urls.regular}"  onload="imageLoaded()" alt="${photo.alt_description}" srcset="">
        </a>
        `
    });

    imageContainer.insertAdjacentHTML('beforeend', imageStr);
}

//On load
getPhotos();

// on scroll
window.addEventListener('scroll', (e) => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       ready = false;
        getPhotos();
    }
})