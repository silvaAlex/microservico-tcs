import { Request, Response} from 'express'
import { GetInfoDocumentUseCase } from './get-document.useCase';


export class GetInfoDocumentConntroller {
    constructor(){}

    async handler (request: Request, response: Response) {
        const useCase = new GetInfoDocumentUseCase();

        try
        {
            const { params } = request;
            const result = await useCase.execute(params.filename);

            if(!result)
                return response.status(404).json(`document with filename: ${params.filename} not found`)
            
            return response.json(result)
        }
        catch(err){
            return response.status(400).json(JSON.stringify(err))
        }
    }
}