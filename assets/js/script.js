

$(".col-sm-3").click(function () {
    $(this).text("You clicked me!");
    changeBackground();
});

function changeBackground() {
    let boxes = $(".col-sm-3");
    let colors = ["blue", "green", "yellow"]
    for (let index = 0; index < boxes.length; index++) {
        $(boxes[index]).css("background", colors[index])
    }
}

function resetBoxes() {
    $(".col-sm-3").text("One of three columns").css("background", " #037971");
}

$("#reset-box").click(function () {
    resetBoxes();
});

fetch("https://swapi.dev/api/starships/") // Call the fetch function passing the url of the API as a parameter
    .then((response) => response.json())
    .then(function (data) {
        console.log(data.results);
        createButtons(data);
        $(".open-modal").click(function () {
            $("li").remove();
            let ship = this.getAttribute("data-item");
            let speed = document.createElement("li")
            let crew = document.createElement("li")
            let cargo = document.createElement("li")
            let passengers = document.createElement("li")
            $(speed).text("Max atmospheric speed: " + data.results[ship].max_atmosphering_speed)
            $(crew).text("Crew: " + data.results[ship].crew)
            $(cargo).text("Cargo capacity: " + data.results[ship].cargo_capacity)
            $(passengers).text("Passengers: " + data.results[ship].passengers)
            $(".modal-title").text(data.results[ship].name)
            $(".specs").append(speed, crew, cargo, passengers)
        })

    })
    .catch(function () {
        $("#ships").text("Something went wrong..");
    })

function createButtons(someJson) {
    for (let index = 0; index < someJson.results.length; index++) {
        let button = document.createElement("button")
        $(button).attr('data-item', index)
        $(button).addClass("open-modal btn btn-light mx-1 my-1")
        $(button).attr('data-target', "#star-wars-modal")
        $(button).attr('data-toggle', "modal")
        $(button).text(someJson.results[index].name)
        $("#ships").append(button)
    }
}
