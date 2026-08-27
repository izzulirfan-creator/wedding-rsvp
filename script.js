/* =================================
   SUPABASE CONNECTION
================================= */

const SUPABASE_URL = "https://jxhadwdximyhgnydzyun.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_nJ5hl8_eX7onvXHAYjH5hw_TztMe41y";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =================================
   OPEN INVITATION
================================= */

function openInvitation() {

    // Hide cover
    document.querySelector(".cover").style.display = "none";

    // Show invitation
    document.querySelector("#invitation").style.display = "block";


    // Get music
    const music =
        document.getElementById("backgroundMusic");


    // Get music button
    const musicButton =
        document.getElementById("musicButton");


    // Show music button
    musicButton.style.display = "flex";


    // Play music
music.play().then(function() {

    musicButton.innerText = "🎵";

    musicButton.classList.add("playing");

}).catch(function(error) {

    console.log(
        "Music could not play:",
        error
    );

});


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* =================================
   MUSIC PLAYER
================================= */

const musicButton =
    document.getElementById("musicButton");

const music =
    document.getElementById("backgroundMusic");


musicButton.addEventListener("click", function() {

    if (music.paused) {

        music.play();

        musicButton.innerText = "🎵";

        musicButton.classList.add("playing");

    } else {

        music.pause();

        musicButton.innerText = "🔇";

        musicButton.classList.remove("playing");

    }

});


/* =================================
   COUNTDOWN TIMER
================================= */

const weddingDate = new Date(
    "May 31, 2026 11:00:00"
).getTime();


const countdown = setInterval(function () {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );


    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    document.getElementById("days").innerText = days;

    document.getElementById("hours").innerText = hours;

    document.getElementById("minutes").innerText = minutes;

    document.getElementById("seconds").innerText = seconds;


    if (distance < 0) {

        clearInterval(countdown);

        document.getElementById("countdown").innerHTML =
            "<p>THE DAY HAS ARRIVED ❤️</p>";

    }

}, 1000);


/* =================================
   RSVP FORM
================================= */

const rsvpForm = document.getElementById("rsvpForm");
const successMessage = document.getElementById("successMessage");

rsvpForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const attendanceElement =
        document.querySelector('input[name="attendance"]:checked');

    if (!attendanceElement) {
        alert("Please select your attendance.");
        return;
    }

    const attendance = attendanceElement.value;

    const pax = parseInt(
        document.getElementById("pax").value
    );

    const message =
        document.getElementById("message").value.trim();

    const submitButton =
        rsvpForm.querySelector(".submit-button");

    submitButton.disabled = true;
    submitButton.innerText = "SENDING...";

    console.log("Sending RSVP...");
    console.log({
        name,
        attendance,
        pax,
        message
    });

    try {

        const { error } = await supabaseClient
            .from("rsvps")
            .insert({
                name: name,
                attendance: attendance,
                pax: pax,
                message: message
            });

        if (error) {

            console.error("SUPABASE ERROR:", error);

            alert(
                "RSVP failed: " + error.message
            );

            submitButton.disabled = false;
            submitButton.innerText = "SEND RSVP";

            return;
        }

        console.log("RSVP successfully submitted!");

        rsvpForm.style.display = "none";

        successMessage.style.display = "block";

    } catch (err) {

        console.error("UNEXPECTED ERROR:", err);

        alert(
            "Something went wrong. Check Console."
        );

        submitButton.disabled = false;
        submitButton.innerText = "SEND RSVP";
    }

});
/* =================================
   LIGHTBOX GALLERY
================================= */

const galleryImages =
    document.querySelectorAll(".gallery-item img");


const imageSources = [];


galleryImages.forEach(function(image) {

    imageSources.push(image.src);

});


let currentImage = 0;


/* OPEN LIGHTBOX */

function openLightbox(imageSource) {

    const lightbox =
        document.getElementById("lightbox");


    const lightboxImage =
        document.getElementById("lightboxImage");


    currentImage =
        imageSources.indexOf(imageSource);


    lightboxImage.src =
        imageSources[currentImage];


    lightbox.style.display = "flex";


    updateCounter();


    document.body.style.overflow = "hidden";
}


/* CLOSE LIGHTBOX */

function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");


    lightbox.style.display = "none";


    document.body.style.overflow = "auto";
}


/* NEXT IMAGE */

function nextImage() {

    currentImage++;


    if (currentImage >= imageSources.length) {

        currentImage = 0;

    }


    showCurrentImage();
}


/* PREVIOUS IMAGE */

function previousImage() {

    currentImage--;


    if (currentImage < 0) {

        currentImage =
            imageSources.length - 1;

    }


    showCurrentImage();
}


/* SHOW CURRENT IMAGE */

function showCurrentImage() {

    const lightboxImage =
        document.getElementById("lightboxImage");


    lightboxImage.src =
        imageSources[currentImage];


    updateCounter();
}


/* UPDATE COUNTER */

function updateCounter() {

    const counter =
        document.getElementById("lightboxCounter");


    counter.innerText =
        `${currentImage + 1} / ${imageSources.length}`;
}


/* =================================
   KEYBOARD CONTROLS
================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const lightbox =
            document.getElementById("lightbox");


        if (lightbox.style.display !== "flex") {
            return;
        }


        if (event.key === "ArrowLeft") {

            previousImage();

        }


        if (event.key === "ArrowRight") {

            nextImage();

        }


        if (event.key === "Escape") {

            closeLightbox();

        }

    }
);


/* =================================
   SCROLL ANIMATION
================================= */

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


sections.forEach(function(section) {

    observer.observe(section);

});


/* =================================
   MOBILE SWIPE CONTROLS
================================= */

let touchStartX = 0;
let touchEndX = 0;


const lightbox =
    document.getElementById("lightbox");


lightbox.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


lightbox.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    if (swipeDistance < -50) {

        nextImage();

    }


    if (swipeDistance > 50) {

        previousImage();

    }

}
