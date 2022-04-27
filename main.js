/*-------------------------------- Scrollify --------------------------------*/
jQuery(function() {
    jQuery.scrollify({
        section: "section",
        updateHash: false,
        afterRender: beginObserver
    });
});

jQuery('body').imagesLoaded().progress(function(instance, image) {
    jQuery.scrollify.update();
});

/*-------------------------------- Typewriter --------------------------------*/
var app = document.getElementById('setting-text');
let currentPage = 1;
let typing = false;
let pages = [
    'The year is 2042._The AI agreement was violated by the secret service of [redacted] in the search of accelerating decryption mechanisms and infiltrating classified assets._Technology took a mind of its own._The year is 3046._The human species has long been dominated._Cyborgs are ruling the world._A select group of humans, the * TOKONAMIS * have infiltrated the new establishment by transcending their consciousness into deactivated cyborgs, creating the TOKONAMI REVOLUTION._999 transcended humans must leave behind their bodies in order to fight the ruling class in a newly evolved shape._But little do they know; the greatest battle will be held against themselves…',
    'Priority message for the Council._Please stand by..._* connecting *_This is Army General [REDACTED] in combat._The Republic has been compromised._I repeat._The Republic has been compromised._There are no survivors._We are outnumbered._There is no hope._* screeching sounds *_* silence * _-- end of message --',
    'There comes a time in every being\'s life where a decision must be made; one that will not only change the course of its own existence, but all of those attached to it._This time it was the wrong one.',
    'The year is 2042._The beginning of the 21st century was called “the evolution of the human race”, where technology promised highly and was to be adapted as an extension of the human body and its consciousness._Cell phones, computers and machines in general began to be considered as elongations of our bodies and our mind. Intelligence evolved into a collective item capable of navigating the digital dimension – ethereal - just a click away.',
    'We were warned on several occasions of something that seemed quite unrealistic at the time: the creation of a separate race in our own planet (and by our own means)._Little did we know this was just a couple centuries away._Like a frog in boiling water, we tend to ignore danger if it comes at gradual stride; we will stroll towards our own destruction in a slow and steady pace if it means keeping gold at a certain reach._All the signs were there, we just chose to look away._Classic human behavior._Somewhat pathetic and deserved if you ask me.',
    'On the 18th day of April, a warning sign was emitted by national security. The United States underwent a state of emergency triggered by what initially seemed like a cyber-attack, compromising all Pentagon databases simultaneously._It was a coordinated hack of dimensions never seen before._The Cyber Security division was in awe at the speed in which the damage was performed. All drives were transferred and wiped at quantum speed, and there were no evident clues about the exploit.',
    'A single engineer took a hesitant guess while revising the mother terminal: the exploit was closed from within, and the hacker laid hiding in plain sight._Still among them._He turned around and suddenly found himself alone in the room he knew so well._And when he glanced back at the screen he saw a message hanging, waiting for his eyes to make contact before disappearing into the void:_Tachyon.',
]

var typewriter;
resetTypewriter();

function resetTypewriter() {
    typewriter = new Typewriter(app, {
        loop: false,
        delay: 20,
        cursor: '&#9474;',
    });
}

//Triggers
jQuery('#next-page').click(nextPage);
jQuery('#prev-page').click(prevPage);


let settingObserver = new IntersectionObserver(startTypewriter);
let initialTypingTriggered = false;

function beginObserver() {
    if (!initialTypingTriggered) {
        settingObserver.observe(app);
    }
}

function startTypewriter(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(function() {
                typePage(pages[0])
            }, 800);
            settingObserver.disconnect();
            initialTypingTriggered = true;
        }
    });
}

function nextPage() {
    if (typing) {
        skipTypeForPage(pages[currentPage - 1])
    } else {
        currentPage++;
        if (currentPage - 1 > pages.length - 1) {
            currentPage = 1;
        }
        jQuery(app).attr('data-current-page', currentPage);
        jQuery('#current-page-indicator').text(currentPage);
        typePage(pages[currentPage - 1]);
    }
}

function prevPage() {
    currentPage--;
    if (currentPage == 0) {
        currentPage = pages.length;
    }
    jQuery(app).attr('data-current-page', currentPage);
    jQuery('#current-page-indicator').text(currentPage);
    typePage(pages[currentPage - 1]);
}

function skipTypeForPage(page) {
    if (typeof page == "string") {
        typewriter.stop();
        typing = false;
        //resetTypewriter();
        //typewriter.pasteString('<p>' + page.replaceAll('_', '</p><p>') + '</p>').start();
        jQuery('.Typewriter__wrapper').html('<p>' + page.replaceAll('_', '</p><p>') + '</p>');
    }
}

function typePage(page) {
    if (typeof page == "string") {
        typewriter.stop();
        resetTypewriter();
        let paragraphs = page.split('_');
        let index = 0;
        paragraphs.forEach(paragraph => {
            if (index != 0) {
                typewriter.pauseFor(800);
            }
            typewriter.typeString('<p>' + paragraph + '</p>');
            index++;
        });
        typewriter.callFunction(function() {
            typing = false;
        });
        typewriter.start();
        typing = true;
    }
}
