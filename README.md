# App de Delivery

<!--
## descrição do projeto -->
<!-- - Nessa aplicação, fui responsável por criar e integrar tanto o backend quanto o frontend, criando uma plataforma de delivery de cerveja. 🍻 -->

Bem-vindo ao repositório do projeto App de Delivery! Essa aplicação consiste em uma plataforma de delivery de cerveja. 🍻

---

# Orientações


<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

- Docker
- Docker-compose versão >=1.29.2

---


## Instalação do Docker

Siga as instruções apropriadas para o sistema operacional que você está usando:

- ### Windows:
  - Faça o download do instalador do Docker para Windows [aqui](https://www.docker.com/products/docker-desktop).

- ### macOS:
  - Faça o download do instalador do Docker para macOS [aqui](https://www.docker.com/products/docker-desktop).

- ### Linux:

  - Para distribuições baseadas em Debian/Ubuntu, você pode seguir as instruções de instalação [aqui](https://docs.docker.com/engine/install/ubuntu/).

  - Para distribuições baseadas em Fedora, você pode seguir as instruções de instalação [aqui](https://docs.docker.com/engine/install/fedora/).
  
  - Para outras distribuições Linux, consulte a documentação oficial do Docker para obter instruções específicas.

---

## Instalação do Docker Compose

Certifique-se de ter o Docker Compose instalado na versão 1.29 ou superior. Siga as instruções abaixo:

- ### Windows:

  - O Docker Compose já é instalado junto com o Docker Desktop para Windows. Se você seguiu as instruções de instalação do Docker para Windows, o Docker Compose também deve estar disponível.

- ### macOS:

  - O Docker Compose já é instalado junto com o Docker Desktop para macOS. Se você seguiu as instruções de instalação do Docker para macOS, o Docker Compose também deve estar disponível.

- ### Linux:
  - Faça o download do executável do Docker Compose:
    ```bash
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```

  - Dê permissão de execução ao arquivo:
    ```bash
    sudo chmod +x /usr/local/bin/docker-compose
    ```

  - Verifique se a instalação foi bem-sucedida:
    ```bash
    docker-compose --version
    ```

Certifique-se de verificar se o Docker e o Docker Compose foram instalados corretamente executando os comandos docker --version e docker-compose --version no terminal. Ambos os comandos devem retornar as versões instaladas.

---

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

2. Inicializar o projeto

- ```bash
  scripts/start.sh
  ```

3. Acesso do projeto 

- http://localhost:3000

</details>

<details>
  <summary>
    <strong>🪛 Scripts Principais</strong>
  </summary><br>

**Aqui estão os scripts principais definidos na raiz do projeto:**

- `start`: Limpa as portas `3000` , `3001` e `3002`, faz o build do Docker e inicia o **`banco de dados`**, **`backend`** e **`frontend`**

  ```bash
  scripts/start.sh
  ```

- `stop`: Para e deleta as aplicações em execução no `Docker`.;

  ```bash
  scripts/stop.sh
  ```

- `logs`: Exibe os logs das aplicações em execução no `Docker`;

  ```bash
  scripts/logs.sh
  ```

- `db:start`: Executa os scripts do `Sequelize` para inicializar o **banco de dados**

  ```bash
  scripts/start-db.sh
  ```

- `db:drop`: Executa os scripts do `Sequelize` para excluir o **banco de dados**

  ```bash
  scripts/drop-db.sh
  ```

- `db:reset`: Executa os scripts do `Sequelize` para restaurar o **banco de dados**

  ```bash
  scripts/reset-db.sh
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
