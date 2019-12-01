import express          from "express";
import userController   from "controllers/UserController";
import "express-group-routes";

const router = express.Router();

router.group("/users", (router) => {
    router.post("/login", userController.login);
    router.post("/new-account", userController.newAccount);
});


module.exports = router;
