interface AJAXRequest {
    url: string;
    method: 'get' | 'post';
    type: 'json' | 'text' | 'buffer';
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

function ajax(request: AJAXRequest): Promise<string | Object | Buffer> {
    return new Promise<string | Object | Buffer>( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let { url, method, type, data } = request;
        
        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState < 4 || xhr.status !== 200) {
                reject(`${xhr.status}: ${xhr.statusText}`);
            }
             
            if(xhr.readyState === 4) {
                let data: any;
                if (type === 'text') {
                    data = xhr.responseText;
                }
                else if (type === 'json') {
                    data = JSON.parse(xhr.responseText);
                }
                else if (type === 'buffer') {
                    data = xhr.response;
                }
                resolve(data);
            }
        });
        xhr.open(request.method.toUpperCase(), request.url, true);
        xhr.send(serialize(request.data));
    });
}

export { ajax, serialize };