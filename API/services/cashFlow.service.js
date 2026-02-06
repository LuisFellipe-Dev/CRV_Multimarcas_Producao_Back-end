import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();
export const cashFlowService = {
    async get(filters) {
        const { Description, Value, Operation, Type, Date } = filters;
        return await prisma.cashflow.findMany({
            where: {
                Description: Description ? { contains: Description, mode: 'insensitive' } : undefined,
                Value: Value ? parseFloat(Value) : undefined,
                Operation: Operation ? String(Operation) : undefined,
                Type: Type ? String(Type) : undefined,
                Date: Date ? { contains: Date, mode: 'insensitive' } : undefined
            }
        });
    },
    async post(data) {
        const { Description, Value, Operation, Type, Date } = data;
        const response = await prisma.cashflow.create({
            data: {
                Description: String(Description),
                Value: parseFloat(Value),
                Operation: String(Operation),
                Type: String(Type),
                Date: String(Date)
            }
        });
        const account = await prisma.account.findFirst({
            orderBy: [
                { Month: 'desc' },
                { Year: 'desc' }
            ]
        });
        if (!account)
            return { message: 'Erro ao criar operação' };
        if (response.Operation === 'Entrada') {
            if (response.Type === 'Conta') {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Bank + response.Value
                    }
                });
            }
            else {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Cash + response.Value
                    }
                });
            }
        }
        else {
            if (response.Type === 'Conta') {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Bank - response.Value
                    }
                });
            }
            else {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Cash - response.Value
                    }
                });
            }
        }
        if (response.Description !== 'Outros') {
            const customer = await prisma.customer.findFirst({
                where: { Name: response.Description }
            });
            if (customer) {
                await prisma.customer.update({
                    where: { id: customer.id },
                    data: { Debt: customer.Debt - response.Value }
                });
            }
            else {
                return { message: 'Erro ao criar operação' };
            }
        }
        return response;
    },
    async put(id, data) {
        return await prisma.cashflow.update({
            where: { id },
            data: data
        });
    },
    async delete(id) {
        const response = await prisma.cashflow.findUnique({
            where: { id }
        });
        const account = await prisma.account.findFirst({
            orderBy: [
                { Month: 'desc' },
                { Year: 'desc' }
            ]
        });
        if (!account || !response)
            return { message: 'Erro ao deletar operação' };
        const sale = await prisma.sale.findFirst({
            where: { CashflowId: String(response?.id) }
        });
        if (sale)
            await prisma.sale.delete({
                where: { id: sale.id }
            });
        if (response.Operation === 'Entrada') {
            if (response.Type === 'Conta') {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Bank - response.Value
                    }
                });
            }
            else {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Cash - response.Value
                    }
                });
            }
        }
        else {
            if (response.Type === 'Conta') {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Bank + response.Value
                    }
                });
            }
            else {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        Bank: account.Cash + response.Value
                    }
                });
            }
        }
        return await prisma.cashflow.delete({
            where: { id }
        });
    }
};
//# sourceMappingURL=cashFlow.service.js.map