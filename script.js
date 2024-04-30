const canvas = document.getElementById("tvStatic");
const ctx = canvas.getContext("2d");
const channelUpButton = document.getElementById("channelUp");
const channelDownButton = document.getElementById("channelDown");

const channels = ["Hibernation ships", "Five Cities", "Ship Minds", "Pumzi"];

const channelDescriptions = {
  "Hibernation ships": "Our hibernation ships allow for time to stand still. DISCLAIMER: By surrendering to the stillness you also agree to leave your past life.",
  "Five Cities": "You will receve the air of the atmosphere of 5 cities from a long gone civilization from the late twenteith century. This atompshere has the distinction of having been breathed by multiple people. How outrageous! No matter, enjoy this antique piece!",
  "Ship Minds": "Discover the future of space travel with Mind-ships! Our ships are backed by *real* human ingenuity that allow for faster than light travel!  It's almost like they have a soul.",
  "Pumzi": "Yes, that's right- we are selling Pumzi, or 'breath' in Swahili. The Water Wars have left us decimated, but our underground communities are a haven! Note that you are binded to our bunker and you may not leave for any reason.",
};
let currentChannel = 0;
let showStaticUntil = 0;

function generateStatic() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const color = Math.floor(Math.random() * 256);
    imageData.data[i] = color;
    imageData.data[i + 1] = color;
    imageData.data[i + 2] = color;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}

function displayChannel() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(channels[currentChannel], canvas.width / 2, canvas.height / 2);

  // Add the "Grotesque scent for sale!" text at the top left of the canvas
  ctx.font = "12px Arial"; // Smaller font size for the additional text
  ctx.fillStyle = "red"; // Red color for the text
  ctx.textAlign = "left"; // Align text to the left
  ctx.fillText("Grotesque scent for sale!", 10, 30); // Position the text near the top left
}

function animateStatic() {
  const now = Date.now();
  if (now < showStaticUntil) {
    generateStatic();
  } else {
    displayChannel();
  }
  requestAnimationFrame(animateStatic);
}

channelUpButton.addEventListener("click", () => {
  currentChannel = (currentChannel + 1) % channels.length;
  showStaticUntil = Date.now() + 500; // Show static for 0.5 seconds on channel change
});

channelDownButton.addEventListener("click", () => {
  currentChannel = (currentChannel - 1 + channels.length) % channels.length;
  showStaticUntil = Date.now() + 500; // Show static for 0.5 seconds on channel change
});

// Function to toggle red hue and shake effect
function toggleRedShake() {
  const body = document.body;
  const redHue =
    document.querySelector(".red-hue") || document.createElement("div");
  const loreIpsum = document.querySelector(".lore-ipsum");

  if (!document.querySelector(".red-hue")) {
    redHue.classList.add("red-hue");
    body.appendChild(redHue);
  }

  if (!document.querySelector(".lore-ipsum")) {
    loreIpsum.classList.add("lore-ipsum");
    body.appendChild(loreIpsum);
  }

  redHue.style.display = "block";
  loreIpsum.style.display = "block";
  body.classList.add("shake");

  setTimeout(() => {
    redHue.style.display = "none";
    loreIpsum.style.display = "none";
    body.classList.remove("shake");
  }, 7000); // Duration of shake effect
}

// Event listener for the red shake button
const redShakeButton = document.getElementById("redShake");
redShakeButton.addEventListener("click", toggleRedShake);

function openPopup() {
  const popup = document.getElementById("orderPopup");
  const channelDescriptionElement = document.getElementById("channelName"); // Consider renaming this ID to 'channelDescription'
  const currentDescription = channelDescriptions[channels[currentChannel]]; // Get description based on current channel
  channelDescriptionElement.textContent = currentDescription; // Set the description text
  popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById("orderPopup");
  popup.style.display = "none";
}

// Add Event Listeners
const orderButton = document.getElementById("orderButton");
orderButton.addEventListener("click", openPopup);

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", closePopup);

animateStatic();
