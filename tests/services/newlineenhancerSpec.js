/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
 describe('NewLineEnhancer', function() {

    var enhancer;

    beforeEach(module('bernhardposselt.enhancetext')); 

    beforeEach(inject(function(NewLineEnhancer) {
        enhancer = NewLineEnhancer;
    }));


    it('should replace new lines', function () {
        expect(enhancer('This \nis a test\n')).toBe('This <br/>is a test<br/>');
    });


    it('should replace new lines codes', function () {
        expect(enhancer('This &#10;is a test&#10;')).toBe('This <br/>is a test<br/>');
    });

});