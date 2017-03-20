import * as three from 'three';
import * as msgpack from 'msgpack-lite';
import { ajax } from './../../tools';
import { GraphicEngine } from './../../graphic/engine';

const game = new GraphicEngine();

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
    .moveTo({ x: 200, y: 200, z: 200 })
    .lookAt({ x: 0, y: 0, z: 0 })
    .instance.up.set(0,0,1);

    game.render();
});



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
   
// game.item('drakkar').instance.rotateX(-90);

// game.item('drakkar').instance.rotateX(90);
game.scene('test').addItem( game.item('drakkar') ).instance.add( new THREE.AmbientLight( 0xcccccc ) );

game.listen('dragstart', (e) => {

});
game.listen('dragmove', (e) => {
    game.camera('main').instance.translateX(-e.deltaX);
    game.camera('main').lookAt({ x: 0, y: 0, z: 0 });
});

export { game };