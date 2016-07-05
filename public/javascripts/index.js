/**
 * Created by yeming on 4/7/2016.
 */
$(function () {
    $(".nav-header").click();
    $(".nav-header").on("click", function () {
        var that = $(this).find(".pull-right");
        if (that.hasClass("glyphicon-chevron-down")) {
            that.removeClass("glyphicon-chevron-down").addClass("glyphicon glyphicon-chevron-up");
        } else {
            that.removeClass("glyphicon-chevron-up").addClass("glyphicon glyphicon-chevron-down");
        }
    });

    $.get('/getAllMenus', function (menu) {
        var $nav = $('.nav-sidebar');
        $.each(menu, function (i, parent) {
            var $li = $('<li></li>');
            $li.append("<a href='#setting" + i + "' class='nav-header' data-togle='collapse'><i class='glyphicon glyphicon-cog'></i>" + parent.name + "<span class='pull-right glyphicon glyphicon-chevron-up'></span> " + "</a>");
            var $ul = $("<ul id='setting" + i + "' class='nav nav-tabs-justified'></ul>");
            $.each(parent.children, function(j, son){
                $ul.append("<li><a href='" + son.url + "' style='margin-left: 20px'><i class='glyphicon glyphicon-user'></i>" +son.name+ "</a>" + "</li>");
            });
            $li.append($ul);
            $nav.append($li)
        });
    });
});