$(document).ready(function () {
    /**
     * Introduction screen functionality
     */
    function showFirstSet() {
        $('#intro-screen').fadeOut(500, function () {
            $('#image-sets').fadeIn(500);
        });
    }

    let introTimeout = setTimeout(showFirstSet, 5000);

    // Skip intro button
    $('#skip-btn').click(function () {
        clearTimeout(introTimeout); // stop auto-fade
        showFirstSet(); // immediately show first set
    });

    /**
     * Card selection functionality
     */
    let choices = [];

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
                choices.forEach(choice => {
                    $('#chosen-cards').append(`
                        <div class="col-md-3 mb-3">
                            <div class="card chosen-card">
                                <img src="${choice.img}" class="img-fluid rounded border">
                                <div class="overlay">
                                   <p>${choice.text}</p>
                                </div>
                            </div>
                        </div>
                    `);

                    // Add to the breakdown list
                    $('#breakdown-list').append(`<li>${choice.text}</li>`);
                });
            });

            $('#results').fadeIn(500);
        }
    }

    // Confirm button click, saves choices & go to form page
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
