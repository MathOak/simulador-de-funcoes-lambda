# Serverless Aula 14

Projeto de demonstração de uma função HTTP serverless escrita em Node.js. A aplicação usa o Serverless Framework e o plugin `serverless-offline` para simular localmente uma API Gateway da AWS. Também pode ser iniciada em um contêiner Docker.

> **Importante:** a execução descrita aqui é local e simulada. Ela não publica recursos na AWS nem exige credenciais AWS. Não execute `serverless deploy` se a intenção for permanecer apenas no ambiente local.

## O que a API faz

A rota `GET /dev/metrics` chama a função `hello`, implementada em `handler.js`. O prefixo `/dev` é o stage definido em `serverless.yml`. Ela responde com status HTTP `200` e um JSON que contém:

- uma mensagem de sucesso;
- o horário em formato ISO e horário local;
- o valor de `AWS_REGION`, se definido, ou uma indicação de localhost;
- a indicação de que o ambiente está simulado/offline.

Os dados são ilustrativos; a função não coleta métricas reais.

## Requisitos

Para executar diretamente na máquina:

- Node.js 20 ou superior;
- npm.

Para executar em contêiner:

- Docker Desktop (ou Docker Engine) iniciado;
- Docker Compose v2, incluído nas versões atuais do Docker Desktop.

## Executar localmente, sem Docker

Abra um terminal nesta pasta e instale as dependências a partir do lockfile:

```sh
npm ci
```

Inicie o Serverless Offline:

```sh
npm start
```

Quando o servidor estiver pronto, acesse <http://localhost:3000/dev/metrics> ou faça uma requisição GET para esse endereço. Para encerrar, pressione `Ctrl+C` no terminal.

## Executar com Docker

Com o Docker iniciado, abra um terminal nesta pasta e execute:

```sh
npm run docker
```

Esse script executa `docker compose up --build`: monta a imagem, inicia o contêiner e publica a porta `3000` do contêiner na porta `3000` da máquina. Acesse a mesma URL: <http://localhost:3000/dev/metrics>. Para parar, pressione `Ctrl+C`; depois, se necessário, remova o contêiner com `docker compose down`.

## Scripts npm

| Script | Finalidade |
| --- | --- |
| `npm start` | Executa a API localmente com `serverless-offline`. |
| `npm run docker` | Constrói a imagem e executa a API com Docker Compose. |
| `npm test` | Ainda não há testes configurados; o comando atual é apenas um placeholder. |

## Arquivos principais

- `handler.js`: função que monta a resposta JSON.
- `serverless.yml`: configura o Serverless Framework, o runtime Node.js 20, a rota HTTP e o plugin offline.
- `package.json` / `package-lock.json`: dependências e scripts npm.
- `Dockerfile`: imagem Node.js e comando de inicialização do servidor offline.
- `docker-compose.yml`: serviço local e mapeamento da porta `3000`.
- `.dockerignore`: arquivos que não precisam ser enviados ao contexto de build do Docker.
