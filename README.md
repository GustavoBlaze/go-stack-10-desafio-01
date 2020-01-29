### Desafio 1
Criando uma lista de projetos com um array de tarefas em NodeJs com Express;

### Rotas
- `POST /projects`: Rota que recebe um JSON com `id` e `title` e armazena o seguinte objeto no array de projetos: `{id: "1", title: "projeto exemplo", tasks: []}`;

- `GET /projects`: Rota que lista todos projetos e suas tarefas;

- `PUT /projects/:id`: Rota que altera o title do projeto de acordo com `id` passado como parametro na rota;

- `DELETE /projects/:id`: Rota que deleta um projeto no array de acordo com o `id` passado como parametro na roda;

- `POST /projects/:id/tasks`: Rota que recebe um `title` no corpo da requisição e armazena como tarefa na no projeto apontado com o `id` passado como parametro na rota
