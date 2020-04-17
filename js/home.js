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
        let map_name = games[game]["map_name"]
        let connect = games[game]["connect"];
        let logo_id = game + "_logo";

        let href = "";
        if(connect) {
            href=`href="${connect}"`;
        }

        container.innerHTML += `
        <a class="content container body game button" ${href}>
            <img src=${image.src} class="game-logo" id="${logo_id}" alt="Game Logo">
            <div>
                ${title}
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