import * as React from 'react';
import GameModel from './model';
import { getState } from './../../app';
import { Ymir } from './../../graphic/ymir';

class GameComponent extends React.Component<GameModel, {}> {
    private canvas: HTMLCanvasElement;

    componentDidMount() {
        Ymir.module( 'game' ).initialize( this.canvas );
    }

    componentDidUpdate() {
        Ymir.module( 'game' ).refresh().startRendering();
    }

    render() {
        return (
            <div className={'game-wrap'}>
                <canvas 
                    ref={
                        (element) => {
                            this.canvas = element;
                        }
                    } />
            </div>
        );
    }
}

export default GameComponent;
export { GameComponent, GameModel };