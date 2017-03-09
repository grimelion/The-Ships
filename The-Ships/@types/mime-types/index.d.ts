declare module "mime-types" {
    export function charset(type: string): string | boolean;
    export function contentType(str: string): string | boolean;
    export function extension(type: string): string | boolean;
    export function lookup(path: string): string | boolean;
}