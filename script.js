document.addEventListener('DOMContentLoaded', () => {
    // contenido después de 1 segundo
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.intermediate-screen').style.display = 'flex';
    }, 1000);

    
    document.querySelector('.show-content-btn').addEventListener('click', () => {
        document.querySelector('.intermediate-screen').style.display = 'none';
        document.querySelector('.real-content').style.display = 'block';
    });

    // popup  de 10 segundos
    setTimeout(() => {
        document.querySelector('.popup').style.display = 'block';
    }, 10000);

    // Cerrar el popup
    document.querySelector('.close-popup').addEventListener('click', () => {
        document.querySelector('.popup').style.display = 'none';
    });

    // Establecer una cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); 
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Función para obtener una cookie
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Función para comprobar si la cookie existe
    function checkCookie() {
        var cookiesAccepted = getCookie("cookiesAccepted");
        if (cookiesAccepted != "true") {
            document.getElementById('cookie-banner').style.display = 'block'; 
            document.body.style.overflow = 'hidden'; // Bloquear scroll
        }
    }

    
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    
    acceptCookiesButton.addEventListener('click', () => {
        
        setCookie("cookiesAccepted", "true", 365);
        // Ocultar el banner de cookies
        cookieBanner.style.display = 'none';
        document.body.style.overflow = 'auto'; // Desbloquea el scroll
    });

    // Cookie aceptada al cargar la página
    checkCookie();
});


document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');
    const navList = document.getElementById('nav-list');

    // Array de enlaces de navegación
    const navItems = [
        { name: 'Inicio', link: '#about' },
        { name: 'Canciones', link: '#famous-songs' },
        { name: 'Biografía', link: '#what-happened' },
        { name: 'Premios', link: '#awards' },
        { name: 'Tours', link: '#tours' },
        { name: 'Redes Sociales', link: '#social-media' }
    ];

    // Generar los enlaces del menú
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.name;
        li.appendChild(a);
        navList.appendChild(li);
    });

    // Mostrar/ocultar el menú al hacer clic en el botón
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});

document.getElementById('search-btn').addEventListener('click', () => {
    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;

    if (artist && song) {
        fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
            .then(response => {
                if (!response.ok) throw new Error('Canción no encontrada');
                return response.json();
            })
            .then(data => {
                const { lyrics } = data;
                document.getElementById('letra').innerHTML = lyrics || "No se encontró la letra";
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Canción no encontrada");
            });
    } else {
        alert("Por favor, completa los campos");
    }
});
