interface AJAXRequest {
    url: string;
    method: 'get' | 'post';
    data?: { [key: string]: string | number };
}

function serialize(obj: { [key: string]: string | number }): string {
    let keys = Object.keys(obj);

    if (!keys.length) {
        return '';
    }

    return '?' + keys.reduce( (result, key) => {
            result.push( key + '=' + encodeURIComponent(<string>obj[key]) );
            return result;
        }, [])
        .join('&')
}

function ajax(request: AJAXRequest): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        
        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState < 4 || xhr.status !== 200) {
                reject(`${xhr.status}: ${xhr.statusText}`);
            }
             
            if(xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        });
        xhr.open(request.method.toUpperCase(), request.url, true);
        xhr.send(serialize(request.data));
    });
}

export { ajax, serialize };