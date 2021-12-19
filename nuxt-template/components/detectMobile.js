// my laptop also has touch screen
function isTouchEnabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}
// so we must detect mobile devices by small&touch screen
function isSmallScreen() {
    return window.innerWidth <= 800
}

function isMobile() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)) && window.innerWidth <= 800;
}