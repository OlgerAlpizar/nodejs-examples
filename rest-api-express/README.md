# JS Rest API
This project is a basic REST API which contains a CRUD for users

## Tech Stack
* [![Typescript][Typescript]][Typescript-url]
* [![Pnpm][Pnpm]][Pnpm-url]
* [![Mongo][Mongo]][Mongo-url]
* [![Express][Express]][Express-url]
* [![Node][Node]][Node-url]
* [![Eslint][Eslint]][Eslint-url]
* [![Prettier][Prettier]][Prettier-url]

# Getting Started
* Install the project with 'pnpm i'
* Run the backend with 'pnpm dev' or debug with your favorite IDE
  - Will be running on port: 4001 

## Prerequisites

Have installed:
  * Node, npm, pnpm @latest
  * Have configured your own MongoDb and change the connection string on:
    * Backend -> .env

## How to connect to mongoDB local DB (docker based) ALl the following steps are for MAC OS

### Install MongoDB Client Tools
* Install Homebrew (if not already installed): /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

* Install MongoDB Client Tools:
    - brew tap mongodb/brew
    - brew install mongodb-database-tools

* Connect to MongoDB Using mongosh (Install mongosh if not already installed):
    - brew install mongosh
    - mongosh 'mongodb://olgerLabsUser:olgerLabsPass@localhost:27017/user-admin?authSource=admin'

* Run local initial data
    - Make sure you have installed mongoose globally (npm i -g mongoose)
    - Run the script on <root>/scripts/initial-data-local.ts

[Mongo]: https://img.shields.io/badge/Mongo-20232A?style=for-the-badge&logo=mongodb&logoColor=#47A248
[Mongo-url]:https://www.mongodb.com/
[Express]:https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=#000000
[Express-url]: https://expressjs.com/
[Node]:https://img.shields.io/badge/Node-20232A?style=for-the-badge&logo=nodedotjs&logoColor=#339933
[Node-url]: https://nodejs.org/
[Eslint]:https://img.shields.io/badge/Eslint-20232A?style=for-the-badge&logo=eslint&logoColor=#4B32C3
[Eslint-url]: https://eslint.org/
[Prettier]:https://img.shields.io/badge/Prettier-20232A?style=for-the-badge&logo=prettier&logoColor=#F7B93E
[Prettier-url]:https://prettier.io/
[Typescript]:https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=tsnode&logoColor=#3178C6
[Typescript-url]: https://www.typescriptlang.org/
[Pnpm]:https://img.shields.io/badge/PNPM-20232A?style=for-the-badge&logo=pnpm&logoColor=#F69220
[Pnpm-url]: https://pnpm.io/