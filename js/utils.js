export const BASE_PATH = window.location.hostname.includes('github.io')
  ? 'https://olganeolga.github.io/Comportfolio/'   // your repo name here
  : '/';

export function setupContactToggle() {
  const link = document.getElementById("contact-link");
  const contactForm = document.getElementById("contact-form");
  const contacts = document.querySelectorAll(".contact");

  let open = false;

  link.addEventListener("click", (e) => {
    e.preventDefault(); // stops navigation to /contacts

    open = !open;

    if (open) {
      contactForm.classList.add("active");

      contacts.forEach(c => c.classList.add("invisible"));
    } else {
      contactForm.classList.remove("active");

      contacts.forEach(c => c.classList.remove("invisible"));
    }
  });
}