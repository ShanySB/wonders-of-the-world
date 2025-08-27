$(document).ready(function () {
    // Get saved choices from localStorage
    let savedChoices = JSON.parse(localStorage.getItem("userChoices") || "[]");

    // Debugging - check console
    console.log(savedChoices);

    // Display breakdown list
    let breakdownContainer = $("#breakdown-list");

  if (savedChoices.length > 0) {
        savedChoices.forEach((src, index) => {
            breakdownContainer.append(`
                <div class="col-md-3 mb-3 text-center">
                <div class="card chosen-card">
                    <img src="${src}" class="img-fluid rounded border">
                    <div class="overlay">
                        <p>Choice ${index + 1}</p>
            `);
        });
    } else {
        breakdownContainer.append("<li>No choices were saved.</li>");
    }
});
