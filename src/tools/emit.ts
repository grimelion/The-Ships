interface Listeners {
    [event: string]: Function[];
}

abstract class Emitter {
    abstract listeners: Listeners;

    protected constructor() {
        this.listeners = {};
    }

    public listen( event: string, listener: (event?: any) => void ): void {
        let listeners = this.listeners;

        if ( !listeners[ event ] ) {
            listeners[ event ] = [];
        }
        
        if ( listeners[ event ].indexOf( listener ) !== -1 ) {
            return;
        }

        listeners[ event ].push( listener );
    }

    protected emit( event: string, data: any = {} ): void {
		let listeners = this.listeners[ event ];

		if ( !listeners || !listeners.length ) {
            return;
        }

        data.target = this;

        for ( let i = 0, length = listeners.length; i < length; i++ ) {       
        	listeners[ i ].call( this, data );
        }
	}
}

export { Emitter, Listeners };