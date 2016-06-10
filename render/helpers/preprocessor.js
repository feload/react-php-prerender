'use strict';

/**
 *
 * Helper to preprocess the values of the properties coming from
 * the placeholders on the page.
 *
 */

export default function(value){

	switch(value.toLowerCase()){

		case "false":
			return false;

		case "true":
			return true;

	}

	if(!isNaN(parseFloat(value))){
		return parseFloat(value);
	}

	return value;

}