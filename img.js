// ===============================
// 💌 Inicialización
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  mostrarFraseRomantica();
  inicializarGaleria();
});

// ===============================
// 🎞️ Modal de imágenes y videos
// ===============================
function openModal(src, caption) {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  const modalCaption = document.getElementById("modal-caption");

  // Mostrar modal
  modal.style.display = "flex";
  modal.classList.add("show");

  // Limpiar contenido anterior
  modalContent.innerHTML = "";

  // Crear elemento según tipo
  if (src.endsWith(".mp4") || src.endsWith(".webm")) {
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.className = "modal-media";
    video.style.maxHeight = "90vh";
    video.style.maxWidth = "90vw";
    modalContent.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = src;
    img.className = "modal-media";
    img.style.maxHeight = "90vh";
    img.style.maxWidth = "90vw";
    modalContent.appendChild(img);
  }

  modalCaption.textContent = caption;

  // Scroll hasta la galería
  const gallery = document.querySelector(".gallery");
  if (gallery) gallery.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ===============================
// ❌ Cerrar modal
// ===============================
function closeModal() {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");

  // Detener video si existe
  const video = modalContent.querySelector("video");
  if (video) video.pause();

  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    modalContent.innerHTML = "";
  }, 300);
}

// ===============================
// 🎬 Inicializar galería
// ===============================
function inicializarGaleria() {
  const mediaElements = document.querySelectorAll(".photo img, .photo video");

  mediaElements.forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const caption = el.nextElementSibling?.textContent || "";
      openModal(el.src, caption);
    });
  });
}

// ===============================
// 📷 Agregar nueva foto/video
// ===============================
function agregarFoto() {
  const url = prompt("URL de la imagen o video:");
  const descripcion = prompt("Descripción o fecha del recuerdo:");

  if (!url || !descripcion) return;

  const gallery = document.querySelector(".gallery");
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo";
  photoDiv.onclick = () => openModal(url, descripcion);

  let media;
  if (url.endsWith(".mp4") || url.endsWith(".webm")) {
    media = document.createElement("video");
    media.src = url;
    media.className = "memory-video";
    media.muted = true;
    media.loop = true;
    media.autoplay = true;
  } else {
    media = document.createElement("img");
    media.src = url;
  }

  const desc = document.createElement("p");
  desc.className = "description";
  desc.textContent = descripcion;

  photoDiv.appendChild(media);
  photoDiv.appendChild(desc);
  gallery.appendChild(photoDiv);

  // Guardar en localStorage
  const fotosGuardadas = JSON.parse(localStorage.getItem("galeria")) || [];
  fotosGuardadas.push({ url, descripcion });
  localStorage.setItem("galeria", JSON.stringify(fotosGuardadas));
}
