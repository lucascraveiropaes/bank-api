# Account Route List

## Routes
|       Rota      | Método |     Descrição              |
|-----------------|--------|----------------------------|
| /account/balance | GET   | [Account Balance](#account-balance) |
| /account/transfer | POST | [Account Transfer](#account-transfer) |
| /account/history | GET | [Account History](#account-history) |


**Obs.:** All routes after login **MUST** have the "x-auth-token" header con requests. The token is provided after the user login.

-----------------------------------------------------

### Account Balance

```
GET /account/balance
```

**Params**

* **account_id:** Account ID provided on login

**Example**

```
GET /account/balance?account_id=9780865-1
```

**Response**

```json
{
    "status": true,
    "accountExists": true,
    "balance": 480
}
```

-----------------------------------------------------

### Account Transfer

```
POST /account/transfer
```

**Body**

```json
{
	"source_account_id": "9780865-1",
	"destination_account_id": "7118258-1",
	"amount": 25.50
}
```

**Response**

```json
{
    "status": true,
    "balance": 480,
    "tranfer": {
        "status": true,
        "message": "Transferência realizada com sucesso",
        "id": 11,
        "user_id": 15,
        "action": "transfer-out",
        "value": 4.14,
        "updatedAt": "2019-12-01T18:04:53.847Z",
        "createdAt": "2019-12-01T18:04:53.847Z"
    }
}
```

-----------------------------------------------------

### Account History

```
GET /account/history
```

**Response**

```json
{
    "status": true,
    "history": [{
        "id": 11,
        "user_id": 15,
        "action": "transfer-out",
        "value": 4.14,
        "createdAt": "2019-12-01T18:04:53.847Z",
        "updatedAt": "2019-12-01T18:04:53.847Z"
    }, {
        "id": 9,
        "user_id": 15,
        "action": "transfer-out",
        "value": 15.86,
        "createdAt": "2019-12-01T18:04:21.590Z",
        "updatedAt": "2019-12-01T18:04:21.590Z"
    }]
}
```
