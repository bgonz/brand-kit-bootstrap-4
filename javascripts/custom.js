'use strict';

// Responsive Sizes

var client_sm = 768,
    client_md = 992,
    client_lg = 1200,
    client_xl = 1400;

// Check if the Document has a certain Element ID
var _hasId = function _hasId(el_id) {
    if (document.contains(document.getElementById(el_id))) {
        console.log('This Page has ' + el_id + ' ID');
        return true;
    }
};

// Check if the Document Body has a certain Class
var _isPageClass = function _isPageClass(page_class) {
    if (document.getElementsByTagName("body")[0].className.indexOf(page_class) > -1) {
        //console.log('This Page has ' + page_class + ' Class')
        return true;
    } else {
        return false;
    }
};

// Check if an Element has a certain Class
var _hasClass = function _hasClass(el, name) {
    if (el.className.indexOf(name) > -1) {
        return true;
    } else {
        return false;
    }
};

// Check if User is on Mobile Device
var _mobileDevice = function _mobileDevice() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        console.log('Yes - Mobile');
        return true;
    }
};

// Scroll Sections
var _scroll_position = function _scroll_position() {

    var scroll_li = document.querySelectorAll('.scroll-target-menu-li'),
        scroll_link = document.querySelectorAll('.scroll-target-menu-li a'),
        init_link = function init_link() {
        for (var i = 0; i < scroll_link.length; i++) {
            (function (i) {

                var li_top = scroll_link[i].getBoundingClientRect().top,
                    li_bottom = scroll_link[i].getBoundingClientRect().bottom,
                    section = document.querySelector(scroll_link[i].getAttribute('href')),
                    section_top = section.getBoundingClientRect().top,
                    section_bottom = section.getBoundingClientRect().bottom;

                if (li_top > section_top && li_bottom < section_bottom) {
                    scroll_li[i].classList.add('active');
                } else {
                    scroll_li[i].classList.remove('active');
                }
            })(i);
        }
    };

    init_link();

    window.addEventListener('scroll', function () {
        init_link();
    });
};

// Insert Elements in DOM
var _insertAfter = function _insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

// Get the position of an element relative to the document
var _offset = function _offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

// Warn User to Rotate Device
var _orientationForce = function _orientationForce() {
    var orientationOverlay = document.getElementById('orientationOverlay');

    // We only care about mobile orientation
    if (_mobileDevice()) {
        // Force Portrait Mode
        var mediaLandscape = window.matchMedia("(orientation:landscape)");
        console.log("Device held " + (mediaLandscape.matches ? "horizontally" : "vertically"));
        if (mediaLandscape.matches) {
            console.log("Lanscape Mode.");
            document.getElementById('orientationOverlay').style.cssText = 'visibility: visible;';
        }

        var overlayOrienation = function overlayOrienation(mediaLandscape) {
            if (mediaLandscape.matches) {
                console.log("Lanscape Mode.");
                document.getElementById('orientationOverlay').style.cssText = 'visibility: visible;';
            } else {
                console.log("Portrait Mode");
                document.getElementById('orientationOverlay').style.cssText = 'visibility: hidden;';
            }
        };
        mediaLandscape.addListener(overlayOrienation);
    }
};

// Tabs
var _tabs = function _tabs() {
    // Listen for click events
    document.addEventListener('click', function (event) {
        var tabLinks = document.querySelectorAll('.tab-toggle');

        //console.log(event)

        // Only take action if the clicked link was a tab toggle with a valid anchor link
        if (!event.target.classList.contains('tab-toggle') || !event.target.hash) return;

        // Get the anchored content
        var content = document.querySelector(event.target.hash);
        if (!content) return;

        // Remove all Previous Active Tabs
        for (var i = 0; i < tabLinks.length; i++) {
            (function (i) {
                //console.log(tabLinks[i])
                tabLinks[i].classList.remove('active');
            })(i);
        }
        // Activate Tab
        event.target.classList.add('active');

        // Tab Pane -> Store the ID as a data attribute and remove it
        content.setAttribute('data-id', content.id);
        content.id = '';

        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active');
    }, false);
    // Listen for hashchange events
    window.addEventListener('hashchange', function (event) {

        // Get the anchored content
        var content = document.querySelector('[data-id="' + window.location.hash.substring(1) + '"]'),
            tabPanes = document.querySelectorAll('.tab-pane');

        if (!content) return;

        // Restore the ID
        content.id = content.getAttribute('data-id');

        // Open the content, close other tabs, whatever
        for (var i = 0; i < tabPanes.length; i++) {
            (function (i) {
                console.log(tabPanes[i]);
                tabPanes[i].classList.remove('active');
            })(i);
        }
        content.classList.add('active');
        console.log('Made Active');

        // Try to bring the content into focus
        content.focus();

        // If it didn't work, give the content a tabindex of -1 and try again
        if (document.activeElement.id !== content.id) {
            content.setAttribute('tabindex', '-1');
            content.focus();
        }

        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active');
    }, false);
    // Get the content
    if (window.location.hash.length > 0) {
        var content = document.querySelector(window.location.hash),
            activeTab = document.querySelector("a[href='" + window.location.hash + "']");

        console.log(activeTab);

        if (activeTab) {
            activeTab.classList.add('active');
        }
        // If the content is a tab, open it
        if (content && content.classList.contains('tab-pane')) {
            content.classList.add('active');
            // close other tabs or do whatever else here
        }
        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active');
    }

    // Add the .tabs-loaded class to the <html> element
    document.documentElement.classList.add('tabs-loaded');
};

// MODAL OVERLAY
var _modalOverlay = function _modalOverlay(hiddenElement) {
    var body = document.querySelector('body'),
        modalOverlayContainer = document.createElement('div'),
        modalContentWrapper = document.createElement('div'),
        modalContent = document.getElementById(hiddenElement),
        closer = document.createElement('div');

    // MODAL CONTAINER
    modalOverlayContainer.id = 'modalOverlay';

    // CONTENT
    modalContentWrapper.id = 'modalContent';
    modalContentWrapper.classList.add('modal');
    modalContentWrapper.innerHTML = modalContent.innerHTML;

    // CLOSER
    closer.classList.add('closer-button', 'modal');
    closer.innerHTML = '<span>Close</span><i class="fa fa-close"></i>';
    closer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 100;';

    // Add to DOM
    body.appendChild(modalOverlayContainer);
    body.appendChild(modalContentWrapper);
    body.appendChild(closer);

    // Active States
    modalOverlayContainer.classList.add('open');
    body.classList.add('modalBlur');
    window.scrollTo(0, 0);

    // Removal Process
    closer.addEventListener('click', function (event) {
        console.log('Clicked Closer');
        body.removeChild(modalContentWrapper);
        body.removeChild(closer);
        body.removeChild(modalOverlayContainer);
        body.classList.remove('modalBlur');
    });
};

//
var _modalButtons = function _modalButtons() {
    var modalButtons = document.querySelectorAll('.modal-button');

    if (modalButtons) {
        var _loop = function _loop(i) {
            modalButtons[i].onclick = function () {
                //
                var modalRef = modalButtons[i].getAttribute('data-modal');
                //console.log(modalRef)
                _modalOverlay(modalRef);
            };
        };

        //console.log(modalButtons)

        for (var i = 0; i < modalButtons.length; i++) {
            _loop(i);
        }
    }
};
'use strict';

window.onload = function () {

    var domReady = setTimeout(function () {
        if (document.readyState === 'complete') {
            console.log('dom ready');
            clearInterval(domReady);

            // Home Page
            if (_isPageClass('page-home')) {
                _homeSwiper();
            }
        }
    }, 500);

    // Window Resizing
    var $onResizeTimer = void 0; // wait until after resize has finished or this repeats like a dog in heat
    window.onresize = function () {
        clearTimeout($onResizeTimer);
        $onResizeTimer = setTimeout(function () {

            // HOME
            if (_isPageClass('page-home')) {
                // Adjust the Navigation + Call 2 Actions
                console.log('window was resized');
            }
        }, 300);
    };
};