/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING file.
 */

 describe('bposselt-enhance', function() {

    var filter;

    // use the Notes container
    beforeEach(module('angular-enhance-text'));

    beforeEach(inject(function ($filter) {
        filter = $filter('bposselt-enhance');
    }));

    it('should not change a normal string', function () {  
        expect(filter('This is a test')).toBe('This is a test');
    });

});