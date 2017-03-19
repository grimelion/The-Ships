import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuItem from './menu-item';
import Page from './page';
import Game from './game';
import { subscribe } from './../app';

function globalRender(): void {
    ReactDOM.render(
        <div className={'page-wrapper'}>
            <header>
                <nav className={'header-menu'}>
                    <MenuItem id={'home'} path={'/'}>Home</MenuItem>
                    <MenuItem id={'game'} path={'/game'}>Game</MenuItem>
                </nav>    
            </header>
            
            <section>
                <Page id={'home'} path={'/'}>
                    Home
                </Page>
                <Page id={'game'} path={'/game'}>
                    <Game />
                </Page>
            </section>
        </div>,
        document.getElementById('content-wrapper')
    );
}

subscribe(globalRender);

document.addEventListener('DOMContentLoaded', globalRender);