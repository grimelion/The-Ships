import * as React from 'react';

interface CanvasModel {
    name?: string;
}

export class CanvasComponent extends React.Component<CanvasModel, {}> {
    ComponentDidMount() {
        console.log(this.refs.scene);
    }

    render() {
        return (
            <div className="scene-content">
                <canvas id="scene" ref="scene" />
            </div>
        );
    }
}   