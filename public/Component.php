<?php

/**
 * Component class.
 * Render components and grabs pre-rendered stuff from a server.
 */

class Component {

	private static $renderService = "http://192.168.33.10:3000/";

	/**
	 * Generates the properties for the component.
	 * @param  array  $properties      Array of properties, i.e: array('property-one' => 2);
	 * @param  string $propertySuffix  Property suffix for naming the properties in the dom.
	 * @param  string $initialStateApi Initial State API end point.
	 * @return string                  String of properties, i.e.: prop-property-one='2'.
	 */
	private static function genDOMProperties($properties = array(), $propertySuffix = "prop", $initialStateApi = null){
		$componentProperties = "";
		foreach($properties as $property => $value){
			$componentProperties .= "{$propertySuffix}-{$property}='{$value}' ";
		}
		return $componentProperties;
	}

	/**
	 * Generates the properties for the component to be used inside the component.
	 * @param  array  $properties Array of properties, i.e: array('property-one' => 2).
	 * @return array              Array of properties for the component, i.e. array('propertyOne' => 2).
	 */
	private static function genComponentProperties($properties = array()){
		$componentProperties = array();
		foreach($properties as $property => $value){
			$propertyKey = lcfirst(str_replace("-","",ucwords($property,"-")));
			$componentProperties[$propertyKey] = $value;
		}
		return $componentProperties;
	}

	/**
	 * Gets the initial state API end point response and transforms it into a JSON payload.
	 * @param  string $initialStateApi Initial State API end point.
	 * @return String                  Initial State JSON
	 */
	private static function getInitialState($initialStateApi = null){
		return ($initialStateApi) ? file_get_contents($initialStateApi) : null;
	}

	/**
	 * Returns the pre-rendered markup generated and processed inside a placeholder.
	 * @param  string $componentName   Name of the component.
	 * @param  array  $properties      Array of properties, i.e: array('property-one' => 2);
	 * @param  string $initialStateApi Initial State API end point.
	 * @param  array  $options         Various options for the function.
	 * @return string 				   Pre-rendered and processed markup inside a placeholder.
	 */
	public static function render($componentName = null, $properties = array(), $initialStateApi = null, $options = array()){

		// Generating configuration by mixing defaults and config parameters.
		$defaults = array('propertySuffix' => 'data-props', 'debug' => false);
		$config = array_merge($defaults, $options);

		// Config variables would look like: $__debug
		extract($config, EXTR_PREFIX_ALL, "_");

		// Globals
		$renderService = Component::$renderService;

		// Generating properties.
		$initialStateApiJson = ($initialStateApi) ? Component::getInitialState($initialStateApi) : null;
		if($initialStateApiJson) $properties['initial-state'] = $initialStateApiJson;
		$componentProperties = Component::genComponentProperties($properties);
		$componentDOMProperties = Component::genDOMProperties($properties, $__propertySuffix);
		$componentPropertiesString = json_encode($componentProperties);

		// Curl request.
		$curl = curl_init("{$renderService}?module={$componentName}");

		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($curl, CURLOPT_POSTFIELDS, $componentPropertiesString);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
		    'Content-Type: application/json',
		    'Content-Length: ' . strlen($componentPropertiesString))
		);

		$componentContent = curl_exec($curl);

		// The final oputput.
		$output = <<< MARKUP
		<div class="$componentName" {$componentDOMProperties}>
			<div>
				{$componentContent}
			</div>
		</div>
MARKUP;

		return $output;

	}

}