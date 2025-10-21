try {
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.documentElement;

        // --- Robust Toast Notification System ---
        const toast = document.getElementById('toast-notification');
        const showToast = (message, duration = 3000) => {
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, duration);
        };

        // --- Robust Modal Handling ---
        const initModals = () => {
            const settingsBtn = document.getElementById('settings-btn');
            if (settingsBtn) settingsBtn.addEventListener('click', () => document.getElementById('settings-modal')?.classList.add('active'));
            
            const infoBtn = document.getElementById('info-btn');
            if (infoBtn) infoBtn.addEventListener('click', () => document.getElementById('info-modal')?.classList.add('active'));
            
             document.querySelectorAll('.modal .close-button').forEach(button => {
                const modalId = button.dataset.closeModal;
                const modal = document.getElementById(modalId);
                if(modal) button.addEventListener('click', () => modal.classList.remove('active'));
            });
            
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('click', e => {
                    if (e.target === modal) modal.classList.remove('active');
                });
            });
        };

        // --- Robust Game Loader ---
        const initLoader = () => {
            const loader = document.getElementById('loader');
            const gameIframe = document.getElementById('minecraft-container');
            const iframeError = document.getElementById('iframe-error');
            if (!loader || !gameIframe || !iframeError) return;

            let isGameLoaded = false;
            
            const hideLoader = () => {
                if (isGameLoaded) return;
                loader.classList.add('hidden');
                isGameLoaded = true;
            };

            gameIframe.addEventListener('load', hideLoader);

            // Fallback timeout in case 'load' event fails to fire
            setTimeout(() => {
                if (!isGameLoaded) {
                    hideLoader();
                    gameIframe.style.display = 'none';
                    iframeError.style.display = 'block';
                }
            }, 15000); // 15 second timeout
        };

        // --- Settings & Color Palette ---
        const initSettings = () => {
            const colorPalette = document.getElementById('color-palette');
            if (!colorPalette) return;

            colorPalette.addEventListener('click', (e) => {
                if (e.target.classList.contains('color-swatch')) {
                    const color = e.target.dataset.color;
                    root.style.setProperty('--glow-color', color);
                    root.style.setProperty('--accent-color', color);
                    const currentActive = colorPalette.querySelector('.active');
                    if (currentActive) currentActive.classList.remove('active');
                    e.target.classList.add('active');
                }
            });
        };

        // --- Robust Fullscreen API ---
        const initFullscreen = () => {
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            const gameWrapper = document.getElementById('game-wrapper');
            if (!fullscreenBtn || !gameWrapper) return;
            
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    gameWrapper.requestFullscreen().catch(() => {
                       showToast('Could not enter fullscreen mode.');
                    });
                } else {
                    document.exitFullscreen();
                }
            });
        };
        
        // --- Initialize all features ---
        initModals();
        initLoader();
        initSettings();
        initFullscreen();
    });
} catch (e) {
    console.error("A critical error occurred during initialization:", e);
    document.body.innerHTML = '<div style="color: white; text-align: center; padding-top: 20vh;"><h1>An unexpected error occurred</h1><p>Please try refreshing the page.</p></div>';
}
