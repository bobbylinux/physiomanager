export abstract class Utility {

    public static formatDate(date: string) {
        let day = date.substr(8, 2);
        let month = date.substr(5, 2);
        let year = date.substr(0, 4);
        return day + "-" + month + "-" + year;
    }
}