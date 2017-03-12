import * as React from 'react';
import GameModel from './model';
import { storage } from './../../app';

class GameComponent extends React.Component<GameModel, {}> {

    componentDidMount() {
        
    }

    render() {
        return (
            <div className={'game-wrap'}>
                <canvas ref={'canvas'} />
            </div>
        );
    }
}

export default GameComponent;
export { GameComponent, GameModel };