import { User }          from "models";
import Errors            from "enums/Errors";
import * as UserUtils    from "utils/User";
import * as GeneralUtils from "utils/General";

class UserController {
    async login(req, res) {
        try {
            let data = req.body;

            if (UserUtils.validateUserLogin(data) === false)
                return res.status(400).send(Errors["DATA"]);

            let user = await User.findOne({
                where: {
                    cpf: data.login,
                    password: data.password
                }
            });

            if (user === null)
                return res.status(400).send(Errors["DATA"]);

            const token = GeneralUtils.generateToken();
            const result = await UserUtils.updateToken(token, user.id);

            if (!result)
                return res.status(500).send(Errors["500"]);

            return res.status(200).send({
                status: true,
                user: UserUtils.getUserData(user, { token })
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send(Errors["500"]);
        }
    }

    async newAccount(req, res) {
        try {
            let data = req.body;

            if (UserUtils.validateUserNewAccount(data) === false)
                return res.status(400).send(Errors["DATA"]);

            const user = await User.create(Object.assign({}, data, {
                id: null,
                account: await GeneralUtils.generateNewAccountNumber(),
                agency: "0001",
                balance: 500,
            }));

            if (user === null)
                return res.status(500).send(Errors["500"]);

            const token = GeneralUtils.generateToken();
            const result = await UserUtils.updateToken(token, user.id);

            if (!result)
                return res.status(500).send(Errors["500"]);

            return res.status(200).send({
                status: true,
                user: UserUtils.getUserData(user, { token })
            });
        } catch (e) {
            console.log(e); 
            if (e.name !== "SequelizeUniqueConstraintError")
                return res.status(500).send(Errors["500"]);

            return res.status(500).send({
                status: false,
                message: `O campo ${e.errors[0].path} já está registrado`
            });
        }
    }
}

export default new UserController();
