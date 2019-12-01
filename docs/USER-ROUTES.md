# User Route List

## Routes
|       Rota      | Método |     Descrição              |
|-----------------|--------|----------------------------|
| /               | GET    | [API Home Route](#home)       |
| /users/login    | POST   | [Login](#login)            |

-----------------------------------------------------

### Home

```
GET /
```

**Response**

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

**Response**

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
