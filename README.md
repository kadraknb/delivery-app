# App de Delivery

<!--
## descrição do projeto -->
<!-- - Nessa aplicação, fui responsável por criar e integrar tanto o backend quanto o frontend, criando uma plataforma de delivery de cerveja. 🍻 -->

Bem-vindo ao repositório do projeto App de Delivery! Essa aplicação consiste em uma plataforma de delivery de cerveja. 🍻

---

## Orientações

<br />

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

- Node versão 16
- Docker
- Docker-compose versão >=1.29.2

## Instalação do Node.js

Para instalar o Node.js, você pode utilizar o NVM (Node Version Manager). Siga as instruções abaixo:

1. Instale o NVM, caso ainda não tenha:
   - [Instruções de instalação do NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Instale a versão 16.14.0 LTS do Node.js e defina como padrão:
   ```bash
   nvm install 16.14 --lts
   nvm use 16.14
   nvm alias default 16.14
   ```

## Instalação do Docker Compose

Certifique-se de ter o Docker Compose instalado na versão 1.29 ou superior. Siga as instruções abaixo:

- [Instruções de instalação do Docker Compose no Ubuntu](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/b883b81d-21f6-4b60-aa62-8508f6017ea0);
- [Documentação oficial para atualizar o Docker Compose](https://docs.docker.com/compose/install/)
- [Documentação oficial para desinstalar o Docker Compose](https://docs.docker.com/compose/install/#uninstallation)

</details>

<details>
  <summary>
    <strong>🚀 Instalação e execução</strong>
  </summary><br>

1. Clone o repositório

- ```bash
  git clone git@github.com:kadraknb/delivery-app.git
  cd delivery-app
  ```

2. Instale as dependências

- ```bash
  npm install
  ```

3. Inicializar o projeto

- ```bash
  npm start
  ```

</details>

<details>
  <summary>
    <strong>🪛 Scripts Principais</strong>
  </summary><br>

**Aqui estão os scripts principais definidos no arquivo package.json da raiz do projeto:**

- `start`: Limpa as portas `3000` e `3001`, faz o build do Docker e inicia o **`banco de dados`**, **`backend`** e **`frontend`**

  ```bash
  npm start
  ```

- `stop`: Para e deleta as aplicações em execução no `Docker`.;

  ```bash
  npm stop
  ```

- `logs`: Exibe os logs das aplicações em execução no `Docker`;

  ```bash
  npm run logs
  ```

- `db:start`: Executa os scripts do `Sequelize` para inicializar o **banco de dados**

  ```bash
  npm run db:start
  ```

- `db:drop`: Executa os scripts do `Sequelize` para excluir o **banco de dados**

  ```bash
  npm run db:drop
  ```

- `db:reset`: Executa os scripts do `Sequelize` para restaurar o **banco de dados**

  ```bash
  npm run db:reset
  ```

</details>

<details>
<summary><strong>🏗️ Estrutura do projeto</strong></summary><br />

O projeto é organizado da seguinte forma:

1 . **Banco de dados:** Utiliza um container Docker MySQL configurado no Docker Compose, acessível pela porta 3002 do localhost.

2 . **Back-end:** Desenvolvido com as seguintes dependências:

- `express`
- `joi`
- `json web token`
- `md5`
- `sequelize`
- `mysql2`
- `nodemon`
- `mocha`
- `chai`

3 . **Front-end:** Desenvolvido com as seguintes dependências:

- `react`
- `history`
- `axios`
- `web-vitals`

4 . **Docker:** O Docker Compose é utilizado para reunir todos os serviços (backend, frontend e banco de dados) e executar o projeto completo.

</details>

<details>
<summary><strong>🛠 Desenvolvido</strong></summary><br />

---

## `Fluxo Comum`

O Fluxo comum deve garantir que seja possível **fazer login** e **registrar** no sistema.

---

## `Fluxo do Cliente`

O fluxo do cliente deve garantir que seja possível **navegar e escolher produtos**, **adicionar produtos ao carrinho**, **fazer checkout (gerar uma nova venda)**, **consultar pedidos** e **acessar detalhes do mesmo**.

---

## `Fluxo da Pessoa Vendedora`

O fluxo da pessoa vendedora deve garantir que é possível listar pedidos relacionados àquela pessoa vendedora e manipular o status desses pedidos.

---

## `Validação do Status do Pedido`

A validação de status consiste em uma série de testes que devem assegurar que os status do pedido sejam alterados e refletidos para clientes e pessoas vendedoras.

---

## `Fluxo da Pessoa Administradora`

O fluxo da pessoa administradora deve possibilitar o cadastro de clientes e pessoas vendedoras, tal como a remoção dos mesmos.

---

## `Cobertura de Testes`

A cobertura de testes deve garantir que, tanto no `front-end` quanto no `back-end`, os sistemas foram testados e possuem componentes e/ou funções estáveis e à prova de erros.

---

</details>

<br />

---

## 📪 Contato

- Email: [vagner_cardoso_s@outlook.com](vagner_cardoso_s@outlook.com)
- GitHub: [kadraknb](https://github.com/kadraknb)
- LinkedIn: [vagner-cardos-santos](https://www.linkedin.com/in/vagner-cardos-santos/)

---
