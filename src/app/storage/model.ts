type Events =
    'router.navigate';

interface Action {
    type: Events,
    [name: string]: any
}

export { Action, Events };