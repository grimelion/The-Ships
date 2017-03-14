import * as three from 'three';
import { has } from 'lodash';

type CameraType = 
    'orthogonal'
  | 'perspective';
  
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
    private instance: any;

    constructor() {}

    private instantiate(): three.Camera {
        return new three.Camera();
    }

    set(params: CameraParams): Camera {
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
                ['left', 'right', 'top', 'bottom', 'near', 'far'].forEach((item: any) => {
                    if ( has(params, item) && this.instance[item] !== [item] ) {
                        this.instance[item] = [item];
                        shouldUpdate = false;
                    }
                });
            }
            else if (type === 'perspective') {
                ['fov', 'aspect', 'near', 'far'].forEach((item: any) => {
                    if ( has(params, item) && this.instance[item] !== [item] ) {
                        this.instance[item] = [item];
                        shouldUpdate = false;
                    }
                });
            }
            if (shouldUpdate) {
                this.instance.updateProjectionMatrix();          
            }
        }
        return this;
    }

    lookAt(coords: three.Vector3): Camera {
        this.instance.lookAt(coords);
        return this;
    }

    moveTo(coords: three.Vector3): Camera {
        this.instance.position = coords;
        return this;
    }

    rotateTo(coords: three.Euler): Camera {
        this.instance.rotation = coords;
        return this;
    }
}

export { Camera };