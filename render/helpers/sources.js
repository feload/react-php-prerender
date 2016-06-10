'use strict';

/**
 *
 * This helper is for getting all the files to be processed.
 * IMPORTANT: This file for when you have a lot of files to process.
 *
 */

var glob = require('glob');

module.exports = function(path){

    var sources = {};
    var site_folders = glob.sync(path);

    //
    // Get all the files from each folder to be processed.

    site_folders.forEach(function(el, idx){
        var bundle_folder = el.replace('/src/','/dist/bundle.js');
        sources[bundle_folder] = glob.sync("./".concat(el.concat('*.jsx')));
    });

    return sources;

}