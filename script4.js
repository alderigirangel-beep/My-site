// --- CONTROLE DO PLAYER DE MÚSICA ---
function toggleMusica() {
    const musica = document.getElementById("musica-fundo");
    const botao = document.getElementById("btn-player");

    if (musica.paused) {
        musica.play().then(() => {
            botao.innerHTML = "⏸ Pause • Radiohead •";
            botao.style.background = "#F5A9B8";
        }).catch(err => {
            console.log("Erro ao reproduzir áudio:", err);
        });
    } else {
        musica.pause();
        botao.innerHTML = "♫⋆｡♪₊˚ backyard. Ouvir Música♫⋆｡♪₊˚ backyard.";
        botao.style.background = "";
    }
}

// --- VARIÁVEIS GERAIS DO PRODUTO SELECIONADO NO MODAL ---
let produtoAtual = {
    nome: '',
    preco: 0,
    isCustom: false
};

// --- ABRIR MODAL DE OPÇÕES DE PRODUTO ---
function abrirOpcoesProduto(nome, preco, temas = [], isCustom = false) {
    produtoAtual = { nome, preco, isCustom };

    document.getElementById("modal-titulo").innerText = nome;
    document.getElementById("modal-preco-base").innerText = `R$ ${preco.toFixed(2).replace('.', ',')} / un`;
    document.getElementById("modal-qtd").value = 1;

    const grupoTema = document.getElementById("grupo-opcoes-tema");
    const selectTema = document.getElementById("modal-select-tema");
    const grupoCustom = document.getElementById("grupo-opcao-custom");
    const inputCustom = document.getElementById("modal-input-custom");

    selectTema.innerHTML = "";
    inputCustom.value = "";

    if (isCustom) {
        grupoTema.classList.add("oculto");
        grupoCustom.classList.remove("oculto");
    } else {
        grupoCustom.classList.add("oculto");
        grupoTema.classList.remove("oculto");

        temas.forEach(tema => {
            const option = document.createElement("option");
            option.value = tema;
            option.innerText = tema;
            selectTema.appendChild(option);
        });
    }

    document.getElementById("modal-produto").classList.remove("oculto");
}

function fecharModalProduto() {
    document.getElementById("modal-produto").classList.add("oculto");
}

// --- CONFIRMAR ADIÇÃO DO PRODUTO AO CARRINHO (TRAVA R$ 20,00) ---
function confirmarAdicaoCarrinho() {
    const qtd = parseInt(document.getElementById("modal-qtd").value) || 1;
    const selectTema = document.getElementById("modal-select-tema");
    const inputCustom = document.getElementById("modal-input-custom");

    let detalhe = "";

    if (produtoAtual.isCustom) {
        detalhe = inputCustom.value.trim();
        if (!detalhe) {
            alert("Por favor, escreva os itens ou preferências para a sua Box!");
            return;
        }
    } else {
        detalhe = selectTema.value;
    }

    const precoTotalItem = produtoAtual.preco * qtd;

    // CALCULA SE O NOVO SUB-TOTAL DE PRODUTOS ULTRAPASSARIA R$ 20,00
    let subtotalAtual = carrinho.reduce((acc, item) => acc + item.preco, 0);
    if (subtotalAtual + precoTotalItem > 20.00) {
        alert("O limite máximo por compra é de R$ 20,00 em produtos! 𖦹‎ 𖦹‎");
        return;
    }

    const nomeComDetalhe = `${produtoAtual.nome} (${detalhe}) [x${qtd}]`;

    adicionarAoCarrinho(nomeComDetalhe, precoTotalItem);
    fecharModalProduto();
}

// --- LÓGICA DO CARRINHO LATERAL ---
let carrinho = [];
let valorFrete = 0;

function togglePainelCarrinho() {
    document.getElementById("painel-carrinho").classList.toggle("aberto");
}

function adicionarAoCarrinho(nomeCompleto, precoTotal) {
    carrinho.push({ nome: nomeCompleto, preco: precoTotal });
    atualizarCarrinho();
    document.getElementById("painel-carrinho").classList.add("aberto");
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// --- CÁLCULO DE FRETE REGIONAL E POR CIDADE (MÁXIMO R$ 20,00) ---
function calcularFrete() {
    const estado = document.getElementById("estado") ? document.getElementById("estado").value : "";
    const cidadeInput = document.getElementById("cidade") ? document.getElementById("cidade").value.trim().toLowerCase() : "";

    if (!estado) {
        valorFrete = 0;
    } else {
        const fretesBase = {
            'SP': 12.00,
            'RJ': 16.00,
            'MG': 16.00,
            'ES': 16.00,
            'PR': 17.00,
            'SC': 18.00,
            'RS': 19.00
        };

        let freteCalculado = fretesBase[estado] || 25.00;

        // REGRAS ESPECÍFICAS POR CIDADE
        if (estado === 'SP') {
            const cidadesLocais = ['salto', 'itu', 'indaiatuba', 'sorocaba', 'campinas'];
            
            if (cidadesLocais.includes(cidadeInput)) {
                freteCalculado = 7.00;
            } else if (cidadeInput === 'são paulo' || cidadeInput === 'sao paulo' || cidadeInput === 'sp') {
                freteCalculado = 10.00;
            } else {
                freteCalculado = 14.00;
            }
        } 
        else if (estado === 'RJ') {
            if (cidadeInput === 'rio de janeiro' || cidadeInput === 'rj') {
                freteCalculado = 14.00;
            } else {
                freteCalculado = 18.00;
            }
        }
        else if (estado === 'MG') {
            if (cidadeInput === 'belo horizonte' || cidadeInput === 'bh') {
                freteCalculado = 14.00;
            } else {
                freteCalculado = 18.00;
            }
        }

        valorFrete = freteCalculado; // Salva o frete calculado na variável global
    } // <--- CHAVE FIXADA AQUI!

    atualizarCarrinho();
}

// --- ATUALIZAR INTERFACE DO CARRINHO ---
function atualizarCarrinho() {
    const listaHtml = document.getElementById("lista-carrinho");
    const contador = document.getElementById("contador-carrinho");
    const valorTotalEl = document.getElementById("valor-total");
    const subtotalEl = document.getElementById("valor-subtotal");
    const freteEl = document.getElementById("valor-frete");
    const btnFinalizar = document.getElementById("btn-finalizar");

    listaHtml.innerHTML = "";
    contador.innerText = carrinho.length;

    if (carrinho.length === 0) {
        listaHtml.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio... 𖦹‎</li>';
        if (valorTotalEl) valorTotalEl.innerText = "R$ 0,00";
        if (subtotalEl) subtotalEl.innerText = "R$ 0,00";
        if (freteEl) freteEl.innerText = "R$ 0,00";
        if (btnFinalizar) btnFinalizar.disabled = true;
        return;
    }

    let subtotal = 0;
    carrinho.forEach((item, index) => {
        subtotal += item.preco;
        const li = document.createElement("li");
        li.className = "item-carrinho";
        li.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
            <button class="btn-remover" onclick="removerDoCarrinho(${index})">✖</button>
        `;
        listaHtml.appendChild(li);
    });

    const total = subtotal + valorFrete;

    if (subtotalEl) subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (freteEl) freteEl.innerText = `R$ ${valorFrete.toFixed(2).replace('.', ',')}`;
    if (valorTotalEl) valorTotalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;

    if (btnFinalizar) btnFinalizar.disabled = false;
}

// --- FILTRO DE CATEGORIAS ---
function filtrarProdutos(categoria, elemento) {
    document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("active"));
    elemento.classList.add("active");

    const cards = document.querySelectorAll(".card-produto");
    cards.forEach(card => {
        if (categoria === 'todos' || card.dataset.categoria === categoria) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// --- PREPARAR DADOS PARA ENVIO POR E-MAIL ---
function prepararEnvioEmail() {
    let subtotal = carrinho.reduce((acc, cur) => acc + cur.preco, 0);
    let total = subtotal + valorFrete;

    let listaItensTexto = carrinho.map(i => `${i.nome} - R$ ${i.preco.toFixed(2)}`).join(" | ");

    const inputItens = document.getElementById("input-itens-pedido");
    const inputSubtotal = document.getElementById("input-subtotal-pedido");
    const inputFrete = document.getElementById("input-frete-pedido");
    const inputTotal = document.getElementById("input-total-pedido");

    if (inputItens) inputItens.value = listaItensTexto;
    if (inputSubtotal) inputSubtotal.value = `R$ ${subtotal.toFixed(2)}`;
    if (inputFrete) inputFrete.value = `R$ ${valorFrete.toFixed(2)}`;
    if (inputTotal) inputTotal.value = `R$ ${total.toFixed(2)}`;

    // Removido o reset() imediato para não interromper o upload do arquivo pesado (comprovante).
    // O próprio redirecionamento do Formspree cuidará de descarregar a página atual.
}

// --- ABRIR FOTO EM TAMANHO GRANDE (LIGHTBOX) ---
function abrirFotoGrande(src) {
    const modalImg = document.getElementById("modal-imagem");
    const imgAmpliada = document.getElementById("img-ampliada");

    if (modalImg && imgAmpliada) {
        imgAmpliada.src = src;
        modalImg.classList.remove("oculto");
    }
}

function fecharFotoGrande() {
    const modalImg = document.getElementById("modal-imagem");
    if (modalImg) {
        modalImg.classList.add("oculto");
    }
}
