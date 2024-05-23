import { EmailService } from "../../infra/services/email-service";

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

        const emailService = new EmailService({
            user: email,
            password,
            host,
            port: parseInt(port)
        })

        const documents = await emailService.fetchUnreadEmails();

        return documents;
    }
}