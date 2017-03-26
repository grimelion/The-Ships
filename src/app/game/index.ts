import * as three from 'three';
import * as msgpack from 'msgpack-lite';
import { ajax } from './../../tools';
import { Ymir } from './../../graphic/ymir';

Ymir.initialize();
const game = Ymir.module( 'game' );
let camera: three.Camera;


let deltaX: number;
let offset = new three.Vector3();
let rotateStart = new three.Vector2();
let rotateEnd = new three.Vector2();
let rotateDelta = new three.Vector2();
let spherical = new three.Spherical(75, Math.PI / 4, 0);
let sphericalDelta = new three.Spherical();
let quat: three.Quaternion;
let quatInverse: three.Quaternion;;

game.listen('update', () => {
    let r = game.renderer.domElement.clientWidth / game.renderer.domElement.clientHeight;

    if (!r) return;

    game.camera('main')
    .setParams({
        type: 'perspective',
        fov: 45,
        aspect: r,
        near: 1,
        far: 1000
    })
    .moveTo({ x: 200, y: 200, z: 200 });
    

    game.camera('main').$instance.up.set(0,0,1);
    game.camera('main').lookAt({ x: 0, y: 0, z: 0 });

    // game.render();
    camera = game.camera('main').$instance;
    quat = new three.Quaternion().setFromUnitVectors( camera.up, new three.Vector3( 0, 1, 0 ) );
    quatInverse = quat.clone().inverse();
});

game.scene('test')
    .setParams({
        background: 0x999999
    });

game.item('drakkar')
   .setParams({
       geometry: new three.PlaneGeometry(60, 60, 1, 1),
       texture: new three.MeshBasicMaterial({color: 0xffcc00})
   })
   .$instance.add( new three.AxisHelper(20) );
game.item('drakkar').appendTo('test');
// game.scene('test').addItem( game.item('drakkar') );

game.listen('dragmove', (e) => {
    game.camera('main').rotate( e.deltaX * ( Math.PI / 180 ) / 4 );
});

export { game };