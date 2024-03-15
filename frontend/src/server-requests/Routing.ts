import pathConf from "./path.json";
export class Routing {
    private api: object;
    private section: string;
    constructor(api: object, section: string) {
        this.api = api
        this.section = section
    }
    static get(api: "users" | "plants" | "blogs" | "comments" | "login") {
        let apiSection = (pathConf as any)[api];
        return new Routing(apiSection, api);
    }

    get(endpoint: string, id?: string) {
        let url = pathConf.host + '/' + this.section + (this.api as any)[endpoint].url;
        if (url.includes(':id')) {
            if (typeof id === 'undefined') {
                throw new Error("Please provide path variable");
            }
            url = url.replace(':id', id);
        }
        return url;
    }
}