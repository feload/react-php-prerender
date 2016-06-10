'use strict';

/**
 *
 * Simple server for components pre-rendering.
 * Source: https://blog.frankdejonge.nl/rendering-reactjs-templates-server-side/ <-- Great stuff here ;-)
 *
 */

require('babel-register');

var React = require('react');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ReactDOMServer = require('react-dom/server');

var app = express();
app.use(bodyParser.json());

app.use('/', function(req, res) {

    try {

        var module = './components/' + req.query.module;

        var view = path.resolve(module);
        var component = require(view).default;

        var props = req.body || null;

        res.status(200).send(
            ReactDOMServer.renderToString(
                React.createElement(component, props)
            )
        );

    } catch (err) {
        res.status(500).send(err.message);
    }

});

app.listen(3000);

console.log("Server running...");