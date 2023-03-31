# Visibility API

## Comandos
- $ npx init

## Objetivo

**API REST** que fornece informações para uma aplicação **Android**. A aplicação tem o intuíto de por meio de um sistema de mapas, realizar a classificação de locais de acordo com as suas características de acessibilidade e identificação de vagas para deficientes. O aplicativo ainda conta com um sistema de gamificação com o recurso de pontos, níveis, placar de líderes e conquistas.

## Execução do projeto

- Preencher o .env com base no .env.example
- Executar comandos abaixo

### Instalação de dependências
$ npm install 

### Criação das tabelas
$ npm migrate

### Adição dos dados base
$ npm seed

### Executar a api
$ npm start

## Público Alvo

Aplicação destinada a pessoas com dificuldade de locomoção, em especial portadores de necessidades especiais.

## Tecnologias

- Node.js
- PostgreSQL
- PostGIS
