document.addEventListener("DOMContentLoaded", () => {
  const resumeContent = document.getElementById("resume-content");
  const printResumeBtn = document.getElementById("print-resume");
  const themeToggle = document.getElementById("theme-toggle");
  const resumeData = JSON.parse(localStorage.getItem("resumeData"));

  function generateResume() {
    const {
      name,
      email,
      phone,
      linkedinPreview,
      linkedinUrl,
      githubPreview,
      githubUrl,
      skills,
      achievements,
      education,
      projects,
    } = resumeData;

    let educationHTML = "";
    education.forEach((edu) => {
      educationHTML += `
                <div class="education-entry">
                    <h3>${edu.institution}</h3>
                    <p>${edu.degree} - ${edu.graduationDate}</p>
                    ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ""}
                </div>
            `;
    });

    let projectsHTML = "";
    projects.forEach((project) => {
      projectsHTML += `
                <div class="project-entry">
                    <h3>${project.name}</h3>
                    <p>Technologies: ${project.technologies}</p>
                    <p>${project.description}</p>
                </div>
            `;
    });

    const resumeHTML = `
            <h1>${name}</h1>
            <p>Email: ${email} | Phone: ${phone}</p>
            <p>LinkedIn: <a href="${linkedinUrl}">${linkedinPreview}</a> | GitHub: <a href="${githubUrl}">${githubPreview}</a></p>

            <div class="section">
                <h2>Education</h2>
                ${educationHTML}
            </div>

            <div class="section">
                <h2>Technical Proficiencies</h2>
                <p>${skills}</p>
            </div>

            <div class="section">
                <h2>Projects</h2>
                ${projectsHTML}
            </div>

            <div class="section">
                <h2>Achievements</h2>
                <p>${achievements}</p>
            </div>
        `;

    resumeContent.innerHTML = resumeHTML;
  }

  generateResume();

  printResumeBtn.addEventListener("click", () => {
    window.print();
  });

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
  });

  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-theme");
  }
});
