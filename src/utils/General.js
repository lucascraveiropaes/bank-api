import { User } from "models";

export function generateToken(size = 190) {
    let token = "";
    let codeAlphabet  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        codeAlphabet += "abcdefghijklmnopqrstuvwxyz";
        codeAlphabet += "0123456789";
        codeAlphabet += "*!@$()";

    for (let i = 0; i < size; i++)
        token += codeAlphabet[parseInt(Math.random() * codeAlphabet.length)];

    return token;
}

export async function generateNewAccountNumber() {
    let number = Math.round(Math.random() * 10000000);
    let digit = Math.round(Math.random() * 10);

    if (number < 1 || digit < 1)
        return generateNewAccountNumber();

    number = ("0000000" + number).slice(-7);

    const account = `${number}-${digit}`;

    const user = await User.findOne({ where: { account } });

    if (user)
        return generateNewAccountNumber();

    return account;
}
