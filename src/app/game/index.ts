import * as three from 'three';
import * as msgpack from 'msgpack-lite';
import { ajax } from './../../tools';
import { GraphicEngine } from './../../graphic/engine';

const game = new GraphicEngine();
let theta = 0;
game.listen('update', () => {
    let r = game.renderer.domElement.clientWidth / game.renderer.domElement.clientHeight;

    if (!r) return;

    game.camera('main')
    .setParams({
        type: 'perspective',
        fov: 45,
        aspect: game.renderer.domElement.clientWidth / game.renderer.domElement.clientHeight,
        near: 1,
        far: 1000
    })
    .moveTo({ x: 200, y: 200, z: 200 });
    

    game.camera('main').instance.up.set(0,0,1);
    game.camera('main').lookAt({ x: 0, y: 0, z: 0 });

    theta = 360 / game.bounds.width;

    game.render();
});

let dist = new three.Vector3( 200, 200, 0 ).distanceTo( new three.Vector3(0, 0, 0) );

game.scene('test')
    .setParams({
        background: 0x999999
    });

function generateTerrain() {
    return new three.PlaneGeometry(60, 60, 1, 1);
}

game.item('drakkar')
   .setParams({
       geometry: generateTerrain(),
       texture: new three.MeshBasicMaterial({color: 0xffcc00})
   })
   .instance.add( new three.AxisHelper(20) );

game.scene('test').addItem( game.item('drakkar') ).instance.add( new THREE.AmbientLight( 0xcccccc ) );

game.listen('dragstart', (e) => {
    console.log(theta);
});
game.listen('dragmove', (e) => {
    let camera = game.camera('main').instance;
    let x = camera.position.x;
    let y = camera.position.y;

    if (e.button === 'left') {
        let angle = ( theta * e.deltaX ) / 60;
        camera.position.x = x * Math.cos(angle) + y * Math.sin(angle);
        camera.position.y = y * Math.cos(angle) - x * Math.sin(angle);
        game.camera('main').lookAt({ x: 0, y: 0, z: 0 });
    }
    else if (e.button === 'right') {
        camera.translateX(-e.deltaX);
        camera.translateY(e.deltaY);
    }
});


export { game };