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

    // Initialize interactive PDB viewer if placeholder exists
    const viewerDiv = target.querySelector("#pdb-viewer");

    if (viewerDiv) {
      viewerDiv.style.width = "100%";
      viewerDiv.style.height = "480px";
      viewerDiv.style.border = "1px solid #dce2e8";
      viewerDiv.style.borderRadius = "14px";
      viewerDiv.style.marginTop = "18px";
      viewerDiv.style.background = "#ffffff";

      const viewer = $3Dmol.createViewer(viewerDiv, {
        backgroundColor: "white"
      });

      // Replace with your own local PDB path
      const pdbText = await fetch("structure/example_structure.pdb")
        .then(r => r.text());

      viewer.addModel(pdbText, "pdb");

      viewer.setStyle({}, {
        cartoon: {
          color: "spectrum"
        }
      });

      // Optional: highlight residues or ligand
      // viewer.setStyle({resi: "10-30"}, {stick: {colorscheme: "greenCarbon"}});

      viewer.zoomTo();
      viewer.render();
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
