$(document).ready(function () {
    let choices = [];

    $('.clickable-card').click(function () {
        let currentSet = $(this).closest('.image-set');
        let nextSet = currentSet.next('.image-set');
        let chosenImg = $(this).find('img').attr('src');

        // Save the chosen card
        choices.push(chosenImg);

        if (nextSet.length) {
            // Go to the Next set of imgs
            currentSet.fadeOut(500, function () {
                currentSet.removeClass('active');
                nextSet.fadeIn(500).addClass('active');
            });
        } else {
            // No more sets = show results
            currentSet.fadeOut(500, function () {
                // Show chosen cards
                choices.forEach(src => {
                    $('#chosen-cards').append(`
                        <div class="col-md-3 mb-3">
                            <img src="${src}" class="img-fluid rounded border">
                        </div>
                    `);
                });
            });

            $('#results').fadeIn(500);
        }
    });

    // Reset button functionality
    $('#reset-btn').click(function () {
        choices = [];
        $('#chosen-cards').empty();
        $('#results').fadeOut(500, function () {
            $('.image-set').hide().removeClass('active');
            $('.image-set').first().fadeIn(500).addClass('active');
        });
    });
});

    