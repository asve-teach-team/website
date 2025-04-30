function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(token);

    return JSON.parse(jsonPayload);
}

const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

function authenticated() {
    cookie = getCookieValue("asve-vaureal-cookie")
    if (cookie !== '') {
        jwt = parseJwt(cookie);
        return  jwt.name;
    }
    return ''
}

function auth() {
    let login = document.getElementById("login");
    let name = authenticated();
    let host = window.location.host;
    let urlLogin = "https://auth.asve-vaureal.fr/login";
    let urlLogout = "https://auth.asve-vaureal.fr/logout";
    if (host.includes("localhost")) {
        urlLogin = "http://localhost:3000/login";
        urlLogout = "http://localhost:3000/logout";
    }

    if (name === '') {
        login.innerHTML = `
    <a      id="login-link"
            href=${urlLogin}
            class="button-link"
    >Se Connecter</a
    >`;
    } else {
        login.innerHTML = `
        <span class="text-gradient">${name}</span>
    <a      id="logout-link"
            href=${urlLogout}
            class="button-link"
    >Se Déconnecter</a
    >`;
    }
}