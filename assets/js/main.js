var staticHeaderHeight,
    navigationHeight,
    headerHeight,
    posYstt;

var page_name,
    current_page_name;

var theID;

var duration = 500;
var visibleMenu = false;

var $container = $('.container');

var winHeight = window.innerHeight;

var $gmap = $('.google-map');

var breakingpoint = '2000px';
var first_breakingpoint = '1500px';
var tablet_breakingpoint_1 = '1290px';
var tablet_breakingpoint_2 = '1024px';
var mobile_breakingpoint_1 = '840px';
var mobile_breakingpoint_2 = '576px';
var mobile_breakingpoint_3 = '410px';

var gridNumber = 3;

$(document).ready(function () {

    setDynamicVariables();
    applyDynamicCSS();
    groupTeams();
    showLeftContent();


    window.addEventListener('resize', function () {
        groupTeams();
        showLeftContent();
        setDynamicVariables();
        applyDynamicCSS();
    });

    // show and hide the menu on click of the STATIC-HEADER
    $('.static-header').click(menuToggle);

    // click NOT on the STATIC HEADER to hide the mene
    $(document).click(function (event) {
        if (!$(event.target).closest('.static-header').length && visibleMenu) {
            $('.navigation').animate({ 'top': '-' + navigationHeight }, duration);
            $('.open-close').addClass('close-animation');
            $('.open-close').removeClass('open-animation');
            visibleMenu = false;
        }
    });

    // click function for the sidebar menu on the LEISTUNGEN page
    $('.clickable').click(sideNavScroll);


    // scroll to top function
    var scrollToTop = document.getElementById('scroll-to-top');
    scrollToTop.onclick = function () {
        window.scrollTo({
            top: scrollX,
            behavior: "smooth"
        }); 
    };
    
    window.addEventListener('scroll', function () {
        scrollToTop.hidden = (scrollY < winHeight);
    });

    
    
    function toggleAdditionalInfo() {
        var $info = $(this).prev(".additional-info");
        $info.slideToggle();
        $(this).text(function (i, text) {
            return text === "Mehr anzeigen +" ? "Weniger anzeigen â€“" : "Mehr anzeigen +";
        });
    }

    
    $(".additional-info").hide();

    
    $(".additional-info").each(function () {
        var $button = $('<button class="toggle-button">Mehr anzeigen +</button>');
        $(this).after($button);
    });

    
    $(document).on("click", ".toggle-button", toggleAdditionalInfo);

    
    $('.navigation .menu .menu-item').each(function () {
        var menuItemName = $(this).text();
        if (current_page_name === menuItemName) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    
    if ($container.height() > winHeight && current_page_name !== 'Kontakt') {
        $('.container-wrapper, .container').addClass('container-gradient');
        if (current_page_name === 'Ãœber uns') {
            $('.container-wrapper, .container').addClass('container-gradient-ueberuns');
            var thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--top-color-sec');
            $('.container-wrapper, body').css('backgroundColor', thirdColor);
        } else {
            var topColor = getComputedStyle(document.documentElement).getPropertyValue('--top-color');
            $('body').css('backgroundColor', topColor);
        }
    }

    
    if (current_page_name !== 'Kontakt') {

        if (current_page_name === page_name || $container.height() < winHeight) {

            $(".container-wrapper, .container").css('background', 'transparent');

            var $win = $(window),
                w = 0,
                h = 0,
                rgb = [],

                getWidth = function () {
                    w = $win.width();
                    h = $win.height();
                };

            var timeout = null;

            $win.ready(getWidth).mousemove(function (e) {

                rgb = [
                    126 + Math.round(e.pageY / h * 50),
                    150 + Math.round(e.pageX / h * 30),
                    231 - Math.round(e.pageY / h * 100)
                ];

                if (timeout !== null) {
                    $('body').css('background-color', 'rgb(' + rgb.join(',') + ')');
                    clearTimeout(timeout);
                }

                timeout = setTimeout(function () {
                    $('body').animate({ backgroundColor: "#221f1f" }, "fast");
                }, 1000);

            }).ready();

            var bgImgSrc = $('#bg-obj').data('src');
            $('.bg-obj').addClass('bg-image');
            $('.bg-image').css('background', 'url(' + bgImgSrc + ') no-repeat center center fixed');

        }
    } else {
        var secondColor = getComputedStyle(document.documentElement).getPropertyValue('--second-color');
        $('.container-wrapper, body').css('backgroundColor', secondColor);
    }

    

}); 

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //


// groups the grid rows to set their size to the size of the talles element per row
function resizeTeamElements() { 
    gridNumber = 3;
    if (matchDevice(first_breakingpoint)) { gridNumber = 2 }
    if (matchDevice(mobile_breakingpoint_1)) { gridNumber = 1 }

    var eachGroup = new Array();
    $('.container .wp-block-group').each(function (index) {
        $(this).attr('id', 'wp-block-group-' + index);
        eachGroup[index] = $(this); // fill array with elements from EACH LOOP
    });

    if (gridNumber > 1) {
        var gridGroups = Math.ceil(eachGroup.length / gridNumber);
        var lengthCounter = 0;
        for (let i = 0; i < gridGroups; i++) { // how many rows
            var t = 0; // set to 0 for every new row
            for (let j = 0; j < gridNumber; j++) { // how many element per row
                var aNum = i * gridNumber + j;
                if (lengthCounter < eachGroup.length && eachGroup[aNum] !== undefined) {
                    if (eachGroup[aNum].outerHeight() > t) {
                        t = eachGroup[aNum].outerHeight();
                    }
                    eachGroup[aNum].css('height', t);
                    lengthCounter++;
                }
            }
        }
    }
};

function groupTeams() {
    // Find all h2.team elements
    $('h2.team').each(function () {
        const $teamHeading = $(this);
        const $wpBlockGroups = $teamHeading.nextUntil('h2.team', '.wp-block-group');

        // Wrap all $wpBlockGroups in a .team-container
        $wpBlockGroups.wrapAll('<div class="team-container"></div>');
    });
}


function matchDevice(device_breakingpoint) { 
    var deviceMatch = window.matchMedia('(max-width: ' + device_breakingpoint + ')');
    return deviceMatch.matches;
}


function showLeftContent() { 
    const box = document.getElementById('side-navigation');
    const leftContent = $('.left-content');
    if (box.childNodes.length > 0) { 
    } else {
        $('.left-conten-toggle').css('display', 'none');
    }
}


function setDynamicVariables() {
    staticHeaderHeight = $('.static-header-wrapper').height();
    navigationHeight = $('.navigation').innerHeight();
    headerHeight = staticHeaderHeight + navigationHeight;

    
    page_name = $('body').data('page');
    current_page_name = $('body').attr('id');

    
    var sideMargin = parseInt($('.footer-item').css('padding'));
    var objectHeight = $('.scroll-to-top').height();
    var footerHeight = $('footer').outerHeight()
    posYstt = footerHeight - objectHeight - sideMargin * 2;
}

function applyDynamicCSS() {
    
    $('.container-wrapper').css('paddingTop', staticHeaderHeight);
    $('.left-content').css('top', staticHeaderHeight + 10);

    $('.navigation').css('top', '-' + navigationHeight);

   
    $('.scroll-to-top').css('bottom', posYstt);
}

function menuToggle() {
    if (visibleMenu == false) {
        $('.navigation').animate({ 'top': staticHeaderHeight }, duration);
        $('#nav-icon').toggleClass('open');
        visibleMenu = true;
    } else {
        $('.navigation').animate({ 'top': '-' + navigationHeight }, duration);
        $('#nav-icon').toggleClass('open');
        visibleMenu = false;
    }
}

function sideNavScroll() {
    theID = '#' + $(this).find('a').attr('rel');
    var headerOffset = staticHeaderHeight - 3;
    var elementPosition = $(theID).offset().top;
    var offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

