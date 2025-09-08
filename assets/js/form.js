$(document).ready(function () {
    /**
     * Action method to enable shown choices & travel dates in a breakdown list
     */
    // Get saved choices from localStorage
    let savedChoices = JSON.parse(localStorage.getItem("userChoices") || "[]");
    let travelDates = JSON.parse(localStorage.getItem("travelDates") || "{}");

    // Show travel dates if available
    if (travelDates.startDate && travelDates.endDate) {
        $("#travel-dates-summary").text(
            `Travel Dates: ${travelDates.startDate} → ${travelDates.endDate}`
        );
    }

    if (savedChoices.length > 0) {
        savedChoices.forEach(choice => {
            // Show each chosen card
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

            // Add to breakdown list
            $('#breakdown-list').append(`<li>${choice.text}</li>`);
        });
    } else {
        // Fallback if nothing was chosen
        $('#chosen-cards').append("<p>No choices saved.</p>");
    }
});
