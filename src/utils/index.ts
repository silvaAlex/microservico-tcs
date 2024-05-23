import { xml2json } from 'xml-js'
import { XmlValidator } from 'xml-validator'

export class Utils {
    static truncate = (source: string, length: number) => {
        if (source.length > length)
            return source.substring(0, length) + '...>';
        else
            return source;
    }

    static async parseXml(data: string) {

        console.log(data)
        const xml = xml2json(data, { compact: true, spaces: 2 });
        return JSON.parse(xml)
    }

    static checkVaildXml(data: string) {
        const validator = new XmlValidator();

        const validation = validator.validate(data)

        return validation.isValid;
    }
}