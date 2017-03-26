import * as three from 'three';
import * as msgpack from 'msgpack-lite';
import { ajax } from './../../tools';
import { GraphicEngine } from './../../graphic/engine';
import { ImprovedNoise } from '../../tools/noise';

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