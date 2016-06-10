'use strict';

/**
 *
 * Helper to get all the properties coming from the DOM.
 * It grabs any data-props-* attributes and transforms them into component properties.
 *
 */

import Preprocessor from './preprocessor.js';

export default function(elementClass){

    var containers = [],
        $placeholders = document.getElementsByClassName(elementClass);

    if(!$placeholders.length) return false;

    Array.from($placeholders).forEach(($placeholder) => {

        var attributes = $placeholder.attributes,
            props = {};

        Array.from(attributes).forEach((attribute) => {

            var nodeName = attribute.nodeName,
                nodeValue = Preprocessor(attribute.value),
                isPropRegExp = new RegExp(/data-props-([a-zA-Z]+)((-[a-zA-Z]$)*)/g);

            if(isPropRegExp.test(nodeName)){

                var propName = nodeName.replace('data-props-', '')
                    .split("-")
                    .map((word, idx) => {

                        var capital = null,
                            body = null;

                        if(idx){
                            word = word.toLowerCase();
                            capital = word[0].toUpperCase();
                            body = word.substr(1);
                            return capital.concat(body);
                        }

                        return word;

                    }).join('');

                props[propName] = nodeValue;

            }

        });

        containers.push({ el: $placeholder, props: props });

    });

    return containers;

}