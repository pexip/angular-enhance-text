/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING file.
 */
var app = angular.module('bernhardposselt.enhancetext', ['ngSanitize'])
.provider('enhanceTextFilter', function () {

    // taken from https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    var smilies = {},
        textCache = {},
        isCaching = true,
        replaceNewLines = true,
        replaceLinks = true;

    this.setSmilies = function (smiliesConfig) {
        smilies = smiliesConfig;
    };

    this.enableCaching = function (isEnabled) {
        isCaching = isEnabled;
    };

    this.enableReplaceNewLines = function (isEnabled) {
        replaceNewLines = isEnabled;
    };

    this.enableReplaceLinks = function (isEnabled) {
        replaceLinks = isEnabled;
    };

    this.$get = ['$sanitize', '$filter', '$sce', function ($sanitize, $filter, $sce) {
        return function (text) {

            var originalText = text;

            // hit cache first before replacing
            if (isCaching) {
                var cachedResult = textCache[text];
                if (cachedResult !== undefined) {
                    return cachedResult;
                }
            }

            // sanitize text
            text = $sanitize(text);

            // loop over smilies and replace them in the text
            var smileyKeys = Object.keys(smilies);
            for (i=0; i<smileyKeys.length; i++) {
                var smiley = smileyKeys[i];
                var smileyKeyPath = smilies[smiley];
                var replacement = '<img alt="' + smiley + '" src="' + 
                    smileyKeyPath + '"/>';
                
                var middleSmiley = " " + escapeRegExp(smiley) + " ";
                text = text.replace(new RegExp(middleSmiley), " " + replacement + " ");

                var onlySmiley = "^" + escapeRegExp(smiley) + "$";
                text = text.replace(new RegExp(onlySmiley), replacement);

                var endSmiley = " " + escapeRegExp(smiley) + "$";
                text = text.replace(new RegExp(endSmiley), " " + replacement);

                var lineBreakSmiley = " " + escapeRegExp(smiley) + "&#10;";
                text = text.replace(new RegExp(lineBreakSmiley), " " + replacement + "&#10;");
            }

            // replace newlines with breaks
            if (replaceNewLines) {
                text = $filter('newLine')(text);
            }

            // replace links
            if (replaceLinks) {
                text = $filter('unsanitizedLink')(text);
            }

            // trust result to able to use it in ng-bind-html
            $sce.trustAsHtml(text);


            // cache result
            if (isCaching) {
                textCache[originalText] = text;
            }

            return text;
        };
    }];
});