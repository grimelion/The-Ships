import * as React from 'react';
import MenuItemModel from './model';
import { getState } from './../../app';

class MenuItemComponent extends React.Component<MenuItemModel, {}> {
    render() {
        let current = getState().location.current === this.props.id ? 'current' : '';
        return (
            <a href={'/'} className={`item ${current}`}>{this.props.children}</a>
        );
    }
}

export default MenuItemComponent;
export { MenuItemComponent, MenuItemModel };