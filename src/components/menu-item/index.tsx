import * as React from 'react';
import MenuItemModel from './model';
import { getState } from './../../app';

class MenuItemComponent extends React.Component<MenuItemModel, {}> {
    render() {
        let current = getState().location.current === this.props.id ? 'header-menu__item--current' : '';
        return (
            <a href={this.props.path} className={`header-menu__item ${current}`}>{this.props.children}</a>
        );
    }
}

export default MenuItemComponent;
export { MenuItemComponent, MenuItemModel };