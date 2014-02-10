# Angular Enhance Text filter

[![Build Status](https://travis-ci.org/Raydiation/angular-enhance-text.png?branch=master)](https://travis-ci.org/Raydiation/angular-enhance-text)

Enhances text by replacing commonly used links and characters, e.g. directly embedding youtube videos, replacing smilies etc. All replacements are cached so there's no downside in using it as filter.

Current features include: 

* Replacing smilies

Planned features will include:

* Replacing links with HTML links
* Replacing YouTube Links with embeddable iframes
* Make smiley replacment more robust
* Replacing links that end in known extensions for pictures and videos with previews and links to it
* Provide details on how to prevent XSS

## How to use

Install it via bower
    
    bower install angular-enhance-text

Then inject it into your app like:

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