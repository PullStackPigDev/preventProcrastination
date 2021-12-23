import env from "./env.js";

window.onload = () => {
    if (window.location.href === env.gale) {
        document.querySelector("#password").value = env.password;
        document.querySelector(".sign-in").click();
    }
}