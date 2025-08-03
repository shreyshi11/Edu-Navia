
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

