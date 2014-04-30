/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
 describe('YouTubeEnhancer', function() {

    var enhancer,
        height,
        width;

    beforeEach(module('bernhardposselt.enhancetext')); 

    beforeEach(inject(function(YouTubeEnhancer) {
        enhancer = YouTubeEnhancer;
        height = 300;
        width = 200;
    }));


    it('should embed youtube', function () {
        expect(enhancer('hey http://www.youtube.com/watch?v=ks_520q4LEY ')).
            toBe('hey <iframe ' + 
                'src="https://www.youtube.com/embed/ks_520q4LEY" ' + 
                'frameborder="0" allowfullscreen></iframe> ');
    });


    it('should replace Youtube and set height', function () {
        expect(enhancer('hey http://www.youtube.com/watch?v=ksM520q4LEY ', height)).
            toBe('hey <iframe height="300" ' + 
                'src="https://www.youtube.com/embed/ksM520q4LEY" ' + 
                'frameborder="0" allowfullscreen></iframe> ');
    });


    it('should replace Youtube and set width', function () {
        expect(enhancer('hey http://www.youtube.com/watch?v=ksM520q4LEY ', height, width)).
            toBe('hey <iframe height="300" width="200" ' + 
                'src="https://www.youtube.com/embed/ksM520q4LEY" ' + 
                'frameborder="0" allowfullscreen></iframe> ');
    });
});