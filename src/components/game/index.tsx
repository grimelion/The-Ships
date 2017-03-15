import * as React from 'react';
import GameModel from './model';
import { getState } from './../../app';
import { game } from './../../app/game';

class GameComponent extends React.Component<GameModel, {}> {
    private canvas: HTMLCanvasElement;

    componentDidMount() {
        game.initialize(this.canvas);
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