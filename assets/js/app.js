"use strict";

const CONFIG = {
  ambiente: "staging",

  whatsapp: "",

  mensagemWhatsApp:
    "Olá. Vi a apresentação da Paranagel e gostaria de receber informações sobre o processo de aquisição."
};

function trackEvent(eventName, data = {}) {
  if (CONFIG.ambiente === "staging") {
    console.log("[TRACK]", eventName, data);
  }
}

const whatsappButton =
  document.getElementById("whatsappButton");

const contactStatus =
  document.getElementById("contactStatus");

if (whatsappButton) {

  if (!CONFIG.whatsapp) {

    whatsappButton.disabled = true;
    whatsappButton.style.opacity = ".55";
    whatsappButton.style.cursor = "not-allowed";

  } else {

    contactStatus.textContent =
      "Atendimento comercial disponível.";

    whatsappButton.addEventListener("click", () => {

      trackEvent("whatsapp_click");

      const url =
        "https://api.whatsapp.com/send?phone=" +
        encodeURIComponent(CONFIG.whatsapp) +
        "&text=" +
        encodeURIComponent(CONFIG.mensagemWhatsApp);

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    });

  }

}

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.getElementById("lightboxClose");

document
  .querySelectorAll(".gallery-item img")
  .forEach((image) => {

    image.parentElement.addEventListener("click", () => {

      lightboxImage.src = image.src;

      lightbox.classList.add("open");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );

    });

  });

function closeLightbox() {

  lightbox.classList.remove("open");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  lightboxImage.removeAttribute("src");

}

if (lightboxClose) {
  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );
}

if (lightbox) {

  lightbox.addEventListener(
    "click",
    event => {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );

}

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeLightbox();
    }

  }
);

document
  .querySelectorAll("details")
  .forEach(item => {

    item.addEventListener(
      "toggle",
      () => {

        if (item.open) {
          trackEvent(
            "faq_open",
            {
              question:
                item.querySelector("summary")
                  ?.textContent
            }
          );
        }

      }
    );

  });
