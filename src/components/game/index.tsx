import * as React from 'react';
import GameModel from './model';
import { storage } from './../../app';

class GameComponent extends React.Component<GameModel, {}> {
    private canvas: HTMLCanvasElement

    componentDidMount() {
        
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