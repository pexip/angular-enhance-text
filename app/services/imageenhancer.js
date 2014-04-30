/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
app.factory('ImageEnhancer', function () {
    return function (text, height, width, target) {
        if(target === undefined) {
            target = '_blank';
        }
        
        var imgRegex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
        var imgDimensions = getDimensionsHtml(height, width);

        var img = '<a href="$1" target="' + target + 
            '">' + '<img ' + imgDimensions + 'alt="image" src="$1"/></a>';
        return text.replace(imgRegex, img);
    };
});