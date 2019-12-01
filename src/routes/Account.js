import express from "express";
import account from "controllers/account";
import "express-group-routes";

const router = express.Router();

router.group("/account", (router) => {
    router.post("/transfer", account.transfer);
    router.get("/balance", account.balance);
    router.get("/history", account.history);
});

module.exports = router;
