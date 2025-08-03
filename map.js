
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

