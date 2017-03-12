import ComponentModel from './../model';

interface PageModel extends ComponentModel {
    id: string;
    path: string;
}

export default PageModel;
export { PageModel };