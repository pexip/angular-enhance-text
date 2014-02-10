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

    var options = {
            cache: true,
            newLineToBr: true,
            embedLinks: true,
            embeddedLinkTarget: '_blank',
            embedImages: true,
            embeddedImagesHeight: undefined,
            embeddedImagesWidth: undefined,
            embedVideos: true,
            embedYoutube: true,
            smilies: {}
        },
        textCache = {};

    this.setOptions = function (customOptions) {
        angular.extend(options, customOptions);
    };

    this.$get = ['$sanitize', '$sce', function ($sanitize, $sce) {
        return function (text) {

            var originalText = text;

            // hit cache first before replacing
            if (options.cache) {
                var cachedResult = textCache[text];
                if (angular.isDefined(cachedResult)) {
                    return cachedResult;
                }
            }

            // sanitize text
            text = $sanitize(text);

            // loop over smilies and replace them in the text
            var smileyKeys = Object.keys(options.smilies);
            for (i=0; i<smileyKeys.length; i++) {
                var smiley = smileyKeys[i];
                var smileyKeyPath = options.smilies[smiley];
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

            // replace images
            if (options.embedImages) {
                var imgRegex = /((?:ftp|https?):\/\/.*\.(?:gif|jpg|jpeg|tiff|png))$/gi;
                var dimensions = '';

                if (angular.isDefined(options.embeddedImagesHeight)) {
                    dimensions += 'height="' + options.embeddedImagesHeight + '" ';
                }

                if (angular.isDefined(options.embeddedImagesWidth)) {
                    dimensions += 'width="' + options.embeddedImagesWidth + '" ';
                }

                var img = '<a href="$1" target="' + options.embeddedLinkTarget + 
                    '">' + '<img ' + dimensions + 'alt="image" src="$1"/></a>';
                text = text.replace(imgRegex, img);
            }

            // replace newlines with breaks
            if (options.newLineToBr) {
                text = text.replace('/\n/g', '<br/>').replace('&#10;', '<br/>');
            }

            // replace links
            if (options.embedLinks) {
                var linkRegex = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                text = text.replace(linkRegex, function() {
                  return  arguments[1] ? 
                          arguments[0] : 
                          '<a target="' + options.embeddedLinkTarget + 
                          '" href="'+ arguments[3] + '">' + 
                          arguments[3] + '</a>';
                });
            }

            // trust result to able to use it in ng-bind-html
            $sce.trustAsHtml(text);


            // cache result
            if (options.cache) {
                textCache[originalText] = text;
            }

            return text;
        };
    }];
});