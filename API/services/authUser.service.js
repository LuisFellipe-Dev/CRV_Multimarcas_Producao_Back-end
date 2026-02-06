import { PrismaClient } from '../generated/prisma/client.js';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
export const authUserService = {
    async get(authHeader) {
        const token = authHeader?.split(' ')[1];
        if (!token)
            return { message: 'Acesso não autorizado' };
        if (!ACCESS_TOKEN_KEY)
            return { error: 'Erro ao configurar o token' };
        jwt.verify(token, ACCESS_TOKEN_KEY, (err, User) => {
            if (err)
                return { message: 'Acesso não autorizado' };
            return { message: 'Acesso autorizado' };
        });
    },
    async post(data) {
        const { User, Password } = data;
        const users = await prisma.user.findMany();
        const Auth = users.find(user => user.User === User && user.Password === Password);
        if (!Auth) {
            return { message: 'Usuário ou Senha incorreto' };
        }
        if (!ACCESS_TOKEN_KEY) {
            return { error: 'Erro ao configurar o token' };
        }
        const token = jwt.sign({ User }, ACCESS_TOKEN_KEY, {
            expiresIn: '3h'
        });
        return { token };
    }
};
//# sourceMappingURL=authUser.service.js.map