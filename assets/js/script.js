

$(".col-sm-3").click(function () {
    $(this).text("You clicked me!");
    changeBackground();
});

function changeBackground() {
    let boxes = $(".col-sm-3");
    let colors = ["#037971", "#037971", "#03b5aa"]
    for (let index = 0; index < boxes.length; index++) {
        $(boxes[index]).css("background", colors[Math.floor(Math.random() * colors.length)])
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

/*
Geolocation
*/

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else {
        $("col-12 p").text("Geolocation is not supported by your browser");
    }
}


function showPosition(position) {
    let newLine = document.createElement("br")
    $(".col-12 p").append(position.coords.latitude, newLine, position.coords.longitude); 
}


/*
Map
*/
function showMyPosition(position) {
    let myLat = position.coords.latitude;
    let myLng = position.coords.longitude
    let mapProp = {
        center:new google.maps.LatLng(myLat, myLng),
        zoom:15,
    };
 
    let map = new google.maps.Map(document.getElementById("google-map"), mapProp);
}


function myMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMyPosition)
    }
}

function sendMail(contactForm) {
    emailjs.send("gmail", "rosie", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                $(".contact-heading").text("Thank You!");
                $(".contact-sub").text("I'll be back to you in no time!")
                resetForm();
                setTimeout(function () {
                    $(".contact-heading").text("Got a project in mind?");
                    $(".contact-sub").text("Let's work together!")  
                }, 8000)
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;  // To block from loading a new page
}

function resetForm() {
    $("input, textarea").val("");
}