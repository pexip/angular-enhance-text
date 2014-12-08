/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
app.factory('TextEnhancer',
function (SmileyEnhancer, VideoEnhancer, NewLineEnhancer, ImageEnhancer,
          YouTubeEnhancer, LinkEnhancer) {
    return function (text, options) {
        text = escapeHtml(text);
        text = SmileyEnhancer(text, options.smilies);

        if (options.embedImages) {
            text = ImageEnhancer(text, options.embeddedImagesHeight,
                                 options.embeddedVideosWidth,
                                 options.embeddedLinkTarget);
        }

        if (options.embedVideos) {
            text = VideoEnhancer(text, options.embeddedImagesHeight,
                                 options.embeddedVideosWidth);
        }

        if (options.embedYoutube) {
            text = YouTubeEnhancer(text, options.embeddedYoutubeHeight,
                                   options.embeddedYoutubeWidth);
        }

        if (options.newLineToBr) {
            text = NewLineEnhancer(text);
        }

        if (options.embedLinks) {
            text = LinkEnhancer(text, options.embeddedLinkTarget);
        }

        return text;
    };
});

