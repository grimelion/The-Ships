import * as React from 'react';
import PageModel from './model';
import { storage, router } from './../../app'

class PageComponent extends React.Component<PageModel, {}> {

    componentWillMount() {
        router.register(this.props.id, this.props.path);
    }
    
    render() {
        let current = storage.getState().router.current === this.props.id ? 'current' : '';
        return (
            <div className={`page home ${current}`}>
                {this.props.children}
            </div>
        );
    }
}

export default PageComponent;
export { PageComponent, PageModel };