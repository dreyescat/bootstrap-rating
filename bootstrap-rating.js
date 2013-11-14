(function ($) {
  'use strict';

  $.fn.rating = function () {
    return this.each(function () {
      var $this = $(this);
      var $rating = $('<div></div>');
      for (var i = 0; i < 5; i++) {
        $rating.append('<div class="rating-symbol glyphicon glyphicon-star-empty"></div>');
      }
      // From jQuery.fn.prop (http://api.jquery.com/prop/):
      // Attempting to change the type property (or attribute) of an input element
      // created via HTML or already in an HTML document will result in an error
      // being thrown by Internet Explorer 6, 7, or 8.
      // 
      // The solution:
      // Change the type to a cloned one. Clone with event handlers.
      var $input = $this.clone(true).prop('type', 'hidden');
      $rating.append($input);

      $rating
        .on('click', '.rating-symbol', function () {
          var $this = $(this);
          // Fill rating until the selected one (selected one included).
          $this.prevAll('.rating-symbol').addBack()
            .removeClass('glyphicon-star-empty').addClass('glyphicon-star');
          // Empty rating from the selected one to the end.
          $this.nextAll('.rating-symbol')
            .removeClass('glyphicon-star').addClass('glyphicon-star-empty');
          // Set input to the current value (0-based) and 'trigger' the 
          // change handler.
          $input.val($this.index()).change();
        });

      $this.replaceWith($rating);
    });
  };

  $(function () {
    $('input[type=text].rating').rating();
  });
}(jQuery));
