window.onload = function (){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById("canvas");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    var renderer = new THREE.WebGLRenderer({canvas:canvas});

    renderer.setClearColor(0x000000);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 5000);
    camera.position.set(0,0,1000);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    function loop(){
        renderer.render(scene,camera);
        requestAnimationFrame(function(){loop();});
    };

    loop();

}