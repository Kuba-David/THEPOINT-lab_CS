// Počkáme, až se načte celá stránka, abychom měli jistotu, že všechny prvky existují
window.addEventListener('DOMContentLoaded', (event) => {
    
    // =======================================================
    // ========= SEKCE PRO GDPR A COOKIE SOUHLAS =========
    // =======================================================
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies-btn');
    const rejectBtn = document.getElementById('reject-cookies-btn');
    const cookieName = 'thepoint_cookie_consent';

    // Funkce pro nastavení cookie. Ukládá jednoduchý objekt.
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Ukládáme hodnotu jako JSON string pro snadnější budoucí rozšíření
        document.cookie = name + "=" + (JSON.stringify(value) || "")  + expires + "; path=/";
    }

    // Funkce pro čtení cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                 try {
                    // Pokusíme se parsovat JSON, abychom dostali zpět objekt
                    return JSON.parse(c.substring(nameEQ.length, c.length));
                } catch (e) {
                    // Pokud se nepovede, vrátíme null
                    return null;
                }
            }
        }
        return null;
    }

    // Zkontrolujeme, jestli cookie s naším jménem již neexistuje
    if (!getCookie(cookieName)) {
        // Pokud neexistuje, zobrazíme lištu se zpožděním a CSS třídou pro animaci
        if(cookieBanner) {
            setTimeout(() => {
                cookieBanner.classList.add('visible'); // Ujisti se, že máš v CSS styl pro .visible
            }, 1500); // 1.5 sekundy zpoždění
        }
    }
    
    // Přidáme event listener na tlačítko "Accept"
    if(acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            // Vytvoříme cookie, která říká, že uživatel souhlasil
            const consentData = { consented: true, timestamp: new Date().toISOString() };
            setCookie(cookieName, consentData, 365);
            if(cookieBanner) {
                cookieBanner.classList.remove('visible'); // Skryjeme lištu s animací
            }
            // Zde bys v budoucnu mohl spouštět analytické skripty
        });
    }

    // Přidáme event listener na tlačítko "Reject"
    if(rejectBtn) {
        rejectBtn.addEventListener('click', () => {
             // Vytvoříme cookie, která říká, že uživatel nesouhlasil
            const consentData = { consented: false, timestamp: new Date().toISOString() };
            setCookie(cookieName, consentData, 365);
            if(cookieBanner) {
                cookieBanner.classList.remove('visible'); // Skryjeme lištu s animací
            }
        });
    }

    // =======================================================
    // ========= SEKCE PRO POHYBUJÍCÍ SE POZADÍ ==========
    // =======================================================
    const point = document.querySelector('.moving-point-wrapper');
    if (!point) return;

    function movePoint() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const pointSize = point.offsetWidth;

        const newX = Math.random() * (screenWidth - pointSize);
        const newY = Math.random() * (screenHeight - pointSize);

        point.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    movePoint();
    setInterval(movePoint, 15000); 
});
