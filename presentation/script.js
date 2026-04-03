/* 
 * Slide Navigation and Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progress');
    
    // Intersection Observer for Slide Animations
    const observerOptions = {
        root: slider,
        threshold: 0.5 // Trigger when 50% of the slide is visible
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to trigger CSS transitions
                entry.target.classList.add('slide-active');
                
                // Update Progress Bar
                const slideIndex = Array.from(slides).indexOf(entry.target);
                const progressPercentage = ((slideIndex) / (slides.length - 1)) * 100;
                progressBar.style.width = `${progressPercentage}%`;
            } else {
                // Optional: remove active class when scrolling away to replay animation
                entry.target.classList.remove('slide-active');
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        slideObserver.observe(slide);
    });

    // Keyboard Navigation
    let currentSlide = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                scrollToSlide(currentSlide);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentSlide > 0) {
                currentSlide--;
                scrollToSlide(currentSlide);
            }
        }
    });

    function scrollToSlide(index) {
        slides[index].scrollIntoView({ behavior: 'smooth' });
    }

    // Update current slide index on manual scroll ending
    let scrollTimeout;
    slider.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let minDiff = Infinity;
            let closestIndex = 0;
            
            slides.forEach((slide, index) => {
                const rect = slide.getBoundingClientRect();
                const diff = Math.abs(rect.top);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestIndex = index;
                }
            });
            
            currentSlide = closestIndex;
            const progressPercentage = ((currentSlide) / (slides.length - 1)) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            
        }, 150); // wait for scroll to stop
    });
});
