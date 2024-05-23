import { ImapFlow } from "imapflow"
import { Attachment, ParsedMail, simpleParser } from "mailparser";
import { Utils } from '../../utils/index'
import { DocumentInfoRepository } from "../repository/document-info.repository";

type MailConfig = {
    host: string,
    user: string,
    password: string,
    port: number
}

interface IEmailAttachment {
    date?: Date | null;
    filename: string;
    contentFile: string;
}

export class EmailService {

    private client: ImapFlow;

    constructor(config: MailConfig) {
        this.client = new ImapFlow({
            host: config.host,
            port: config.port,
            secure: true,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: config.user,
                pass: config.password
            }
        })
    }


    async fetchUnreadEmails() {

        let documents: IEmailAttachment[] = []

        await this.client.connect();

        await this.client.mailboxOpen("INBOX");

        const messages = await this.client.search({ seen: false });

        for (const messageId of messages) {
            const message = await this.client.fetchOne(messageId.toString(), { source: true });
            const parsed = await simpleParser(message.source);
            const attachments = await this.getAttachments(parsed);

            for (const attachment of attachments) {
                
                const contentFile = attachment.content?.toString('utf-8')

                if (Utils.checkVaildXml(contentFile)) {
                    
                    documents.push({
                        date: parsed.date ?? null,
                        filename: attachment.filename?.replace(/\s/g, '') ?? '',
                        contentFile: Utils.truncate(contentFile, 100),
                    });

                    this.register({
                        date: parsed.date,
                        filename: attachment.filename?.replace(/\s/g, '') ?? '',
                        contentFile: contentFile
                    });

                }
            }
        }

        return documents
    }

    private getAttachments = async (parsed: ParsedMail) => {

        const attachments: Attachment[] = []
        for (const attachment of parsed.attachments) {
            if (attachment.filename?.endsWith('.xml')) {
                attachments.push(attachment)
            }
        }

        return attachments;
    }

    private register = async (data: IEmailAttachment) => {

        const documentInfoRepository = new DocumentInfoRepository();

        documentInfoRepository.register({
            date: data.date,
            filename: data.filename,
            contentFile: data.contentFile,
        })

    }
}