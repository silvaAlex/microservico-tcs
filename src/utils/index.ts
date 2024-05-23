export class Utils {
    static truncate = (source: string, length: number) => {
        if (source.length > length)
            return source.substring(0, length) + '...>';
        else
            return source;
    }
};