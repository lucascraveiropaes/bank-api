import { User } from "models";

export function validateUserLogin(data) {
    return !(
        typeof data.login !== "string" &&
        data.login.length === 0 &&
        typeof data.password !== "string" &&
        data.password.length === 0
    );
}

export async function updateToken(token, id) {
    try {
        const updateStatus = await User.update({ token }, {
            where: { id }
        });

        return !!updateStatus;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export function getUserData(user, extraInfo = {}) {
    let u = user.get({ plain: true });

    delete u.password;

    return Object.assign({}, u, extraInfo);
}

export function validateUserNewAccount(data) {
    const fields = ["name", "email", "password", "cpf"];
    let count = 0;

    for (let property in data)
        if (data.hasOwnProperty(property) && fields.includes(property))
            count++;

    return count === fields.length;
}
