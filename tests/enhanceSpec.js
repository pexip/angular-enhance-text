/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
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
        expect(filter('This is a test').$$unwrapTrustedValue()).
            toBe('This is a test');
    }));


    it('should not replace new lines if turned off', inject(function ($filter) {
        provider.setOptions({
            newLineToBr: false
        });
        var filter = $filter('enhanceText');
        expect(filter('This is a test\n').$$unwrapTrustedValue()).
            toBe('This is a test\n');
    }));


    it('should not fail when caching is activated', inject(function ($filter) {
        provider.setOptions({
            cache: true
        });
        var filter = $filter('enhanceText');
        expect(filter('This is a test').$$unwrapTrustedValue()).
            toBe('This is a test');
        expect(filter('This is a test 2').$$unwrapTrustedValue()).
            toBe('This is a test 2');
        expect(filter('This is a test').$$unwrapTrustedValue()).
            toBe('This is a test');
    }));


    it('should sanitize input before enhancing', inject(function ($filter) {
        var filter = $filter('enhanceText');

        expect(filter('hey :)\nsome more<script>').$$unwrapTrustedValue()).
            toBe('hey :)<br/>some more&lt;script&gt;');
    }));


    it('should not create links if disabled', inject(function ($filter) {
        var filter = $filter('enhanceText');
        provider.setOptions({
            embedLinks: false
        });

        expect(filter('hey http://google.de').$$unwrapTrustedValue()).
            toBe('hey http://google.de');
    }));


    it('should not embed images if turned off', inject(function ($filter) {
        var filter = $filter('enhanceText');
        provider.setOptions({
            embedImages: false,
            embedLinks: false
        });
        expect(filter('hey http://google.de/test.png').$$unwrapTrustedValue()).
            toBe('hey http://google.de/test.png');
    }));


    it('should not embed videos if turned off', inject(function ($filter) {
        var filter = $filter('enhanceText');
        provider.setOptions({
            embedVideos: false,
            embedLinks: false
        });
        expect(filter('hey http://google.de/test.webm').$$unwrapTrustedValue()).
            toBe('hey http://google.de/test.webm');
    }));


    it('should not embed youtube if turned off', inject(function ($filter) {
        provider.setOptions({
            embedLinks: false,
            embedYoutube: false
        });
        var filter = $filter('enhanceText');

        expect(filter('hey http://www.youtube.com/watch?v=ksM520q4LEY').$$unwrapTrustedValue()).
            toBe('hey http://www.youtube.com/watch?v=ksM520q4LEY');
    }));


});
