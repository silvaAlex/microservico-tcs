import { Router } from 'express';
import { GetEmailConntroller } from '../modules/get-email/get-email.controller';

const router = Router();

router.post('/getDocuments', (request, response) => {
    new GetEmailConntroller().handler(request, response);
})

export {router}