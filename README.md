# EC01 - DevTech Academy: Gerenciamento de Alunos

Sistema simples em HTML + JavaScript para cadastrar, listar, editar e excluir alunos e gerar relatórios.

## Exercícios

| Exercício | Onde está |
|-----------|-----------|
| 1 - CRUD com formulário e tabela (dados em array de objetos) | `index.html`, `js/app.js` |
| 2 - Classe `Aluno` (atributos, construtor, `isAprovado()`, `toString()`) | `js/aluno.js` |
| 3 - Eventos com `addEventListener`, funções anônimas, arrow functions e mensagens (`alert`/`console.log`) | `js/app.js` |
| 4 - Relatórios com `filter`, `map`, `reduce`, `sort`, `forEach` | `js/relatorios.js` |

Relatórios disponíveis: alunos aprovados (nota >= 7), média das notas, média das idades, nomes em ordem alfabética e quantidade de alunos por curso.

## Executar com Docker

Ambiente de desenvolvimento (arquivos montados como volume):

```bash
docker compose up -d web
```

Acesse http://localhost:8080

Rodar os testes (Node.js em container):

```bash
docker compose run --rm test
```

Gerar e rodar uma imagem própria:

```bash
docker build -t ec01-devtech .
docker run -d -p 8080:80 ec01-devtech
```

Parar o ambiente:

```bash
docker compose down
```
