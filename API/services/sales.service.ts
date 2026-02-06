import { PrismaClient } from '../generated/prisma/client.js'

const prisma = new PrismaClient()

interface filterSales{
    CustomerId?: string
    ItemId?: string
    Type?: string
    Date?: string
}

interface data{
    CustomerId: string
    ItemId: string
    Value: string
    Type: string
    Date: string
}

export const salesService = {
    async get(filters: filterSales){
        const {CustomerId, ItemId, Type, Date} = filters

        return await prisma.sale.findMany({
            where:{
                CustomerId: CustomerId ? CustomerId : undefined,
                ItemId: ItemId ? {contains: ItemId, mode:'insensitive'} : undefined,
                Type: Type ? Type : undefined,
                Date: Date ? {contains: Date, mode:'insensitive'} : undefined
            }as any,
            include:{
                Customer: true,
                Item: true
            }
        })
    },
    async post(data: data){
        const {CustomerId, ItemId, Value, Type, Date} = data

        const customer = await prisma.customer.findUnique({
            where: {id: CustomerId}
        })

        if(Type === 'Fiado'){
            const response = await prisma.sale.create({
                data:{
                    Customer: {
                        connect: { id: String(CustomerId) } 
                    },
                    Item: {
                        connect: { id: String(ItemId) }
                    },
                    Value: parseFloat(Value),
                    Type: String(Type),
                    Date: String(Date)
                }
            })
        }else{
            const cashflow = await prisma.cashflow.create({
                data:{
                    Description: String(customer?.Name),
                    Value: parseFloat(Value),
                    Operation: 'Entrada',
                    Type: String(Type),
                    Date: String(Date)
                }
            })

            const response = await prisma.sale.create({
                data:{
                    Customer: {
                        connect: { id: String(CustomerId) } 
                    },
                    Item: {
                        connect: { id: String(ItemId) }
                    },
                    Cashflow:{
                        connect: { id: String(cashflow.id)}
                    },
                    Value: parseFloat(Value),
                    Type: String(Type),
                    Date: String(Date)
                }
            })
        }

        await prisma.item.update({
            where: {id: ItemId},
            data:{
                Status: 'Vendido'
            }
        })

        if(Type.toString() === 'Fiado'){
            const aux = await prisma.customer.findUnique({where:{id: CustomerId} as any})
            if(aux?.id === 'N/A')
                return {message: 'Cliente: Não identificado'}

            return await prisma.customer.update({
                where:{id: CustomerId} as any, 
                data:{Debt: Number(aux?.Debt) + Number(Value)}
            })
        }else if(Type.toString() === 'Conta'){
            const aux = await prisma.account.findFirst({
                orderBy:[{Month: 'desc'}, {Year: 'desc'}]
            })
            return await prisma.account.update({
                where:{id: aux?.id} as any, 
                data:{Bank: Number(aux?.Bank) + Number(Value)}
            })
        }else{
            const aux = await prisma.account.findFirst({
                orderBy:[{Month: 'desc'}, {Year: 'desc'}]
            })
            return await prisma.account.update({
                where:{id: aux?.id} as any, 
                data:{Cash: Number(aux?.Cash) + Number(Value)}
            })
        }
    },
    async delete(id: string){
        const sale = await prisma.sale.findUnique({
            where: {id}
        })
        if(!sale)
            return {message: 'Erro ao deletar venda'}
        if(sale?.CashflowId)
            await prisma.cashflow.delete({
                where:{id: sale.CashflowId}
            })

        await prisma.item.update({
            where:{id: String(sale?.ItemId)},
            data:{
                Status: 'Ativo'
            }
        })

        if(sale?.Type.toString() === 'Fiado'){
            const aux = await prisma.customer.findUnique({where:{id: sale.CustomerId} as any})
            await prisma.customer.update({
                where:{id: sale.CustomerId} as any, 
                data:{Debt: Number(aux?.Debt) - Number(sale.Value)}
            })
        }else if(sale?.Type.toString() === 'Conta'){
            const aux = await prisma.account.findFirst({
                orderBy:[{Month: 'desc'}, {Year: 'desc'}]
            })
            await prisma.account.update({
                where:{id: aux?.id} as any, 
                data:{Bank: Number(aux?.Bank) - Number(sale.Value)}
            })
        }else{
            const aux = await prisma.account.findFirst({
                orderBy:[{Month: 'desc'}, {Year: 'desc'}]
            })
            await prisma.account.update({
                where:{id: aux?.id} as any, 
                data:{Cash: Number(aux?.Cash) - Number(sale?.Value)}
            })
        }
        return await prisma.sale.delete({
            where:{id}
        })
    }
}