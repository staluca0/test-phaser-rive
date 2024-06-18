let supportWebp;
let supportWebm;


// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(result);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
}


check_webp_feature('lossy', function(supporta) {
    if (supporta) {
        console.log("DEBUG: supporta webp");
        supportWebp = true;
        // supportWebp = false;
    } else {
        console.log("DEBUG: non supporta webp");
        supportWebp = false;
    }
    console.log("supportWebp", supporta);
});



function supportsWebM() {
    var video = document.createElement('video');
    if (video.canPlayType('video/webm; codecs="vp8, vorbis"') === "probably" ||
        video.canPlayType('video/webm; codecs="vp8, vorbis"') === "maybe") {
        return true;
    } else {
        return false;
    }
}

if (supportsWebM()) {
    console.log("DEBUG: supporta webm");
    supportWebm=true;
} else {
    console.log("DEBUG: non supporta webm");
    supportWebm=false;
}


export default function LoadResource(Scene) {
    //_____________________________________CARICAMENTO DEI FILE ATLAS___________________________________________//
    // Scene.load.image('snow-particle', 'res/snow.png')
    // Scene.load.image('snow-particle-trasition', 'res/snowflake_1.png')
    // Scene.load.multiatlas('snow-particle-trasition', 'res/Snowflake.json', "res");


    if (supportWebp) {
        Scene.load.multiatlas('Grafica', 'res/Nuova_grafica/DragonMod/100_V5/Grafica.json', "res/Nuova_grafica/DragonMod/100_V5");
        // Scene.load.multiatlas('Gold_coin', 'res/commonRes/monete/Coin.json', "res/commonRes/monete");
        // console.log("DEBUG: NORMAL MODE");
    } else {
        // Scene.load.multiatlas('Grafica', 'res/customRes/SimboliLegacy/Simboli.json', "res/customRes/SimboliLegacy");
        // Scene.load.multiatlas('Grafica', 'res/customRes/grafica/PulsantiLegacy.json', "res/customRes/grafica");
        // Scene.load.multiatlas('IceBreak', 'res/customRes/videoLegacy/IceBreak.json', "res/customRes/video");
        // Scene.load.multiatlas('Gold_coin', 'res/commonRes/monete/CoinLegacy.json', "res/commonRes/monete");
        // Scene.load.multiatlas('Grafica', 'res/customRes/grafica/ScritteLegacy.json', "res/customRes/grafica");
        // Scene.load.multiatlas('Grafica', 'res/commonRes/menu/menuEinfoLegacy.json', "res/commonRes/menu");
        // console.log("DEBUG: LEGACY MODE");
    }
    
    //-------Shader
    Scene.load.glsl('ripple', 'res/shader/rippleShader.glsl');





    // Scene.load.bitmapFont('finalwin_font', 'res/customRes/grafica/font_vincite.png', 'res/customRes/grafica/font_vincite.xml');

    // Scene.load.setPath('res/customRes/grafica/')
    // Scene.load.image('fondoRulli', 'fondoRulli.png');
    if (!supportWebp) {

        // console.log("DEBUG: LEGACY MODE");
    } else {

        // console.log("DEBUG: NORMAL MODE");
    }


    //__________________________________customRes/symboli_________________________________________//
    if (!supportWebp) {
        // Scene.load.setPath('res/customRes/grafica')
        // Scene.load.image('BaseGame_L', 'BaseGame_L.png');
        // Scene.load.image('BaseGame_L_FreeSpin', 'BaseGame_L_Freespin.png');
        // Scene.load.image('BaseGame_P_FreeSpin', 'BaseGame_P_Freespin.png');
        // Scene.load.image('BaseGame_P_Bonus', 'BaseGame_P_Bonus.png');
        // Scene.load.image('BaseGame_L_Bonus', 'BaseGame_L_Bonus.png');
        // Scene.load.image('BaseGame_P', 'BaseGame_P.png');
        // Scene.load.image('Bordo_L', 'BaseGame_L_bucato.png');
        // Scene.load.image('Bordo_P', 'BaseGame_P_bucato.png');
        // console.log("DEBUG: LEGACY MODE");
    } else {
        // Scene.load.setPath('res/customRes/grafica')
        // Scene.load.image('BaseGame_L', 'BaseGame_L.jpg');
        // Scene.load.image('BaseGame_L_FreeSpin', 'BaseGame_L_Freespin.jpg');
        // Scene.load.image('BaseGame_P_FreeSpin', 'BaseGame_P_Freespin.jpg');
        // Scene.load.image('BaseGame_P_Bonus', 'BaseGame_P_Bonus.jpg');
        // Scene.load.image('BaseGame_L_Bonus', 'BaseGame_L_Bonus.jpg');
        // Scene.load.image('BaseGame_P', 'BaseGame_P.jpg');
        // Scene.load.image('Bordo_L', 'BaseGame_L_bucato.webp');
        // Scene.load.image('Bordo_P', 'BaseGame_P_bucato.webp');
        // console.log("DEBUG: NORMAL MODE");
    }

    // Scene.load.setPath('')

}

