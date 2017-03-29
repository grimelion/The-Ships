// abstract class Emitter {
//     abstract listeners: Listeners;

//     protected constructor() {
//         this.listeners = {};
//     }

//     public listen( event: string, listener: (event?: any) => void ): void {
//         let listeners = this.listeners;

//         if ( !listeners[ event ] ) {
//             listeners[ event ] = [];
//         }
        
//         if ( listeners[ event ].indexOf( listener ) !== -1 ) {
//             return;
//         }

//         listeners[ event ].push( listener );
//     }

//     protected emit( event: string, data: any = {} ): void {
// 		let listeners = this.listeners[ event ];

// 		if ( !listeners || !listeners.length ) {
//             return;
//         }

//         for ( let i = 0, length = listeners.length; i < length; i++ ) {       
//         	listeners[ i ].call( this, data );
//         }
// 	}
// }
const Emitter = Object.create( null, {
    listen: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function listen( type, handler ) {
            if ( this.$listeners === undefined ) {
                this.$listeners = {};
            } 
                
            let listeners = this.$listeners;

            if ( listeners[ type ] === undefined ) {
                listeners[ type ] = [];
            }
            if ( listeners[ type ].indexOf( handler ) === - 1 ) {
                listeners[ type ].push( handler );
            }            
        }
    },
    emit: {
        value: function emit( type ) {
            if ( this.$listeners === undefined ) return;

            let listeners = this.$listeners;
            let listenerArray = listeners[ type ];

            if ( listenerArray !== undefined ) {
                let array = [];

                for ( let i = 0, length = listenerArray.length; i < length; i++ ) {
                    array[ i ] = listenerArray[ i ];
                }

                for ( let i = 0, length = listenerArray.length;  i < length; i++ ) {
                    array[ i ].call( this );
                }
            }
        }        
    }
});

export { Emitter };