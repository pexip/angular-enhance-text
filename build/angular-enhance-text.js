(function(angular){

'use strict';


var app = angular.module('bernhardposselt.enhancetext', [])
.provider('enhanceTextFilter', function () {
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
                
                text = text.replace(smiley, replacement);
            }

            return text;
        };
    };
});

})(angular, undefined);