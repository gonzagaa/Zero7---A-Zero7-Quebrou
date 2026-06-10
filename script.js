
AOS.init(
  {
      duration: 1200,
  }
);

const capaJhone = document.getElementById("depoimentoJhone");
  const modalJhone = document.getElementById("modalJhone");
  const videoContainer = document.getElementById("video-containerJhone");
  const closeBtn = document.querySelector(".close-depoimento");

  capaJhone.addEventListener("click", () => {
    // Exibe o modal
    modalJhone.style.display = "flex";

    // Insere o iframe com autoplay
    videoContainer.innerHTML = `
      <iframe src="https://www.youtube.com/embed/ShcucfOriyI?autoplay=1&si=zB2kYOP0X8xTSmZY"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
  });

  closeBtn.addEventListener("click", () => {
    // Esconde o modal e remove o iframe
    modalJhone.style.display = "none";
    videoContainer.innerHTML = "";
  });

  // Fecha o modal clicando fora do conteúdo
  window.addEventListener("click", (e) => {
    if (e.target === modalJhone) {
      modalJhone.style.display = "none";
      videoContainer.innerHTML = "";
    }
  });

  const modalGeral = document.getElementById("modalDepoimentos");
const videoContainerGeral = document.getElementById("video-container-geral");
const closeBtnGeral = document.querySelector(".close-depoimento-geral");

// Seleciona apenas os depoimentos genéricos
document.querySelectorAll(".depoimento").forEach((depoimento) => {
  depoimento.addEventListener("click", () => {
    const videoUrl = depoimento.getAttribute("data-video");
    if (!videoUrl) return;

    modalGeral.style.display = "flex";
    videoContainerGeral.innerHTML = `
      <iframe src="${videoUrl}&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
  });
});

// Fechar modal ao clicar no botão X
closeBtnGeral.addEventListener("click", () => {
  modalGeral.style.display = "none";
  videoContainerGeral.innerHTML = "";
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
  if (e.target === modalGeral) {
    modalGeral.style.display = "none";
    videoContainerGeral.innerHTML = "";
  }
});

const vslDiv = document.getElementById("vsl");

vslDiv.addEventListener("click", () => {
  vslDiv.innerHTML = `
    <iframe width="100%" height="100%" 
      src="https://www.youtube.com/embed/acnq8_PvW_k?autoplay=1&si=GACYvwVrbYLsIfzE"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  `;
});





