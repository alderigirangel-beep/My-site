/* --- 1. INICIALIZAÇÃO DO SITE --- */
function inicializarSite() {
    const dadosUsuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    const barraPerfil = document.getElementById('user-info');
    const linkLoginOriginal = document.getElementById('btn-login-link');
    const nomeUsuarioLink = document.getElementById('nome-usuario');
    const imagemPerfilElemento = document.getElementById('foto-usuario');

    if (dadosUsuario) {
        if (barraPerfil) barraPerfil.style.display = "flex";
        if (linkLoginOriginal) linkLoginOriginal.style.display = "none";
        if (nomeUsuarioLink) nomeUsuarioLink.innerText = dadosUsuario.nome;
        if (imagemPerfilElemento) imagemPerfilElemento.src = dadosUsuario.foto;
    } else {
        if (barraPerfil) barraPerfil.style.display = "none";
        if (linkLoginOriginal) linkLoginOriginal.style.display = "block";
    }
}

// Executa ao carregar a página
window.onload = inicializarSite;

/* --- 2. LOGOUT --- */
function logout() {
    localStorage.removeItem('usuarioLogado');
    location.reload();
}
window.logout = logout; // Torna global para o onclick funcionar

/* --- 3. PLAYER DE MÚSICA --- */
function toggleMusica() {
    const musica = document.getElementById('musica-fundo');
    const botao = document.getElementById('btn-player');

    if (musica.paused) {
        musica.play();
        botao.innerHTML = "⏸️ Pausar Música";
        botao.style.borderColor = "#F5A9B8"; // Fica rosa enquanto toca
    } else {
        musica.pause();
        botao.innerHTML = "🎵 Ouvir Música";
        botao.style.borderColor = "#5BCEFA"; // Volta para azul
    }
}