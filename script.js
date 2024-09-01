document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form");
  const addEducationBtn = document.getElementById("add-education");
  const addProjectBtn = document.getElementById("add-project");
  const themeToggle = document.getElementById("theme-toggle");

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

  addEducationBtn.addEventListener("click", () => {
    const educationContainer = document.getElementById("education-container");
    const newEducationEntry = document.createElement("div");
    newEducationEntry.className = "education-entry";
    newEducationEntry.innerHTML = `
            <input type="text" placeholder="Institution Name" required>
            <input type="text" placeholder="Degree" required>
            <input type="text" placeholder="Graduation Date" required>
            <input type="text" placeholder="GPA">
        `;
    educationContainer.appendChild(newEducationEntry);
  });

  addProjectBtn.addEventListener("click", () => {
    const projectsContainer = document.getElementById("projects-container");
    const newProjectEntry = document.createElement("div");
    newProjectEntry.className = "project-entry";
    newProjectEntry.innerHTML = `
            <input type="text" placeholder="Project Name" required>
            <input type="text" placeholder="Technologies Used" required>
            <textarea placeholder="Project Description" rows="3" required></textarea>
        `;
    projectsContainer.appendChild(newProjectEntry);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const resumeData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      linkedinPreview: document.getElementById("linkedin-preview").value,
      linkedinUrl: document.getElementById("linkedin-url").value,
      githubPreview: document.getElementById("github-preview").value,
      githubUrl: document.getElementById("github-url").value,
      skills: document.getElementById("skills").value,
      achievements: document.getElementById("achievements").value,
    };

    // Add education and project entries
    resumeData.education = Array.from(
      document.querySelectorAll(".education-entry")
    ).map((entry) => {
      const inputs = entry.querySelectorAll("input");
      return {
        institution: inputs[0].value,
        degree: inputs[1].value,
        graduationDate: inputs[2].value,
        gpa: inputs[3].value,
      };
    });

    resumeData.projects = Array.from(
      document.querySelectorAll(".project-entry")
    ).map((entry) => {
      const inputs = entry.querySelectorAll("input");
      const textarea = entry.querySelector("textarea");
      return {
        name: inputs[0].value,
        technologies: inputs[1].value,
        description: textarea.value,
      };
    });

    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    window.open("generated-resume.html", "_blank");
  });
});
