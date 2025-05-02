function asve_getStudents() {}
function asve_getStudent() {}
function asve_getGroup() {}
function asve_getFamily() {}
function asve_getFamilies() {}
function asve_getFamily() {}
function asve_getTeachers() {}
function asve_getTeacher() {}
async function asve_getSchool() {
    return asve_api("/schools/asve")
}
async function asve_getSchools() {
    return asve_api("/schools")
}
async function asve_api(endpoint,method="GET", body = null, headers = null) {
    try {
        const response = await asve_fetch(endpoint, method, body, headers);
        if (!response.ok) {
            throw new Error(
                `Status: ${response.status}`
            );
        }
        return await response.json()
    } catch (e) {
        return {
            error: e.message
        }
    }
}
async function asve_fetch(endpoint, method = 'GET', body = null, headers = null) {
    let host = window.location.host;
    let url = "https://api.asve-vaureal.fr";
    if (host.includes("localhost")) {
        url = "http://localhost:3000";
    }
    return fetch(url + "/school/v1" + endpoint, {
        headers: {
            'Authorization': 'Bearer ' + asve_getCookieValue("asve-vaureal-cookie")
        }
    });
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
                let login = document.getElementById(asve().login);
                login.innerHTML = `
    <a      id="login-link"
            href=${urlLogin.toString()}
            class="button-link"
    >Se Connecter</a
    >`;
            } else {

                let nav = document.getElementById(asve().nav);
                nav.innerHTML = `
                    <li><span class="text-gradient">${name}</span></li>
                ` + nav.innerHTML;

                let login = document.getElementById(asve().login);
                login.innerHTML = `        
    <a      id="logout-link"
            href='#'
            onclick="asve_logout('${urlLogout.toString()}')"
            class="button-link"
    >Se Déconnecter</a
    >`;

            }
    }
)();