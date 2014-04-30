/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
function getDimensionsHtml (height, width) {
    var dimensions = '';
    if (angular.isDefined(height)) {
        dimensions += 'height="' + height + '" ';
    }

    if (angular.isDefined(width)) {
        dimensions += 'width="' + width + '" ';
    }

    return dimensions;
}