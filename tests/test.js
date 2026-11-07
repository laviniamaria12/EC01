// Testes simples da classe Aluno e dos relatórios (executar com: node tests/test.js)
const assert = require("assert");
const Aluno = require("../js/aluno.js");
const Relatorios = require("../js/relatorios.js");

const alunos = [
    new Aluno("Carlos", 20, "Java", 6.5),
    new Aluno("Ana", 22, "JavaScript", 9),
    new Aluno("Bruno", 30, "Python", 7),
    new Aluno("Daniela", 28, "JavaScript", 5),
];

// Classe Aluno
assert.strictEqual(alunos[1].isAprovado(), true);
assert.strictEqual(alunos[2].isAprovado(), true, "nota 7 deve aprovar");
assert.strictEqual(alunos[0].isAprovado(), false);
assert.ok(alunos[1].toString().includes("Ana"));
assert.ok(alunos[1].toString().includes("Aprovado"));

// Relatórios
assert.deepStrictEqual(Relatorios.aprovados(alunos).map((a) => a.nome), ["Ana", "Bruno"]);
assert.strictEqual(Relatorios.mediaNotas(alunos), 6.875);
assert.strictEqual(Relatorios.mediaIdades(alunos), 25);
assert.deepStrictEqual(Relatorios.nomesOrdenados(alunos), ["Ana", "Bruno", "Carlos", "Daniela"]);
assert.deepStrictEqual(Relatorios.quantidadePorCurso(alunos), { Java: 1, JavaScript: 2, Python: 1 });
assert.strictEqual(Relatorios.mediaNotas([]), 0);

console.log("Todos os testes passaram.");
