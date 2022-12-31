const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
// params: collections, topics, query, orientation, content_filter, count, username

const count = 20;
const apiKey = "AKwSmHALssiRaX5PhDMUlP_JqDYizRbdylgpCX8yE1c";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Checking if image is loaded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready = ", ready);
  }
}

// Helper Function

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links and photos and add to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //Run Function forEach object in photosArray

  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo;
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Evevnt listener, check when each image is finished loading
    img.addEventListener("load", imageLoaded);

    // Creating user info container
    const userContainer = document.createElement("div");
    const socialContainer = document.createElement("div");
    const idContainer = document.createElement("div");

    socialContainer.setAttribute("class", "social-container");

    const userName = document.createElement("h3");

    const instaUserName = document.createElement("p");

    const twitterUserName = document.createElement("p");

    const unsplashUserName = document.createElement("p");

    userContainer.setAttribute("class", "user-container");
    idContainer.setAttribute("class", "social");

    userName.textContent = photo.user.first_name + " " + photo.user.last_name;
    if (!photo.user.social.instagram_username) {
      twitterUserName.textContent = "Instagram: None";
    } else {
      instaUserName.textContent =
        "Instagram: @" + photo.user.social.instagram_username;
    }

    if (!photo.user.social.twitter_username) {
      twitterUserName.textContent = "Twitter: None";
    } else {
      twitterUserName.textContent =
        "Twitter: @" + photo.user.social.twitter_username;
    }

    unsplashUserName.textContent = "Unsplash: @" + photo.user.username;
    idContainer.appendChild(instaUserName);
    idContainer.appendChild(twitterUserName);
    idContainer.appendChild(unsplashUserName);
    socialContainer.appendChild(idContainer);
    userContainer.appendChild(userName);
    userContainer.appendChild(socialContainer);

    // Put <img> inside <a> then put both in imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    imageContainer.appendChild(userContainer);
  });
}

// GET photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    // console.log(photosArray);

    displayPhotos();
  } catch (error) {
    // console.log(error);
  }
}

// window.innerheight: height of browser window
// window.scrollY: distance from top of the page user has scrolled
//document.body.offsetHeight: Height of everything in the body, including what is not
// within the view
// Check to see if scrolling near bottom of page, load more photos;
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // ready = false;
  }
});

// on Load
getPhotos();
