document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL INTERRUPTOR DE TEMA ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    };
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // --- LÓGICA DEL MENÚ FLOTANTE (FAB) ---
    const fabContainer = document.querySelector('.fab-container');
    const fabToggle = document.getElementById('fab-toggle');
    fabToggle.addEventListener('click', () => {
        fabContainer.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('open');
        }
    });

    // --- LÓGICA DEL BOTÓN VOLVER ARRIBA ---
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // --- LÓGICA DEL ENLACE DE FACEBOOK UNIVERSAL ---
    const facebookLinks = document.querySelectorAll('#facebookLink, #facebookFooterLink'); // Selecciona ambos enlaces
    facebookLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const facebookProfileURL = 'https://www.facebook.com/HECTORDANIELAYARACHI';
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const finalURL = isMobile ? `fb://profile/HECTORDANIELAYARACHI` : facebookProfileURL;
            window.open(finalURL, '_blank', 'noopener,noreferrer');
        });
    });

    // --- LÓGICA PARA DESCARGAR PDF ---
    const downloadPdfButton = document.getElementById('download-pdf');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', () => {
            fabContainer.style.display = 'none';
            backToTopButton.style.display = 'none';
            window.print();
            fabContainer.style.display = '';
            backToTopButton.style.display = '';
        });
    }
});