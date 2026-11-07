// Exercício 2: Classe Aluno com atributos, construtor e métodos

class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = Number(idade);
        this.curso = curso;
        this.notaFinal = Number(notaFinal);
    }

    // Retorna true se a nota final for maior ou igual a 7
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Retorna os dados do aluno formatados
    toString() {
        return `Nome: ${this.nome} | Idade: ${this.idade} | Curso: ${this.curso} | ` +
            `Nota Final: ${this.notaFinal.toFixed(1)} | ` +
            `Situação: ${this.isAprovado() ? "Aprovado" : "Reprovado"}`;
    }
}

// Permite reutilizar a classe nos testes com Node.js
if (typeof module !== "undefined" && module.exports) {
    module.exports = Aluno;
}
