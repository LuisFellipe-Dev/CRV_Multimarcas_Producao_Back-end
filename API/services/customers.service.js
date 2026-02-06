import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();
export const customersService = {
    async get(filters) {
        const { Name, Contact, Debt } = filters;
        return await prisma.customer.findMany({
            where: {
                Name: Name ? { contains: Name, mode: 'insensitive' } : undefined,
                Contact: Contact ? { contains: Contact, mode: 'insensitive' } : undefined,
                Debt: Debt ? { contains: Debt, mode: 'insensitive' } : undefined,
                Status: 'Ativo'
            }
        });
    },
    async post(data) {
        const { Name, Contact, Debt } = data;
        return await prisma.customer.create({
            data: {
                Name: String(Name),
                Contact: String(Contact),
                Debt: Debt ? parseFloat(Debt) : 0.00,
                Status: 'Ativo'
            }
        });
    },
    async put(id, newData) {
        return await prisma.customer.update({
            where: { id },
            data: newData
        });
    },
    async disable(id) {
        return await prisma.customer.update({
            where: { id },
            data: {
                Status: 'Inativo'
            }
        });
    }
};
//# sourceMappingURL=customers.service.js.map