/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
 describe('LinkEnhancer', function() {

    var enhancer;

    beforeEach(module('bernhardposselt.enhancetext')); 

    beforeEach(inject(function(LinkEnhancer) {
        enhancer = LinkEnhancer;
    }));


    it('should create links', function () {
        expect(enhancer('hey http://google.de', '_blank')).
            toBe('hey <a target="_blank" ' + 
                 'href="http://google.de">http://google.de</a>');
    });

});