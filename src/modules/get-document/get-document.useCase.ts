import { DocumentInfoRepository } from "../../infra/repository/document-info.repository";



export class GetInfoDocumentUseCase {
    constructor() { }

    async execute(filename: string) {
        const documentInfoRepository = new DocumentInfoRepository();

        const document = documentInfoRepository.getInfoDocument(filename);

        return document;
    }
}