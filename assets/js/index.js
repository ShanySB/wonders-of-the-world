$(document).ready(function () {
    let choices = [];

    /**
     * Action method to enable cards to cycle through choices
     */
    function action() {
        let currentSet = $(this).closest('.image-set');
        let nextSet = currentSet.next('.image-set');
        let chosenImg = $(this).find('img').attr('src');
        let chosenText = $(this).find('.card-text').text(); // grab description text from card

        // Save the chosen card (image & text)
        choices.push({ img: chosenImg, text: chosenText });

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
                            <div class="card chosen-card">
                                <img src="${src}" class="img-fluid rounded border">
                                <div class="overlay">
                                   <p>${src.split('/').pop().split('.')[0]}</p>
                                </div>
                            </div>
                        </div>
                    `);

                    // Add to the breakdown list
                    $('#breakdown-list').append(`<li>${src.split('/').pop().split('.')[0]}</li>`);
                });
            });

            $('#results').fadeIn(500);
        }
    }

    // Confirm button click
$('#confirm-btn').click(function () {
    localStorage.setItem("userChoices", JSON.stringify(choices));
    // Redirect to form page
    window.location.href = "form.html";
});

    /**
     * Reset method to call once user completes selection
     */
    function reset() {
        choices = [];
        $('#chosen-cards').empty();
        $('#results').fadeOut(500, function () {
            $('.image-set').hide().removeClass('active');
            $('.image-set').first().fadeIn(500).addClass('active');
        });
    }

    // Attach events
    $('.clickable-card').click(action);
    $('#reset-btn').click(reset);

    // Run reset at start
    reset();
});
