// //your JS code here. If required.
// const output = document.getElementById("output");
// const btn = document.getElementById("download-images-button");

// const images = [
//   { url: "https://picsum.photos/id/237/200/300" },
//   { url: "https://picsum.photos/id/238/200/300" },
//   { url: "https://picsum.photos/id/239/200/300" },
// ];


const output = document.getElementById("output");

// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Create and append necessary elements
const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
loadingDiv.innerText = "Loading...";
output.appendChild(loadingDiv);

const errorDiv = document.createElement("div");
errorDiv.id = "error";
output.appendChild(errorDiv);

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Function to download all images
function downloadImages() {
  loadingDiv.style.display = "block"; // Show loading spinner
  errorDiv.innerText = ""; // Clear any previous errors
  output.innerHTML = ""; // Clear previous images
  output.appendChild(loadingDiv);
  output.appendChild(errorDiv);

  // Map images array to downloadImage promises
  const imagePromises = images.map((img) => downloadImage(img.url));

  // Use Promise.all to download images in parallel
  Promise.all(imagePromises)
    .then((loadedImages) => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      loadedImages.forEach((img) => output.appendChild(img)); // Append images to output div
    })
    .catch((error) => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      errorDiv.innerText = error; // Display error message
    });
}

// Create a button dynamically and add event listener
const btn = document.createElement("button");
btn.id = "download-images-button";
btn.innerText = "Download Images";
btn.addEventListener("click", downloadImages);
document.body.appendChild(btn);
