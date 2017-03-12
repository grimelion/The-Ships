import * as React from 'react';
import MenuModel from './model';
import { storage } from './../../app'

class MenuComponent extends React.Component<MenuModel, {}> {
    render() {
        return (
            <div>
               <a href={'/game'} className={'link'}>Text</a>
            </div>
        );
    }
}

export default MenuComponent;
export { MenuComponent, MenuModel };