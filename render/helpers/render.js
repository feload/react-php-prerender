'use strict';

/**
 *
 * Helper used to render the components in the page after pre-rendering.
 * So basically, this file ovewritte the pre-rendered component.
 *
 */

import React from 'react';
import ReactDom from 'react-dom';
import Container from './container';

export default function(componentClass, placeholder){

    const containers = Container(placeholder);
    const Component = React.createFactory(componentClass);

    if(!containers.length) return false;

    containers.forEach((container) => {

        let {el, props} = container;
        ReactDom.render(Component(props), el);

    });

}