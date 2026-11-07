// Exercícios 1 e 3: CRUD em memória, manipulação de DOM e eventos

// Armazenamento em memória (array de objetos Aluno)
const alunos = [];

// Referências aos elementos do DOM
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCurso = document.getElementById("curso");
const campoNota = document.getElementById("notaFinal");
const campoIndice = document.getElementById("indiceEdicao");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const corpoTabela = document.getElementById("corpoTabela");
const resultadoRelatorio = document.getElementById("resultadoRelatorio");

// ---------- Operações de manipulação dos dados (arrow functions) ----------

const adicionarAluno = (aluno) => alunos.push(aluno);

const atualizarAluno = (indice, aluno) => {
    alunos[indice] = aluno;
};

const removerAluno = (indice) => alunos.splice(indice, 1)[0];

const lerFormulario = () =>
    new Aluno(campoNome.value.trim(), campoIdade.value, campoCurso.value, campoNota.value);

const validarFormulario = () => {
    if (!campoNome.value.trim() || campoIdade.value === "" || !campoCurso.value || campoNota.value === "") {
        alert("Preencha todos os campos.");
        return false;
    }
    const nota = Number(campoNota.value);
    if (nota < 0 || nota > 10) {
        alert("A nota final deve estar entre 0 e 10.");
        return false;
    }
    if (Number(campoIdade.value) < 0) {
        alert("A idade não pode ser negativa.");
        return false;
    }
    return true;
};

const limparFormulario = () => {
    campoNome.value = "";
    campoIdade.value = "";
    campoCurso.value = "";
    campoNota.value = "";
    campoIndice.value = "";
    btnCadastrar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
};

const preencherFormulario = (indice) => {
    const aluno = alunos[indice];
    campoNome.value = aluno.nome;
    campoIdade.value = aluno.idade;
    campoCurso.value = aluno.curso;
    campoNota.value = aluno.notaFinal;
    campoIndice.value = indice;
    btnCadastrar.textContent = "Salvar alteração";
    btnCancelar.hidden = false;
};

// ---------- Renderização dinâmica da tabela ----------

const criarCelula = (texto) => {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
};

const renderizarTabela = () => {
    corpoTabela.innerHTML = "";

    if (alunos.length === 0) {
        const tr = document.createElement("tr");
        const td = criarCelula("Nenhum aluno cadastrado.");
        td.colSpan = 6;
        tr.appendChild(td);
        corpoTabela.appendChild(tr);
        return;
    }

    alunos.forEach((aluno, indice) => {
        const tr = document.createElement("tr");
        tr.appendChild(criarCelula(aluno.nome));
        tr.appendChild(criarCelula(aluno.idade));
        tr.appendChild(criarCelula(aluno.curso));
        tr.appendChild(criarCelula(aluno.notaFinal.toFixed(1)));
        tr.appendChild(criarCelula(aluno.isAprovado() ? "Aprovado" : "Reprovado"));

        const tdAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.dataset.acao = "editar";
        btnEditar.dataset.indice = indice;

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.textContent = "Excluir";
        btnExcluir.dataset.acao = "excluir";
        btnExcluir.dataset.indice = indice;

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(document.createTextNode(" "));
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);

        corpoTabela.appendChild(tr);
    });
};

// ---------- Eventos (addEventListener com funções anônimas) ----------

// Cadastrar / salvar edição
btnCadastrar.addEventListener("click", function () {
    if (!validarFormulario()) return;

    const aluno = lerFormulario();

    if (campoIndice.value === "") {
        adicionarAluno(aluno);
        console.log("Aluno cadastrado:", aluno.toString());
        alert(`Aluno "${aluno.nome}" cadastrado com sucesso!`);
    } else {
        atualizarAluno(Number(campoIndice.value), aluno);
        console.log("Aluno editado:", aluno.toString());
        alert(`Aluno "${aluno.nome}" editado com sucesso!`);
    }

    limparFormulario();
    renderizarTabela();
});

// Cancelar edição
btnCancelar.addEventListener("click", function () {
    limparFormulario();
});

// Botões "Editar" e "Excluir" da tabela (delegação de eventos)
corpoTabela.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button");
    if (!botao) return;

    const indice = Number(botao.dataset.indice);

    if (botao.dataset.acao === "editar") {
        preencherFormulario(indice);
        console.log("Editando aluno:", alunos[indice].toString());
    }

    if (botao.dataset.acao === "excluir") {
        if (!confirm(`Deseja excluir o aluno "${alunos[indice].nome}"?`)) return;
        const removido = removerAluno(indice);
        console.log("Aluno excluído:", removido.toString());
        alert(`Aluno "${removido.nome}" excluído com sucesso!`);
        if (campoIndice.value !== "") limparFormulario();
        renderizarTabela();
    }
});

// ---------- Exercício 4: Relatórios ----------

const exibirLista = (titulo, itens) => {
    resultadoRelatorio.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = titulo;
    resultadoRelatorio.appendChild(h3);

    if (itens.length === 0) {
        const p = document.createElement("p");
        p.textContent = "Nenhum registro encontrado.";
        resultadoRelatorio.appendChild(p);
        return;
    }

    const ul = document.createElement("ul");
    itens.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
    resultadoRelatorio.appendChild(ul);
};

const exibirValor = (titulo, valor) => exibirLista(titulo, [valor]);

document.getElementById("btnAprovados").addEventListener("click", function () {
    exibirLista("Alunos aprovados (nota >= 7)",
        Relatorios.aprovados(alunos).map((aluno) => aluno.toString()));
});

document.getElementById("btnMediaNotas").addEventListener("click", function () {
    exibirValor("Média das notas finais",
        alunos.length ? Relatorios.mediaNotas(alunos).toFixed(2) : "Nenhum aluno cadastrado.");
});

document.getElementById("btnMediaIdades").addEventListener("click", function () {
    exibirValor("Média das idades",
        alunos.length ? `${Relatorios.mediaIdades(alunos).toFixed(1)} anos` : "Nenhum aluno cadastrado.");
});

document.getElementById("btnOrdemAlfabetica").addEventListener("click", function () {
    exibirLista("Nomes em ordem alfabética", Relatorios.nomesOrdenados(alunos));
});

document.getElementById("btnPorCurso").addEventListener("click", function () {
    const contagem = Relatorios.quantidadePorCurso(alunos);
    exibirLista("Quantidade de alunos por curso",
        Object.entries(contagem).map(([curso, qtd]) => `${curso}: ${qtd} aluno(s)`));
});

// Renderização inicial
renderizarTabela();
