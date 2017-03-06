function genericArray<T>(element:T): Array<T> {
    let list: Array<T> = [element];
    return list;
}

let test: Array<number> = genericArray<number>(1);

export { genericArray, test };