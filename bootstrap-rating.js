(function ($) {
  'use strict';

  $.fn.rating = function (options) {
    var $clones = $([]);
    this.each(function () {
      var $this = $(this);
      var data = {
        filled: $this.data('filled'),
        empty: $this.data('empty')
      };
      // Extend/Override the default options with those provided.
      // Those provided as parameter prevail over the data ones.
      var opts = $.extend({}, $.fn.rating.defaults, data, options);

      var $rating = $('<div></div>');
      for (var i = 0; i < 5; i++) {
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
          // Set input to the current value (0-based) and 'trigger' the 
          // change handler.
          $input.val($this.index()).change();
        }).insertBefore($input);
    });

    return $clones;
  };

  // Plugin defaults.
  $.fn.rating.defaults = {
    filled: 'glyphicon-star',
    empty: 'glyphicon-star-empty'
  };

  $(function () {
    $('input[type=text].rating').rating();
  });
}(jQuery));
