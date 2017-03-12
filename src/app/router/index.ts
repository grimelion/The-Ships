import { storage } from './../storage';

interface Route {
    id: string;
    match: RegExp;
    keys: string[];
}

class Router {
    private routes: Route[];

    constructor() {
        this.routes = [];

        window.addEventListener('popstate', (e) => {
            let url = window.location.pathname;
            this.navigate(url);
        });
    }

    public register(id: string, path: string): void {
        let keys: string[] = [];

        let expr = path
            .replace('/', '\/')
            .replace(/:(\w+)/g, (substring, key) => {
                keys.push(key);
                return '(.+)';
        });

        let match = new RegExp(`^${expr}$`);

        this.routes.push({
            id,
            match,
            keys
        });
    }

    public navigate(url: string): void {
        for (let route of this.routes) {
            if (!route.match.test(url)) {
                continue;
            }

            let params: any = {};

            url.replace(route.match, (substring, ...args) => {
                route.keys.forEach((item, i) => {
                    params[ route.keys[i] ] = args[i];
                });
                return substring;
            });

            storage.dispatch({
                type: 'router.navigate',
                id: route.id,
                params
            });
        }
    }
}

const router = new Router();

document.addEventListener('click', (e: Event) => {
    let target = <HTMLElement>e.target;

    if (target.closest('a')) {
        let url = target.getAttribute('href');
        
        if (url !== window.location.pathname) {
            window.history.pushState({}, null, url);
        }

        router.navigate(url);
        e.preventDefault();
    }
});

export { router };