# Bootstrap Rating

Bootstrap Rating is a jQuery plugin that creates a rating control that uses Bootstrap [glyphicons](http://glyphicons.com/) for rating symbols.

See [bootstrap rating](http://dreyescat.github.io/bootstrap-rating/) in action.

## Dependencies

Bootstrap Rating depends on [jQuery](http://jquery.com/) and Bootstrap for the rating symbols. Actually, it depends on the glyphs in font format that Bootstrap provides. 

    <link href="dist/css/bootstrap.css" rel="stylesheet">
    <script type="text/javascript" src="dist/js/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="bootstrap-rating.js"></script>  

## Usage

Bootstrap Rating uses a text input to keep the rating value. This value corresponds to the 0-based index of the selected rating.

    <input type="text" class="rating"/>

Any rating plugin is implicitly initialized if the *bootstrap-rating.js* is loaded after the *rating* inputs:

    <body>
      <input type="text" class="rating"/>
      <script type="text/javascript" src="bootstrap-rating.js"></script>
    </body>

Also it can be explicitly initialized just calling *.rating()* on the desired input:

    $('input').rating();

### Changing the rating symbols

The default rating symbols can be replaced with another ones. Just add the desired glyphicon for the filled and empty states:

    <input type="text" class="rating" data-filled="glyphicon-heart" data-empty="glyphicon-heart-empty"/>

Check the [available glyphs](http://getbootstrap.com/components/#glyphicons-glyphs).

Again, you can explicitly initialize the plugin passing the glyphicons as parameters:

    $('input').rating({
      filled: 'glyphicon-heart',
      empty: 'glyphicon-heart-empty'
    });

If you want to change the default glyphicons for all the rating controls, you only need to override the plugin default values:

    $.fn.rating.defaults.filled = 'glyphicon-heart';
    $.fn.rating.defaults.empty = 'glyphicon-heart-empty';

This needs only be called once, but remember to make these assignments before the rating controls are created.

### Setting rate range

The default range is [0..5), or in plain text, starting at 0 and stopping before 5.

It can be overriden by means of two data attributes, **data-start** for the start rate value and **data-stop** for the stop/end one. If you want to define a range [1..10):

    <input type="text" class="rating" data-start="1" data-stop="10"/>

Also you can explicitly initialize the plugin passing the start and stop values as parameters:

    $('input').rating({
      start: 1,
      stop: 10
    });

If what you need is to change the default start and stop values for all the rating controls, just override the plugin defaults:

    $.fn.rating.defaults.start = 1;
    $.fn.rating.defaults.stop = 10;
