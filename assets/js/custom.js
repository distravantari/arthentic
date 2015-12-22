$(document).ready(function () {
    $('.offcanvas, .offcanvas-layer').click(function(){
        $('[data-toggle="offcanvas"]').toggleCanvas();
    });
    $('[data-toggle="offcanvas"]').click(function () {
        $(this).toggleCanvas();
    });

    $('.offcanvas').css({'transform': 'translate3d(-100%, 0, 0)'});
});

function closeAspirasiBox(){
    $('#formAspirasi').css({'transform': 'translate3d(0, 100%, 0)'});
    $('.offcanvas-layer-aspirasi').hide();
}

function showAspirasiBox(){
    $('#formAspirasi').css({'transform': 'translate3d(0, 0, 0)'});
    $('.offcanvas-layer-aspirasi').show();
}

(function($){
    $.fn.toggleCanvas = function(){
        var target = $(this).data('target');
        var status = $(this).hasClass('offcanvas-active');
        if(!status){
            $(target).css({'transform': 'translate3d(0%, 0, 0)'});
            $(this).addClass('offcanvas-active');
            $('.offcanvas-layer').show();
        }else{
            $(target).css({'transform': 'translate3d(-100%, 0, 0)'});
            $(this).removeClass('offcanvas-active');
            $('.offcanvas-layer').hide();
        }
    };
})(jQuery);

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function loadImage(){
    $('.title-content').each(function(e){
        $(e).attr('src', $(e).data('img'));
    });
}

function changeTitleHeader(title){
    $('#top-header').html(title);
}
