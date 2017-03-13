import Route from './model';
import { dispatchAction } from './../storage';

const routes: Route[] = [];

function normalizeUrl(url: string): string {
    if (!url.length) {
        return '/';
    }
    return url;
}

function registerUrl(id: string, path: string): void {
    let keys: string[] = [];

    let expr = path
        .replace('/', '\/')
        .replace(/:(\w+)/g, (substring, key) => {
            keys.push(key);
            return '(.+)';
    });

    let match = new RegExp(`^${expr}$`);

    routes.push({
        id,
        match,
        keys
    });
}

function navigateTo(url: string): void {
    for (let route of routes) {
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

        dispatchAction({
            type: 'location.change',
            data: {
                id: route.id,
                params
            }
        });
    }
}

window.addEventListener('popstate', (e) => {
    let url = window.location.pathname;
    navigateTo(url);
});

document.addEventListener('click', (e) => {
    let target = <HTMLElement>e.target;

    if (target.closest('a')) {
        let url = target.getAttribute('href');
        
        if (url !== window.location.pathname) {
            window.history.pushState({}, null, url);
        }

        navigateTo(url);
        e.preventDefault();
    }
});

export { registerUrl, navigateTo };