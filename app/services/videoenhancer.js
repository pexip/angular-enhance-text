/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
app.factory('VideoEnhancer', function () {
    return function (text, height, width) {
        var regex = /((?:https?):\/\/\S*\.(?:ogv|webm))/gi;
        var dimensions = getDimensionsHtml(height, width);
        var vid = '<video ' + dimensions + 'src="$1" controls preload="none"></video>';
        return text.replace(regex, vid);
    };
});