/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
app.factory('NewLineEnhancer', function () {
    return function (text) {
        return text.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>');
    };
});