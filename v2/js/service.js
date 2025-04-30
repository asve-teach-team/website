async function getSchool() {
    let apiResult = document.getElementById("apiResult");
    apiResult.innerHTML = "Calling ...";
    try {
        const response = await fetch("https://api.asve-vaureal.fr/school/v1/school", {
            headers: {
                'Cookie': getCookieValue("asve-vaureal-cookie")
            }
        });
        if (!response.ok) {
            throw new Error(
                `Response status: ${response.status}`
            );
        }
        const resp = await response.json();
        apiResult.textContent = JSON.stringify(resp, undefined, 2);
    }  catch (e) {
        apiResult.innerHTML = `<div class="alert alert-danger">${e.message}</div>`
    }


}