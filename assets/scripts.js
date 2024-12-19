/**
 * Function to add a click event listener to an element by its ID.
 *
 * @param {string} elementId - The ID of the element to attach the listener to.
 */
function playVideoModal(elementId) {
    const debug = false;
    const element = document.getElementById(elementId);
    const modal = document.getElementById('js-modal');
    const modalOembed = modal.querySelector('.modal__oembed');
    const modalClose = document.getElementById('js-modal-close');

    // Access the background video iframe by ID
    const backgroundIframe = document.getElementById('js-background-video');

    // Initialize the Vimeo Player for the background video
    const backgroundPlayer = new Vimeo.Player(backgroundIframe);

    if (element && modal && modalOembed && modalClose) {
        element.addEventListener('click', () => {
            if (debug) console.log(`${elementId} button clicked`);

            // Pause the background video when modal is opened
            if (backgroundPlayer) {
                backgroundPlayer.pause().then(() => {
                    if (debug) console.log('Background video paused.');
                }).catch((error) => {
                    if (debug) console.error('Error pausing background video:', error);
                });
            }

            // Add the "--opened" class to the modal
            modal.classList.add('--opened');
            if (debug) console.log('Modal opened.');

            // Find the HTML comment directly inside the modal
            const childNodes = Array.from(modal.childNodes);
            const commentNode = childNodes.find(node => node.nodeType === Node.COMMENT_NODE);

            if (commentNode) {
                if (debug) console.log('Found HTML comment:', commentNode.nodeValue);

                let commentContent = commentNode.nodeValue.trim();

                // Check if the comment contains a <div> with the iframe
                if (commentContent.startsWith('<div') && commentContent.endsWith('</div>')) {
                    if (debug) console.log('Extracted content from comment:', commentContent);

                    // Insert the extracted <div> into the modal
                    modalOembed.innerHTML = commentContent;

                    // Add a class for styling
                    const iframeWrapper = modalOembed.querySelector('div');

                    iframeWrapper.classList.add('responsive-iframe-wrapper');

                    const iframe = iframeWrapper.querySelector('iframe');

                    if (iframe) {
                        iframe.classList.add('responsive-iframe');
                    }

                    // Clear the original HTML comment
                    commentNode.nodeValue = '';
                    if (debug) console.log('Content moved to modal__oembed and comment cleared.');
                } else {
                    if (debug) console.error('Comment does not contain valid <div> content.');
                }
            } else {
                if (debug) console.error('No HTML comment found as a child of the modal.');
            }
        });

        modalClose.addEventListener('click', () => {
            if (modal.classList.contains('--opened')) {
                if (debug) console.log('Close button clicked');

                // Remove the "--opened" class from the modal
                modal.classList.remove('--opened');
                if (debug) console.log('Modal closed.');

                // Resume the background video when modal is closed
                if (backgroundPlayer) {
                    backgroundPlayer.play().then(() => {
                        if (debug) console.log('Background video resumed.');
                    }).catch((error) => {
                        if (debug) console.error('Error resuming background video:', error);
                    });
                }

                // Find the HTML comment directly inside the modal
                const childNodes = Array.from(modal.childNodes);
                const commentNode = childNodes.find(node => node.nodeType === Node.COMMENT_NODE);

                if (commentNode) {
                    if (debug) console.log('Found HTML comment for restoring content:', commentNode.nodeValue);

                    // Get the <div> with the iframe currently in the modal
                    const iframeDiv = modalOembed.innerHTML.trim();

                    // Move the <div> back into the HTML comment
                    commentNode.nodeValue = ` ${iframeDiv} `;
                    if (debug) console.log('Content moved back to HTML comment.');

                    // Clear the modal content
                    modalOembed.innerHTML = '';
                    if (debug) console.log('Modal__oembed content cleared.');
                } else {
                    if (debug) console.error('No HTML comment found as a child of the modal.');
                }
            }
        });
    } else {
        if (debug) console.error('One or more required elements not found:', {
            element,
            modal,
            modalOembed,
            modalClose,
        });
    }
}

/**
 * Function to smoothly scroll to the next <section> in the DOM.
 *
 * @param {string} elementId - The ID of the element to attach the click listener to.
 */
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);

    if (element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();

            // Scroll to the section with ID "showcase"
            const showcaseSection = document.getElementById('showcase');

            if (showcaseSection) {
                showcaseSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    }
}

/**
 * Function to handle accordion toggle behavior for a specific element ID.
 *
 * @param {string} elementId - The ID of the accordion container.
 */
function accordionExpand(elementId) {
    const accordion = document.getElementById(elementId);

    if (accordion) {
        const triggers = accordion.querySelectorAll('.accordion__triggers');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const isOpen = accordion.getAttribute('data-accordion') === 'opened';

                accordion.setAttribute('data-accordion', isOpen ? 'closed' : 'opened');
            });
        });
    }
}

/**
 * Function to handle navigation clicks and toggle the visibility of sections.
 */
function toggleSectionVisibility() {
    const navLinks = document.querySelectorAll('.navigation__link');
    const sectionIds = ['homepage', 'sizes', 'pp', 'rules', 'contact', 'rr'];
    const navToggle = document.getElementById('js-nav-toggle');
    const navigation = document.querySelector('.navigation');

    // Handle section visibility toggle
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target section ID from the href attribute
            const targetId = link.getAttribute('href').substring(1);

            // Loop through all specified sections
            sectionIds.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    // Toggle the --hidden class based on the clicked section
                    if (sectionId === targetId) {
                        section.classList.remove('--hidden');
                    } else {
                        section.classList.add('--hidden');
                    }
                }
            });
        });
    });

    // Handle navigation toggle
    if (navToggle && navigation) {
        navToggle.addEventListener('click', () => {
            navigation.classList.toggle('--opened');
        });
    }
}

/**
 * Function to create a typing effect for the text in a specified element.
 * Preserves HTML tags (e.g., <br/>) and applies a blinking effect to the period at the end of the text.
 *
 * @param {string} elementClass - The class selector of the element containing the text to type out.
 */
function headingTyper(elementClass) {
    const heroContent = document.querySelector(elementClass);
    const originalText = heroContent.innerHTML; // Capture the original HTML with <br/>

    heroContent.innerHTML = ''; // Clear the content to start typing effect

    let currentIndex = 0;

    function type() {
        if (currentIndex < originalText.length) {
            const currentChar = originalText[currentIndex];

            if (currentChar === '<') {
                // If a tag starts, append the entire tag without splitting
                const closingTagIndex = originalText.indexOf('>', currentIndex);
                heroContent.innerHTML += originalText.slice(currentIndex, closingTagIndex + 1);
                currentIndex = closingTagIndex + 1;
            } else if (currentChar === '.' && currentIndex === originalText.length - 1) {
                // Add a blinking span for the period at the end
                heroContent.innerHTML += `<span class="blinking-period">.</span>`;
                currentIndex++;
            } else {
                // Otherwise, append one character at a time
                heroContent.innerHTML += currentChar;
                currentIndex++;
            }

            // Continue typing with delay
            setTimeout(type, 10); // Adjust the delay (50ms) for typing speed
        }
    }

    type();
}

/**
 * Simple slider functionality for switching between slides.
 *
 * @param {string} sliderId - The ID of the slider container.
 */
function simpleSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return; // If no slider, don't proceed

    const slides = slider.querySelectorAll('.slider__slide');
    const dots = slider.querySelectorAll('.slider__pagination-dot');
    const leftArrow = slider.querySelector('.slider__arrow.--left button');
    const rightArrow = slider.querySelector('.slider__arrow.--right button');

    let currentIndex = 0;

    function updateSlider(newIndex) {
        // Remove the current class from all slides and dots
        slides.forEach(slide => slide.classList.remove('--current'));
        dots.forEach(dot => dot.classList.remove('--current'));

        // Add the current class to the new slide and dot
        slides[newIndex].classList.add('--current');
        dots[newIndex].classList.add('--current');

        currentIndex = newIndex;
        updateArrowState();
    }

    function updateArrowState() {
        // Disable the left arrow if at the first slide
        if (currentIndex === 0) {
            leftArrow.disabled = true;
        } else {
            leftArrow.disabled = false;
        }

        // Disable the right arrow if at the last slide
        if (currentIndex === slides.length - 1) {
            rightArrow.disabled = true;
        } else {
            rightArrow.disabled = false;
        }
    }

    function attachEventListeners() {
        // Add click events for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentIndex) {
                    updateSlider(index);
                }
            });
        });

        // Add click event for left arrow
        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                updateSlider(currentIndex - 1);
            }
        });

        // Add click event for right arrow
        rightArrow.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                updateSlider(currentIndex + 1);
            }
        });
    }

    attachEventListeners();     // Initialize event listeners
    updateSlider(currentIndex); // Ensure the initial slide and arrow state are set
}

// Execute functions
playVideoModal('js-play-video');
smoothScroll('js-smooth-scroll');
accordionExpand('js-accordion');
headingTyper('.hero__content h1');
simpleSlider('js-simple-slider');

// Navigation menu (temporary)
toggleSectionVisibility();

// Initialize Animate on Scroll library
AOS.init({
    once: true, // only animate once
});