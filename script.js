const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

/* ============================
   1) Theme Switcher (Home only)
   ============================ */
(function setupThemeToggle() {
  if (page !== "index.html") return;
  const btn = $("#themeToggle");
  if (!btn) return;

  // Restore preference
  const saved = localStorage.getItem("homeTheme");
  if (saved === "dark") document.body.classList.add("dark-theme");

  // Toggle theme on click
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const mode = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("homeTheme", mode);
    btn.innerText = mode === "dark" ? "🌙 Dark Mode" : "🌞 Light Mode";
  });

  // Initial button text
  const mode = document.body.classList.contains("dark-theme") ? "dark" : "light";
  btn.innerText = mode === "dark" ? "🌙 Dark Mode" : "🌞 Light Mode";
})();

/* ==================================
   2) Contact Form Validation (contact)
   ================================== */
(function setupFormValidation() {
  const form = $("#contactForm");
  if (!form) return;

  const nameField = $("#name");
  const emailField = $("#email");
  const messageField = $("#message");

  const nameErr = $("#nameError");
  const emailErr = $("#emailError");
  const messageErr = $("#messageError");
  const successMsg = $("#successMsg");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Name
    if (!nameField.value.trim() || nameField.value.trim().length < 2) {
      nameErr.textContent = "Please enter your full name (min 2 characters).";
      valid = false;
    } else nameErr.textContent = "";

    // Email
    if (!emailPattern.test(emailField.value.trim())) {
      emailErr.textContent = "Please enter a valid email address.";
      valid = false;
    } else emailErr.textContent = "";

    // Message
    if (!messageField.value.trim() || messageField.value.trim().length < 10) {
      messageErr.textContent = "Message should be at least 10 characters.";
      valid = false;
    } else messageErr.textContent = "";

    if (valid) {
      successMsg.textContent = " Your message was validated successfully (demo).";
      form.reset();
      setTimeout(() => (successMsg.textContent = ""), 3500);
    }
  });
})();

/* =========================================
   3) Skill Progress Bars (About page)
   - Animate bars when they come into view
   ========================================= */
(function setupSkills() {
  if (page !== "about.html") return;
  const fills = $$(".skill-bar .fill");
  if (!fills.length) return;

  const animate = el => {
    const target = el.getAttribute("data-level") || "0";
    const pct = Math.max(0, Math.min(100, parseInt(target, 10) || 0));
    el.style.width = pct + "%";
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  fills.forEach(f => observer.observe(f));
})();
