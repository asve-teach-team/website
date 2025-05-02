async function asve_getSchool() {
    let apiResult = document.getElementById(asve().result);
    apiResult.innerHTML = "Calling ...";
    try {
        const response = await fetch("https://api.asve-vaureal.fr/school/v1/school", {
            headers: {
                'Authorization': 'Bearer ' + asve_getCookieValue("asve-vaureal-cookie")
            }
        });
        if (!response.ok) {
            throw new Error(
                `Response status: ${response.status}`
            );
        }
        const resp = await response.json();
        apiResult.textContent = JSON.stringify(resp, undefined, 2);
    } catch (e) {
        apiResult.innerHTML = `<div class="alert alert-danger">${e.message}</div>`
    }
}
function asve_getCookieValue(name) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}
function asve_logout(url) {
    document.cookie = 'asve-vaureal-cookie=; Max-Age=-99999999;';
    document.location.href = url;
}

function asve_authenticated() {
    cookie = asve_getCookieValue("asve-vaureal-cookie")
    if (cookie !== '') {
        jwt = asve_parseJwt(cookie);
        return jwt.name;
    }
    return ''
}
function asve_parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
(function() {
            let login = document.getElementById(asve().login);
            let name = asve_authenticated();
            let host = window.location.host;
            let urlLogin = "https://api.asve-vaureal.fr/login";
            let urlLogout = "https://api.asve-vaureal.fr/logout";
            if (host.includes("localhost")) {
                urlLogin = "http://localhost:3000/login";
                urlLogout = "http://localhost:3000/logout";
            }

            let returnTo = document.location.href
            urlLogout = new URL(urlLogout);
            urlLogout.searchParams.append("returnTo", returnTo);
            urlLogin = new URL(urlLogin);
            urlLogin.searchParams.append("returnTo", returnTo);

            if (name === '') {
                login.innerHTML = `
    <a      id="login-link"
            href=${urlLogin.toString()}
            class="button-link"
    >Se Connecter</a
    >`;
            } else {
                login.innerHTML = `
        <span class="text-gradient">${name}</span>
    <a      id="logout-link"
            href='#'
            onclick="asve_logout('${urlLogout.toString()}')"
            class="button-link"
    >Se Déconnecter</a
    >`;
            }
    }
)();