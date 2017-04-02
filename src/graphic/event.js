const YmirEvent = Object.create( null, {
    key: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function key( keyEvent ) {

        }        
    },
    mouse: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function mouse( mouseEvent ) {
            switch ( mouseEvent ) {
                case 'dragmove':
                    if ( this.eventList.indexOf( 'dragmove' ) !== -1 ) {
                        return true;
                    }
            }
        }
    }
});

export { YmirEvent };