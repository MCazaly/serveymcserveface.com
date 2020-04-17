const games_url = "https://games.api.serveymcserveface.com/all";

let images_loaded = 0;
let image_count = 0;

async function get_games() {
    let response = await fetch(games_url);
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
        <a class="content container body game button" ${href}>
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

window.onload = function() {
    console.log("Begin loading games...");
    display_games().then(function() {
        console.log("Done loading games!");
    });
}