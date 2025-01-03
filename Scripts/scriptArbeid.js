// Data for each card
const cards = [
    {
        title: "Photoshop",
        images: [
            { src: "../Images/Electrical.jpg", desc: "Ska lege til bilder" },
            { src: "../Images/Electrical2.jpg", desc: "" },
            { src: "../Images/Electrical3.jpg", desc: "" }
        ]
    },
    {
        title: "HTML",
        images: [
            { src: "../Images/htmlss.jpg", desc: "Arbeid Med Html, Selve koden til denne Nettsiden" },
            { src: "../Images/htmlss2.jpg", desc: "Java" }
        ]
    },
    {
        title: "Yrkesfaglgifordupning",
        images: [
            { src: "../Images/yff.jpeg", desc: "Under utplasseringen ved biblioteket har jeg hatt ansvar for å planlegge arbeidsoppgaver for dagen og bidra med ulike oppgaver." },
            { src: "../Images/yff1.jpeg", desc: " Dette inkluderer veiledning i bruk av PC og telefon, hjelp med installasjon av apper, samt støtte til bruk av BankID. Arbeidet har gitt meg verdifull erfaring med å bistå brukere og løse praktiske utfordringer i en digital hverdag." }
        ]
    },
    {
        title: "3D Modellering",
        images: [
            { src: "../Images/Freecad.jpg", desc: "" },
            { src: "../Images/Freecad2.jpg", desc: "" },
            { src: "../Images/Freecad3.jpeg", desc: "" }
        ]
    },
    {
        title: "Arduino",
        images: [
            { src: "../Images/Arduino.jpeg", desc: "" },
            { src: "../Images/Arduino2.jpeg", desc: "" },
            { src: "../Images/Arduino3.jpg", desc: "" }
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
