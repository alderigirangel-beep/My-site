// CONTROLE DO PLAYER DE MÚSICA (TV Girl)
function toggleMusica() {
    const musica = document.getElementById("musica-fundo");
    const botao = document.getElementById("btn-player");

    if (musica.paused) {
        musica.play().then(() => {
            botao.innerHTML = "⏸ Pause • Real - man ⏸";
            botao.style.background = "#F5A9B8"; // Rosa ativo
        }).catch(err => {
            console.log("Erro ao reproduzir áudio:", err);
        });
    } else {
        musica.pause();
        botao.innerHTML = "♫⋆｡♪₊˚♬ﾟ. Ouvir Música♫⋆｡♪₊˚♬ﾟ.";
        botao.style.background = ""; // Volta ao original
    }
}

// RELÓGIO DA BARRA DE TAREFAS RETRO (Horário real)
function atualizarRelogio() {
    const relogioElemento = document.getElementById("real-time");
    if (!relogioElemento) return;

    const agora = new Date();
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';

    horas = horas % 12;
    horas = horas ? horas : 12; // Formato 12 horas
    minutos = minutos < 10 ? '0' + minutos : minutos;

    relogioElemento.textContent = `${horas}:${minutos} ${ampm}`;
}

// Inicializa o relógio e atualiza a cada segundo
setInterval(atualizarRelogio, 1000);
window.onload = atualizarRelogio;
// ==========================================================================
// FUNÇÃO DE ZOOM PARA AS IMAGENS DO PORTFÓLIO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");
    const modalTitle = document.getElementById("modal-title");
    const closeBtn = document.querySelector(".modal-close-btn");

    // Seleciona todas as imagens da galeria e a imagem do Paint
    const targetImages = document.querySelectorAll(".gallery-card img, .art-image");

    targetImages.forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex"; // Abre a janela flutuante
            modalImg.src = img.src; // Copia a imagem clicada

            let titleText = "Visualizador";
            let captionText = "";

            // Verifica se clicou na imagem destaque do Paint ou nos Cards
            if (img.classList.contains("art-image")) {
                titleText = "lute e adam.png";
                captionText = "𝙰𝚛𝚝𝚎 𝙳𝚎𝚜𝚝𝚊𝚚𝚞𝚎: 𝙻𝚞𝚝𝚎 𝚎 𝙰𝚍𝚊𝚖";
            } else {
                // Se for da galeria, busca o texto do título do card pai
                const parentCard = img.closest(".gallery-card");
                if (parentCard) {
                    const cardTitle = parentCard.querySelector(".card-title");
                    if (cardTitle) {
                        titleText = cardTitle.innerText + ".png";
                        captionText = cardTitle.innerText;
                    }
                }
            }

            modalTitle.innerText = "✮⋆˙" + titleText + "✮⋆˙";
            modalCaption.innerText = captionText;
        });
    });

    // Fechar ao clicar no botão "X" da janela
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Fechar se o usuário clicar no fundo escuro fora da janela
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});