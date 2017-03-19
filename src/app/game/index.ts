import * as three from 'three';
import * as msgpack from 'msgpack-lite';
import { ajax } from './../../tools';
import { GraphicEngine } from './../../graphic/engine';

const game = new GraphicEngine();

game.camera('main')
    .setParams({
        type: 'orthogonal',
		left: -400,
		right: 400,
		top: 200,
		bottom: -200,
        near: 1,
        far: 500
    })
    .moveTo({ x: 50, y: 50, z: 50 })
    .lookAt({ x: 0, y: 0, z: 0 });

game.scene('test')
    .setParams({
        background: 0x999999
    });

function generateTerrain() {
    return new three.PlaneGeometry(20, 20, 100, 100);
}

game.item('drakkar')
   .setParams({
       geometry: generateTerrain(),
       texture: new three.MeshBasicMaterial({color: 0xffcc00})
   });

game.scene('test').addItem( game.item('drakkar') ).instance.add( new THREE.AmbientLight( 0xcccccc ) );

export { game };