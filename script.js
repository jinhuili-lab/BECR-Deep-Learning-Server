const sections = [{
		id: "introduction-content",
		file: "content/introduction.md"
	},
	{
		id: "architecture-content",
		file: "content/architecture.md"
	},
	{
		id: "performance-content",
		file: "content/performance.md"
	},
	{
		id: "ablation-content",
		file: "content/ablation.md"
	},
	{
		id: "distillation-content",
		file: "content/distillation.md"
	}
];

async function loadMarkdown(targetId, filePath) {
	try {
		const response = await fetch(filePath);
		const markdown = await response.text();
		const target = document.getElementById(targetId);

		target.innerHTML = marked.parse(markdown);
		const viewers = target.querySelectorAll(".pdb-viewer");

		console.log("Found viewers:", viewers.length);

		viewers.forEach(async (div) => {
			console.log("Initializing viewer");

			const pdbUrl = div.dataset.pdb;
			console.log("Loading:", pdbUrl);

			try {
				const response = await fetch(pdbUrl);
				const pdbText = await response.text();

				console.log("Loaded PDB length:", pdbText.length);

				const viewer = $3Dmol.createViewer(div, {
					backgroundColor: "white"
				});

				viewer.addModel(pdbText, "pdb");
				viewer.setStyle({}, {
					cartoon: {
						color: "spectrum"
					}
				});

				viewer.zoomTo();
				viewer.render();

				console.log("Rendered");
			} catch (err) {
				console.error(err);
				div.innerHTML = "<p>Failed to load PDB.</p>";
			}
		});
		if (window.renderMathInElement) {
			renderMathInElement(target, {
				delimiters: [{
						left: "$$",
						right: "$$",
						display: true
					},
					{
						left: "$",
						right: "$",
						display: false
					}
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

			// --- 关键：强制重新计算二级结构 ---
			viewer.computeSecondaryStructure();
			viewer.addModel(pdbText, "pdb");
			viewer.getModel().setCoordinates();
			
			viewer.setStyle({}, {
			  cartoon: {
			    color: 'greenCarbon',
			    arrows: true,
			    thickness: 0.4,
			    width: 1.0
			  }
			});
			// Optional: highlight residues or ligand
			// viewer.setStyle({resi: "10-30"}, {stick: {colorscheme: "greenCarbon"}});
			viewer.zoomTo({
			});


			// 手动设置 orientation，接近 PyMOL 当前视角
			viewer.rotate(90, "y");
			viewer.rotate(-20, "x");

			viewer.render();

		}

	} catch (error) {
		document.getElementById(targetId).innerHTML =
			`<p>Unable to load ${filePath}</p>`;
	}
}
sections.forEach(section => loadMarkdown(section.id, section.file));

document.querySelectorAll(".nav-link").forEach(link => {
	link.addEventListener("click", function() {
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
}, {
	threshold: 0.1
});

document.querySelectorAll(".fade-section").forEach(section => observer.observe(section));