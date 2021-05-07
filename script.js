
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let photosArray= []

let ready = false
let imagesLoaded=0;
let totalImages=0; 

// Unspash API
let imgcount = 10; 
const apikey= 'nJtz3GuLgiR9qTNRI9kVMej_A_6SWoDtPEl1KSCG7jk';  
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${imgcount}`; 


//Check if all images were loaded
function imageLoaded() { 
    console.log('Image loaded')
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
}
}

//Helper Function to Set Attributes on Dom Elements
function setAttributes(element,attributes){ 
    for (const key in attributes) { 
        element.setAttribute(key,attributes[key]);
    }
}
//Create Elements for links and photos 
function displayPhotos() { 
    imagesLoaded = 0 
    totalImages = photosArray.length;
    
    // Run function foreach method
    photosArray.forEach((photo)=>{
        //Create anchor element to link to Unsplash
        const item = document.createElement('a'); 
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target', '_blank');
        
        //create image element 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        

        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt',photo.alt_description)
        // img.setAttribute('title',photo.alt_description)


        //Event Listener, check when each is finished loading 
        img.addEventListener('load',imageLoaded)
        //Put image inside anchor element and put inside image container
        item.appendChild(img)
        imageContainer.appendChild(item)
       

    });

}


//Get photos from Unsplash API 
async function getPhotos(){ 
    try {
        const response = await fetch(API_URL);
        photosArray = await response.json();
        console.log(photosArray);    
        displayPhotos();
    } catch (error) {
        //Catch error here
    }
}

//Check to see if scrolling near bottomg og page, load more Photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
    }
    
    

})


//On Load 
getPhotos();
