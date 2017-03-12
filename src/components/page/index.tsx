import * as React from 'react';
import PageModel from './model';
import { getState, registerUrl } from './../../app';

class PageComponent extends React.Component<PageModel, {}> {

    componentWillMount() {
        registerUrl(this.props.id, this.props.path);
    }
    
    render() {
        let current = getState().location.current === this.props.id ? 'current' : '';
        return (
            <div className={`page home ${current}`}>
                {this.props.children}
            </div>
        );
    }
}

export default PageComponent;
export { PageComponent, PageModel };