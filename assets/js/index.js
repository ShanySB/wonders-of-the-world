$(document).ready(function () {
    /**
     * Show travel dates after intro
     */
    function showTravelDates() {
        $('#intro-screen').fadeOut(500, function () {
            $('#travel-dates').fadeIn(500);
        });
    }

    // Auto-fade after 5s
    let introTimeout = setTimeout(showTravelDates, 5000);

    // Skip intro button
    $('#skip-btn').click(function () {
        clearTimeout(introTimeout);
        showTravelDates();
    });

    //Travel date form handling
    $("#travel-form").on("submit", function (e) {
        e.preventDefault();

        let startDate = $("#start-date").val();
        let endDate = $("#end-date").val();

        if (!startDate || !endDate) {
            alert("Please select both dates before continuing.");
            return;
        }

        // Save travel dates
        localStorage.setItem("travelDates", JSON.stringify({ startDate, endDate }));

        // Hide dates & show first image set
        $("#travel-dates").fadeOut(500, function () {
            $("#image-sets").fadeIn(500);
            $(".image-set").first().fadeIn(500).addClass("active");
        });
    });

    /**
     * Card selection functionality
     */
    let choices = [];

    function action() {
        let currentSet = $(this).closest('.image-set');
        let nextSet = currentSet.next('.image-set');
        let chosenImg = $(this).find('img').attr('src');
        let chosenText = $(this).find('.card-text').text();

        // Save choice
        choices.push({ img: chosenImg, text: chosenText });

        if (nextSet.length) {
            currentSet.fadeOut(500, function () {
                currentSet.removeClass('active');
                nextSet.fadeIn(500).addClass('active');
            });
        } else {
            // Show results if no more sets
            currentSet.fadeOut(500, function () {
                choices.forEach(choice => {
                    $('#chosen-cards').append(`
                        <div class="col-md-3 mb-3">
                            <div class="card chosen-card">
                                <img src="${choice.img}" class="img-fluid rounded border">
                                <div class="overlay"><p>${choice.text}</p></div>
                            </div>
                        </div>
                    `);
                    $('#breakdown-list').append(`<li>${choice.text}</li>`);
                });
            });
            $('#results').fadeIn(500);
        }
    }

    // Confirm button
    $('#confirm-btn').click(function () {
        localStorage.setItem("userChoices", JSON.stringify(choices));
        window.location.href = "form.html";
    });
});
