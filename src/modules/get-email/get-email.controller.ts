import { GetEmailUseCase } from "./get-email.useCase";
import { Request, Response} from 'express'

export class GetEmailConntroller {
    constructor(){}

    async handler (request: Request, response: Response) {
        const useCase = new GetEmailUseCase();

        try
        {
            const result = await useCase.execute(request.body);
            
            return response.json(result)
        }
        catch(err){
            return response.status(400).json(JSON.stringify(err))
        }
    }
}