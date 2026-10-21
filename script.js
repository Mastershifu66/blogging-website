document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      const icon = toggle.querySelector(".menu-icon");
      if (icon) icon.textContent = isOpen ? "✕" : "☰";
    });

    // Close the mobile menu after selecting a navigation link.
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        const icon = toggle.querySelector(".menu-icon");
        if (icon) icon.textContent = "☰";
      });
    });
  }


  // Theme selection is saved so the chosen palette persists between pages and visits.
  const themeButtons = document.querySelectorAll("[data-theme-choice]");
  const savedTheme = (() => {
    try { return localStorage.getItem("personal-site-theme"); }
    catch (_) { return null; }
  })();
  const initialTheme = savedTheme === "light" ? "light" : "dark";

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    themeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
    });
    try { localStorage.setItem("personal-site-theme", theme); }
    catch (_) { /* The toggle still works if browser storage is unavailable. */ }
  }

  applyTheme(initialTheme);
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.themeChoice));
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
