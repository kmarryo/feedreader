/* feedreader.js*/

$(function () {
    // Test suite RSS Feeds
    describe('RSS Feeds', function () {
        //Checks if the allFeeds variable is defined and not empty (has feeds in it)
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Checks if the feeds have a URL provided
        it('have a URL and the URL is not empty', function () {
            // Loops through the allFeeds array and checks if the url of every feed is defined and not empty
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        // Checks if every feed has a name provided
        it('have a name provided', function () {
            // Loops through the allFeeds array and checks if the name of the feeds are defined and not empty
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    // Test suite The menu
    describe('The menu', function () {
        // Checks if menu bar is hidden by default. Because this is accomplished by css we check, if the body tag has the class .menu-hidden
        // which ensures the menu is invisible
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Checks if menu changes its visibility by click on the .menu-icon-link
        it('gets visible by click on the menu icon and hides on another click', function () {
            // First click: Menu should NOT be hidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Second click: Menu SHOULD be hidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    // Test suite Initial Entries
    describe('Initial Entries', function () {
        // beforeEach for async request
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        // Checks if at least one .entry element is within the .feed-container
        it('have at least one entry in the feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);

        });
    });


    // Test Suite New Feed Selection

    describe('New Feed Selection', function () {

// Define oldFeeds variable to get the html of the previous feeds
        var oldFeeds;
        // beforeEach for async request
        beforeEach(function (done) {
            loadFeed(0, function () {
                oldFeeds = $('.feed').html();
                loadFeed(1, function () {
                    done();
                });
            });
        });

        it('actually changes the content of the feed', function (done) {
            // Get HTML of the new feeds and compare them against the old feeds
            var newFeeds = $('.feed').html();
            expect(newFeeds).not.toBe(oldFeeds);
            done();
        });
    });

}());
