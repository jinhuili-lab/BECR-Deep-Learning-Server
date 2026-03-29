const sections = [
  { id: "introduction-content", file: "content/introduction.md" },
  { id: "architecture-content", file: "content/architecture.md" },
  { id: "performance-content", file: "content/performance.md" },
  { id: "ablation-content", file: "content/ablation.md" },
  { id: "distillation-content", file: "content/distillation.md" }
];

async function loadMarkdown(targetId, filePath) {
  try {
    const response = await fetch(filePath);
    const markdown = await response.text();
    const target = document.getElementById(targetId);
    target.innerHTML = marked.parse(markdown);

    if (window.renderMathInElement) {
      renderMathInElement(target, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }
  } catch (error) {
    document.getElementById(targetId).innerHTML =
      `<p>Unable to load ${filePath}</p>`;
  }
}

sections.forEach(section => loadMarkdown(section.id, section.file));

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-section").forEach(section => observer.observe(section));
