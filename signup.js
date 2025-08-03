

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🎯 DOM Elements
const signupForm = document.getElementById("signup-form");
const fullName = document.getElementById("full-name");
const emailInput = document.getElementById("signup-email");
const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("signup-confirm");
const googleBtn = document.getElementById("google");
const modal = document.getElementById("welcomeModal");
const closeModal = document.getElementById("closeModal");

// ✅ Show Welcome Modal
function showWelcomeModal() {
  modal.classList.remove("hidden");
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.location.href = "index.html"; // redirect after modal
  });
}

// ✅ Handle Email Signup
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = fullName.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    showWelcomeModal();
  } catch (error) {
    console.error("Signup failed:", error.message);
    alert("Signup failed: " + error.message);
  }
});

// ✅ Handle Google Signup
googleBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in success:", result.user);
    showWelcomeModal();
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    alert("Google sign-in failed: " + error.message);
  }
});

