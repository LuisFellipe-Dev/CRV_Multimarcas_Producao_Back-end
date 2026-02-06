import { PrismaClient } from '../generated/prisma/client.js'

const prisma = new PrismaClient()

export const accountService = {
    async get(){
        const date = new Date()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const response = await prisma.account.findMany()

        const account = await prisma.account.findUnique({
            where: {
                Month_Year: {
                    Month: month,
                    Year: year
                }
            }
        });
        if(account)
            return response

        const lastAccount = await prisma.account.findFirst({
            orderBy: [
                { Year: 'desc' },
                { Month: 'desc' }
            ]
        });

        if(lastAccount){
            await prisma.account.create({
                data:{
                    Bank: lastAccount.Bank,
                    Cash: lastAccount.Cash,
                    Month: month,
                    Year: year
                }
            })
        }
        return response
    }
}