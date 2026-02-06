import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();
export const storageService = {
    async get(filters) {
        const { Brand, Model, Size, Description } = filters;
        return await prisma.item.findMany({
            where: {
                Brand: Brand ? Brand : undefined,
                Model: Model ? { contains: Model, mode: 'insensitive' } : undefined,
                Size: Size ? Size : undefined,
                Description: Description ? { contains: Description, mode: 'insensitive' } : undefined,
                Status: 'Ativo'
            }
        });
    },
    async post(data) {
        return await prisma.item.create({
            data: {
                ...data,
                Status: 'Ativo',
            },
        });
    },
    async delete(id) {
        return await prisma.item.delete({
            where: { id },
        });
    }
};
//# sourceMappingURL=storage.service.js.map