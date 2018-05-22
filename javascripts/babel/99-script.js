// To instantiate FastClick on the body, which is the recommended method of use:
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
        console.log('Fastclick loaded.')
    }, false);
}

window.onload = () => {

    let domReady = setTimeout(() => {
        if (document.readyState === 'complete') {
            console.log('dom ready')
            clearInterval(domReady)

            // Home Page
            if (_isPageClass('page-home')) {
                _homeSwiper()
            }
    }

    }, 500)

    // Window Resizing
    let $onResizeTimer; // wait until after resize has finished or this repeats like a dog in heat
    window.onresize = function() {
        clearTimeout($onResizeTimer);
        $onResizeTimer = setTimeout(function(){

            // HOME
            if (_isPageClass('page-home')) {
                // Adjust the Navigation + Call 2 Actions
                console.log('window was resized')
            }
        }, 300);
    };

}