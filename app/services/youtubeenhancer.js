/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
app.factory('YouTubeEnhancer', function () {
    return function (text, height, width) {
        var regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
        var dimensions = getDimensionsHtml(height, width);

        var html = '<iframe ' + dimensions + 
            'src="https://www.youtube.com/embed/$1" ' + 
            'frameborder="0" allowfullscreen></iframe>';
        return text.replace(regex, html);
    };
});