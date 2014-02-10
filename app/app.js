/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING file.
 */
var app = angular.module('bernhardposselt.enhancetext', []).
    provider('enhanceTextFilter', function () {
        var smilies = {};

        this.setSmilies = function (smiliesConfig) {
            smilies = smiliesConfig;
        };

        this.$get = function () {
            return function (text) {

                // loop over smilies and replace them in the text
                var smileyKeys = Object.keys(smilies);
                for(i=0; i<smileyKeys.length; i++) {
                    var smiley = smileyKeys[i];
                    var smileyKeyPath = smilies[smiley];
                    var replacement = '<img alt="' + smiley + '" src="' + 
                        smileyKeyPath + '"/>';
                    
                    console.log(replacement);
                    text.replace(smiley, replacement);
                }

                return text;
            };
        };
    });