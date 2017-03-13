interface Route {
    id: string;
    match: RegExp;
    keys: string[];
}

export default Route;
export { Route };