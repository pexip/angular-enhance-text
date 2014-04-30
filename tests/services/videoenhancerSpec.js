/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */

 describe('VideoEnhancer', function() {

    var videoEnhancer,
        width,
        height;

    beforeEach(module('bernhardposselt.enhancetext')); 

    beforeEach(inject(function(VideoEnhancer) {
        videoEnhancer = VideoEnhancer;
        width = 200;
        height = 300;
    }));


    it('should embed videos', function () {
        expect(videoEnhancer('hey http://google.de/test.webm ')).
            toBe('hey <video src="http://google.de/test.webm" controls preload="none"></video> ');
    });


    it('should replace videos and set height', function () {
        expect(videoEnhancer('hey http://google.de/test.webm', height)).
            toBe('hey <video height="300" src="http://google.de/test.webm" controls preload="none"></video>');
    });


    it('should replace videos and set width', function () {
        expect(videoEnhancer('hey http://google.de/test.webm', height, width)).
            toBe('hey <video height="300" width="200"' + 
                ' src="http://google.de/test.webm" controls preload="none"></video>');
    });

});