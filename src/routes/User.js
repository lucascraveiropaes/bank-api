import express from "express";
import user    from "controllers/user";
import "express-group-routes";

const router = express.Router();

router.group("/users", (router) => {
    router.post("/login", user.login);
    router.post("/new-account", user.newAccount);
});


module.exports = router;
