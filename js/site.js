$(function() {
    // Home page.
    $('.js-blog-show-more').on('click', function(e) {
        e.preventDefault();
        var $blogSection = $('.js-section-blog');
        var oldHeight = $blogSection.height();

        $blogSection.removeClass('is--brief');
        var newHeight = $blogSection.height();
        $blogSection.css('height', oldHeight).animate({
            height: newHeight
        }, 500, function() {
            $blogSection.removeAttr('style');
        });
        
        $(this).hide();
    });
});