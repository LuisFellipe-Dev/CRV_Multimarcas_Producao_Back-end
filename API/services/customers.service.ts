import { PrismaClient } from '../generated/prisma/client.js'

const prisma = new PrismaClient()

interface filtersCustomers{
    Name?: string
    Contact?: string
    Debt?: string
}

interface data{
    Name: string
    Contact: string
    Debt: string
}

export const customersService = {
    async get(filters: filtersCustomers){
        const {Name, Contact, Debt} = filters

        return await prisma.customer.findMany({
            where: {
                Name: Name ? {contains: Name, mode:'insensitive'} : undefined,
                Contact: Contact ? {contains: Contact, mode:'insensitive'} : undefined,
                Debt: Debt ? {contains: Debt, mode:'insensitive'} : undefined,
                Status: 'Ativo'
            }as any
        })
    },
    async post(data: data){
        const {Name, Contact, Debt} = data

        return await prisma.customer.create({
            data:{
                Name: String(Name),
                Contact: String(Contact),
                Debt: Debt ? parseFloat(Debt) : 0.00,
                Status: 'Ativo'
            }
        })
    },
    async put(id: string, newData: Object){
        return await prisma.customer.update({
            where:{id},
            data: newData
        })
    },
    async disable(id: string){
        return await prisma.customer.update({
            where: { id },
            data:{
                Status: 'Inativo'
            }
        })
    }
}