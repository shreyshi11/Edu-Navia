// globalSearch.js
const firebaseConfig = {
  apiKey: "AIzaSyAPXYOQk3LPxayuymhac79P4QsX13xvMZA",
    authDomain: "edu-navigator-cc4a0.firebaseapp.com",
    projectId: "edu-navigator-cc4a0",
    storageBucket: "edu-navigator-cc4a0.appspot.com",
    messagingSenderId: "33607968332",
    appId: "1:33607968332:web:59cbf34a0aae68375736e9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("globalSearchInput");
  const btn = document.getElementById("globalSearchBtn");
  const resultsDiv = document.getElementById("searchResults");

  async function globalSearch(query) {
    resultsDiv.innerHTML = "";
    resultsDiv.classList.remove("visible");
    if (!query) return;

    const uniSnap = await db.collection("colleges").get();
    const courseSnap = await db.collection("courses").get();
    const examsSnap = await db.collection("exams").get();

    const unis = uniSnap.docs.filter(doc => doc.data().name.toLowerCase().includes(query)).map(doc => `<p onclick="location.href='p.html'">🎓 ${doc.data().name}</p>`);
    const courses = courseSnap.docs.filter(doc => doc.data().name.toLowerCase().includes(query)).map(doc => `<p onclick="location.href='courses.html'">📘 ${doc.data().name}</p>`);
    const exams = examsSnap.docs.filter(doc => doc.data().name.toLowerCase().includes(query)).map(doc => `<p onclick="location.href='exam_tracker.html'">📝 ${doc.data().name}</p>`);

    const allResults = [...unis, ...courses, ...exams];
    resultsDiv.innerHTML = allResults.length ? allResults.join('') : "<p>No results found.</p>";
    resultsDiv.classList.add("visible");
  }

  btn?.addEventListener("click", () => globalSearch(input.value.toLowerCase()));
  input?.addEventListener("input", () => globalSearch(input.value.toLowerCase()));
});
