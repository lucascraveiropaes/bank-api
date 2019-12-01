import { User } from "models";

const whitelist = ["/", "/users/login", "/users/new-account"];
const invalidAccessResponse = {
    status: false,
    message: "Acesso não permitido"
}

async function AuthMiddleware(req, res, next) {
    if (whitelist.includes(req.originalUrl))
        return next();

    if (typeof req.headers["x-auth-token"] === "undefined")
        return res.status(403).send(invalidAccessResponse);

    const token = req.headers["x-auth-token"];

    const user = await User.findOne({
        where: { token }
    });

    if (user === null)
        return res.status(403).send(invalidAccessResponse);
        
    req.midd = { user };

    return next();
}

export default AuthMiddleware;
