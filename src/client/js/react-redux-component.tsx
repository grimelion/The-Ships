import * as React from 'react';

interface CanvasModel {
    name?: string;
}

export class CanvasComponent extends React.Component<CanvasModel, {}> {
    componentDidMount() {    
        console.log(this.refs.scene);
    }

    render() {
        return (
            <div className="scene-content">
                <canvas id="canvas" ref="scene" />
            </div>
        );
    }
}   