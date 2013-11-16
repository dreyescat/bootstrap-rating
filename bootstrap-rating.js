(function ($, undefined) {
  'use strict';

  var OFFSET = 5;

  $.fn.rating = function (options) {
    var $clones = $([]);
    this.each(function () {
      var $this = $(this);
      var data = {
        filled: $this.data('filled'),
        empty: $this.data('empty'),
        start: $this.data('start'),
        stop: $this.data('stop')
      };
      // Merge data and parameter options.
      // Those provided as parameter prevail over the data ones.
      var opts = $.extend({}, data, options);
      // Sanitize start and stop rates.
      // Both start and stop rate must be integers.
      // In case we don't have a valid stop rate try to get a reasonable
      // one based on the existence of a valid start rate.
      opts.start = parseInt(opts.start, 10) || undefined;
      opts.stop = parseInt(opts.stop, 10) ||
                     opts.start + OFFSET ||
                     undefined;

      // Extend/Override the default options with those provided either as
      // data attributes or function parameters.
      opts = $.extend({}, $.fn.rating.defaults, opts);

      var $rating = $('<div></div>');
      for (var i = opts.start; i < opts.stop; i++) {
        $rating.append('<div class="rating-symbol glyphicon ' + opts.empty + '"></div>');
      }
      // From jQuery.fn.prop (http://api.jquery.com/prop/):
      // Attempting to change the type property (or attribute) of an input element
      // created via HTML or already in an HTML document will result in an error
      // being thrown by Internet Explorer 6, 7, or 8.
      // 
      // The solution:
      // Change the type to a cloned one (with event handlers included). Then
      // replace the original one with the cloned one.
      var $input = $this.clone(true).prop('type', 'hidden');
      $this.replaceWith($input);
      // Add the clone into the list of DOM objects to be returned.
      $clones.push($input[0]);

      $rating
        .on('click', '.rating-symbol', function () {
          var $this = $(this);
          // Fill rating until the selected one (selected one included).
          $this.prevAll('.rating-symbol').addBack()
            .removeClass(opts.empty).addClass(opts.filled);
          // Empty rating from the selected one to the end.
          $this.nextAll('.rating-symbol')
            .removeClass(opts.filled).addClass(opts.empty);
          // Set input to the current value and 'trigger' the change handler.
          $input.val(opts.start + $this.index()).change();
        }).insertBefore($input);
    });

    return $clones;
  };

  // Plugin defaults.
  $.fn.rating.defaults = {
    filled: 'glyphicon-star',
    empty: 'glyphicon-star-empty',
    start: 0,
    stop: OFFSET
  };

  $(function () {
    $('input[type=text].rating').rating();
  });
}(jQuery));
