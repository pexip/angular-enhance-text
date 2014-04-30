/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
app.factory('LinkEnhancer', function () {
    return function (text, target) {
        if(target === undefined) {
            target = '_blank';
        }

        var regex = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        
        return text.replace(regex, function() {
            return  arguments[1] ? 
                arguments[0] : 
                '<a target="' + target + '" href="'+ arguments[3] + '">' + arguments[3] + '</a>';
        });
    };
});