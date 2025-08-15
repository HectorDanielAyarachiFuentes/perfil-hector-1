document.addEventListener('DOMContentLoaded', () => {

    // --- CONSTANTES DE ELEMENTOS DEL DOM ---
    const fabContainer = document.querySelector('.fab-container');
    const fabToggle = document.getElementById('fab-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const themeSubmenu = document.querySelector('.theme-submenu');
    const themeMenuToggle = document.getElementById('theme-menu-toggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    const htmlElement = document.documentElement;
    const facebookLinks = document.querySelectorAll('#facebookLink, #facebookFooterLink');
    const downloadPdfButton = document.getElementById('download-pdf');

    // --- LÓGICA DEL MENÚ DE TEMAS ---
    // 1. Cargar tema guardado al iniciar
    const savedTheme = localStorage.getItem('cv-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    // 2. Aplicar un tema al hacer clic en una opción
    themeOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenir que se cierre el menú principal inmediatamente
            const selectedTheme = option.dataset.theme;
            htmlElement.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('cv-theme', selectedTheme);
            
            // Cerrar todos los menús después de la selección
            fabContainer.classList.remove('open');
            themeSubmenu.classList.remove('open');
        });
    });

    // --- LÓGICA DEL MENÚ FLOTANTE (FAB) ---
    // El botón de temas y el botón principal ahora manejan los clics por separado
    
    // 1. Abrir/cerrar el submenú de temas
    themeMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // ¡Importante! Evita que el clic llegue al listener del documento
        themeSubmenu.classList.toggle('open');
    });

    // 2. Abrir/cerrar el menú principal
    fabToggle.addEventListener('click', () => {
        const isOpening = !fabContainer.classList.contains('open');
        fabContainer.classList.toggle('open');

        // Si estamos cerrando el menú principal, también cerramos el de temas
        if (!isOpening) {
            themeSubmenu.classList.remove('open');
        }
    });

    // 3. Cerrar todo si se hace clic fuera del contenedor principal
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('open');
            themeSubmenu.classList.remove('open');
        }
    });

    // --- LÓGICA DEL BOTÓN VOLVER ARRIBA ---
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
    
    // --- LÓGICA DEL ENLACE DE FACEBOOK (INTELIGENTE) ---
    facebookLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const facebookProfileURL = 'https://www.facebook.com/HECTORDANIELAYARACHI';
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const finalURL = isMobile ? `fb://profile/HECTORDANIELAYARACHI` : facebookProfileURL;
            window.open(finalURL, '_blank', 'noopener,noreferrer');
        });
    });

    // --- LÓGICA PARA DESCARGAR CV EN PDF ---
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
