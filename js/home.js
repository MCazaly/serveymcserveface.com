const games_url = "https://games.api.serveymcserveface.com/all";
const api_url = "https://api.serveymcserveface.com/all"

let images_loaded = 0;
let image_count = 0;

async function get_games() {
    let response = await fetch(games_url);
    return await response.json();
}

async function get_apis() {
    let response = await fetch(api_url);
    return await response.json();
}

async function display_games() {
    let games = await get_games();
    let container = document.getElementById("games-container")

    for (let game in games) {
        let logo = "./assets/images/games/" + game + ".png";
        // Preload image
        image_count++;
        let image = new Image();
        image.src = logo;
        image.onload = image_loaded;

        let online = games[game]["online"]
        let title = games[game]["title"];
        let players = games[game]["player_count"];
        let max_players = games[game]["max_player_count"]
        let map_name = games[game]["map_name"] || "";
        let connect = games[game]["connect"];
        let logo_id = game + "_logo";

        let href = "";
        if(connect) {
            href=`href="${connect}"`;
        }
        let status = "offline";
        if (online) {
            status = "online";
        }
        let player_count = "";
        if (players !== null && max_players !== null) {
            player_count = `${players}/${max_players} players online`;
        }

        container.innerHTML += `
        <a class="content container game button" ${href}>
            <img src=${image.src} class="game-logo" id="${logo_id}" alt="Game Logo">
            <div class="game-info">
                <div class="game-status">
                    ${map_name} <span class="dot ${status}"></span>
                </div>
                <div class="game-title">
                    ${title}
                </div>
                <div class="game-players">
                 ${player_count}
                </div>
            </div>
        </a>
        `;
        if (!online) {
            document.getElementById(logo_id).style["filter"] = "grayscale(100%)";
        }
    }
}

async function display_apis() {
    let apis = await get_apis();
    let container = document.getElementById("api-container")

    for (let api in apis) {
        let online = apis[api]["online"];
        let title = apis[api]["title"];
        let description = apis[api]["description"];
        let url = apis[api]["url"];
        let id = `api-${api}`

        let status = "offline"
        if (online) {
            status = "online";
        }

        container.innerHTML += `
        <a class="content container api button" id="${id}" href="${url}">
            <div class="api-status">
                <span class="dot ${status}"></span>
            </div>
            <div class="api-title">
                ${title}
            </div>
            <div class="api-info">
                ${description}
            </div>
            <div class="api-url">
                ${url}
            </div>
        </a>
        `;
        if (!online) {
            document.getElementById(id)
                .getElementsByClassName("api-title")[0].style["filter"] = "grayscale(100%)";
        }
    }
}

function image_loaded() {
    images_loaded++;
    if (images_loaded >= image_count) {
        reveal_section("games-container");
        hide_loading("games");
    }
}

function hide_loading(parent_id) {
    let loading = document.getElementById(parent_id).getElementsByClassName("loading-indicator")[0];
    loading.style["animation-name"] = "fade-out";
}

function reveal_section(id) {
    let section = document.getElementById(id);
    section.style["display"] = "";
    section.style["animation-name"] = "fade-in";
}

function focus(header_id) {
    let sections = Array.from(document.getElementsByClassName("section-container"));
    let id = header_id + "-container";
    for (let ii in sections) {
        let section = sections[ii];
        if (section.id !== id) {
            console.log("HIDE " + id);
            hide_section(section.id);
        } else {
            console.log("SHOW " + id);
            show_section(section.id);
        }
    }
    window.location = "#" + header_id;
}

function toggle_section(id) {
    let section = document.getElementById(id);
    if (section.style["display"] === "none") {
        show_section(id);
    } else {
        hide_section(id);
    }
}

function hide_section(id) {
    let section = document.getElementById(id);
    section.style["animation-name"] = "";
    section.style["opacity"] = "100%";
    section.style["display"] = "none";
}

function show_section(id) {
    let section = document.getElementById(id);
    section.style["animation-name"] = "";
    section.style["opacity"] = "100%";
    section.style["display"] = "grid";
}

window.onload = function() {
    console.log("Begin loading games...");
    display_games().then(function() {
        console.log("Done loading games!");
    });
    console.log("Begin loading APIs...");
    display_apis().then(function() {
        console.log("Done loading APIs!");
        reveal_section("api-container");
        hide_loading("api")
    });
}