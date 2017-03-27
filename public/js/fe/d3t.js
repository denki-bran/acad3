/**
 * Created by dingjunyi on 2017/3/17.
 */
/*range-silder*/
(function() {
    $("#range").slider({
        orientation: "vertical",
        range: "min",
        min: 5,
        max: 25,
        value: 15,
        slide: function(e, ui) {
            return $(".ui-slider-handle").html(ui.value);
        }
    });

    $(".ui-slider-handle").html("15");

}).call(this);
//d3 start
