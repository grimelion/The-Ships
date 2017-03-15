import * as three from 'three';
import { Engine } from './../../graphic/engine';

const game = new Engine();
game.camera('main')
    .setParams({
        type: 'perspective',
        aspect: 1,
        fov: 1,
        near: 0,
        far: 1
    })
    .moveTo({ x: 1, y: 1, z: 1 })
    .lookAt({ x: 0, y: 0, z: 0 });

game.scene('test')
    .setParams({
        background: 0xcccccc
    });

game.item('drakkar')
    .setParams({
        model: () => {
            
        }
    })
    .appendTo('test');


export { game };