import { YmirModule } from './engine';
 
class Ymir {
    private static $instance: Ymir;
    private static $modules: { [ id: string ]: YmirModule };
    private static $isRendering: boolean;
    private static $time: number;

    private constructor() {
        Ymir.$modules = Object.create( null );
    }

    private static render(): void {
        // if ( !Ymir.$isRendering ) {
        //     return;
        // }

        for (let id in Ymir.$modules) {
            let module = Ymir.$modules[ id ];

            if ( module.isRendering ) {
                Ymir.$time = Date.now();
                module.render( Ymir.$time );
            }
        }

        requestAnimationFrame( Ymir.render );
    }

    static initialize(): void {
        if ( !Ymir.$instance ) {
            Ymir.$instance = new Ymir();
        }
        Ymir.$modules = Object.create( null );
        requestAnimationFrame( Ymir.render );
    }

    static module( id: string ): YmirModule {
        if ( !Ymir.$modules[ id ] ) {
            Ymir.$modules[ id ] = new YmirModule();
        }       
        return Ymir.$modules[ id ];
    }

}

export { Ymir };