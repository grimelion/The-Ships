import { YmirModule } from './engine';
 
const modules = Object.create( null );
let time = Date.now();

function render() {
    for (let id in modules) {
        let module = modules[ id ]; 
        if ( module.isRendering ) {
            time = Date.now();
            module.render( time );
        }
    }
    requestAnimationFrame( render );    
}


const Ymir = Object.create( null, {
    initialize: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function () {
            requestAnimationFrame( render );            
        }
    },
    module: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function module( id ) {
            if ( !modules[ id ] ) {
                modules[ id ] = new YmirModule();
            }
            return modules[ id ];
        }
    }
});

export { Ymir };