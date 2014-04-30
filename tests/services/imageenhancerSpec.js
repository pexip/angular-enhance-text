/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
 describe('ImageEnhancer', function() {

    var enhancer,
        height,
        width,
        target;

    beforeEach(module('bernhardposselt.enhancetext')); 

    beforeEach(inject(function(ImageEnhancer) {
        enhancer = ImageEnhancer;
        height = 300;
        width = 200;
        target = '_blank';
    }));


    it('should replace images', function () {
        expect(enhancer('hey http://google.de/test.png ho')).
            toBe('hey <a href="http://google.de/test.png" target="_blank">' +
                '<img alt="image" src="http://google.de/test.png"/></a> ho');
    });


    it('should replace images and set height', function () {
        expect(enhancer('hey http://google.de/test.png', height)).
            toBe('hey <a href="http://google.de/test.png" target="_blank">' + 
                '<img height="300" alt="image" src="http://google.de/test.png"/></a>');
    });


    it('should replace images and set width', function () {
        expect(enhancer('hey http://google.de/test.png', height, width)).
            toBe('hey <a href="http://google.de/test.png" target="_blank">' + 
                '<img height="300" width="200" alt="image" ' + 
                'src="http://google.de/test.png"/></a>');
    });

});