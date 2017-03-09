import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CanvasComponent } from './react-redux-component';

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <CanvasComponent />,
        document.getElementById('main-wrapper')
    );
});