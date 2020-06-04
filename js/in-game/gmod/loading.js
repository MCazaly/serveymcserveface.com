const spinners = ["bafl", "bmo", "camper", "fakas", "mafn", "megafire", "n00beh", "tsouki", "kean", "weirdwolf", "jay", "randomgamer"];
const spinner_name = spinners[Math.floor(Math.random() * spinners.length)];
var spinner_src = "../../assets/images/avatars/" + spinner_name + ".png";
const spinner = new Image();
spinner.src = spinner_src;
var jazz_avatars = [];
const tram_interior_src = "../../assets/images/in-game/gmod/tram_interior.png"
const tram_exterior_src = "../../assets/images/in-game/gmod/tram_exterior.png"
const tram_size = 800;
const passenger_size = tram_size / 10;
var tram_left = -tram_size;
const astley = "../../assets/audio/astley.ogg";
const chevere = "../../assets/audio/que_chevere.ogg"
var status = "";

const messages = [
    "Extending Bafl's hitbox...",
    "Raising BMO's karma...",
    "Discombobulating Camper...",
    "Removing Fakas from your head...",
    "Yeeting Mafn out of an airlock...",
    "Turning MegaFire's corpse into a bomb...",
    "Spawning an explosive barrel near n00beh...",
    "Lowering Tsouki's karma...",
    "Infecting Kean...",
    "Yiffing WeirdWolf...",
    "Deleting Jay's textures...",
    "Distracting RandomGamer with breasts..."
];

var files_total = 0;
var files_needed = 0;
var file_downloading;
var rotation = 0;
var meme = window.location.toString().indexOf("meme=true") !== -1;
var jazz = window.location.toString().indexOf("jazz=true") !== -1;
var today = new Date();
var april_fools = today.getMonth() === 3 && today.getDate() === 1;
var debug = window.location.toString().indexOf("debug=true") !== -1;
var old = window.navigator.userAgent.indexOf("Awesomium") !== -1;


if (meme || jazz || april_fools || Math.ceil(Math.random() * 100) === 100) {
    if (!old && (jazz || Math.round(Math.random()) === 1)) {
        jazz = true;
        var temp_avatars = spinners;
        for (var ii in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
            var avatar_index =  Math.floor(Math.random() * temp_avatars.length);
            jazz_avatars.push(temp_avatars[avatar_index]);
            temp_avatars.splice(avatar_index, 1);
        }
    } else {
        meme = true;
        spinner_src = "../../assets/images/astley.gif"
    }
}


// Garry's Mod Functions
function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    document.getElementById("title").innerText = servername;
    document.getElementById("map_name").innerText = mapname;
    document.getElementById("gamemode_name").innerText = gamemode;
    document.getElementById("status").innerText = "Retrieving server info...";
    showPage();
}

function SetFilesTotal(total) {
    files_total = total;
}

function SetFilesNeeded(needed) {
    files_needed = 0;
}

function DownloadingFile(name) {
    file_downloading = name;
    //document.getElementById("loading").innerText = name;

}

function SetStatusChanged(gmod_status) {
    var status = "";
    var load_status = "";

    if (old) {
        status = "You're using a version of GMod with an outdated embedded browser!";
        load_status = "Please update by selecting a \"chromium\" branch from the BETAS tab in Steam's properties menu.";
    } else {
        if(gmod_status.indexOf(" Loading ") !== -1) {
            status = "Loading addons...";
            load_status = gmod_status;
        } else {
            status = messages[Math.floor(Math.random() * messages.length)];
            load_status = "";
        }
    }

    document.getElementById("status").innerText = status;
    document.getElementById("loading").innerText = load_status;
}

// Internal functions
function showPage() {
    if (jazz) {
        renderJazz();
        setInterval(function () {
            advanceJazz();
        }, 5);
    } else {
        renderSpinner();
        setInterval(function () {
            advanceSpinner();
        }, 5);
    }
}

function renderSpinner() {
    document.getElementById("spinner").src = spinner_src;
    if (meme) {
        play_music(astley);
    }
}

function renderJazz() {
    var page = document.getElementById("main_page");
    var tram_interior = new Image(tram_size,tram_size);
    var tram_exterior = new Image(tram_size, tram_size);
    tram_interior.id = "tram_interior";
    tram_exterior.id = "tram_exterior";
    tram_interior.src = tram_interior_src;
    tram_exterior.src = tram_exterior_src;
    page.innerHTML = "";
    page.appendChild(tram_interior);

    var passengers = [];
    var offsets = [80, 60, 60, 60, 60, 60, 60, 60, 60, 60];
    var offset = 0;
    for (var ii in jazz_avatars) {
        offset += offsets[ii];
        var passenger = new Image(passenger_size, passenger_size);
        passenger.src = "../../assets/images/avatars/" + jazz_avatars[ii] + ".png";
        passenger.className = "tram_passenger";
        passenger.style.position = "absolute";
        passenger.style.left = "" + -tram_size + offset + "px";
        passenger.style.top = "430px";
        passenger.style["x_offset"] = offset;
        passenger.style["y_offset"] = 0;
        passengers.push(passenger);
        page.appendChild(passenger);
    }
    page.appendChild(tram_exterior);
    styleTram("position", "absolute");
    styleTram("left", "" + -tram_size + "px");
    play_music(chevere);
}

function moveTram(x, y) {
    if (x != null) {
        styleTram("left", "" + x + "px");
    }
    if (y != null) {
        styleTram("top", "" + y + "px");
    }
    movePassengers(x, y);
}

function movePassengers(x, y) {
    var passengers = Array.from(document.getElementsByClassName("tram_passenger"));
    for (ii in passengers) {
        var passenger = passengers[ii];
        if (x != null) {
            passenger.style.left = "" + (x + passenger.style["x_offset"]) + "px";
        }
        if (y != null) {
            passenger.style.top = "" + (y + passenger.style["y_offset"]) + "px";
        }
    }
}

function styleTram(key, value) {
    var interior = document.getElementById("tram_interior");
    var exterior = document.getElementById("tram_exterior");
    interior.style[key] = value;
    exterior.style[key] = value;
}

function advanceJazz() {
    if (tram_left < window.innerWidth) {
        tram_left += 1;
    } else {
        tram_left = -tram_size;
    }
    moveTram(tram_left, null);

}

function advanceSpinner() {
    rotation += 1;
    document.getElementById("spinner").style.webkitTransform = "rotate("+rotation+"deg)";
}

function play_music(src) {
    var player = document.getElementById("music");
    player.src = src;
    player.volume = 0.5;
    player.play()
}


window.onload = function() {
    console.log("HERE WE GO!");
    console.log("User Agent: " + window.navigator.userAgent);
    if(debug) {
        GameDetails(
            "ServeyMcServeface",
            "https://serveymcserveface.com/gameserver/gmod/ttt/loading.html",
            "ttt_minecraft",
            8,
            "76561197995176031",
            "terrortown"
        );
    }
};

