import * as three from 'three';
import * as msgpack from 'msgpack-lite';
import { ajax } from './../../tools';
import { GraphicEngine } from './../../graphic/engine';

const game = new GraphicEngine();

game.camera('main')
    .setParams({
        type: 'perspective',
        aspect: 1,
        fov: 50,
        near: 0,
        far: 100
    })
    .moveTo({ x: 10, y: 16, z: 15 })
    .lookAt({ x: 0, y: 0, z: 0 });

game.scene('test')
    .setParams({
        background: 0xcccccc
    });



ajax({
        url: '/obj.pack',
        method: 'get',
        type: 'buffer'
    })
    .then( (data) => {
            let decoded = msgpack.decode(<Buffer>data);
            game.item('drakkar')
                .setParams({
                    geometry: data
                })
                .appendTo('test');

            game.render();
        }, (reason) => {
            console.log(reason);
    });

export { game };