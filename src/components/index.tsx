import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Menu from './menu';
import Page from './page';
import Game from './game';
import { storage, router } from './../app';

function globalRender(): void {
    ReactDOM.render(
        <div className={'page-wrapper'}>
            <Menu items={[{title: 'Haha', link: '/game'}]} />
            <Page id={'home'} path={'/'}>
                Home
            </Page>
            <Page id={'game'} path={'/game'}>
                <Game />
            </Page>
            <a href={'/game'}>test me</a>
        </div>,
        document.getElementById('content-wrapper')
    );
}

storage.subscribe(globalRender);

document.addEventListener('DOMContentLoaded', globalRender);