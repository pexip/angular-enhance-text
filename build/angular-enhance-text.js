(function(angular){

'use strict';


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
app.filter('newLine', function () {
    return function (text) {
        return text.replace('/\n/g', '<br/>').replace('&#10;', '<br/>');
    };
});
// taken from https://github.com/angular/angular.js/blob/master/src/ngSanitize/filter/linky.js
// without the sanitize part because the enhance text part already sanitizes it

app.filter('unsanitizedLink', function() {
    var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
        MAILTO_REGEXP = /^mailto:/;

    return function(text, target) {
        if (!text) return text;
        var match;
        var raw = text;
        var html = [];
        var url;
        var i;
        while ((match = raw.match(LINKY_URL_REGEXP))) {
            // We can not end in these as they are sometimes found at the end of the sentence
            url = match[0];
            // if we did not match ftp/http/mailto then assume mailto
            if (match[2] == match[3]) url = 'mailto:' + url;
            i = match.index;
            addText(raw.substr(0, i));
            addLink(url, match[0].replace(MAILTO_REGEXP, ''));
            raw = raw.substring(i + match[0].length);
        }
        addText(raw);
        return html.join('');

        function addText(text) {
            if (!text) {
                return;
            }
            html.push(text);
        }

        function addLink(url, text) {
            html.push('<a ');
            if (angular.isDefined(target)) {
                html.push('target="');
                html.push(target);
                html.push('" ');
            }
            html.push('href="');
            html.push(url);
            html.push('">');
            addText(text);
            html.push('</a>');
        }
    };
});

})(angular, undefined);