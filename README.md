# Angular Enhance Text filter

[![Build Status](https://travis-ci.org/Raydiation/angular-enhance-text.png?branch=master)](https://travis-ci.org/Raydiation/angular-enhance-text)

Enhances text by replacing commonly used links and characters, e.g. directly embedding youtube videos, replacing smilies etc. All replacements are cached so there's no downside in using it as filter.

Current features include: 

* Replacing smilies
* Replacing links
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
        enhanceTextFilterProvider.setSmilies({
            ':)': '/img/smiley.png',
            ';)': '/img/smiley2.png'
        });
    });
```

Then call the methods below to tweak it to your likings


### Set smileys

Pass in an object that has the smilie as key and the path to the image as value:

```javascript
enhanceTextFilterProvider.setSmilies({
    ':)': '/img/smiley.png',
    ';)': '/img/smiley2.png'
});
```

### Disable caching
By default, caching is enabled. Should you not want that use:

```javascript
enhanceTextFilterProvider.enableCaching(false);
```

### Disable new lines
By default, replacing newlines is enabled. That means every \n is replaced with a \<br/> Should you not want that use:

```javascript
enhanceTextFilterProvider.enableReplaceNewLines(false);
```

### Disable replacing Links
By default, replacing links is enabled. That means every https://somelink.com is replaced with a \<a href="https://somelink.com"/>https://somelink.com \</a>. Should you not want that use:

```javascript
enhanceTextFilterProvider.enableReplaceLinks(false);
```