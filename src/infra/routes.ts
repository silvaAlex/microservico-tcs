import { Router } from 'express';
import { GetEmailConntroller } from '../modules/get-email/get-email.controller';
import { GetInfoDocumentConntroller } from '../modules/get-document/get-document.controller';

const router = Router();

router.post('/getDocuments', (request, response) => {
    new GetEmailConntroller().handler(request, response);
})

router.get('/getInfoDocument/:filename', (request, response) => {
    new GetInfoDocumentConntroller().handler(request,response)
})

export {router}