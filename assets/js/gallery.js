/**
 * Popup modal functionality
 */
$(document).ready(function () {
    // When any image with data-country is clicked
    $(".place-img").click(function () {
        let country = $(this).data("country");

        // Update modal title
        $("#modal-title").text(country);

        // Fetch summary from Wikipedia API
        $.getJSON(`https://en.wikipedia.org/api/rest_v1/page/summary/${country}`, function (data) {
            $("#modal-body").html(`
        <p>${data.extract}</p>
        <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
      `);
        }).fail(function () {
            $("#modal-body").text("Sorry, no information found.");
        });

        // Show the modal
        $("#infoModal").modal("show");
    });
});
