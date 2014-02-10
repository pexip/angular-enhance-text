# Angular Enhance Text filter

[![Build Status](https://travis-ci.org/Raydiation/angular-enhance-text.png?branch=master)](https://travis-ci.org/Raydiation/angular-enhance-text)
[![Coverage Status](https://coveralls.io/repos/Raydiation/angular-enhance-text/badge.png?branch=master)](https://coveralls.io/r/Raydiation/angular-enhance-text?branch=master)

Enhances text by replacing commonly used links and characters, e.g. directly embedding youtube videos, replacing smilies etc. All replacements are cached so there's no downside in using it as filter.

Current features include: 

* Embedding smilies
* Embedding links
* Embedding images
* Sanitize output

Planned features will include:

* Replacing YouTube Links with embeddable iframes
* Replacing links that end in known extensions for pictures and videos with previews and links to it

## How to use
Make sure that angular and angular-sanitize is installed:

    bower install angular angular-sanitize

Install it via bower:
    
    bower install angular-enhance-text

Then inject it into your app like:
    
```javascript
angular.module('MyApp', ['bernhardposselt.enhancetext']);
```

Then the filter is available in your templates like:

```html
<div ng-bind-html="SomeText | enhanceText"></div>
```

All content to the filter is explicitely sanitized and marked as safe.
.
## Configuration

To configure the provider, inject the provider in your config method:
    
```javascript
angular.module('MyApp', ['bernhardposselt.enhancetext']).
    config(['enhanceTextFilterProvider'], function (enhanceTextFilterProvider) {
        enhanceTextFilterProvider.options({
            // your options in here
        });
    });
```

The following options are available:

```javascript
enhanceTextFilterProvider.setOptions({
    cache: true,  // stores replaced images
    newLineToBr: true,  // replaces \n with /<br/>
    embedLinks: true,  // replaces links with Html links
    embeddedLinkTarget: '_blank',  // sets the target of all replaced links
    embedImages: true,  // replaces links to images with Html images
    embeddedImagesHeight: undefined,  // if given will be used to set height of embedded images
    embeddedImagesWidth: undefined,  // if given will be used to set width of embedded images
    embedVideos: true,  // replaces links to videos with Html videos
    embedYoutube: true,  // replaces links to youtube videos with iframed youtube videos
    smilies: {  // key = smilie, value = path to smilie
        ':)': '/img/smiley.png',
        ';)': '/img/smiley2.png'
    }
});
```
