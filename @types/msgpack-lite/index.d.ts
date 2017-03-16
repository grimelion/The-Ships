declare module "msgpack-lite" {
    export function encode(data: Object): Buffer;
    export function decode(data: Buffer): Object;
}