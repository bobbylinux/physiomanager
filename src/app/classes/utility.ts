export abstract class Utility {

    public static formatDateForUser(date: string, separator?:string) {
        let day = date.substr(8, 2);
        let month = date.substr(5, 2);
        let year = date.substr(0, 4);
        separator = separator == null ? '-' : separator;
        return day + separator + month + separator + year;
    }

    public static formatDateForDatabase(date: string, separator?:string) {
        let day = date.substr(0, 2);
        let month = date.substr(3, 2);
        let year = date.substr(6, 4);
        separator = separator == null ? '-' : separator;
        return year + separator + month + separator + day;
    }

    public static formatDateTime(datetime: string, separator?:string) {
        let day = datetime.substr(8, 2);
        let month = datetime.substr(5, 2);
        let year = datetime.substr(0, 4);
        let hours = datetime.substr(11,2);
        let minutes = datetime.substr(14,2);
        let seconds = datetime.substr(17,2);
        separator = separator == null ? '-' : separator;
        return day + separator + month + separator + year + " " + hours +":"+minutes+":"+seconds;
    }
}