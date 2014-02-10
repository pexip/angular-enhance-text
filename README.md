# Angular Enhance Text filter

[![build state](https://travis-ci.org/Raydiation/angular-enhance-text.png)](https://travis-ci.org/Raydiation/angular-enhance-text)

## How to use

Install it via bower
    
    bower install angular-enhance-text

Then inject it into your app like

    angular.module('MyApp', ['bernhardposselt.enhancetext']);

Then the filter is available in your templates like:

    {{ SomeText | enhanceText }}


## Configure

To configure the provider, inject the provider in your config method:

    angular.module('MyApp', ['bernhardposselt.enhancetext']).
        config(['enhanceTextFilterProvider'], function (enhanceTextFilterProvider) {
            enhanceTextFilterProvider.setSmilies({
                ':)': '/img/smiley.png',
                ';)': '/img/smiley2.png'
            });
        });


### Set Smileys

Pass in an object that has the smilie as key and the path to the image as value:

    enhanceTextFilterProvider.setSmilies({
        ':)': '/img/smiley.png',
        ';)': '/img/smiley2.png'
    });