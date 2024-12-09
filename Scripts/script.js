// Data for each card
const cards = [
    {
        title: "Electrofag",
        images: [
            { src: "../Images/Electrical.jpg", desc: "Kobling av Elektriske Apparater" },
            { src: "../Images/Electrical2.jpg", desc: "Montering av utstyr, bruk av riktig verktøy, korrekt tilkobling samt beregning av strøm og spenning. Evne til å utføre oppgaver nøyaktig og i tråd med tekniske spesifikasjoner." },
            { src: "../Images/Electrical3.jpg", desc: "Tegning, lesing og montering basert på skisser. Evne til å tolke og bruke skisser for å utføre oppgaver presist og effektivt." }
        ]
    },
    {
        title: "Dronebygging",
        images: [
            { src: "../Images/Drone.jpeg", desc: "Bygging av droner, vektberegning, programmering, og montering. Kompetanse i å kombinere teknisk presisjon og programmeringsferdigheter for å skape funksjonelle og effektive droner." },
            { src: "../Images/Drone2.jpeg", desc: "Ferdig Koblet drone" }
        ]
    },
    {
        title: "Komponenter",
        images: [
            { src: "../Images/circuit.jpeg", desc: "Lodding og kobling av komponenter, presis montering, og riktig bruk av loddebolt med korrekt temperatur for å unngå skade på ulike komponenter. Solid kunnskap om komponentenes egenskaper og funksjoner." }
        ]
    },
    {
        title: "3D Modellering",
        images: [
            { src: "../Images/Freecad.jpg", desc: "Lage 3D-modeller i Freecad" },
            { src: "../Images/Freecad2.jpg", desc: "Simpel CAD-design" },
            { src: "../Images/Freecad3.jpeg", desc: "Ledning Boks" }
        ]
    },
    {
        title: "Arduino",
        images: [
            { src: "../Images/Arduino.jpeg", desc: "Arduino-prosjektkoblinger" },
            { src: "../Images/Arduino2.jpeg", desc: "Programmering av Arduino, Enkelt 3 LED program med Varierende Lys Styrker" },
            { src: "../Images/Arduino3.jpg", desc: "Testing av Arduino-systemer og Måling av Temperatur" }
        ]
    },
    
];

let currentCardIndex = 0; // Index for current card
let currentImageIndex = 0; // Index for current image

// Open the modal and display the selected card
function openModal(index) {
    currentCardIndex = index;
    currentImageIndex = 0; // Start with the first image
    displayCard();
    document.getElementById('modal').style.display = "block";
    document.getElementById('modal').focus();
}

// Close the modal
function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Display the content of the current card
function displayCard() {
    const card = cards[currentCardIndex];
    const imageDetails = card.images[currentImageIndex];

    document.getElementById('modal-title').innerText = card.title;
    document.getElementById('modal-description').innerText = imageDetails.desc;
    document.getElementById('modal-image').src = imageDetails.src;

    updateArrows(); // Update navigation arrows
}

// Navigate between images in the current card
function navigateCard(direction) {
    const card = cards[currentCardIndex];
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : card.images.length - 1;
    } else if (direction === 'next') {
        currentImageIndex = (currentImageIndex < card.images.length - 1) ? currentImageIndex + 1 : 0;
    }
    displayCard(); // Update modal with the new image
}

// Update arrows visibility based on the current image
function updateArrows() {
    const card = cards[currentCardIndex];

    // Hide arrows if there is only one image
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    leftArrow.style.display = (card.images.length > 1) ? "block" : "none";
    rightArrow.style.display = (card.images.length > 1) ? "block" : "none";
}

// Keyboard navigation
document.addEventListener("keydown", function (event) {
    if (document.getElementById('modal').style.display === "block") {
        if (event.key === "ArrowLeft" || event.key === "A") {
            navigateCard('prev');
        } else if (event.key === "ArrowRight" || event.key === "D") {
            navigateCard('next');
        } else if (event.key === "Escape") {
            closeModal();
        }
    }
});
