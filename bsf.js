/* =========================================
   RAKSHA BANDHAN COUNTDOWN
   28 AUGUST 2026 - INDIA
========================================= */

// Raksha Bandhan 2026
// Midnight at the beginning of 28 August
const rakshaBandhanDate =
    new Date("2026-08-28T00:00:00+05:30").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference =
        rakshaBandhanDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.getElementById("countdownMessage").innerHTML =
            "🎉 It's Raksha Bandhan! Happy Raksha Bandhan, Kashish! ❤️";

        return;
    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (difference %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   OPEN SURPRISE
========================================= */

function openSurprise() {

    document.querySelector(".countdown-section")
        .scrollIntoView({
            behavior: "smooth"
        });

    createConfetti();

}


/* =========================================
   GIFT BOX
========================================= */

function openGift() {

    const message =
        document.getElementById("giftMessage");

    message.classList.add("show");

    createConfetti();
    playSong2();
    setTimeout(() => {

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);
}


/* =========================================
   FLOATING HEARTS
========================================= */

const heartContainer =
    document.querySelector(".hearts-container");


const heartSymbols = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💓",
    "🌸",
    "🎀"
];


function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML =
        heartSymbols[
            Math.floor(
                Math.random() *
                heartSymbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (Math.random() * 15 + 15) + "px";


    heart.style.animationDuration =
        (Math.random() * 5 + 6) + "s";


    heartContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 11000);
}


setInterval(createHeart, 900);


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const canvas =
        document.getElementById(
            "confettiCanvas"
        );

    canvas.style.display = "block";

    const ctx =
        canvas.getContext("2d");


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    const pieces = [];

    const symbols = [
        "❤️",
        "💕",
        "🌸",
        "🎀",
        "✨",
        "💗"
    ];


    for (let i = 0; i < 120; i++) {

        pieces.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height
                -
                canvas.height,

            size:
                Math.random() * 18 + 10,

            speed:
                Math.random() * 4 + 2,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                Math.random() * 6 - 3,

            symbol:
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ]

        });

    }


    let animation;


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        let finished = true;


        pieces.forEach(piece => {

            piece.y += piece.speed;

            piece.rotation +=
                piece.rotationSpeed;


            if (
                piece.y <
                canvas.height + 50
            ) {
                finished = false;
            }


            ctx.save();


            ctx.translate(
                piece.x,
                piece.y
            );


            ctx.rotate(
                piece.rotation *
                Math.PI /
                180
            );


            ctx.font =
                piece.size + "px Arial";


            ctx.fillText(
                piece.symbol,
                0,
                0
            );


            ctx.restore();

        });


        if (!finished) {

            animation =
                requestAnimationFrame(
                    animate
                );

        } else {

            cancelAnimationFrame(
                animation
            );

            canvas.style.display =
                "none";
        }

    }


    animate();
}


/* =========================================
   TWO SONG MUSIC SYSTEM
========================================= */

const musicBtn = document.getElementById("musicBtn");

const song1 = document.getElementById("song1");
const song2 = document.getElementById("song2");

let currentSong = song1;
let musicPlaying = false;


/* Play / Pause button */

musicBtn.addEventListener("click", function () {

    if (!musicPlaying) {

        currentSong.play()
            .then(() => {

                musicPlaying = true;
                musicBtn.innerHTML = "🔊";

            })
            .catch(() => {

                alert("Please make sure song1.mp3 and song2.mp3 are in the same folder as bsf.html.");

            });

    } else {

        currentSong.pause();

        musicPlaying = false;

        musicBtn.innerHTML = "🎵";
    }

});


/* Switch to Song 2 */

function playSong2() {

    song1.pause();

    song1.currentTime = 0;

    currentSong = song2;

    song2.currentTime = 0;

    song2.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.innerHTML = "🔊";

        })
        .catch(() => {

            musicPlaying = false;

            musicBtn.innerHTML = "🎵";

        });

}



/* =========================================
   RESIZE CONFETTI
========================================= */

window.addEventListener(
    "resize",
    function () {

        const canvas =
            document.getElementById(
                "confettiCanvas"
            );

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }
);