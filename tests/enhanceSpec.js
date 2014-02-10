/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING file.
 */

 describe('enhanceText', function() {

    var provider;

    beforeEach(module('bernhardposselt.enhancetext', 
        function (enhanceTextFilterProvider) {
            provider = enhanceTextFilterProvider;
            provider.setOptions({
                cache: false
            });
        })
    );


    it('should not change a normal string', inject(function($filter) {  
        var filter = $filter('enhanceText');
        expect(filter('This is a test')).toBe('This is a test');
    }));


    it('should not replace new lines if turned off', inject(function ($filter) {
        provider.setOptions({
            newLineToBr: false
        });
        var filter = $filter('enhanceText');
        expect(filter('This is a test\n')).toBe('This is a test&#10;');
    }));


    it('should replace smilies', inject(function ($filter) {
        provider.setOptions({
            smilies: {
                ':)': '/test/smile.png'
            }
        });
        
        var filter = $filter('enhanceText');
        expect(filter('This is a test :) hehe')).
            toBe('This is a test <img alt=":)" src="/test/smile.png"/> hehe');
    }));


    it('should not replace smilies inside words', inject(function ($filter) {
        provider.setOptions({
            smilies: {
                ':)': '/test/smile.png'
            }
        });
        
        var filter = $filter('enhanceText');
        expect(filter('This is a test s:)')).
            toBe('This is a test s:)');
    }));


    it('should replace smilies if text is only the smiley', 
        inject(function ($filter) {
    
        provider.setOptions({
            smilies: {
                ':)': '/test/smile.png'
            }
        });
        
        var filter = $filter('enhanceText');
        expect(filter(':)')).
            toBe('<img alt=":)" src="/test/smile.png"/>');
    }));


    it('should replace smilies at the end of the text', 
        inject(function ($filter) {
    
        provider.setOptions({
            smilies: {
                ':)': '/test/smile.png'
            }
        });
        
        var filter = $filter('enhanceText');
        expect(filter('hey :)')).
            toBe('hey <img alt=":)" src="/test/smile.png"/>');
    }));


    it('should replace smilies before a newline', 
        inject(function ($filter) {
    
        provider.setOptions({
            smilies: {
                ':)': '/test/smile.png'
            }
        });
        
        var filter = $filter('enhanceText');
        expect(filter('hey :)\nsome more')).
            toBe('hey <img alt=":)" src="/test/smile.png"/><br/>some more');
    }));


    it('should not fail when caching is activated', inject(function ($filter) {
        provider.setOptions({
            cache: true
        });
        var filter = $filter('enhanceText');
        expect(filter('This is a test')).toBe('This is a test');
        expect(filter('This is a test 2')).toBe('This is a test 2');
        expect(filter('This is a test')).toBe('This is a test');
    }));


    it('should sanitize input before enhancing', inject(function ($filter) {
        var filter = $filter('enhanceText');

        expect(filter('hey :)\nsome more<script>')).
            toBe('hey :)<br/>some more');
    }));


    it('should create links', inject(function ($filter) {
        var filter = $filter('enhanceText');

        expect(filter('hey http://google.de')).
            toBe('hey <a target="_blank" href="http://google.de">http://google.de</a>');
    }));


    it('should not create links if disabled', inject(function ($filter) {
        var filter = $filter('enhanceText');
        provider.setOptions({
            embedLinks: false
        });

        expect(filter('hey http://google.de')).toBe('hey http://google.de');
    }));


    it('should replace images', inject(function ($filter) {
        var filter = $filter('enhanceText');

        expect(filter('hey http://google.de/test.png')).
            toBe('hey <a href="http://google.de/test.png" target="_blank">' +
                '<img alt="image" src="http://google.de/test.png"/></a>');
    }));


    it('should replace images and set height', inject(function ($filter) {
        var filter = $filter('enhanceText');
        provider.setOptions({
            embeddedImagesHeight: 300
        });

        expect(filter('hey http://google.de/test.png')).
            toBe('hey <a href="http://google.de/test.png" target="_blank">' + 
                '<img height="300" alt="image" src="http://google.de/test.png"/></a>');
    }));


    it('should replace images and set width', inject(function ($filter) {
        var filter = $filter('enhanceText');
        provider.setOptions({
            embeddedImagesHeight: 300,
            embeddedImagesWidth: 200
        });

        expect(filter('hey http://google.de/test.png')).
            toBe('hey <a href="http://google.de/test.png" target="_blank">' + 
                '<img height="300" width="200" alt="image" ' + 
                'src="http://google.de/test.png"/></a>');
    }));
});

