// Exercício 4: Relatórios com filter, map, reduce, sort e forEach
// Funções puras (arrow functions) que recebem o array de alunos.

const Relatorios = {
    // Lista os alunos aprovados (notaFinal >= 7)
    aprovados: (alunos) => alunos.filter((aluno) => aluno.isAprovado()),

    // Média das notas finais
    mediaNotas: (alunos) =>
        alunos.length === 0
            ? 0
            : alunos.map((aluno) => aluno.notaFinal).reduce((soma, nota) => soma + nota, 0) / alunos.length,

    // Média das idades
    mediaIdades: (alunos) =>
        alunos.length === 0
            ? 0
            : alunos.reduce((soma, aluno) => soma + aluno.idade, 0) / alunos.length,

    // Nomes em ordem alfabética
    nomesOrdenados: (alunos) =>
        alunos.map((aluno) => aluno.nome).sort((a, b) => a.localeCompare(b, "pt-BR")),

    // Quantidade de alunos por curso
    quantidadePorCurso: (alunos) => {
        const contagem = {};
        alunos.forEach((aluno) => {
            contagem[aluno.curso] = (contagem[aluno.curso] || 0) + 1;
        });
        return contagem;
    },
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Relatorios;
}
