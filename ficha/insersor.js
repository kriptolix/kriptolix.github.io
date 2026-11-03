// ficha.js
// Carrega os dados de um arquétipo a partir de um arquivo JSON e preenche
// dinamicamente a coluna específica da ficha (competências, habilidades e
// equipamentos), sem precisar tocar no HTML.
//
// Uso: modelo.html?ficha=engenheiro.json
// (aceita também ?arquetipo=engenheiro.json como sinônimo)
//
// IMPORTANTE: navegadores bloqueiam fetch() de arquivos abertos direto do
// disco (file://). Para isso funcionar, sirva a pasta com um servidor local,
// por exemplo:
//   python -m http.server 8000
// e acesse http://localhost:8000/modelo.html?ficha=engenheiro.json

(function () {
    function getFileName() {
        const params = new URLSearchParams(window.location.search);
        return params.get('ficha') || params.get('arquetipo') || 'engenheiro.json';
    }

    async function carregarFicha() {
        const arquivo = getFileName();
        let dados;

        try {
            const resposta = await fetch(arquivo);
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            dados = await resposta.json();
        } catch (erro) {
            console.error(`Não foi possível carregar "${arquivo}":`, erro);
            mostrarAvisoDeErro(arquivo);
            return;
        }

        preencherCabecalho(dados.arquetipo);
        preencherCompetencias(dados.competencias || []);
        preencherHabilidades(dados.habilidades || []);
        preencherEquipamentos(dados.equipamentos || []);
    }

    function mostrarAvisoDeErro(arquivo) {
        const alvo = document.getElementById('competencies-list');
        if (!alvo) return;
        alvo.innerHTML = `<p class="muted">Não foi possível carregar "${arquivo}". ` +
            `Confira se o arquivo existe e se a página está sendo aberta por um ` +
            `servidor local (não por file://).</p>`;
    }

    function preencherCabecalho(arquetipo) {
        if (!arquetipo) return;
        const nomeEl = document.getElementById('arquetipo-nome');
        const descEl = document.getElementById('arquetipo-descricao');
        if (nomeEl) nomeEl.textContent = arquetipo.nome || '';
        if (descEl) descEl.textContent = arquetipo.descricao || '';
    }

    function preencherCompetencias(lista) {
        const container = document.getElementById('competencies-list');
        if (!container) return;

        let html = '';
        lista.forEach((c, i) => {
            html += `
            <div>
                <input type="checkbox" class="circle" checked>
                <input type="checkbox" class="circle">
                <input type="checkbox" class="circle">
                <label id="competence-${i + 1}"><b>${c.nome}:</b> ${c.descricao}</label>
            </div>`;
        });

        // linha extra em branco, para o jogador anotar uma competência própria
        html += `
            <div>
                <input type="checkbox" class="circle">
                <input type="checkbox" class="circle">
                <input type="checkbox" class="circle">
                <input type="text" maxlength="30" class="inlined" placeholder="outra competência" />
            </div>`;

        container.innerHTML = html;
    }

    function preencherHabilidades(lista) {
        const container = document.getElementById('abilities-list');
        if (!container) return;

        let html = '';
        lista.forEach((h, i) => {
            html += `
            <div class="ability-item">
                <div class="ability-head">
                    <input type="checkbox" class="circle">
                    <label class="title" id="abilitie-title-${i + 1}">${h.nome}</label>
                </div>
                <label class="text" id="abilitie-text-${i + 1}">${h.descricao}</label>
            </div>`;
        });

        container.innerHTML = html;
    }

    function preencherEquipamentos(lista) {
        const container = document.getElementById('equipment-list');
        if (!container) return;

        let html = '';
        lista.forEach((eq) => {
            html += `
            <div class="equipment-item">
                <div class="cost">${custoHTML(eq.custo)}</div>
                <label class="name">${eq.nome}</label>
            </div>`;
        });

        container.innerHTML = html;
    }

    // Constrói a trilha de checkboxes de um item a partir de um objeto
    // "custo" estruturado. Sempre começa com um quadrado (indica que o
    // item foi adquirido), seguido da trilha de carga:
    //
    //   { "tipo": "fixo", "valor": 3 }
    //     -> UM item que ocupa 3 espaços de carga: círculos LIGADOS por
    //        traço (0-0-0). Ex.: Sistema de Estabilização Estrutural.
    //
    //   { "tipo": "unidades", "min": 1, "max": 3 }
    //     -> VÁRIOS itens do mesmo tipo, cada um custando 1 espaço; você
    //        pode carregar entre "min" e "max" unidades: círculos
    //        SEPARADOS, um por unidade (0 0 0). Ex.: Substrato Tecnomórfico.
    //
    //   { "tipo": "alternativo", "valores": [1, 2] }
    //     -> o item é UMA variante entre várias possíveis, cada uma com
    //        seu próprio custo fixo; as trilhas aparecem separadas por
    //        "/", e o jogador marca apenas a que escolheu.
    //        Ex.: Arma improvisada (faca = 1 / bastão = 2).
    function custoHTML(custo) {
        const base = '<input type="checkbox" class="square">';

        if (!custo) {
            return `${base} - ${trilhaLigada(1)}`;
        }

        switch (custo.tipo) {
            case 'unidades':
                return `${base} - ${trilhaSeparada(custo.max ?? custo.min ?? 1)}`;
            case 'alternativo':
                return `${base} - ${(custo.valores || [1]).map(trilhaLigada).join(' / ')}`;
            case 'fixo':
            default:
                return `${base} - ${trilhaLigada(custo.valor ?? 1)}`;
        }
    }

    function trilhaLigada(n) {
        const circulos = [];
        for (let i = 0; i < n; i++) {
            circulos.push('<input type="checkbox" class="circle">');
        }
        return circulos.join('-');
    }

    function trilhaSeparada(n) {
        const circulos = [];
        for (let i = 0; i < n; i++) {
            circulos.push('<input type="checkbox" class="circle">');
        }
        return circulos.join(' ');
    }

    document.addEventListener('DOMContentLoaded', carregarFicha);
})();