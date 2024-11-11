// Data for each card
const cards = [
    {
        title: "Electrofag",
        description: "Kobling, og Montering av forskjellig Elektriske Apperater, Planlegging og Teikning av Skisser",
        images: [
            "../Images/Electrical.jpg",
            "../Images/Electrical2.jpg",
            "../Images/Electrical3.jpg"
        ]
    },
    {
        title: "Dronebygging",
        description: "Planlegging, og Oppbygging av Drone. Kode Skriving, og motorbereigninger",
        images: [
            "../Images/Drone.jpeg",
            "../Images/Drone2.jpeg"
        ]
    },
    {
        title: "Komponenter",
        description: "Bruk av Loddebolt, Kobling av Forskjellige Komponenter",
        images: [
            "../Images/circuit.jpeg"
        ]
    },
    {
        title: "3D Modellering",
        description: "Bruk av Freecad til å produsere 3D Modeller",
        images: [
            "../Images/Freecad.jpg",
            "../Images/Freecad2.jpg",
            "../Images/Freecad3.jpg"
        ]
    },
    {
        title: "Arduino",
        description: "Bruk, og Kobling av Arduino",
        images: [
            "../Images/Arduino.jpeg",
            "../Images/Arduino2.jpeg",
            "../Images/Arduino3.jpeg"
        ]
    },
    {
        title: "yap yap yap",
        description: "Vis eg skal gjør noe meir",
        images: [
            "../Images/CAMERA.jpg"
        ]
    }
];

let currentCardIndex = 0; // Indeks for valgt kort
let currentImageIndex = 0; // Indeks for valgt bilde

// Åpner modalen og viser informasjon for valgt kort
function openModal(index) {
    currentCardIndex = index;
    currentImageIndex = 0; // Start med første bilde
    displayCard();
    document.getElementById('modal').style.display = "block";
    document.getElementById('modal').focus();
}

// Lukker modalen
function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Vist kortinnholdet i modalen
function displayCard() {
    const card = cards[currentCardIndex];
    document.getElementById('modal-title').innerText = card.title;
    document.getElementById('modal-description').innerText = card.description;
    document.getElementById('modal-image').src = card.images[currentImageIndex];

    // Oppdater navigasjonspiler
    updateArrows();
}

// Naviger mellom kortene med piler (prev / next)
function navigateCard(direction) {
    const card = cards[currentCardIndex];
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : card.images.length - 1;
    } else if (direction === 'next') {
        currentImageIndex = (currentImageIndex < card.images.length - 1) ? currentImageIndex + 1 : 0;
    }
    displayCard();  // Oppdaterer modalen med nytt bilde
}

// Oppdater pilene basert på hvilket bilde som er valgt
function updateArrows() {
    const card = cards[currentCardIndex];
    
    // Skjul pilene om vi er på første eller siste bilde
    document.querySelector(".arrow.left").style.display = (currentImageIndex === 0) ? "none" : "block";
    document.querySelector(".arrow.right").style.display = (currentImageIndex === card.images.length - 1) ? "none" : "block";
}

// Lytte på tastetrykk (venstre/høyre piltast for bildebytte)
document.addEventListener("keydown", function (event) {
    if (document.getElementById('modal').style.display === "block") {
        if (event.key === "ArrowLeft") {
            navigateCard('prev');
        } else if (event.key === "ArrowRight") {
            navigateCard('next');
        } else if (event.key === "Escape") {
            closeModal();  // Lukker modalen ved Escape-tast
        }
    }
});
