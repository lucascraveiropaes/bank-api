import { User, History } from "models";
import Errors            from "enums/Errors";
import * as UserUtils    from "utils/User";

class AccountController {
    async transfer(req, res) {
        try {
            const { user } = req.midd;
            const { source_account_id, destination_account_id } = req.body;
            const amount = parseFloat(req.body.amount);

            // Caso a conta informada seja diferente do usuário loggado, retorna um erro
            if (user.account !== source_account_id)
                return res.status(400).send(Errors["DATA"]);

            // Caso o saldo seja menor do que o valor solicitado na tranferência, retorna um erro
            if (user.balance < amount) {
                return res.status(400).send({
                    status: true,
                    tranfer: {
                        status: false,
                        reason: "Saldo Insuficiente",
                    }
                });
            }

            // Busca os dados do usuário que irá receber a transferência
            const destinyUser = await User.findOne({
                where: {
                    account: destination_account_id
                }
            });

            // Caso o usuário não exista, retorna um erro
            if (!destinyUser) {
                return res.status(400).send({
                    status: true,
                    tranfer: {
                        status: false,
                        reason: "Usuário de Destino Inexistente",
                    }
                });
            }

            // Atualiza o saldo do usuário que está fazendo a transferência
            await User.update({
                balance: user.balance - amount,
            }, {
                where: {
                    account: source_account_id,
                }
            });
            // Adicionando transação no histórico do usuário que fez a transferência
            const history = await History.create({
                user_id: user.id,
                action: "transfer-out",
                value: amount,
            });

            // Atualiza o saldo do usuário que está recebendo a transferência
            await User.update({
                balance: destinyUser.balance + amount,
            }, {
                where: {
                    account: destination_account_id,
                }
            });
            // Adicionando transação no histórico do usuário que recebeu a transferência
            await History.create({
                user_id: destinyUser.id,
                action: "transfer-in",
                value: amount,
            });

            return res.status(200).send({
                status: true,
                balance: user.balance - amount,
                tranfer: Object.assign({}, history.get({ plain: true }), {
                    status: true,
                    message: "Transferência realizada com sucesso",
                })
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send(Errors["500"]);
        }
    }

    async balance(req, res) {
        try {
            const { account_id } = req.query;

            const user = await User.findOne({
                where: {
                    account: account_id
                }
            });

            if (user === null)
                return res.status(400).send({ status: true, accountExists: false });

            return res.status(200).send({
                status: true,
                accountExists: true,
                balance: user.balance
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send(Errors["500"]);
        }
    }

    async history(req, res) {
        try {
            const { user } = req.midd;

            const history = await History.findAll({
                order: [["createdAt", "DESC"]],
                where: {
                    user_id: user.id
                }
            });

            if (!history)
                return res.status(500).send(Errors["500"]);

            return res.status(200).send({ status: true, history: history });
        } catch (e) {
            console.log(e);
            return res.status(500).send(Errors["500"]);
        }
    }
}

export default new AccountController();
