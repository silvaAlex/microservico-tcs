import express, { urlencoded } from 'express';
import { router } from './infra/routes';

const PORT = process.env.PORT ?? 3001;

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

app.use(urlencoded({extended: true}))
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server client is running on PORT ${PORT}`));