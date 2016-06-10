'use strict';

/**
 *
 *	Very basic example component
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

class HelloComponent extends React.Component {

	constructor(props){
		super(props);
	}

    render () {
        return (
        	<h1>{this.props.firstProp} {this.props.second}
        		<button onClick={ () => { alert('click') } }>Click me!</button>
        	</h1>
        );
    }
}

export default HelloComponent;