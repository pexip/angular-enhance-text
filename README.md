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
    
```javascript
angular.module('MyApp', ['bernhardposselt.enhancetext']);

Then the filter is available in your templates like:

```html
{{ SomeText | enhanceText }}


## Configuration

To configure the provider, inject the provider in your config method:
    
```javascript
angular.module('MyApp', ['bernhardposselt.enhancetext']).
    config(['enhanceTextFilterProvider'], function (enhanceTextFilterProvider) {
        enhanceTextFilterProvider.setSmilies({
            ':)': '/img/smiley.png',
            ';)': '/img/smiley2.png'
        });
    });

Then call the methods below to tweak it to your likings


### Set Smileys

Pass in an object that has the smilie as key and the path to the image as value:

```javascript
enhanceTextFilterProvider.setSmilies({
    ':)': '/img/smiley.png',
    ';)': '/img/smiley2.png'
});

### Disable Caching
By default, caching is enabled. Should you not want that use:

```javascript
enhanceTextFilterProvider.enableCaching(false);