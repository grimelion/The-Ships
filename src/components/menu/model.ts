import ComponentModel from './../model';

interface MenuItemModel {
    title: string,
    link: string
}

interface MenuModel extends ComponentModel {
    items: MenuItemModel[];
}

export default MenuModel;
export { MenuModel };