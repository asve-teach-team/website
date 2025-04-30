async function getSchool() {
    let apiResult = document.getElementById("apiResult");
    apiResult.innerHTML = "Calling ...";
    const response = await fetch("https://api.asve-vaureal.fr/school/v1/school", {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        apiResult.innerHTML = `<div class="alert alert-danger">${response.status}</div>`
    } else {
        const resp = await response.json();
        apiResult.textContent = JSON.stringify(resp, undefined, 2);
    }
}