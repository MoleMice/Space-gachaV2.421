/* =========================================================
   ASTRA
   COSMIC RNG
   BY MOLEMICE
========================================================= */

let planetRotation = 0;

// ===============================
// DEV SETTINGS
// ===============================

const DEV_MODE = false;

// Change these while developing.
const DEV_STARTING_STARDUST = 999999999999999999999999999999999999;

// Set to true to unlock every planet/object at the start.
const DEV_UNLOCK_ALL_PLANETS = false;


function applyDevStartingStardust() {
    if (!DEV_MODE) return;

    player.stardust = DEV_STARTING_STARDUST;
    save();
    updateUI();

    showNotification(
        "DEV: STARTING STARDUST SET TO " +
        formatNumber(DEV_STARTING_STARDUST)
    );
}

function resetDevSave() {
    if (!DEV_MODE) return;

    localStorage.removeItem("astraPlayer");

    player = {
        stardust: DEV_STARTING_STARDUST,
        discovered: ["moon"],
        equipped: "moon",
        totalDiscoveries: 1,
        rarest: "common"
    };

    save();
    updateUI();

    showNotification("DEV: SAVE RESET");
}


/* =========================================================
   OBJECTS
========================================================= */

const objects = [

    /* =========================
       DEEP SPACE
    ========================= */

    {
        id: "moon",
        name: "Moon",
        rarity: "common",
        power: 1,
        color: "#bfc4d0",
        description: "Earth's natural satellite.",
        type: "moon"
    },

    {
        id: "mars",
        name: "Mars",
        rarity: "common",
        power: 3,
        color: "#e15c38",
        description: "The red planet.",
        type: "rocky"
    },

    {
        id: "mercury",
        name: "Mercury",
        rarity: "common",
        power: 5,
        color: "#aaa9a4",
        description: "A tiny world racing around the Sun.",
        type: "cratered"
    },

    {
        id: "venus",
        name: "Venus",
        rarity: "common",
        power: 7,
        color: "#e5b86b",
        description: "A scorching world wrapped in thick clouds.",
        type: "cloudy"
    },

    {
        id: "uranus",
        name: "Uranus",
        rarity: "uncommon",
        power: 12,
        color: "#82e1dc",
        description: "A distant ice giant.",
        type: "icegiant"
    },

    {
        id: "neptune",
        name: "Neptune",
        rarity: "uncommon",
        power: 20,
        color: "#407cff",
        description: "A deep blue world at the edge of the Solar System.",
        type: "icegiant"
    },

    {
        id: "europa",
        name: "Europa",
        rarity: "uncommon",
        power: 26,
        color: "#d9d0b7",
        description: "An icy moon hiding a vast ocean beneath its surface.",
        type: "ice"
    },

    {
        id: "saturn",
        name: "Saturn",
        rarity: "rare",
        power: 75,
        color: "#e4b665",
        description: "The magnificent ringed planet.",
        type: "gasgiant",
        rings: true
    },

    {
        id: "pulsar",
        name: "Pulsar",
        rarity: "rare",
        power: 110,
        color: "#75c8ff",
        description: "A rapidly rotating neutron star emitting precise beams of radiation.",
        type: "pulsar"
    },

    {
        id: "supernova",
        name: "Supernova",
        rarity: "epic",
        power: 400,
        color: "#c95aff",
        description: "A star exploding in spectacular fashion.",
        type: "supernova"
    },

    {
        id: "quasar",
        name: "Quasar",
        rarity: "epic",
        power: 650,
        color: "#ffcf70",
        description: "An incredibly luminous galactic core powered by a massive black hole.",
        type: "quasar"
    },

    {
        id: "blackhole",
        name: "Black Hole",
        rarity: "legendary",
        power: 2500,
        color: "#ff9c32",
        description: "A region of spacetime with extreme gravity.",
        type: "blackhole"
    },


    /* =========================
       STELLAR FRONTIER
    ========================= */

    {
        id: "earth",
        name: "Earth",
        rarity: "common",
        power: 4,
        color: "#4e9cff",
        description: "A small blue world filled with life.",
        type: "earth"
    },

    {
        id: "jupiter",
        name: "Jupiter",
        rarity: "uncommon",
        power: 32,
        color: "#d6a875",
        description: "The largest planet in the Solar System.",
        type: "gasgiant",
        rings: false
    },

    {
        id: "titan",
        name: "Titan",
        rarity: "uncommon",
        power: 40,
        color: "#d99b55",
        description: "A hazy moon with rivers and lakes of liquid hydrocarbons.",
        type: "haze"
    },

    {
        id: "redgiant",
        name: "Red Giant",
        rarity: "rare",
        power: 130,
        color: "#ff6347",
        description: "A swollen aging star nearing the end of its stellar life.",
        type: "redgiant"
    },

    {
        id: "neutronstar",
        name: "Neutron Star",
        rarity: "epic",
        power: 500,
        color: "#b9eaff",
        description: "An incredibly dense stellar remnant.",
        type: "neutronstar"
    },

    {
        id: "hypergiant",
        name: "Hypergiant",
        rarity: "epic",
        power: 800,
        color: "#fff0a3",
        description: "One of the most massive and luminous types of stars.",
        type: "hypergiant"
    },

    {
        id: "magnetar",
        name: "Magnetar",
        rarity: "legendary",
        power: 3500,
        color: "#b66cff",
        description: "A neutron star possessing an extraordinarily powerful magnetic field.",
        type: "magnetar"
    }

];


const rarityOrder = [
    "common",
    "uncommon",
    "rare",
    "epic",
    "legendary"
];


const rarityColors = {

    common: "#d9dce7",
    uncommon: "#62e69a",
    rare: "#5da5ff",
    epic: "#bd72ff",
    legendary: "#ffd45d"

};


const rarityMultipliers = {

    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5

};


/* =========================================================
   BANNERS
========================================================= */

const banners = [

    {
        id: "deep-space",
        name: "DEEP SPACE",
        description:
            "A scan route through the outer reaches of known space.",

        objects: {
            moon: 42,
            mars: 27,
            mercury: 12,
            venus: 8,

            uranus: 4.5,
            neptune: 2.5,
            europa: 1.5,

            saturn: 1,
            pulsar: 0.3,

            supernova: 0.15,
            quasar: 0.04,

            blackhole: 0.01
        }
    },

    {
        id: "stellar-frontier",
        name: "STELLAR FRONTIER",
        description:
            "A dangerous expedition into the most extreme stellar environments.",

        objects: {
            earth: 38,
            mars: 25,
            venus: 13,
            mercury: 9,

            jupiter: 6,
            neptune: 4,
            titan: 2,

            saturn: 1.5,
            redgiant: 0.8,

            neutronstar: 0.5,
            hypergiant: 0.19,

            magnetar: 0.01
        }
    }

];


/* =========================================================
   CASH
========================================================= */

function getObjectCashPerClick(object) {

    if (!object)
        return 0;

    return object.power *
        (rarityMultipliers[object.rarity] || 1);

}


function getCashPerClick() {

    return player.discovered.reduce(
        (total, id) => {

            return total +
                getObjectCashPerClick(
                    getObject(id)
                );

        },
        0
    );

}


function getScanCost() {

    return Math.max(
        100,
        getCashPerClick() * 100
    );

}


/* =========================================================
   SAVE
========================================================= */

const SAVE_VERSION = 2.403;

const savedVersion =
    Number(
        localStorage.getItem(
            "astraSaveVersion"
        )
    );


if (
    savedVersion !==
    SAVE_VERSION
) {

    localStorage.removeItem(
        "astraPlayer"
    );

    localStorage.setItem(
        "astraSaveVersion",
        SAVE_VERSION
    );

}


let player = JSON.parse(localStorage.getItem("astraPlayer")) || {
    stardust: DEV_MODE ? DEV_STARTING_STARDUST : 0,
    discovered:["moon"],
    equipped:"moon",
    totalDiscoveries:1,
    rarest:"common"
};


/* =========================================================
   HELPERS
========================================================= */

const $ =
    id =>
        document.getElementById(id);


function getObject(id) {

    return objects.find(
        object =>
            object.id === id
    );

}


function save() {

    localStorage.setItem(
        "astraPlayer",
        JSON.stringify(player)
    );

}


function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}

                                        /*Change format*/
function formatNumber(number) {

    if (number < 1000) {
        return Math.floor(number).toString();
    }

    const suffixes = [
        "", "K", "M", "B", "T",
        "Q", "QI", "SX", "SP",
        "OC", "NO", "DC"
    ];

    const tier = Math.floor(
        Math.log10(Math.abs(number)) / 3
    );

    if (tier >= suffixes.length) {
        return number.toExponential(2).replace("+", "E");
    }

    const value =
        number / Math.pow(1000, tier);

    // K and M = 1 decimal
    // B and above = 2 decimals
    const decimals = tier <= 2 ? 1 : 2;

    return value
        .toFixed(decimals)
        .replace(/\.0+$/, "")
        + suffixes[tier];
}


/* =========================================================
   PROCEDURAL VISUAL SYSTEM
========================================================= */

function hashString(string) {

    let hash = 2166136261;

    for (
        let i = 0;
        i < string.length;
        i++
    ) {

        hash ^= string.charCodeAt(i);

        hash +=
            (hash << 1) +
            (hash << 4) +
            (hash << 7) +
            (hash << 8) +
            (hash << 24);

    }

    return Math.abs(hash >>> 0);

}


function seededRandom(
    seed
) {

    let value =
        hashString(seed);

    return function () {

        value =
            Math.imul(
                value ^ value >>> 15,
                1 | value
            );

        value ^=
            value +
            Math.imul(
                value ^ value >>> 7,
                61 | value
            );

        return (
            (
                (value ^ value >>> 14)
                >>> 0
            ) /
            4294967296
        );

    };

}


function hexToRgb(hex) {

    const value =
        hex.replace(
            "#",
            ""
        );

    return {

        r:
            parseInt(
                value.substring(0, 2),
                16
            ),

        g:
            parseInt(
                value.substring(2, 4),
                16
            ),

        b:
            parseInt(
                value.substring(4, 6),
                16
            )

    };

}


function rgba(
    hex,
    alpha
) {

    const rgb =
        hexToRgb(hex);

    return `rgba(
        ${rgb.r},
        ${rgb.g},
        ${rgb.b},
        ${alpha}
    )`;

}


/* =========================================================
   BUILD CELESTIAL VISUAL
========================================================= */

function buildCelestialVisual(
    container,
    object,
    compact = false
) {

    container.innerHTML = "";

    container.className =
        compact
            ? "inventory-visual celestial-mini"
            : "celestial";

    container.dataset.type =
        object.type;

    container.dataset.object =
        object.id;

    container.dataset.rarity =
        object.rarity;


    const random =
        seededRandom(
            object.id
        );


    const rotation =
        Math.round(
            random() * 360
        );

    const cloudSpeed =
        (
            5 +
            random() * 8
        ).toFixed(2);

    const surfaceOffset =
        Math.round(
            random() * 100
        );


    container.style.setProperty(
        "--object-color",
        object.color
    );

    container.style.setProperty(
        "--object-color-soft",
        rgba(object.color, .45)
    );

    container.style.setProperty(
        "--object-color-faint",
        rgba(object.color, .16)
    );

    container.style.setProperty(
        "--surface-rotation",
        `${rotation}deg`
    );

    container.style.setProperty(
        "--cloud-speed",
        `${cloudSpeed}s`
    );

    container.style.setProperty(
        "--surface-offset",
        `${surfaceOffset}%`
    );


    /* =========================
       ATMOSPHERE
    ========================= */

    const atmosphere =
        document.createElement(
            "div"
        );

    atmosphere.className =
        "celestial-atmosphere";


    /* =========================
       RINGS
    ========================= */

    if (object.rings) {

        const backRing =
            document.createElement(
                "div"
            );

        backRing.className =
            "celestial-ring ring-back";

        container.appendChild(
            backRing
        );

    }


    /* =========================
       MAIN BODY
    ========================= */

    const body =
        document.createElement(
            "div"
        );

    body.className =
        "celestial-body";


    /* =========================
       SURFACE
    ========================= */

    const surface =
        document.createElement(
            "div"
        );

    surface.className =
        "celestial-surface";


    /* =========================
       CLOUDS
    ========================= */

    const clouds =
        document.createElement(
            "div"
        );

    clouds.className =
        "celestial-clouds";


    /* =========================
       SECONDARY CLOUDS
    ========================= */

    const clouds2 =
        document.createElement(
            "div"
        );

    clouds2.className =
        "celestial-clouds clouds-two";


    /* =========================
       STORMS
    ========================= */

    const storm =
        document.createElement(
            "div"
        );

    storm.className =
        "celestial-storm";


    /* =========================
       CORE
    ========================= */

    const core =
        document.createElement(
            "div"
        );

    core.className =
        "celestial-core";


    /* =========================
       ENERGY
    ========================= */

    const energy =
        document.createElement(
            "div"
        );

    energy.className =
        "celestial-energy";


    /* =========================
       PARTICLES
    ========================= */

    const particlesLayer =
        document.createElement(
            "div"
        );

    particlesLayer.className =
        "celestial-particles";


    /* =========================
       RARITY EFFECT
    ========================= */

    const rarityEffect =
        document.createElement(
            "div"
        );

    rarityEffect.className =
        "rarity-effect";


    /* =========================
       SPECIAL OBJECT LAYERS
    ========================= */

    const special =
        document.createElement(
            "div"
        );

    special.className =
        "celestial-special";


    /* =========================
       COMPOSE
    ========================= */

    body.appendChild(
        surface
    );

    body.appendChild(
        clouds
    );

    body.appendChild(
        clouds2
    );

    body.appendChild(
        storm
    );

    body.appendChild(
        core
    );

    body.appendChild(
        energy
    );

    body.appendChild(
        special
    );

    body.appendChild(
        particlesLayer
    );


    container.appendChild(
        atmosphere
    );

    container.appendChild(
        body
    );


    if (object.rings) {

        const frontRing =
            document.createElement(
                "div"
            );

        frontRing.className =
            "celestial-ring ring-front";

        container.appendChild(
            frontRing
        );

    }


    container.appendChild(
        rarityEffect
    );


    /* =====================================================
       PROCEDURAL SURFACES
    ===================================================== */

    switch (
        object.type
    ) {

        case "moon":

            surface.style.background = `
                radial-gradient(
                    circle at ${25 + random() * 50}% ${20 + random() * 50}%,
                    #eef1f5 0%,
                    #aeb3be 38%,
                    #666b75 72%,
                    #282c34 100%
                ),
                radial-gradient(
                    circle,
                    transparent 0 55%,
                    rgba(0,0,0,.5) 100%
                )
            `;

            clouds.style.background = `
                radial-gradient(
                    circle at ${random() * 100}% ${random() * 100}%,
                    rgba(255,255,255,.15) 0 3%,
                    transparent 4%
                )
            `;

            break;


        case "rocky":

            surface.style.background = `
                radial-gradient(
                    circle at 25% 30%,
                    rgba(255,210,150,.45) 0 5%,
                    transparent 6%
                ),
                radial-gradient(
                    circle at 70% 62%,
                    rgba(80,20,10,.55) 0 9%,
                    transparent 10%
                ),
                repeating-radial-gradient(
                    circle at ${random() * 100}% ${random() * 100}%,
                    ${object.color} 0 7%,
                    ${rgba(object.color,.55)} 8% 13%,
                    #32150f 14% 17%
                )
            `;

            clouds.style.background =
                `linear-gradient(
                    ${rotation}deg,
                    transparent,
                    rgba(255,150,100,.12),
                    transparent
                )`;

            break;


        case "cratered":

            surface.style.background = `
                radial-gradient(
                    circle at 20% 22%,
                    #d5d2ca 0 4%,
                    #77756f 5% 7%,
                    transparent 8%
                ),
                radial-gradient(
                    circle at 72% 34%,
                    #d5d2ca 0 5%,
                    #676660 6% 9%,
                    transparent 10%
                ),
                radial-gradient(
                    circle at 45% 72%,
                    #d5d2ca 0 7%,
                    #65635e 8% 11%,
                    transparent 12%
                ),
                radial-gradient(
                    circle,
                    #c7c4bd,
                    #77756f 72%,
                    #292a2c 100%
                )
            `;

            break;


        case "cloudy":

            surface.style.background = `
                radial-gradient(
                    circle at 35% 30%,
                    #fff1bd,
                    #d99e52 42%,
                    #a95e29 72%,
                    #422016
                )
            `;

            clouds.style.background = `
                repeating-linear-gradient(
                    ${rotation}deg,
                    rgba(255,245,195,.42) 0 5%,
                    transparent 6% 11%,
                    rgba(255,218,145,.3) 12% 18%,
                    transparent 19% 27%
                )
            `;

            clouds2.style.background = `
                repeating-linear-gradient(
                    ${rotation + 35}deg,
                    transparent 0 12%,
                    rgba(255,255,255,.15) 13% 18%,
                    transparent 19% 30%
                )
            `;

            break;


        case "earth":

            surface.style.background = `
                radial-gradient(
                    ellipse at 32% 38%,
                    #6fbc63 0 8%,
                    transparent 9%
                ),
                radial-gradient(
                    ellipse at 67% 62%,
                    #4b9149 0 11%,
                    transparent 12%
                ),
                radial-gradient(
                    ellipse at 52% 23%,
                    #8ccf69 0 7%,
                    transparent 8%
                ),
                radial-gradient(
                    circle,
                    #2b7ed0,
                    #16508f 62%,
                    #07182d 100%
                )
            `;

            clouds.style.background = `
                repeating-linear-gradient(
                    ${rotation}deg,
                    transparent 0 12%,
                    rgba(255,255,255,.62) 13% 16%,
                    transparent 17% 25%
                )
            `;

            clouds2.style.background = `
                repeating-linear-gradient(
                    ${rotation + 40}deg,
                    transparent 0 19%,
                    rgba(255,255,255,.3) 20% 23%,
                    transparent 24% 34%
                )
            `;

            break;


        case "icegiant":

            surface.style.background = `
                repeating-linear-gradient(
                    ${rotation}deg,
                    #eefcff 0 4%,
                    ${object.color} 5% 13%,
                    #2457a0 14% 18%,
                    ${object.color} 19% 27%
                ),
                radial-gradient(
                    circle,
                    ${object.color},
                    #10275a
                )
            `;

            clouds.style.background = `
                repeating-linear-gradient(
                    ${rotation + 70}deg,
                    transparent 0 8%,
                    rgba(255,255,255,.22) 9% 12%,
                    transparent 13% 22%
                )
            `;

            storm.style.background = `
                radial-gradient(
                    ellipse,
                    rgba(220,250,255,.45),
                    transparent 65%
                )
            `;

            break;


        case "ice":

            surface.style.background = `
                repeating-linear-gradient(
                    ${rotation}deg,
                    #f7f5e8 0 8%,
                    #b8c5c8 9% 10%,
                    #e6e1d2 11% 18%
                ),
                radial-gradient(
                    circle,
                    #ece8d8,
                    #777f82
                )
            `;

            clouds.style.background = `
                repeating-linear-gradient(
                    ${rotation + 80}deg,
                    transparent 0 11%,
                    rgba(70,100,110,.55) 12% 13%,
                    transparent 14% 24%
                )
            `;

            break;


        case "gasgiant":

            surface.style.background = `
                repeating-linear-gradient(
                    ${rotation}deg,
                    #f4d29e 0 7%,
                    #9d6844 8% 11%,
                    #e9bd82 12% 18%,
                    #80533c 19% 22%,
                    #dcae76 23% 31%
                )
            `;

            clouds.style.background = `
                repeating-linear-gradient(
                    ${rotation + 15}deg,
                    transparent 0 10%,
                    rgba(255,240,190,.28) 11% 15%,
                    transparent 16% 25%
                )
            `;

            storm.style.background = `
                radial-gradient(
                    ellipse at 67% 63%,
                    rgba(160,65,38,.9) 0 5%,
                    rgba(110,40,25,.5) 7%,
                    transparent 16%
                )
            `;

            break;


        case "haze":

            surface.style.background = `
                radial-gradient(
                    circle at 30% 30%,
                    #e8b96d,
                    #a76835 55%,
                    #3b2117 100%
                )
            `;

            clouds.style.background = `
                repeating-linear-gradient(
                    ${rotation}deg,
                    rgba(255,210,130,.28) 0 5%,
                    rgba(90,45,20,.15) 6% 13%,
                    transparent 14% 22%
                )
            `;

            break;


        case "pulsar":

            surface.style.background = `
                radial-gradient(
                    circle,
                    white 0%,
                    #c7efff 15%,
                    #5cbcff 45%,
                    #102c5c 72%,
                    #02040b 100%
                )
            `;

            energy.style.background = `
                conic-gradient(
                    from 0deg,
                    transparent,
                    rgba(110,210,255,.9),
                    transparent 18%,
                    transparent 50%,
                    rgba(110,210,255,.9),
                    transparent 68%
                )
            `;

            special.innerHTML = `
                <i class="star-beam beam-one"></i>
                <i class="star-beam beam-two"></i>
            `;

            break;


        case "supernova":

            surface.style.background = `
                radial-gradient(
                    circle,
                    #ffffff 0%,
                    #fff9bc 8%,
                    #ff9b48 22%,
                    #ed4cff 44%,
                    #7024a6 65%,
                    #17051f 100%
                )
            `;

            energy.style.background = `
                radial-gradient(
                    circle,
                    transparent 28%,
                    rgba(255,100,220,.75) 31%,
                    transparent 42%,
                    rgba(255,180,90,.5) 50%,
                    transparent 67%
                )
            `;

            special.innerHTML = `
                <i class="supernova-shell shell-one"></i>
                <i class="supernova-shell shell-two"></i>
                <i class="supernova-flare"></i>
            `;

            break;


        case "quasar":

            surface.style.background = `
                radial-gradient(
                    circle,
                    #fff 0%,
                    #fff4b0 8%,
                    #ffbd4b 20%,
                    #9e39ff 38%,
                    #18082c 70%,
                    #020207 100%
                )
            `;

            energy.style.background = `
                conic-gradient(
                    from 20deg,
                    transparent 0 18%,
                    rgba(255,180,70,.8) 20% 25%,
                    transparent 27% 50%,
                    rgba(170,70,255,.8) 52% 57%,
                    transparent 60%
                )
            `;

            special.innerHTML = `
                <i class="quasar-jet jet-one"></i>
                <i class="quasar-jet jet-two"></i>
                <i class="quasar-disk"></i>
            `;

            break;


        case "blackhole":

            surface.style.background = `
                radial-gradient(
                    circle,
                    #000 0 22%,
                    #17101a 23% 29%,
                    transparent 30%
                )
            `;

            energy.style.background = `
                conic-gradient(
                    from 0deg,
                    #ff5a00,
                    #ffd15c,
                    #9b3cff,
                    #ff4b00,
                    #ffd15c,
                    #8e27ff,
                    #ff5a00
                )
            `;

            special.innerHTML = `
                <i class="blackhole-disk"></i>
                <i class="blackhole-shadow"></i>
                <i class="blackhole-lensing"></i>
            `;

            break;


        case "redgiant":

            surface.style.background = `
                radial-gradient(
                    circle at 35% 32%,
                    #ffd09c 0%,
                    #ff754e 25%,
                    #bd352e 58%,
                    #401018 100%
                )
            `;

            clouds.style.background = `
                repeating-radial-gradient(
                    ellipse at ${random() * 100}% ${random() * 100}%,
                    rgba(255,220,150,.25) 0 8%,
                    rgba(120,25,25,.2) 9% 18%,
                    transparent 19% 30%
                )
            `;

            energy.style.background = `
                radial-gradient(
                    circle,
                    transparent 55%,
                    rgba(255,75,40,.6),
                    transparent 75%
                )
            `;

            break;


        case "neutronstar":

            surface.style.background = `
                radial-gradient(
                    circle,
                    white 0%,
                    #d8f7ff 13%,
                    #7edcff 40%,
                    #315ca0 67%,
                    #071020 100%
                )
            `;

            energy.style.background = `
                conic-gradient(
                    from 0deg,
                    transparent,
                    rgba(160,235,255,.8),
                    transparent 25%,
                    transparent 50%,
                    rgba(160,235,255,.8),
                    transparent 75%
                )
            `;

            special.innerHTML = `
                <i class="star-beam beam-one"></i>
                <i class="star-beam beam-two"></i>
            `;

            break;


        case "hypergiant":

            surface.style.background = `
                radial-gradient(
                    circle at 30% 30%,
                    white,
                    #fff3a3 18%,
                    #ffb13b 40%,
                    #e74b2e 68%,
                    #45101c 100%
                )
            `;

            clouds.style.background = `
                repeating-radial-gradient(
                    ellipse,
                    rgba(255,255,255,.22) 0 5%,
                    transparent 7% 14%,
                    rgba(255,100,40,.3) 15% 20%
                )
            `;

            special.innerHTML = `
                <i class="stellar-flare flare-one"></i>
                <i class="stellar-flare flare-two"></i>
                <i class="stellar-flare flare-three"></i>
            `;

            break;


        case "magnetar":

            surface.style.background = `
                radial-gradient(
                    circle,
                    #fff 0%,
                    #eadbff 9%,
                    #b66cff 28%,
                    #53258d 57%,
                    #12051f 100%
                )
            `;

            energy.style.background = `
                conic-gradient(
                    from 0deg,
                    transparent,
                    rgba(182,108,255,.9),
                    transparent 16%,
                    rgba(90,190,255,.8),
                    transparent 35%,
                    transparent 55%,
                    rgba(182,108,255,.9),
                    transparent 72%
                )
            `;

            special.innerHTML = `
                <i class="magnetic-arc arc-one"></i>
                <i class="magnetic-arc arc-two"></i>
                <i class="magnetic-arc arc-three"></i>
            `;

            break;

    }


    /* =====================================================
       PROCEDURAL PARTICLES
    ===================================================== */

    const particleCount =
        object.rarity === "legendary"
            ? 18
            : object.rarity === "epic"
                ? 12
                : object.rarity === "rare"
                    ? 8
                    : 4;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "i"
            );

        particle.className =
            "celestial-particle";

        particle.style.setProperty(
            "--particle-x",
            `${random() * 100}%`
        );

        particle.style.setProperty(
            "--particle-y",
            `${random() * 100}%`
        );

        particle.style.setProperty(
            "--particle-size",
            `${1 + random() * 3}px`
        );

        particle.style.setProperty(
            "--particle-delay",
            `${random() * 4}s`
        );

        particle.style.setProperty(
            "--particle-duration",
            `${2 + random() * 4}s`
        );

        particlesLayer.appendChild(
            particle
        );

    }


    /* =====================================================
       RARITY AURA
    ===================================================== */

    rarityEffect.style.setProperty(
        "--rarity-color",
        rarityColors[object.rarity]
    );

}


/* =========================================================
   MAIN UI
========================================================= */

const stardust =
    $("stardust");

const totalStardust =
    $("totalStardust");

const discoveredCount =
    $("discoveredCount");

const highestRarity =
    $("highestRarity");

const currentObject =
    $("currentObject");

const planetName =
    $("planetName");

const planetRarity =
    $("planetRarity");

const planetPower =
    $("planetPower");

const planetDescription =
    $("planetDescription");

const planetVisual =
    $("planetVisual");

const inventoryGrid =
    $("inventoryGrid");

const inventoryCount =
    $("inventoryCount");

const notification =
    $("notification");


/* =========================================================
   UI UPDATE
========================================================= */

function updateUI() {

    // ===============================
    // DEV: UNLOCK ALL PLANETS
    // ===============================

    if (
        DEV_MODE &&
        DEV_UNLOCK_ALL_PLANETS
    ) {
        player.discovered = objects.map(
            object => object.id
        );

        player.totalDiscoveries =
            player.discovered.length;

        const equippedObject =
            getObject(player.equipped);

        if (!equippedObject) {
            player.equipped =
                player.discovered[0];
        }

        player.rarest =
            player.discovered.reduce(
                (highest, id) => {

                    const object =
                        getObject(id);

                    if (!object) {
                        return highest;
                    }

                    return rarityOrder.indexOf(
                        object.rarity
                    ) >
                    rarityOrder.indexOf(
                        highest
                    )
                        ? object.rarity
                        : highest;

                },
                "common"
            );
    }

    stardust.textContent =
        formatNumber(
            player.stardust
        );

    totalStardust.textContent =
        formatNumber(
            player.stardust
        );


    const scanCost =
        getScanCost();


    gacha.scanCost.textContent =
        formatNumber(scanCost) +
        " ✦";


    discoveredCount.textContent =
        player.discovered.length;

    inventoryCount.textContent =
        player.discovered.length;


    const equipped =
        getObject(
            player.equipped
        );


    if (!equipped)
        return;


    planetName.textContent =
        equipped.name;

    planetDescription.textContent =
        equipped.description;


    planetPower.textContent =
        "+" +
        formatNumber(
            getCashPerClick()
        );


    planetRarity.textContent =
        equipped.rarity.toUpperCase();


    planetRarity.style.color =
        rarityColors[
            equipped.rarity
        ];


    planetPower.style.color =
        rarityColors[
            equipped.rarity
        ];


    highestRarity.textContent =
        player.rarest.toUpperCase();


    highestRarity.style.color =
        rarityColors[
            player.rarest
        ];


    currentObject.textContent =
        equipped.name;


    buildCelestialVisual(
        planetVisual,
        equipped
    );


    renderInventory();

    save();

}


/* =========================================================
   PLANET CLICK
========================================================= */

planetVisual.addEventListener(
    "click",
    collectStardust
);


/* =========================================================
   COLLECT STARDUST
========================================================= */

function collectStardust() {

    const amount =
        getCashPerClick();

    if (amount <= 0) return;


    player.stardust += amount;


    const object =
        getObject(
            player.equipped
        );


    playCollectSound(
        object.rarity
    );


    floatingGain(
        "+" +
        formatNumber(amount)
    );


    updateUI();


    requestAnimationFrame(() => {

        /*
        =====================================================
        NORMAL COLLECT PULSE
        =====================================================
        */

        const currentRotation =
            parseFloat(
                planetVisual
                    .querySelector(".celestial-body")
                    .style
                    .getPropertyValue("--click-rotation")
            ) || 0;

        const rotationKick =
            (Math.random() * 8 + 4) *
            (Math.random() < 0.5 ? -1 : 1);

        planetVisual
            .querySelector(".celestial-body")
            .style
            .setProperty(
                "--click-rotation",
                `${currentRotation + rotationKick}deg`
            );

        planetRotation += Math.random() * 5 + 2;
        planetVisual.style.setProperty(
            "--planet-rotation",
            `${planetRotation}deg`
        );

        planetVisual.classList.remove(
            "collect-pulse"
        );

        void planetVisual.offsetWidth;

        planetVisual.classList.add(
            "collect-pulse"
        );


        setTimeout(() => {
        planetVisual.classList.remove("collect-pulse");
        }, 650);

    });

}


/* =========================================================
   EPIC+ CLICK FX
========================================================= */

function playEpicClickFX(object) {

    const rect = planetVisual.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (object.id === "blackhole") {

        blackHoleClickFX(x, y);

    } else if (object.id === "magnetar") {

        magnetarClickFX(x, y);

    } else if (object.id === "quasar") {

        quasarClickFX(x, y);

    } else if (object.rarity === "legendary") {

        legendaryClickFX(x, y, object);

    } else {

        epicClickFX(x, y);

    }
}


/* =========================================================
   GENERIC EPIC
========================================================= */

function epicClickFX(x, y) {

    /*
    Slow energy wave
    */

    const wave =
        document.createElement("div");

    wave.className =
        "epic-click-wave";

    wave.style.left =
        x + "px";

    wave.style.top =
        y + "px";

    document.body.appendChild(wave);

    wave.animate(
        [
            {
                transform:
                    "translate(-50%, -50%) scale(.15)",
                opacity: 0
            },
            {
                transform:
                    "translate(-50%, -50%) scale(.55)",
                opacity: .9,
                offset: .18
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1.35)",
                opacity: .35,
                offset: .65
            },
            {
                transform:
                    "translate(-50%, -50%) scale(2)",
                opacity: 0
            }
        ],
        {
            duration: 1100,
            easing: "cubic-bezier(.16,1,.3,1)"
        }
    );

    setTimeout(() => wave.remove(), 1200);


    /*
    Slow orbiting particles
    */

    for (let i = 0; i < 18; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "epic-click-particle";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        const angle =
            (Math.PI * 2 / 18) * i +
            Math.random() * .3;

        const distance =
            90 + Math.random() * 90;

        const tx =
            Math.cos(angle) * distance;

        const ty =
            Math.sin(angle) * distance;

        document.body.appendChild(particle);

        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.2)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: .2
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${tx}px),
                            calc(-50% + ${ty}px)
                        ) scale(.7)`,
                    opacity: .55,
                    offset: .72
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${tx * 1.15}px),
                            calc(-50% + ${ty * 1.15}px)
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1000 + Math.random() * 400,
                delay:
                    Math.random() * 100,
                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );

        setTimeout(
            () => particle.remove(),
            1600
        );
    }
}


/* =========================================================
   QUASAR
========================================================= */

function quasarClickFX(x, y) {

    /*
    Central flash
    */

    const flash =
        document.createElement("div");

    flash.className =
        "quasar-click-flash";

    flash.style.left =
        x + "px";

    flash.style.top =
        y + "px";

    document.body.appendChild(flash);

    flash.animate(
        [
            {
                transform:
                    "translate(-50%, -50%) scale(.2)",
                opacity: 0
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1)",
                opacity: .9,
                offset: .2
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1.7)",
                opacity: 0
            }
        ],
        {
            duration: 900,
            easing: "cubic-bezier(.16,1,.3,1)"
        }
    );

    setTimeout(
        () => flash.remove(),
        1000
    );


    /*
    Expanding rings
    */

    for (let i = 0; i < 3; i++) {

        const ring =
            document.createElement("div");

        ring.className =
            "quasar-click-ring";

        ring.style.left =
            x + "px";

        ring.style.top =
            y + "px";

        document.body.appendChild(ring);

        ring.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.2)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(.7)",
                    opacity: .8,
                    offset: .2
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(2.4)",
                    opacity: 0
                }
            ],
            {
                duration: 1300,
                delay: i * 180,
                easing: "cubic-bezier(.16,1,.3,1)"
            }
        );

        setTimeout(
            () => ring.remove(),
            1700 + i * 180
        );
    }


    /*
    Long energy streaks
    */

    for (let i = 0; i < 12; i++) {

        const streak =
            document.createElement("div");

        streak.className =
            "quasar-streak";

        streak.style.left =
            x + "px";

        streak.style.top =
            y + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            180 + Math.random() * 180;

        const tx =
            Math.cos(angle) * distance;

        const ty =
            Math.sin(angle) * distance;

        streak.style.transform =
            `translate(-50%, -50%)
             rotate(${angle}rad)`;

        document.body.appendChild(streak);

        streak.animate(
            [
                {
                    transform:
                        `translate(-50%, -50%)
                         rotate(${angle}rad)
                         scaleX(.1)`,
                    opacity: 0
                },
                {
                    transform:
                        `translate(-50%, -50%)
                         rotate(${angle}rad)
                         scaleX(1)`,
                    opacity: .9,
                    offset: .3
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${tx}px),
                            calc(-50% + ${ty}px)
                        )
                        rotate(${angle}rad)
                        scaleX(.2)`,
                    opacity: 0
                }
            ],
            {
                duration: 1200,
                easing: "cubic-bezier(.16,1,.3,1)"
            }
        );

        setTimeout(
            () => streak.remove(),
            1400
        );
    }
}


/* =========================================================
   BLACK HOLE
========================================================= */

function blackHoleClickFX(x, y) {

    /*
    Dark gravitational field
    */

    const field =
        document.createElement("div");

    field.className =
        "blackhole-click-field";

    field.style.left =
        x + "px";

    field.style.top =
        y + "px";

    document.body.appendChild(field);

    field.animate(
        [
            {
                transform:
                    "translate(-50%, -50%) scale(.3)",
                opacity: 0
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1)",
                opacity: .8,
                offset: .2
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1.7)",
                opacity: 0
            }
        ],
        {
            duration: 1500,
            easing: "cubic-bezier(.16,1,.3,1)"
        }
    );

    setTimeout(
        () => field.remove(),
        1600
    );


    /*
    Particles get sucked INTO the center
    */

    for (let i = 0; i < 24; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "blackhole-particle";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            130 + Math.random() * 180;

        const startX =
            x + Math.cos(angle) * distance;

        const startY =
            y + Math.sin(angle) * distance;

        particle.style.left =
            startX + "px";

        particle.style.top =
            startY + "px";

        document.body.appendChild(particle);

        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.2)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: .9,
                    offset: .15
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${x - startX}px),
                            calc(-50% + ${y - startY}px)
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1200 + Math.random() * 500,
                delay:
                    Math.random() * 180,
                easing:
                    "cubic-bezier(.55,0,1,.45)"
            }
        );

        setTimeout(
            () => particle.remove(),
            1900
        );
    }
}


/* =========================================================
   MAGNETAR
========================================================= */

function magnetarClickFX(x, y) {

    /*
    Magnetic pulse
    */

    const pulse =
        document.createElement("div");

    pulse.className =
        "magnetar-click-pulse";

    pulse.style.left =
        x + "px";

    pulse.style.top =
        y + "px";

    document.body.appendChild(pulse);

    pulse.animate(
        [
            {
                transform:
                    "translate(-50%, -50%) scale(.2)",
                opacity: 0
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1)",
                opacity: .9,
                offset: .2
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1.8)",
                opacity: 0
            }
        ],
        {
            duration: 1300,
            easing: "cubic-bezier(.16,1,.3,1)"
        }
    );

    setTimeout(
        () => pulse.remove(),
        1500
    );


    /*
    Magnetic arcs
    */

    for (let i = 0; i < 5; i++) {

        const arc =
            document.createElement("div");

        arc.className =
            "magnetar-click-arc";

        arc.style.left =
            x + "px";

        arc.style.top =
            y + "px";

        document.body.appendChild(arc);

        const rotation =
            i * 36;

        arc.animate(
            [
                {
                    transform:
                        `translate(-50%, -50%)
                         rotate(${rotation}deg)
                         scale(.25)`,
                    opacity: 0
                },
                {
                    transform:
                        `translate(-50%, -50%)
                         rotate(${rotation + 45}deg)
                         scale(1)`,
                    opacity: 1,
                    offset: .25
                },
                {
                    transform:
                        `translate(-50%, -50%)
                         rotate(${rotation + 150}deg)
                         scale(2)`,
                    opacity: 0
                }
            ],
            {
                duration: 1400,
                delay: i * 80,
                easing: "cubic-bezier(.16,1,.3,1)"
            }
        );

        setTimeout(
            () => arc.remove(),
            1800
        );
    }
}


/* =========================================================
   LEGENDARY
========================================================= */

function legendaryClickFX(x, y, object) {

    /*
    Slow screen-wide energy flash
    */

    const flash =
        document.createElement("div");

    flash.className =
        "legendary-click-flash";

    document.body.appendChild(flash);

    flash.animate(
        [
            {
                opacity: 0
            },
            {
                opacity: .75,
                offset: .18
            },
            {
                opacity: .2,
                offset: .55
            },
            {
                opacity: 0
            }
        ],
        {
            duration: 1000,
            easing: "ease-out"
        }
    );

    setTimeout(
        () => flash.remove(),
        1100
    );


    /*
    Three massive waves
    */

    for (let i = 0; i < 3; i++) {

        const wave =
            document.createElement("div");

        wave.className =
            "legendary-click-wave";

        wave.style.left =
            x + "px";

        wave.style.top =
            y + "px";

        document.body.appendChild(wave);

        wave.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.1)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(.6)",
                    opacity: .9,
                    offset: .15
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(2.8)",
                    opacity: 0
                }
            ],
            {
                duration: 1700,
                delay: i * 250,
                easing: "cubic-bezier(.16,1,.3,1)"
            }
        );

        setTimeout(
            () => wave.remove(),
            2200 + i * 250
        );
    }


    /*
    Huge slow particles
    */

    for (let i = 0; i < 32; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "legendary-click-particle";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            120 + Math.random() * 280;

        const tx =
            Math.cos(angle) * distance;

        const ty =
            Math.sin(angle) * distance;

        document.body.appendChild(particle);

        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.1)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: .18
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${tx}px),
                            calc(-50% + ${ty}px)
                        ) scale(.55)`,
                    opacity: .6,
                    offset: .7
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${tx * 1.15}px),
                            calc(-50% + ${ty * 1.15}px)
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1500 + Math.random() * 700,
                delay:
                    Math.random() * 180,
                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );

        setTimeout(
            () => particle.remove(),
            2500
        );
    }
}


/* =========================================================
   FLOATING GAIN
========================================================= */

function floatingGain(
    text
) {

    const element =
        document.createElement(
            "div"
        );

    element.textContent =
        text;

    element.className =
        "floating-gain";

    document.body.appendChild(
        element
    );


    element.animate(

        [
            {
                opacity: 1,
                transform:
                    "translate(-50%, 0) scale(1)"
            },

            {
                opacity: 0,
                transform:
                    "translate(-50%, -65px) scale(1.15)"
            }
        ],

        {
            duration: 650,
            easing:
                "cubic-bezier(.16,1,.3,1)"
        }

    );


    setTimeout(
        () =>
            element.remove(),
        700
    );

}


/* =========================================================
   INVENTORY
========================================================= */

function renderInventory() {

    inventoryGrid.innerHTML =
        "";


    player.discovered.forEach(
        id => {

            const object =
                getObject(id);


            if (!object)
                return;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "inventory-item";


            const visual =
                document.createElement(
                    "div"
                );


            visual.className =
                "inventory-visual";


            buildCelestialVisual(
                visual,
                object,
                true
            );


            const rarity =
                document.createElement(
                    "div"
                );


            rarity.className =
                "inventory-rarity";

            rarity.style.setProperty(
                "--rarity",
                rarityColors[object.rarity]
            );

            rarity.textContent =
                object.rarity.toUpperCase();


            const name =
                document.createElement(
                    "h3"
                );

            name.textContent =
                object.name;


            const power =
                document.createElement(
                    "p"
                );

            power.textContent =
                `+${formatNumber(
                    getObjectCashPerClick(object)
                )} Stardust / click`;


            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "equip-button";

            button.dataset.id =
                object.id;

            button.textContent =
                object.id === player.equipped
                    ? "EQUIPPED"
                    : "EQUIP";


            if (
                object.id ===
                player.equipped
            ) {

                card.style.borderColor =
                    rarityColors[
                        object.rarity
                    ];

                card.classList.add(
                    "equipped"
                );

            }


            card.appendChild(
                visual
            );

            card.appendChild(
                rarity
            );

            card.appendChild(
                name
            );

            card.appendChild(
                power
            );

            card.appendChild(
                button
            );


            inventoryGrid.appendChild(
                card
            );


            button.addEventListener(
                "click",
                () => {

                    player.equipped =
                        button.dataset.id;

                    playEquipSound();

                    updateUI();

                    showNotification(
                        getObject(
                            player.equipped
                        ).name +
                        " EQUIPPED"
                    );

                }
            );

        }
    );

}


/* =========================================================
   GACHA GUI
========================================================= */

function buildGachaGUI() {

    const page =
        $("gachaPage");


    page.innerHTML = `

        <div class="page-header">

            <div>

                <div class="eyebrow">
                    DEEP SPACE SCANNER
                </div>

                <h1>GACHA</h1>

                <p>
                    Search the unknown.
                </p>

            </div>

        </div>


        <div class="gacha-layout">

            <aside class="expedition-panel">

                <div class="panel-label">
                    CURRENT EXPEDITION
                </div>

                <h2 id="bannerNameNew">
                    DEEP SPACE
                </h2>

                <p
                    class="expedition-description"
                    id="bannerDescriptionNew"
                ></p>

                <div class="expedition-line"></div>

                <div class="banner-countdown">

                    <span>
                        ROTATION
                    </span>

                    <strong
                        id="bannerTimerNew"
                    >
                        10:00
                    </strong>

                </div>

                <div class="expedition-line"></div>

                <div class="panel-label">
                    DISCOVERY ODDS
                </div>

                <div
                    class="rate-list"
                    id="rateList"
                ></div>

            </aside>


            <section
                class="gacha-scanner"
                id="gachaScanner"
            >

                <div class="scanner-stars"></div>
                <div class="scanner-grid"></div>
                <div class="scanner-lens"></div>
                <div class="scanner-crosshair"></div>
                <div class="scanner-target"></div>
                <div class="scan-beam"></div>

                <div
                    class="scanner-status"
                    id="scannerStatus"
                >
                    READY
                </div>

            </section>


            <aside class="gacha-controls-panel">

                <div>

                    <div class="control-heading">
                        OBSERVATORY CONTROL
                    </div>

                    <div class="search-cost">

                        <span>
                            COST PER SCAN
                        </span>

                        <strong id="scanCost">
                            100 ✦
                        </strong>

                    </div>

                </div>

                <div>

                    <button
                        id="searchButtonNew"
                        class="search-button"
                    >
                        SCAN COSMOS
                    </button>

                    <p class="control-note">
                        One scan searches deep space for a celestial object.
                    </p>

                </div>

            </aside>

        </div>

    `;


    return {

        scanner:
            $("gachaScanner"),

        status:
            $("scannerStatus"),

        button:
            $("searchButtonNew"),

        bannerName:
            $("bannerNameNew"),

        bannerDescription:
            $("bannerDescriptionNew"),

        timer:
            $("bannerTimerNew"),

        rateList:
            $("rateList"),

        scanCost:
            $("scanCost")

    };

}


const gacha =
    buildGachaGUI();


/* =========================================================
   BANNER TIMER
========================================================= */

const BANNER_DURATION =
    10 * 60 * 1000;


let bannerStart =
    localStorage.getItem(
        "astraBannerStart"
    );


if (!bannerStart) {

    bannerStart =
        Date.now();

    localStorage.setItem(
        "astraBannerStart",
        bannerStart
    );

}


function currentBanner() {

    const elapsed =
        Date.now() -
        Number(
            bannerStart
        );


    const index =
        Math.floor(
            elapsed /
            BANNER_DURATION
        )
        %
        banners.length;


    return banners[index];

}


function updateBanner() {

    const elapsed =
        Date.now() -
        Number(
            bannerStart
        );


    const banner =
        currentBanner();


    const bannerIndex =
        banners.indexOf(
            banner
        );


    gacha.bannerName.textContent =
        banner.name;

    gacha.bannerDescription.textContent =
        banner.description;


    const remaining =
        BANNER_DURATION -
        (
            elapsed %
            BANNER_DURATION
        );


    const totalSeconds =
        Math.floor(
            remaining / 1000
        );


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds %
        60;


    gacha.timer.textContent =
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(seconds)
            .padStart(2, "0");


    if (
        gacha.rateList.dataset.bannerIndex !==
        String(bannerIndex)
    ) {

        gacha.rateList.innerHTML =
            "";


        rarityOrder.forEach(
            rarity => {

                const entries =
                    Object.entries(
                        banner.objects
                    )
                    .filter(
                        ([id]) => {

                            const object =
                                getObject(id);

                            return object &&
                                object.rarity ===
                                rarity;

                        }
                    );


                if (
                    entries.length === 0
                )
                    return;


                const total =
                    entries.reduce(
                        (
                            sum,
                            [, chance]
                        ) =>
                            sum + chance,
                        0
                    );


                const group =
                    document.createElement(
                        "div"
                    );


                group.className =
                    "rate-group";


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";

                button.className =
                    "rate-row";

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );


                button.innerHTML = `

                    <div class="rate-name">

                        <span
                            class="rate-dot"
                            style="
                                --rarity:
                                ${rarityColors[rarity]};
                            "
                        ></span>

                        <span>
                            ${rarity.toUpperCase()}
                        </span>

                    </div>

                    <div class="rate-right">

                        <span class="rate-value">
                            ${total.toFixed(
                                total < 1 ? 2 : 1
                            )}%
                        </span>

                        <span class="rate-arrow">
                            ›
                        </span>

                    </div>

                `;


                const expansion =
                    document.createElement(
                        "div"
                    );


                expansion.className =
                    "rate-expansion";


                entries.forEach(
                    ([id, chance]) => {

                        const object =
                            getObject(id);


                        const item =
                            document.createElement(
                                "div"
                            );


                        item.className =
                            "rate-object";


                        item.innerHTML = `

                            <div
                                class="rate-object-name"
                            >

                                <span
                                    class="rate-object-dot"
                                    style="
                                        background:
                                        ${object.color};
                                        box-shadow:
                                        0 0 8px
                                        ${object.color};
                                    "
                                ></span>

                                ${object.name}

                            </div>

                            <span
                                class="rate-object-chance"
                            >
                                ${chance}%
                            </span>

                        `;


                        expansion.appendChild(
                            item
                        );

                    }
                );


                button.addEventListener("click", () => {
                    const isOpen = group.classList.contains("expanded");

                    // Close every rarity group
                    document.querySelectorAll(".rate-group").forEach(otherGroup => {
                        otherGroup.classList.remove("expanded");

                        const otherButton =
                            otherGroup.querySelector(".rate-row");

                        if (otherButton) {
                            otherButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }
                    });

                    // Open the clicked group if it wasn't already open
                    if (!isOpen) {
                        group.classList.add("expanded");

                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );
                    }
                });


                group.appendChild(
                    button
                );

                group.appendChild(
                    expansion
                );


                gacha.rateList.appendChild(
                    group
                );

            }
        );


        gacha.rateList.dataset.bannerIndex =
            String(bannerIndex);

    }

}


updateBanner();

setInterval(
    updateBanner,
    1000
);


/* =========================================================
   RANDOM
========================================================= */

function weightedRandom() {

    const available =
        Object.entries(
            currentBanner().objects
        );


    const total =
        available.reduce(
            (
                sum,
                [, chance]
            ) =>
                sum + chance,
            0
        );


    let random =
        Math.random() *
        total;


    for (
        const [id, chance]
        of available
    ) {

        random -=
            chance;


        if (
            random <= 0
        ) {

            return getObject(
                id
            );

        }

    }


    return getObject(
        available[0][0]
    );

}


/* =========================================================
   CINEMATIC
========================================================= */

function createCinematic() {

    const element =
        document.createElement(
            "div"
        );


    element.id =
        "gachaCinematic";

    element.className =
        "gacha-cinematic";


    element.innerHTML = `

        <div class="cinematic-space"></div>

        <div class="cinematic-stars"></div>
        <div class="cinematic-stars layer2"></div>
        <div class="cinematic-stars layer3"></div>

        <div class="cinematic-nebula"></div>

        <div class="cinematic-lens"></div>

        <div class="cinematic-reticle"></div>

        <div
            class="search-particles"
            id="searchParticles"
        ></div>

        <div
            class="cinematic-target"
            id="cinematicTarget"
        ></div>

        <div
            class="cinematic-energy"
            id="cinematicEnergy"
        ></div>

        <div
            class="cinematic-object"
            id="cinematicObject"
        ></div>

        <div
            class="cinematic-result"
            id="cinematicResult"
        >

            <div
                class="cinematic-result-rarity"
                id="resultRarity"
            ></div>

            <div
                class="cinematic-result-name"
                id="resultName"
            ></div>

        </div>

        <div class="cinematic-corners"></div>

        <div
            class="cinematic-status"
            id="cinematicStatus"
        ></div>

    `;


    document.body.appendChild(
        element
    );


    return element;

}


const cinematic =
    createCinematic();


const cinematicTarget =
    $("cinematicTarget");

const cinematicEnergy =
    $("cinematicEnergy");

const cinematicObject =
    $("cinematicObject");

const cinematicResult =
    $("cinematicResult");

const resultRarity =
    $("resultRarity");

const resultName =
    $("resultName");

const cinematicStatus =
    $("cinematicStatus");

const searchParticles =
    $("searchParticles");


/* =========================================================
   GACHA PARTICLES
========================================================= */

function particles(
    color,
    amount = 30
) {

    searchParticles.innerHTML =
        "";


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "search-particle";


        particle.style.color =
            color;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            25 +
            Math.random() *
            75;


        const x =
            50 +
            Math.cos(angle) *
            distance;


        const y =
            50 +
            Math.sin(angle) *
            distance;


        particle.style.setProperty(
            "--x",
            `${x}%`
        );


        particle.style.setProperty(
            "--y",
            `${y}%`
        );


        particle.style.animationDelay =
            `${Math.random() * .25}s`;


        const size =
            1 +
            Math.random() *
            2.5;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        searchParticles.appendChild(
            particle
        );

    }

}


/* =========================================================
   CINEMATIC OBJECT
========================================================= */

function setCinematicObject(
    object
) {

    /*
        buildCelestialVisual() changes the
        className to "celestial".

        We intentionally restore BOTH classes
        afterwards so the cinematic styling and
        procedural celestial styling coexist.
    */

    cinematicObject.innerHTML =
        "";


    buildCelestialVisual(
        cinematicObject,
        object
    );


    cinematicObject.classList.add(
        "cinematic-object"
    );


    cinematicObject.dataset.object =
        object.id;


    cinematicObject.dataset.rarity =
        object.rarity;


    cinematicObject.style.setProperty(
        "--object-color",
        object.color
    );


    cinematicObject.style.setProperty(
        "--rarity-color",
        rarityColors[
            object.rarity
        ]
    );

}


/* =========================================================
   CINEMATIC RESET
========================================================= */

function resetCinematic() {

    cinematic.className =
        "gacha-cinematic";


    cinematicTarget.classList.remove(
        "found"
    );


    cinematicEnergy.classList.remove(
        "fire"
    );


    cinematicObject.classList.remove(
        "reveal",
        "forming"
    );


    cinematicResult.classList.remove(
        "show"
    );


    cinematicStatus.textContent =
        "";


    searchParticles.innerHTML =
        "";


    document
        .querySelectorAll(
            ".cinematic-stars"
        )
        .forEach(
            stars => {

                stars.style.opacity =
                    "";

                stars.style.animationDuration =
                    "";

            }
        );


    cinematicEnergy.style.background =
        "";


    cinematicEnergy.style.boxShadow =
        "";

}


/* =========================================================
   CINEMATIC PHASE HELPER
========================================================= */

async function cinematicPhase(
    phase,
    status,
    duration
) {

    cinematic.classList.remove(
        "locking",
        "scanning",
        "charging",
        "target-acquired",
        "rarity-surge",
        "impact",
        "camera-push",
        "camera-pull",
        "shake"
    );


    if (phase) {

        cinematic.classList.add(
            phase
        );

    }


    cinematicStatus.textContent =
        status;


    await wait(
        duration
    );

}


/* =========================================================
   GACHA
========================================================= */

let rolling =
    false;


gacha.button.addEventListener(
    "click",
    startGacha
);


async function startGacha() {

    if (rolling)
        return;


    const cost =
        getScanCost();


    if (
        player.stardust <
        cost
    ) {

        showNotification(
            "YOU NEED " +
            formatNumber(cost) +
            " STARDUST"
        );

        playErrorSound();

        return;

    }


    rolling =
        true;


    gacha.button.disabled =
        true;


    player.stardust -=
        cost;


    updateUI();


    const result =
        weightedRandom();


    await runGachaAnimation(
        result
    );


    finishGacha(
        result,
        cost
    );

}


/* =========================================================
   CINEMATIC ANIMATION — FULL REWORK
========================================================= */

async function runGachaAnimation(
    object
) {

    const rarity =
        object.rarity;


    const rarityColor =
        rarityColors[
            rarity
        ];


    /*
        =====================================================
        RESET
        =====================================================
    */

    resetCinematic();


    setCinematicObject(
        object
    );


    cinematic.style.setProperty(
        "--cinematic-rarity",
        rarityColor
    );


    cinematic.style.setProperty(
        "--object-color",
        object.color
    );


    cinematic.classList.add(
        "active",
        `rarity-${rarity}`
    );


    cinematicObject.classList.remove(
        "reveal",
        "forming"
    );


    /*
        =====================================================
        PHASE 1
        SYSTEM INITIALIZATION
        =====================================================
    */

    cinematicStatus.textContent =
        "INITIALIZING DEEP-SPACE ARRAY";


    tone(
        110,
        .1,
        "sine",
        .025
    );


    await wait(
        300
    );


    /*
        =====================================================
        PHASE 2
        TELESCOPIC LOCK-ON
        =====================================================
    */

    cinematic.classList.add(
        "locking",
        "camera-push"
    );


    cinematicStatus.textContent =
        "CALIBRATING TELESCOPIC ARRAY";


    playTelescopeStartSound();


    await wait(
        650
    );


    /*
        =====================================================
        PHASE 3
        TARGET ACQUISITION
        =====================================================
    */

    cinematicTarget.classList.add(
        "found"
    );


    cinematic.classList.add(
        "target-acquired"
    );


    cinematicStatus.textContent =
        "DISTANT SIGNAL DETECTED";


    playSignalSound();


    tone(
        700,
        .1,
        "sine",
        .025
    );


    await wait(
        550
    );


    /*
        =====================================================
        PHASE 4
        DEEP SPACE SCAN
        =====================================================
    */

    cinematic.classList.remove(
        "locking"
    );


    cinematic.classList.add(
        "scanning"
    );


    cinematicStatus.textContent =
        "SCANNING DEEP SPACE";


    particles(
        "#8ebcff",
        rarity === "legendary"
            ? 90
            : rarity === "epic"
                ? 72
                : 50
    );


    document
        .querySelectorAll(
            ".cinematic-stars"
        )
        .forEach(
            stars => {

                stars.style.animationDuration =
                    ".9s";

                stars.style.opacity =
                    ".9";

            }
        );


    playScanningSound();


    await wait(
        950
    );


    /*
        =====================================================
        PHASE 5
        HARD LOCK
        =====================================================
    */

    cinematic.classList.remove(
        "scanning"
    );


    cinematic.classList.add(
        "target-acquired"
    );


    cinematicTarget.classList.remove(
        "found"
    );


    await wait(
        120
    );


    cinematicTarget.classList.add(
        "found"
    );


    cinematicStatus.textContent =
        "TARGET ACQUIRED";


    tone(
        520,
        .1,
        "sine",
        .035
    );


    tone(
        840,
        .15,
        "sine",
        .03,
        .08
    );


    await wait(
        420
    );


    /*
        =====================================================
        PHASE 6
        ENERGY CHARGE
        =====================================================
    */

    cinematic.classList.add(
        "charging"
    );


    cinematicStatus.textContent =
        "ANALYZING ENERGY SIGNATURE";


    particles(
        rarityColor,
        rarity === "legendary"
            ? 105
            : rarity === "epic"
                ? 85
                : 60
    );


    /*
        Multiple expanding rings.
    */

    for (
        let wave = 0;
        wave < 3;
        wave++
    ) {

        cinematicEnergy.classList.remove(
            "fire"
        );


        void cinematicEnergy.offsetWidth;


        cinematicEnergy.classList.add(
            "fire"
        );


        tone(
            180 +
            wave * 130,
            .18,
            "sine",
            .035
        );


        await wait(
            rarity === "legendary"
                ? 280
                : 230
        );

    }


    /*
        =====================================================
        PHASE 7
        RARITY SURGE
        =====================================================
    */

    cinematic.classList.add(
        "rarity-surge"
    );


    cinematicStatus.textContent =
        rarity === "legendary"
            ? "ANOMALOUS SIGNAL"
            : rarity === "epic"
                ? "EXTREME SIGNAL"
                : rarity === "rare"
                    ? "HIGH-ENERGY SIGNAL"
                    : "SIGNAL ANALYSIS";


    cinematicEnergy.style.background =
        `
        radial-gradient(
            circle,
            white 0%,
            ${rarityColor} 12%,
            ${rarityColor}55 32%,
            transparent 72%
        )
        `;


    cinematicEnergy.style.boxShadow =
        `
        0 0 70px
        ${rarityColor},

        0 0 160px
        ${rarityColor}88,

        0 0 260px
        ${rarityColor}44
        `;


    cinematicEnergy.classList.remove(
        "fire"
    );


    void cinematicEnergy.offsetWidth;


    cinematicEnergy.classList.add(
        "fire"
    );


    playRaritySound(
        rarity
    );


    /*
        More intense high-rarity buildup.
    */

    await wait(
        rarity === "legendary"
            ? 900
            : rarity === "epic"
                ? 700
                : rarity === "rare"
                    ? 550
                    : rarity === "uncommon"
                        ? 400
                        : 300
    );


    /*
        =====================================================
        PHASE 8
        COSMIC IMPACT
        =====================================================
    */

    cinematic.classList.remove(
        "charging"
    );


    cinematic.classList.add(
        "impact",
        "shake"
    );


    cinematicStatus.textContent =
        "COSMIC EVENT CONFIRMED";


    /*
        Huge particle explosion.
    */

    particles(
        rarityColor,
        rarity === "legendary"
            ? 160
            : rarity === "epic"
                ? 125
                : rarity === "rare"
                    ? 90
                    : 70
    );


    cinematicEnergy.classList.remove(
        "fire"
    );


    void cinematicEnergy.offsetWidth;


    cinematicEnergy.classList.add(
        "fire"
    );


    /*
        Impact sound.
    */

    tone(
        rarity === "legendary"
            ? 75
            : rarity === "epic"
                ? 95
                : 125,
        .3,
        "sine",
        .065
    );


    tone(
        rarity === "legendary"
            ? 180
            : rarity === "epic"
                ? 230
                : 300,
        .2,
        "triangle",
        .035,
        .04
    );


    await wait(
        rarity === "legendary"
            ? 520
            : rarity === "epic"
                ? 450
                : 360
    );


    /*
        =====================================================
        PHASE 9
        MATTER FORMATION
        =====================================================
    */

    cinematic.classList.remove(
        "impact",
        "shake"
    );


    cinematic.classList.add(
        "camera-pull"
    );


    cinematicTarget.classList.remove(
        "found"
    );


    cinematicEnergy.classList.remove(
        "fire"
    );


    cinematicObject.classList.add(
        "forming"
    );


    cinematicStatus.textContent =
        "MATTER COALESCING";


    /*
        The object emerges from the
        energy instead of simply popping in.
    */

    particles(
        object.color,
        rarity === "legendary"
            ? 80
            : rarity === "epic"
                ? 65
                : 45
    );


    playRevealSound(
        rarity
    );


    await wait(
        850
    );


    /*
        =====================================================
        PHASE 10
        OBJECT REVEAL
        =====================================================
    */

    cinematicObject.classList.remove(
        "forming"
    );


    cinematicObject.classList.add(
        "reveal"
    );


    cinematicStatus.textContent =
        "IDENTIFYING OBJECT";


    await wait(
        650
    );


    /*
        =====================================================
        PHASE 11
        DISCOVERY CONFIRMED
        =====================================================
    */

    cinematicStatus.textContent =
        "DISCOVERY CONFIRMED";


    resultRarity.textContent =
        rarity.toUpperCase();


    resultRarity.style.setProperty(
        "--result-color",
        rarityColor
    );


    resultRarity.style.color =
        rarityColor;


    resultName.textContent =
        object.name;


    cinematicResult.classList.add(
        "show"
    );


    /*
        Small confirmation chord.
    */

    tone(
        500,
        .14,
        "sine",
        .025
    );


    tone(
        750,
        .18,
        "sine",
        .03,
        .08
    );


    tone(
        1000,
        .25,
        "sine",
        .035,
        .16
    );


    await wait(
        rarity === "legendary"
            ? 1500
            : rarity === "epic"
                ? 1250
                : 950
    );


    /*
        =====================================================
        PHASE 12
        CLOSE
        =====================================================
    */

    cinematicResult.classList.remove(
        "show"
    );


    cinematic.classList.remove(
        "camera-pull"
    );


    await wait(
        350
    );


    cinematic.classList.remove(
        "active"
    );


    await wait(
        300
    );


    resetCinematic();

}


/* =========================================================
   FINISH GACHA
========================================================= */

function finishGacha(
    object,
    cost
) {

    const owned =
        player.discovered.includes(
            object.id
        );


    const discoveryReward =
        getObjectCashPerClick(
            object
        );


    if (!owned) {

        player.discovered.push(
            object.id
        );


        player.totalDiscoveries++;


        if (
            rarityOrder.indexOf(
                object.rarity
            ) >
            rarityOrder.indexOf(
                player.rarest
            )
        ) {

            player.rarest =
                object.rarity;

        }


        showNotification(
            "NEW DISCOVERY — " +
            object.name +
            " +" +
            formatNumber(
                discoveryReward
            ) +
            " ✦"
        );

        
        player.stardust +=
            discoveryReward;

    }
    else {

        const duplicateRefund =
            Math.floor(
                cost * 0.40
            );


        showNotification(
            object.name +
            " DISCOVERED AGAIN +" +
            formatNumber(
                duplicateRefund
            ) +
            " ✦"
        );


        player.stardust +=
            duplicateRefund;

    }


    player.equipped =
        object.id;


    rolling =
        false;


    gacha.button.disabled =
        false;


    updateUI();

}


/* =========================================================
   NAVIGATION
========================================================= */

document
    .querySelectorAll(
        ".nav-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    if (rolling)
                        return;


                    switchPage(
                        button.dataset.page
                    );

                }
            );

        }
    );


function switchPage(
    page
) {

    document
        .querySelectorAll(
            ".page"
        )
        .forEach(
            element =>
                element.classList.remove(
                    "active"
                )
        );


    $(page)
        .classList.add(
            "active"
        );


    document
        .querySelectorAll(
            ".nav-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.page ===
                    page
                );

            }
        );


    if (
        page ===
        "leaderboardPage"
    ) {

        renderLeaderboard();

    }

}


/* =========================================================
   LEADERBOARD
========================================================= */

const fakePlayers = [

    {
        name: "Nova",
        stardust: 4829402,
        rarity: "legendary",
        discoveries: 41
    },

    {
        name: "Stellar",
        stardust: 3910281,
        rarity: "epic",
        discoveries: 36
    },

    {
        name: "Cosmo",
        stardust: 2839012,
        rarity: "epic",
        discoveries: 31
    },

    {
        name: "Orbit",
        stardust: 1938291,
        rarity: "rare",
        discoveries: 28
    },

    {
        name: "Astrid",
        stardust: 1204822,
        rarity: "rare",
        discoveries: 25
    }

];


let leaderboardMode =
    "stardust";


document
    .querySelectorAll(
        ".leader-tab"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".leader-tab"
                        )
                        .forEach(
                            b =>
                                b.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    leaderboardMode =
                        button.dataset.board;


                    renderLeaderboard();

                }
            );

        }
    );


function renderLeaderboard() {

    const players = [

        ...fakePlayers,

        {
            name: "YOU",
            stardust:
                player.stardust,
            rarity:
                player.rarest,
            discoveries:
                player.discovered.length
        }

    ];


    if (
        leaderboardMode ===
        "stardust"
    ) {

        players.sort(
            (a, b) =>
                b.stardust -
                a.stardust
        );

    }


    if (
        leaderboardMode ===
        "discoveries"
    ) {

        players.sort(
            (a, b) =>
                b.discoveries -
                a.discoveries
        );

    }


    if (
        leaderboardMode ===
        "rarity"
    ) {

        players.sort(
            (a, b) =>
                rarityOrder.indexOf(
                    b.rarity
                ) -
                rarityOrder.indexOf(
                    a.rarity
                )
        );

    }


    $("leaderboardList")
        .innerHTML =
        "";


    players
        .slice(0, 10)
        .forEach(
            (
                playerData,
                index
            ) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "leader-row";


                let score;


                if (
                    leaderboardMode ===
                    "stardust"
                ) {

                    score =
                        formatNumber(
                            playerData.stardust
                        ) +
                        " ✦";

                }


                if (
                    leaderboardMode ===
                    "discoveries"
                ) {

                    score =
                        playerData.discoveries +
                        " OBJECTS";

                }


                if (
                    leaderboardMode ===
                    "rarity"
                ) {

                    score =
                        playerData.rarity
                            .toUpperCase();

                }


                row.innerHTML = `

                    <div class="leader-rank">
                        #${index + 1}
                    </div>

                    <div class="leader-player">
                        ${playerData.name}
                    </div>

                    <div class="leader-score">
                        ${score}
                    </div>

                `;


                $("leaderboardList")
                    .appendChild(
                        row
                    );

            }
        );

}


renderLeaderboard();


/* =========================================================
   NOTIFICATIONS
========================================================= */

let notificationTimeout;


function showNotification(
    text
) {

    notification.textContent =
        text;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimeout
    );


    notificationTimeout =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            1700
        );

}


/* =========================================================
   AUDIO
========================================================= */

let audioContext =
    null;


function audio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    return audioContext;

}


function tone(
    frequency,
    duration,
    type = "sine",
    volume = .04,
    delay = 0
) {

    const ctx =
        audio();


    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    oscillator.type =
        type;

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0,
        ctx.currentTime +
        delay
    );


    gain.gain.linearRampToValueAtTime(
        volume,
        ctx.currentTime +
        delay +
        .01
    );


    gain.gain.exponentialRampToValueAtTime(
        .001,
        ctx.currentTime +
        delay +
        duration
    );


    oscillator.connect(
        gain
    );

    gain.connect(
        ctx.destination
    );


    oscillator.start(
        ctx.currentTime +
        delay
    );


    oscillator.stop(
        ctx.currentTime +
        delay +
        duration +
        .05
    );

}


function playCollectSound(
    rarity
) {

    const base =
        rarity === "legendary"
            ? 700
            : rarity === "epic"
                ? 500
                : 360;


    tone(
        base,
        .08,
        "sine",
        .03
    );


    tone(
        base * 1.5,
        .12,
        "sine",
        .022,
        .05
    );

}


function playEquipSound() {

    tone(
        420,
        .08,
        "triangle",
        .025
    );


    tone(
        620,
        .12,
        "triangle",
        .025,
        .06
    );

}


function playErrorSound() {

    tone(
        120,
        .15,
        "sawtooth",
        .035
    );

}


function playTelescopeStartSound() {

    tone(
        120,
        .3,
        "sine",
        .025
    );


    tone(
        180,
        .4,
        "sine",
        .018,
        .14
    );

}


function playScanningSound() {

    tone(
        250,
        .35,
        "triangle",
        .018
    );


    tone(
        330,
        .4,
        "triangle",
        .014,
        .15
    );

}


function playSignalSound() {

    tone(
        500,
        .08,
        "sine",
        .035
    );


    tone(
        800,
        .12,
        "sine",
        .04,
        .08
    );

}


function playRaritySound(
    rarity
) {

    const sounds = {

        common: [
            [440, .12, "sine", .025, 0]
        ],

        uncommon: [
            [440, .1, "sine", .025, 0],
            [660, .15, "sine", .03, .07]
        ],

        rare: [
            [500, .1, "sine", .03, 0],
            [750, .13, "sine", .035, .08],
            [1000, .18, "sine", .04, .16]
        ],

        epic: [
            [400, .15, "triangle", .03, 0],
            [600, .16, "triangle", .035, .08],
            [900, .24, "triangle", .04, .16]
        ],

        legendary: [
            [300, .25, "sine", .035, 0],
            [500, .25, "sine", .04, .14],
            [750, .3, "sine", .045, .28],
            [1100, .45, "sine", .05, .42]
        ]

    };


    (
        sounds[rarity] ||
        []
    )
    .forEach(
        sound =>
            tone(
                ...sound
            )
    );

}


function playRevealSound(
    rarity
) {

    const multiplier =
        rarity === "legendary"
            ? 2
            : rarity === "epic"
                ? 1.5
                : 1;


    tone(
        220 * multiplier,
        .28,
        "sine",
        .035
    );


    tone(
        330 * multiplier,
        .32,
        "sine",
        .035,
        .06
    );


    tone(
        550 * multiplier,
        .4,
        "sine",
        .045,
        .12
    );

}


/* =========================================================
   START
========================================================= */

updateUI();

updateBanner();

renderLeaderboard();
