import { DocumentInfoRepository } from "../../infra/repository/document-info.repository";
import { Utils } from "../../utils";

export class GetInfoDocumentUseCase {
    constructor() { }

    async execute(filename: string) {
        const documentInfoRepository = new DocumentInfoRepository();

        const document = await documentInfoRepository.getInfoDocument(filename);

        if (document) {
            const result = await Utils.parseXml(document?.contentFile)

            const infNFe = result['nfeProc']['NFe']['infNFe']

            const documentInfo = {
                numeroNota: this.getValue(infNFe['ide']['cNF']),
                cnpjEmitente: this.getValue(infNFe['emit']['CNPJ']),
                nomeEmitente: this.getValue(infNFe['emit']['xNome']),
                cnpjDestinatario: this.getValue(infNFe['dest']['CNPJ']),
                nomeDestinatario: this.getValue(infNFe['dest']['xNome']),
                descricaoProduto: this.getValue(infNFe['det']['prod']['xProd']),
                pesoProduto: this.getValue(infNFe['det']['prod']['qCom'])
            }

            return documentInfo;
        }
    }

    private getValue(data: any) {
        if (data)
            return data['_text']
        return ''
    }
}