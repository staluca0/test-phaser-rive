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



    if (supportWebp) {

    } else {

    }
    
    //-------Shader
    Scene.load.glsl('ripple', 'res/shader/rippleShader.glsl');





}

