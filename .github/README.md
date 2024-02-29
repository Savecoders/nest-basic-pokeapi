<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
 
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
 pnpm install
```

## Up docker Mongo

```bash
  docker-compose up -d
```

## Clone `.env.template` and rename to `.env`

```bash
  mv .env.template .env
```

## Write the .envs

```bash
MONGODB=
PORT=
DEFAULT_LIMIT=
```

## Running the app

```bash
# development
 pnpm run start

# watch mode
 pnpm run start:dev

# production mode
 pnpm run start:prod
```

## Execute Seeds

```bash
  http://localhost:3000/api/v1/seed
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Temas de la seccion 7

Temas puntuales de la sección
Esta sección enteramente se enfoca en la grabación a base de datos, pero puntualmente:

- Validaciones

- CRUD contra base de datos

- Docker y Docker Compose

- Conectar contenedor con filesystem (para mantener la data de la base de datos)

- Schemas

- Modelos

- DTOs y sus extensiones

- Respaldar a Github

## Temas puntuales de la sección 8

Esta sección tiene por objetivo aprender:

- Uso de modelos en diferentes módulos

- SEED para llenar la base de datos

- Paginación de resultados

- DTOs para Query parameters

- Transformaciones de DTOs

- Inserciones por lote y varias formas de lograrlo.

## Temas puntuales de la sección 9

En esta sección trabajaremos en la configuración de variables de entorno y su validación:

Puntualmente veremos:

- Dockerizacion

- Mongo Atlas

- Env file

- joi

- Validation Schemas

- Configuration Module

- Recomendaciones para un Readme útil

- Despliegues

- Dockerfile
