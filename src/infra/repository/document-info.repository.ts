interface IDocumentInfo {
    date: Date,
    filename: string,
    contentFile: string,
    createdAt?: Date
}

export class DocumentInfoRepository {
    async register(documentInfo: IDocumentInfo) {

    }
}