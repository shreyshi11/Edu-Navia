import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ✅ Your Firebase config
const firebaseConfig = {
 apiKey: "AIzaSyAPXYOQk3LPxayuymhac79P4QsX13xvMZA",
    authDomain: "edu-navigator-cc4a0.firebaseapp.com",
    projectId: "edu-navigator-cc4a0",
    storageBucket: "edu-navigator-cc4a0.appspot.com",
    messagingSenderId: "33607968332",
    appId: "1:33607968332:web:59cbf34a0aae68375736e9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Modal Elements
const modal = document.getElementById("modal");
const closeBtn = modal.querySelector(".close");
const universityList = document.getElementById("university-list");
const stateName = document.getElementById("state-name");

// 🖱️ Click map = prompt + fetch universities
document.getElementById("map-img").addEventListener("click", async () => {
  let location = prompt("Which state are you exploring? (e.g., Delhi, Maharashtra)");
if (!location) return;

// Normalize (e.g., "maharashtra" => "Maharashtra")
location = location.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  stateName.textContent = location;
  universityList.innerHTML = "Loading...";

  try {
    const q = query(collection(db, "universities"), where("location", "==", location));
    const snap = await getDocs(q);

    universityList.innerHTML = "";

    if (snap.empty) {
      universityList.innerHTML = "<p>No universities found.</p>";
    } else {
      snap.forEach(doc => {
        const data = doc.data();
        universityList.innerHTML += `
          <div style="margin-bottom: 10px;">
            <strong>${data.name}</strong><br />
            Type: ${data.type}
          </div>
        `;
      });
    }

    modal.classList.add("show");

  } catch (err) {
    console.error("Error fetching universities:", err);
    universityList.innerHTML = "<p>Error loading data.</p>";
  }
});

// Modal close logic
closeBtn.addEventListener("click", () => modal.classList.remove("show"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});
