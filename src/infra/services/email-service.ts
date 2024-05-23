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
    date?: Date;
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
        await this.client.connect();

        await this.client.mailboxOpen("INBOX");

        const messages = await this.client.search({ seen: true });

        for (const messageId of messages) {
            const message = await this.client.fetchOne(messageId.toString(), { source: true });
            const parsed = await simpleParser(message.source);
            const attachments = await this.getAttachments(parsed);

            return attachments;
        }

        return []
    }

    private getAttachments = async (parsed: ParsedMail) => {

        const attachments: Attachment[] = []
        const documents: IEmailAttachment[] = []
        const documentInfoRepository = new DocumentInfoRepository();

        for (const attachment of parsed.attachments) {
            if (attachment.filename?.endsWith('.xml')) {
                attachments.push(attachment)
            }
        }

        for (const attachment of attachments) {
            documents.push({
                date: parsed.date,
                filename: attachment.filename ?? '',
                contentFile: Utils.truncate(attachment.content?.toString('utf-8'), 100),
            });

            if(parsed.date === null || parsed.date === undefined) throw new Error("date required")

            if(!attachment.filename || attachment.filename.length === 0) throw new Error("filename is required")

            documentInfoRepository.register({
                date: parsed.date,
                filename: attachment.filename,
                contentFile: attachment.content?.toString('utf-8'),
            })
        }

        return documents;
    }
}