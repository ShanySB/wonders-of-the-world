$(document).ready(function () {
    $('.clickable-card').click(function () {
        var currentSet = $(this).closest('.image-set');
        var nextSet = currentSet.next('.image-set');

        if (nextSet.length) {
            currentSet.fadeOut(500, function () {
                currentSet.removeClass('active');
                nextSet.fadeIn(500).addClass('active');

                // If there's no more next set, show reset button
                if (nextSet.next('.image-set').length === 0) {
                    $('#reset-btn').fadeIn();
                }
            });
        }
    });

    // Reset button functionality
    $('#reset-btn').click(function () {
        $('.image-set').fadeOut(500).removeClass('active');
        $('.image-set').first().fadeIn(500).addClass('active');
        $(this).fadeOut();
    });
});