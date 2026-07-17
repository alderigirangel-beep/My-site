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

        valorFrete = freteCalculado; // Salva o frete na variável global
    } // <-- ESSA CHAVE ESTAVA FALTANDO!

    atualizarCarrinho();
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
}

// --- DETECTAR ENVIO DO FORMULÁRIO, LIMPAR CARRINHO E RESETAR ---
// Certifique-se de que seu <form> tenha o id="form-pedido" no HTML
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-pedido");
    if (form) {
        form.addEventListener("submit", () => {
            // Executa a preparação dos dados escondidos antes de enviar
            prepararEnvioEmail();

            // Aguarda 800 milissegundos para limpar a tela (tempo do Formspree receber a requisição)
            setTimeout(() => {
                form.reset(); // Reseta os campos do formulário (nome, cidade, arquivo, etc)
                carrinho = []; // Esvazia o carrinho interno
                valorFrete = 0; // Zera o frete
                atualizarCarrinho(); // Atualiza a interface (vai mostrar "carrinho vazio")
            }, 800);
        });
    }
});