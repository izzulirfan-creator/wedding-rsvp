/* =================================
   SUPABASE CONNECTION
================================= */

const SUPABASE_URL = "https://jxhadwdximyhgnydzyun.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_nJ5hl8_eX7onvXHAYjH5hw_TztMe41y";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =================================
   OPEN INVITATION
================================= */

function openInvitation() {

    const cover = document.querySelector(".cover");
    const invitation = document.getElementById("invitation");
    const music = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");


    /* ==============================
       HIDE COVER
    ============================== */

    if (cover) {
        cover.classList.add("opening");
    }


    /* ==============================
       SHOW INVITATION
    ============================== */

    if (invitation) {

        invitation.style.display = "block";

        // Show immediately — prevents blank page
        setTimeout(function () {
            invitation.classList.add("show-invitation");
        }, 50);

    }


    /* ==============================
       PLAY MUSIC
    ============================== */

    if (music) {

        music.volume = 0.5;

        music.play()
            .then(function () {

                console.log("🎵 Music started");

                if (musicButton) {

                    musicButton.style.display = "flex";

                    musicButton.innerText = "🎵";

                    musicButton.classList.add("playing");

                }

            })
            .catch(function (error) {

                console.log(
                    "Music could not start:",
                    error
                );

                // Show music button even if autoplay fails
                if (musicButton) {

                    musicButton.style.display = "flex";

                    musicButton.innerText = "🎵";

                }

            });

    }


    /* ==============================
       SCROLL TO TOP
    ============================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =================================
   BACKGROUND MUSIC
================================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


if (musicButton && music) {

    musicButton.addEventListener(
        "click",
        function () {

            if (music.paused) {

                music.play()
                    .then(function () {

                        musicButton.innerText = "🎵";

                        musicButton.classList.add(
                            "playing"
                        );

                    })
                    .catch(function (error) {

                        console.log(
                            "Music error:",
                            error
                        );

                    });

            } else {

                music.pause();

                musicButton.innerText = "🔇";

                musicButton.classList.remove(
                    "playing"
                );

            }

        }
    );

}


/* =================================
   COUNTDOWN TIMER
================================= */

const weddingDate =
    new Date(
        "May 31, 2026 11:00:00"
    ).getTime();


const countdown =
    setInterval(function () {

        const now =
            new Date().getTime();

        const distance =
            weddingDate - now;


        /* ==============================
           WEDDING DAY
        ============================== */

        if (distance < 0) {

            clearInterval(countdown);

            const countdownElement =
                document.getElementById(
                    "countdown"
                );

            if (countdownElement) {

                countdownElement.innerHTML =
                    "<p>THE DAY HAS ARRIVED ❤️</p>";

            }

            return;

        }


        /* ==============================
           CALCULATE TIME
        ============================== */

        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    distance %
                    (1000 * 60)
                ) /
                1000
            );


        /* ==============================
           UPDATE HTML
        ============================== */

        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (daysElement) {
            daysElement.innerText = days;
        }

        if (hoursElement) {
            hoursElement.innerText = hours;
        }

        if (minutesElement) {
            minutesElement.innerText = minutes;
        }

        if (secondsElement) {
            secondsElement.innerText = seconds;
        }

    }, 1000);


/* =================================
   RSVP FORM
================================= */

const rsvpForm =
    document.getElementById("rsvpForm");

const successMessage =
    document.getElementById("successMessage");


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ==============================
               GET FORM DATA
            ============================== */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const attendanceElement =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            if (!attendanceElement) {

                alert(
                    "Please select your attendance."
                );

                return;

            }


            const attendance =
                attendanceElement.value;


            const pax =
                parseInt(
                    document
                        .getElementById("pax")
                        .value
                );


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            const submitButton =
                rsvpForm.querySelector(
                    ".submit-button"
                );


            /* ==============================
               DISABLE BUTTON
            ============================== */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerText =
                    "SENDING...";

            }


            console.log(
                "Sending RSVP..."
            );


            try {

                const { error } =
                    await supabaseClient
                        .from("rsvps")
                        .insert({

                            name: name,

                            attendance:
                                attendance,

                            pax: pax,

                            message: message

                        });


                /* ==============================
                   SUPABASE ERROR
                ============================== */

                if (error) {

                    console.error(
                        "SUPABASE ERROR:",
                        error
                    );


                    alert(
                        "RSVP failed: " +
                        error.message
                    );


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerText =
                            "SEND RSVP";

                    }

                    return;

                }


                /* ==============================
                   SUCCESS
                ============================== */

                console.log(
                    "RSVP successfully submitted!"
                );


                rsvpForm.style.display =
                    "none";


                if (successMessage) {

                    successMessage.style.display =
                        "block";

                }

            }

            catch (error) {

                console.error(
                    "Unexpected error:",
                    error
                );


                alert(
                    "Something went wrong. Please try again."
                );


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerText =
                        "SEND RSVP";

                }

            }

        }
    );

}


/* =================================
   LIGHTBOX GALLERY
================================= */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );


const imageSources = [];


galleryImages.forEach(
    function (image) {

        imageSources.push(
            image.src
        );

    }
);


let currentImage = 0;


/* =================================
   OPEN LIGHTBOX
================================= */

function openLightbox(imageSource) {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    if (!lightbox || !lightboxImage) {
        return;
    }


    currentImage =
        imageSources.indexOf(
            imageSource
        );


    if (currentImage < 0) {

        currentImage = 0;

    }


    lightboxImage.src =
        imageSources[currentImage];


    lightbox.style.display =
        "flex";


    updateCounter();


    document.body.style.overflow =
        "hidden";

}


/* =================================
   CLOSE LIGHTBOX
================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    if (!lightbox) {
        return;
    }


    lightbox.style.display =
        "none";


    document.body.style.overflow =
        "auto";

}


/* =================================
   NEXT IMAGE
================================= */

function nextImage() {

    if (imageSources.length === 0) {
        return;
    }


    currentImage++;


    if (
        currentImage >=
        imageSources.length
    ) {

        currentImage = 0;

    }


    showCurrentImage();

}


/* =================================
   PREVIOUS IMAGE
================================= */

function previousImage() {

    if (imageSources.length === 0) {
        return;
    }


    currentImage--;


    if (currentImage < 0) {

        currentImage =
            imageSources.length - 1;

    }


    showCurrentImage();

}


/* =================================
   SHOW CURRENT IMAGE
================================= */

function showCurrentImage() {

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    if (!lightboxImage) {
        return;
    }


    lightboxImage.src =
        imageSources[currentImage];


    updateCounter();

}


/* =================================
   UPDATE COUNTER
================================= */

function updateCounter() {

    const counter =
        document.getElementById(
            "lightboxCounter"
        );


    if (counter) {

        counter.innerText =
            `${currentImage + 1} / ${imageSources.length}`;

    }

}


/* =================================
   KEYBOARD CONTROLS
================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        if (!lightbox) {
            return;
        }


        if (
            lightbox.style.display !==
            "flex"
        ) {

            return;

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousImage();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =================================
   SCROLL ANIMATION
================================= */

const sections =
    document.querySelectorAll(
        ".section"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


sections.forEach(
    function (section) {

        observer.observe(section);

    }
);


/* =================================
   MOBILE SWIPE CONTROLS
================================= */

let touchStartX = 0;
let touchEndX = 0;


const lightbox =
    document.getElementById(
        "lightbox"
    );


if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            handleSwipe();

        }
    );

}


/* =================================
   HANDLE SWIPE
================================= */

function handleSwipe() {

    const swipeDistance =
        touchEndX -
        touchStartX;


    if (
        swipeDistance < -50
    ) {

        nextImage();

    }


    if (
        swipeDistance > 50
    ) {

        previousImage();

    }

}
