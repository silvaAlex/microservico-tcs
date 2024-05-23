import { prismaClient } from '../../../prisma/prismaClient'

interface IDocumentInfo {
    date: Date,
    filename: string,
    contentFile: string,
    createdAt?: Date
}

export class DocumentInfoRepository {
    async register(documentInfo: IDocumentInfo) {
        const document = await prismaClient.documentInfo.findFirst({
            where: {
                filename: documentInfo.filename
            }
        })

        if(document) throw new Error('DocumentInfo already exists');


        await prismaClient.documentInfo.create({
            data: {
                ...documentInfo
            }
        })
    }

    async getInfoDocument(filename: string) {
        const document = await prismaClient.documentInfo.findFirst({
            where: {
                filename
            }
        })

        return document;
    }
}