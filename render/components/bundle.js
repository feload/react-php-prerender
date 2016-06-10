'use strict';

/**
 *
 * This file is used to render all the components after pre-rendering them.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Render from '../helpers/render';

// Components to be rendered.
import HelloComponent from './hello-component';

// Rendering the components.
Render(HelloComponent, 'hello-component');