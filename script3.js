// CONTROLE DO PLAYER DE MÚSICA (TV Girl)
function toggleMusica() {
    const musica = document.getElementById("musica-fundo");
    const botao = document.getElementById("btn-player");

    if (musica.paused) {
        musica.play().then(() => {
            botao.innerHTML = "⏸ Pause • Creep ⏸";
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
let slideAtual = 0;
        const slides = document.querySelectorAll('.slide');

        function mostrarSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            if (index >= slides.length) slideAtual = 0;
            if (index < 0) slideAtual = slides.length - 1;
            slides[slideAtual].classList.add('active');
        }

        function mudarSlide(direcao) {
            slideAtual += direcao;
            mostrarSlide(slideAtual);
        }