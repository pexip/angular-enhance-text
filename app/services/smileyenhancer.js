/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
app.factory('SmileyEnhancer', function () {
    return function(text, smilies) {

        var smileyKeys = Object.keys(smilies);

        // split input into lines to avoid dealing with tons of
        // additional complexity/combinations arising from new lines
        var lines = text.split('\n');

        var smileyReplacer = function (smiley, replacement, line) {
            // four possibilities: at the beginning, at the end, in the
            // middle or only the smiley
            var startSmiley = "^" + escapeRegExp(smiley) + " ";
            var endSmiley = " " + escapeRegExp(smiley) + "$";
            var middleSmiley = " " + escapeRegExp(smiley) + " ";
            var onlySmiley = "^" + escapeRegExp(smiley) + "$";

            return line.
                replace(new RegExp(startSmiley), replacement + " ").
                replace(new RegExp(endSmiley), " " + replacement).
                replace(new RegExp(middleSmiley), " " + replacement + " ").
                replace(new RegExp(onlySmiley), replacement);
        };

        // loop over smilies and replace them in the text
        for (var i=0; i<smileyKeys.length; i++) {
            var smiley = smileyKeys[i];
            var replacement = '<img alt="' + smiley + '" src="' +
                smilies[smiley] + '"/>';

            // partially apply the replacer function to set the replacement
            // string
            var replacer = smileyReplacer.bind(null, smiley, replacement);
            lines = lines.map(replacer);
        }

        return lines.join('\n');
    };
});