import * as three from 'three';
import { get, has } from 'lodash';
import { Vector } from './data';

type CameraType = 
    'orthogonal'
  | 'perspective';

interface CameraSignature {
    [key: string]: any;
}

interface CameraParams {
    type?: CameraType;
    fov?: number;
    aspect?: number;
    near?: number;
    far?: number;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    zoom?: number;
}

class Camera {
    public type: CameraType;
    public instance: three.OrthographicCamera | three.PerspectiveCamera;

    constructor() {}

    private applyParams(keys: string[], params: CameraParams): void {
        let shouldUpdate = false;
        keys.forEach( (item) => {
            if ( has(params, item) && (<CameraSignature>this.instance)[item] !== get(params, item) ) {
                (<CameraSignature>this.instance)[item] = get(params, item);
                shouldUpdate = true;
            }
        });

        if (shouldUpdate) {
            this.instance.updateProjectionMatrix();          
        }
    }

    setParams(params: CameraParams): Camera {
        let { fov, aspect, near, far, left, right, top, bottom } = params;
        
        if (!this.instance) {
            let { type } = params;
            if (type === 'orthogonal') {
                this.instance = new three.OrthographicCamera(
                    left, right, top, bottom, near, far
                );
            }
            else if (params.type === 'perspective') {
                this.instance = new three.PerspectiveCamera(
                    fov, aspect, near, far
                );
            }
        }
        else {
            let type = this.type;
            let shouldUpdate = false;
            if (type === 'orthogonal') {
                this.applyParams(
                    ['left', 'right', 'top', 'bottom', 'near', 'far'],
                    params
                );
                
            }
            else if (type === 'perspective') {
                this.applyParams(
                    ['fov', 'aspect', 'near', 'far'],
                    params
                );               
            }
        }
        return this;
    }

    lookAt(coords: Vector): Camera {
        this.instance.lookAt(<three.Vector3>coords);
        return this;
    }

    moveTo(coords: Vector): Camera {
        this.instance.position.set(coords.x, coords.y, coords.z);
        return this;
    }

    rotateTo(coords: Vector): Camera {
        this.instance.rotation.set(coords.x, coords.y, coords.z);
        return this;
    }
}

export { Camera };