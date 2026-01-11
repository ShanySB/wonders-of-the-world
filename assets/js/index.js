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

    /* =====================
       DATE LIMIT HANDLING
    ====================== */

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() + 1);

    function formatDate(d) {
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${d.getFullYear()}-${month}-${day}`;
    }

    const minDateStr = formatDate(today);
    const maxDateStr = formatDate(maxDate);

    $("#start-date, #end-date")
        .attr("min", minDateStr)
        .attr("max", maxDateStr);

    $("#start-date").on("change", function () {
        $("#end-date").attr("min", $(this).val());
    });

    $("#travel-form").on("submit", function (e) {
        e.preventDefault();

        const startVal = $("#start-date").val();
        const endVal = $("#end-date").val();

        if (!startVal || !endVal) {
            alert("Please select both dates.");
            return;
        }

        if (startVal < minDateStr) {
            alert("Travel dates cannot be in the past.");
            return;
        }

        if (endVal > maxDateStr) {
            alert("Travel dates cannot be more than one year in the future.");
            return;
        }

        if (endVal < startVal) {
            alert("End date cannot be before start date.");
            return;
        }

        localStorage.setItem(
            "travelDates",
            JSON.stringify({ startDate: startVal, endDate: endVal })
        );

        // ONLY move forward if valid
        $("#travel-dates").fadeOut(500, function () {
            $("#image-sets").fadeIn(500);
            $(".image-set").first().fadeIn(500).addClass("active");
        });
    });

    /* =====================
       CARD SELECTION
    ====================== */

    let choices = [];

    function action() {

        //Prevent double clicks
        if ($(this).hasClass("disabled")) return;

        //disable all cards in this set
        $(this).closest(".image-set")
            .find(".clickable-card")
            .addClass("disabled");

        let currentSet = $(this).closest('.image-set');
        let nextSet = currentSet.next('.image-set');
        let chosenImg = $(this).find('img').attr('src');
        let chosenText = $(this).find('.card-text').text();

        choices.push({ img: chosenImg, text: chosenText });

        if (nextSet.length) {
            currentSet.fadeOut(500, function () {
                currentSet.removeClass('active');
                nextSet.fadeIn(500).addClass('active');
            });
        } else {
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

    $('.clickable-card').click(action);

    $('#confirm-btn').click(function () {
        localStorage.setItem("userChoices", JSON.stringify(choices));
        window.location.href = "form.html";
    });

    function reset() {
        choices = [];
        $('#chosen-cards').empty();
        $('#breakdown-list').empty();
        $('#results').hide();
        $('.image-set').hide().removeClass('active');
    }

    $('#reset-btn').click(reset);

    // Initial state
    reset();

});
