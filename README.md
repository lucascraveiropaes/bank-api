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

## Endpoints Documentation

* [User Routes](/docs/USER-ROUTES.md)
* [Account Routes](/docs/ACCOUNT-ROUTES.md)
