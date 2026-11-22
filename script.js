const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localToday;

const form = document.getElementById("booking-form");
const message = document.getElementById("form-message");
const toast = document.getElementById("toast");

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  // Front-end demo only: no booking is sent or stored.
  const data = new FormData(form);
  const guestName = data.get("name");
  message.textContent = `Thanks, ${guestName}. This demo form is working, but it is not connected to a restaurant booking system yet.`;
  toast.textContent = "Demo request checked — no reservation has been submitted.";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 4200);
  form.reset();
  dateInput.min = localToday;
});
