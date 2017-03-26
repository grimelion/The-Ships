import * as three from 'three';
import * as msgpack from 'msgpack-lite';
import { ajax } from './../../tools';
import { Ymir } from './../../graphic/ymir';
import { ImprovedNoise } from '../../tools/noise';

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

    function generateHeight(width: number, height: number) {
        var data = new Uint8Array( width * height ), perlin = ImprovedNoise(),
        size = width * height, quality = 2, z = Math.random() * 100;
        for ( var j = 0; j < 4; j ++ ) {
            quality *= 4;
            for ( var i = 0; i < size; i ++ ) {
                var x = i % width, y = ~~ ( i / width );
                data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * 0.5 ) * quality + 10;
            }
        }
        return data;
    }

function generateTerrain() {
    let quality = 16,
        step = 1024 / quality;
    let plane = new three.PlaneGeometry(200, 200, 10, 10);    
    let data = generateHeight(100, 100);
    for (let i = 0, l = plane.vertices.length; i < l; i++) {
        let x = i % quality,
            y = Math.floor(i / quality);
        plane.vertices[i].y = data[(x * step) + (y * step) * 1024] * 2 - 128;
        if (isNaN(plane.vertices[i].y)) {
            plane.vertices[i].y = 100;
        }
        if(plane.vertices[i].x === 0) {
            plane.vertices[i].y = 50;
        }
        // console.log(plane.vertices[i].y);
    }
    // console.log(plane.vertices);
    return plane;
}
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