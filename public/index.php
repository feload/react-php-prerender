<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Component pre-rendering</title>
</head>
<body>

	<?php

	include 'Component.php';

	$props = array('first-prop' => 'Hola', 'second' => 'Tú!');
	$options = array('debug' => true);

	//$initialStateApi = 'http://jsonplaceholder.typicode.com/users/1'; NOT FINISHED YET.
	$initialStateApi = null;

	print Component::render('hello-component', $props, $initialStateApi, $options);


	$props = array('first-prop' => 'Hol2a', 'second' => 'Tú3');
	print Component::render('hello-component', $props, $initialStateApi, $options);

	?>

	<script src="dist/bundle.js"></script>

</body>
</html>