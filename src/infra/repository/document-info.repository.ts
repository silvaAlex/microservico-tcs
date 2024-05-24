import { prismaClient } from '../../../prisma/prismaClient'

interface IDocumentInfo {
    date?: Date | null,
    filename: string,
    contentFile: string,
}

export class DocumentInfoRepository {
    async register(documentInfo: IDocumentInfo) {

        const document = await this.getInfoDocument(documentInfo.filename);

        if(document)
            return

        if (documentInfo.date === null || documentInfo.date === undefined)
            return;

        if (!documentInfo.filename || documentInfo.filename.length === 0)
            return;

        await prismaClient.documentInfo.create({
            data: {
                date: documentInfo.date,
                filename: documentInfo.filename,
                contentFile: documentInfo.contentFile,
            }
        })
    }

    async getInfoDocument(filename: string) {
        
        try {
            const document = await prismaClient.documentInfo.findFirst({
                where: {
                    filename
                }
            })
    
            return document;
        } catch (error) {
           return null 
        }
       
    }
}