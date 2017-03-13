import * as three from 'three';

enum CameraType {
    orthogonal,
    perspective
};

class Camera {
    private type: CameraType;
    private instance: three.Camera;

    constructor(type: CameraType) {
        this.type = type;
    }

    private instantiate() {
        
    }

    lookAt(): Camera {
        this.instance
        return this;
    }
}

export { Camera };