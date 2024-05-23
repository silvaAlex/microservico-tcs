interface GetEmailRequest {
    email: string,
    password: string,
    host: string,
    port: string,
}

export class GetEmailUseCase {
    constructor() { }

    async execute(data: GetEmailRequest) {
        const { email, password, host, port } = data;
    }
}