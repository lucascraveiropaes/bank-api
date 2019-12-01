# Bank API

Bank API developed with Express and Sequelize.

## Download and installation

Download the project:

```git
git clone https://github.com/lucascraveiropaes/bank-api.git
```

Install all dependencies:

```bash
npm install
```

Run the most recent migration to create and update the database (explanation below).  
**Note:** The database must be created before performing the migration, and the name must be **bank-api**.

Finally, start the server:

```bash
npm run dev
```

## Principais Dependências

* [Sequelize](https://sequelize.org)
* [Express](https://expressjs.com)
* [Nodemailer](https://nodemailer.com/about)
* [Mysql2](https://github.com/sidorares/node-mysql2)

## Migrations

Migrations are used to create database changes through scripts, not manual changes. The library used is the own [sequelize migration](https://sequelize.org/master/manual/migrations.html).

**Create a migration**

```bash
npx sequelize migration:create --name=<nome-do-script>
```

Within the file created in the ```src/migrations``` folder, add the code for the required changes:

```js
'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Users");
    }
};

```

**Execute migration**

```bash
npx sequelize db:migrate
```

**Undo the last migration**
```
npx sequelize-cli db:migrate:undo
```

## Routes User

|       Rota      | Método |     Descrição              |
|-----------------|--------|----------------------------|
| /               | GET    | [Home da API](#home)       |
| /users/login    | POST   | [Login](#login)            |

-----------------------------------------------------

### Home

```
GET /
```

**Resposta**

```
Bank API - v0.1
```

-----------------------------------------------------

### Login

```
POST /users/login
```

**Body**

**Obs.:** The password must be sent using hash512.

```json
{
	"login": "111.111.111-11",
	"password": "somepassword"
}
```

**Resposta**

```json
{
    "status": true,
    "user": {
        "name": "Lucas Craveiro Paes",
        "cpf": "111.111.111-11",
        "email": "lucascraveiropaes@gmail.com",
        "id": 15,
        "account": "9780865-1",
        "agency": "0001",
        "balance": 500,
        "updatedAt": "2019-12-01T15:55:18.632Z",
        "createdAt": "2019-12-01T15:55:18.632Z",
        "token": ")xUQR4EWNo...DaMN8R2"
    }
}
```
