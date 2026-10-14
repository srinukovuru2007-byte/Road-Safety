// DOM Elements
const formSection = document.getElementById("form-section");
const resultsSection = document.getElementById("results-section");
const safetyForm = document.getElementById("safety-form");
const tipsContainer = document.getElementById("tips-container");
const greeting = document.getElementById("greeting");
const welcomeBack = document.getElementById("welcome-back");
const nameInput = document.getElementById("name");
const vehicleInput = document.getElementById("vehicle");
const pledgeCheck = document.getElementById("pledge-check");
const submitPledgeBtn = document.getElementById("submit-pledge-btn");
const pledgeSuccessMsg = document.getElementById("pledge-success-msg");

// Define Safety Tips Based on Category
const tipsData = {
    "Two Wheeler": [
        { icon: "🪖", text: "Always wear a standard ISI mark helmet and strap it firmly." },
        { icon: "🏍️", text: "Avoid zig-zag riding and always stay in your designated lane." },
        { icon: "🚦", text: "Never jump red lights or ignore traffic signs." },
        { icon: "📵", text: "Do not use mobile phones while riding." }
    ],
    "Four Wheeler": [
        { icon: "💺", text: "Always wear your seatbelt, and ensure passengers do too." },
        { icon: "🚗", text: "Maintain a safe following distance from the vehicle ahead." },
        { icon: "🛑", text: "Follow speed limits strictly and don't drink and drive." },
        { icon: "📵", text: "Do not text or call while operating the vehicle." }
    ],
    "Heavy Vehicle": [
        { icon: "🚛", text: "Stay in the designated heavy vehicle lane at all times." },
        { icon: "👁️", text: "Be highly aware of blind spots before changing lanes." },
        { icon: "😴", text: "Take regular breaks to avoid fatigue on long routes." },
        { icon: "⚠️", text: "Maintain safe, controlled speeds, especially on curves." }
    ],
    "Pedestrian": [
        { icon: "🚶", text: "Always walk on the footpath or sidewalk." },
        { icon: "🦓", text: "Cross roads only at zebra crossings or pedestrian lights." },
        { icon: "🎧", text: "Remove earphones and stay alert while walking on roads." },
        { icon: "🌙", text: "Wear reflective or light-colored clothes when walking at night." }
    ]
};

// Check for returning user to show customized welcome message
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("roadGuardName");
    const savedVehicle = localStorage.getItem("roadGuardVehicle");
    
    if (savedName) {
        welcomeBack.textContent = `Welcome back, ${savedName}! We are glad you care about road safety.`;
        welcomeBack.classList.remove("hidden");
        
        // Auto-fill existing details
        nameInput.value = savedName;
        if(savedVehicle) {
            vehicleInput.value = savedVehicle;
        }
    }
});

// Handle Form Submission
safetyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const vehicle = vehicleInput.value;

    if (!name || !vehicle) return;

    // Feature requirement: Stores user interaction using browser storage
    localStorage.setItem("roadGuardName", name);
    localStorage.setItem("roadGuardVehicle", vehicle);

    // Populate Results
    greeting.textContent = `Hello, ${name}!`;
    
    // Generate tips dynamically
    const tips = tipsData[vehicle] || [];
    tipsContainer.innerHTML = ""; // Clear existing tips
    
    tips.forEach((tip, index) => {
        const tipEl = document.createElement("div");
        tipEl.className = "tip-card";
        // Staggered animation effect for tips
        tipEl.style.animationDelay = `${index * 0.15}s`;
        tipEl.innerHTML = `
            <div class="icon">${tip.icon}</div>
            <div class="text">${tip.text}</div>
        `;
        tipsContainer.appendChild(tipEl);
    });

    // Switch sections with simple display toggling
    formSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");
});

// Pledge Submission Logic
pledgeCheck.addEventListener("change", function() {
    if (this.checked) {
        submitPledgeBtn.classList.remove("hidden");
    } else {
        submitPledgeBtn.classList.add("hidden");
    }
});

function submitPledge() {
    submitPledgeBtn.classList.add("hidden"); // Hide button
    pledgeSuccessMsg.textContent = "Your pledge submitted successfully! ✅";
    pledgeSuccessMsg.classList.remove("hidden");
    
    // Auto-return to home page after 2 seconds
    setTimeout(() => {
        resetForm();
    }, 2000);
}

// Reset logic
function resetForm() {
    resultsSection.classList.add("hidden");
    formSection.classList.remove("hidden");
    pledgeCheck.checked = false; // Reset the pledge
    submitPledgeBtn.classList.add("hidden");
    pledgeSuccessMsg.classList.add("hidden");
}