(function ($, undefined) {
  'use strict';

  var OFFSET = 5;

  $.fn.rating = function (options) {
    var fillUntil = function (rate, filled, empty) {
      var $rate = $(rate);
      // Fill rating until the selected one (selected one included).
      $rate.prevAll('.rating-symbol').addBack()
        .removeClass(empty).addClass(filled);
      // Empty rating from the selected one to the end.
      $rate.nextAll('.rating-symbol')
        .removeClass(filled).addClass(empty);
    };

    var fillUntilRate = function ($rating, value, opts) {
      var rate = parseInt(value, 10);
       // Check the value is a valid rate according to the step.
      if (!isNaN(rate) && rate % opts.step === 0) {
        var $rates = $rating.children();
        var index = Math.max(Math.ceil((rate - opts.start) / opts.step), 0);
        // Check the index is between the proper range [0..length).
        if (0 <= index && index < $rates.length) {
          fillUntil($rates[index], opts.filled, opts.empty);
        }
      }
    };

    this.each(function () {
      var $input = $(this);
      // Merge data and parameter options.
      // Those provided as parameter prevail over the data ones.
      var opts = $.extend({}, $input.data(), options);
      // Sanitize start, stop, and step.
      // All of them start, stop, and step must be integers.
      // In case we don't have a valid stop rate try to get a reasonable
      // one based on the existence of a valid start rate.
      opts.start = parseInt(opts.start, 10) || undefined;
      opts.stop = parseInt(opts.stop, 10) ||
                     opts.start + OFFSET ||
                     undefined;
      opts.step = parseInt(opts.step, 10) || undefined;

      // Extend/Override the default options with those provided either as
      // data attributes or function parameters.
      opts = $.extend({}, $.fn.rating.defaults, opts);

      // Build the rating control.
      var $rating = $('<div></div>').insertBefore($input);
      var length = Math.max(Math.ceil((opts.stop - opts.start) / opts.step), 0);
      for (var i = 0; i < length; i++) {
        $rating.append('<div class="rating-symbol glyphicon ' + opts.empty + '"></div>');
      }
      // Initialize the rating control with the associated input value.
      fillUntilRate($rating, $input.val(), opts);

      // Keep rating control and its associated input in sync.
      $input
        .on('change', function () {
          fillUntilRate($rating, $(this).val(), opts);
        });

      $rating
        .on('click', '.rating-symbol', function () {
          if (!$input.prop('disabled') && !$input.prop('readonly')) {
            var $this = $(this);
            fillUntil(this, opts.filled, opts.empty);
            // Set input to the current value and 'trigger' the change handler.
            $input.val(opts.start + $this.index() * opts.step).change();
          }
        });
    });
  };

  // Plugin defaults.
  $.fn.rating.defaults = {
    filled: 'glyphicon-star',
    empty: 'glyphicon-star-empty',
    start: 0,
    stop: OFFSET,
    step: 1
  };

  $(function () {
    $('input.rating').rating();
  });
}(jQuery));
