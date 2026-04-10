// Scroll based navbar restyling
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

mobileBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Reveal elements on scroll
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// Iryna Image Slider (zmienia zdjęcie co 4 sekundy)
const irynaImage = document.getElementById('iryna-image');
if (irynaImage) {
    const images = ['iryna1.jpg', 'iryna2.jpg', 'iryna3.jpg', 'iryna4.jpg'];
    let currentImageIndex = 0;

    setInterval(() => {
        // Efekt zanikania i odjazdu w prawo
        irynaImage.classList.add('slider-hide-right');
        
        setTimeout(() => {
            // Zmiana zdjęcia na kolejne
            currentImageIndex = (currentImageIndex + 1) % images.length;
            irynaImage.src = images[currentImageIndex];
            
            // Błyskawiczny przeskok na lewą stronę (bez widocznej animacji)
            irynaImage.classList.remove('slider-hide-right');
            irynaImage.classList.add('slider-snap-left');
            
            // Pozostaw ułamek sekundy przeglądarce by "złapała" pozycję, a potem wjedź do środka
            setTimeout(() => {
                irynaImage.classList.remove('slider-snap-left');
            }, 30);
            
        }, 300); // 300ms czeka zanim zmieni fotkę
    }, 4000); // Wykonuje się co 4 sekundy
}

// Obsługa galerii "Przed / Po"
document.querySelectorAll('.gallery-item').forEach(slider => {
    const input = slider.querySelector('.ba-input');
    const beforeImg = slider.querySelector('.ba-img-before');
    const handle = slider.querySelector('.ba-handle');
    
    if (input && beforeImg && handle) {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            // Zmiana maskowania obrazu 'przed' (od 0% do range value)
            beforeImg.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
            // Przesunięcie suwaka
            handle.style.left = `${value}%`;
        });
    }
});
