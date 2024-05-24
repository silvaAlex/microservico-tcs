# Microservico para empresa TCS


## Requisistos

- [x] O microserviço deverá ser executado em um container. Caso ocorra crashs na
execução do container, o mesmo deverá ser reinicializado automaticamente;
- [x] Deverá existir uma rota `/getDocuments` com o tipo POST que receberá como 
payload as seguintes informações:
- `Request`
```json
{
    "email": "",
    "password": "",
    "host": "",
    "port": ""
}
```

- `Response`
```json
[
	{
		"date": "2024-05-21T13:35:13.000Z",
		"filename": "NFe_002819_31240529269260000572550010000028191000824350.xml",
		"contentFile": "<?xml version=\"1.0\" encoding=\"utf-8\" ?><...>"
	},
	{
		"date": "2024-05-21T13:35:13.000Z",
		"filename": "NFe_002819_31240529269260000572550010000028191000824351.xml",
		"contentFile": "<?xml version=\"1.0\" encoding=\"utf-8\" ?><...>"
	},
	{
		"date": "2024-05-21T13:40:33.000Z",
		"filename": "NFe_002819_31240529269260000572550010000028191000824352.xml",
		"contentFile": "<?xml version=\"1.0\" encoding=\"utf-8\" ?><...>"
	}
]
```


## Extra
- [x] Salvar o mesmo body retornado pela rota `/getDocuments` em um banco de 
dados NoSQL, como MongoDb;
- [x] Criar uma rota do tipo GET `/getInfoDocument/{filename}` que retorne as
seguintes informações existentes dentro do arquivo `*.xml`
    - Número da nota ( chave `cNF`);
    - CNPJ Emitente  ( chave `emit > CNPJ`)
    - Nome Emitente  ( chave `emit > xNome`)
    - CNPJ Destinatário( chave `dest > CNPJ`)
    - Nome Destinatário( chave `dest > xNome`)
    - Descrição Produtos ( chave `det > prod > xProd`)
    - Peso Produto  ( chave `det > prod > qCom`)


## Como rodar

```shell
docker-compose up -d
```
