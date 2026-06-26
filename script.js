const header = document.querySelector("#siteHeader");
const navToggle = document.querySelector("#navToggle");
const navMenu = document.querySelector("#navMenu");
const reserveButtons = document.querySelectorAll(".reserve-trigger");
const modal = document.querySelector("#reservationModal");
const form = document.querySelector("#reservationForm");
const formStatus = document.querySelector(".form-status");
const eventForm = document.querySelector("#eventForm");
const eventStatus = document.querySelector(".event-status");
const galleryItems = document.querySelectorAll(".gallery-item");
const categoryButtons = document.querySelectorAll(".category-card");
const categoryPanels = document.querySelectorAll(".menu-category-panel");
const menuCategorySelector = document.querySelector(".menu-category-selector");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const lightboxClose = document.querySelector(".lightbox-close");
const ownerWhatsAppNumber = "919723430995";

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const openCategory = (category) => {
  if (!category) return;
  menuCategorySelector?.classList.add("is-hidden");
  categoryPanels.forEach((panel) => {
    panel.classList.toggle("open", panel.dataset.category === category);
  });
  const panel = document.querySelector(`.menu-category-panel[data-category="${category}"]`);
  panel?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const closeCategory = () => {
  menuCategorySelector?.classList.remove("is-hidden");
  categoryPanels.forEach((panel) => panel.classList.remove("open"));
  window.scrollTo({ top: document.querySelector("#menu")?.offsetTop || 0, behavior: "smooth" });
};

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => openCategory(button.dataset.category));
});

document.querySelectorAll(".back-to-menu").forEach((button) => {
  button.addEventListener("click", closeCategory);
});

const openModal = () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  form.querySelector("input").focus();
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

reserveButtons.forEach((button) => button.addEventListener("click", openModal));
modal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeModal();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const date = data.get("date");
  const time = data.get("time");
  const guests = data.get("guests");

  if (!name || !phone || !date || !time) {
    formStatus.textContent = "Please fill the required details.";
    return;
  }

  const [year, month, day] = date.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  const message = [
    "New table reservation request",
    "",
    `name: ${name}`,
    `phone: ${phone}`,
    `date: ${formattedDate}`,
    `time: ${time}`,
    `guests: ${guests}`
  ].join("\n");

  const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  formStatus.textContent = "WhatsApp is opening with your reservation details. Please tap Send.";
  form.reset();
});

eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(eventForm);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const phone = data.get("phone").trim();
  const date = data.get("date");
  const time = data.get("time").trim();
  const eventType = data.get("eventType").trim();
  const details = data.get("details").trim();

  if (!name || !email || !phone || !date || !time || !eventType) {
    eventStatus.textContent = "Please fill the required event details.";
    return;
  }

  const [year, month, day] = date.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  const message = [
    "New event enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Event Date: ${formattedDate}`,
    `Preferred Time: ${time}`,
    `Event Type: ${eventType}`,
    `Details: ${details || "Not specified"}`
  ].join("\n");

  const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  eventStatus.textContent = "WhatsApp is opening with the event enquiry details. Please tap Send.";
  eventForm.reset();
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeLightbox();
  }
});
