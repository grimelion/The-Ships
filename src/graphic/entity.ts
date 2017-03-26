import * as three from 'three';
import { YmirVector2, YmirVector3 } from './data';

interface EntityProps {
    moveSpeed?: number;
    rotateSpeed?: number;
}

class Entity {
    private $position: YmirVector3;
    private $instance: three.Object3D;
    private $rotateSpeed: number;
    private $moveSpeed: number;
    private $destinations: YmirVector2[];

    constructor(options: EntityProps = {}) {
        
    }

    get rotateSpeed(): number {
        return this.$rotateSpeed;
    }    
    
    get moveSpeed(): number {
        return this.$moveSpeed;
    }

    public setDestination( point: YmirVector2 ) {
        this.$destinations = [ point ];
    }

    public addDestination( point: YmirVector2 ) {
        this.$destinations.push( point );
    }

    handleFrame( timestamp: number ): void {
        this.$instance.translateX( this.$moveSpeed / ( 1000 / timestamp ) );
    }
}