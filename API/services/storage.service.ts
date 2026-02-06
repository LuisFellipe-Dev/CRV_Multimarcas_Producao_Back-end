import { PrismaClient } from '../generated/prisma/client.js'

const prisma = new PrismaClient()

interface filterStorage{
    Brand?: string
    Model?: string
    Size?: string
    Description?: string
}
interface data{
    Brand: string
    Model: string
    Size: string
    Description: string
}

export const storageService = {
    async get(filters: filterStorage){
        const {Brand, Model, Size, Description} = filters

        return await prisma.item.findMany({
            where: {
                Brand: Brand ? Brand : undefined,
                Model: Model ? {contains: Model, mode: 'insensitive'} : undefined,
                Size: Size ? Size : undefined,
                Description: Description ? {contains: Description, mode: 'insensitive'} : undefined,
                Status: 'Ativo'
            } as any
        })
    },
    async post(data: data){
        return await prisma.item.create({
            data: {
                ...data,
                Status: 'Ativo',
            },
        })
    },
    async delete(id: string){
        return await prisma.item.delete({
            where: { id },
        })
    }
}