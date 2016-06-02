/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have url.', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
           });
         });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have name.', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           });
         });
    });


    /* a new test suite named "The menu" */
    describe('The menu', function() {

        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden.', function(){
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('is shown/hidden by click.', function(){
             menuIcon = $('.menu-icon-link');
             expect(menuIcon).toBeDefined();
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });

    });

    /*  a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });
      /* a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       it('is successful.', function(done) {
         var entries = $('.feed > .entry-link > .entry');
         expect(entries).toBeDefined();
         expect(entries.length).toBeGreaterThan(0);
         done();
       });

    });

    /* a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      var entries0;
      var entries1;
      /**
      load allFeeds[0] and get the list of entry-link in the callback. Then,
      load allFeeds[1] and get the list of entry-link at that time and call
      done() to notify asynchronous function is completed to Jasmine.
      */
      beforeEach(function(done) {
        loadFeed(0, function() {
          entries0 = $('.feed > .entry-link');
        });
        loadFeed(1, function() {
          entries1 = $('.feed > .entry-link');
          done();
        });
      });

      /* a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       it('is done successfully.', function(done) {
         // confirm entries0/entries1 are defined and they are not empty.
         expect(entries0).toBeDefined();
         expect(entries0.length).toBeGreaterThan(0);
         expect(entries1).toBeDefined();
         expect(entries1.length).toBeGreaterThan(0);
         var result = true;
         // checking all entries are different. To do so, it compares href attr.
         for (var i = 0; i < entries0.length && result; i++) {
           for (var j = 0; j < entries1.length && result; j++) {
             if (entries0[i].href == entries1[j].href) {
               result = false;
             }
           }
         }
         expect(result).toBe(true);
         done();
       });
    });

}());
