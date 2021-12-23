'use strict';

const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL('script.js'));
const script2 = document.createElement('script');
script2.setAttribute("type", "module");
script2.setAttribute("src", chrome.runtime.getURL('env.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.fisrtChild);
head.insertBefore(script2, head.firstChild);

chrome.storage.local.get(["toggle"], (result) => {
    if (result.toggle) {
        document.documentElement.classList.add("black-and-white-mode");
    }
});

document.onkeyup = (e) => {
    if (e.ctrlKey && e.key === "L" && e.shiftKey) {
        chrome.storage.local.get(["toggle"], (result) => {
            if (result.toggle) {
                document.documentElement.classList.remove("black-and-white-mode");
                chrome.storage.local.set({toggle: false});
            } else {
                document.documentElement.classList.add("black-and-white-mode");
                chrome.storage.local.set({toggle: true});
            }
        });
    }
}

if (window.location.href.startsWith("https://discord.com")) {
    chrome.storage.local.get(["block2"], (result) => {
        if (result.block2) {
            window.location.href = "https://www.google.com";
        } else {
            let result = confirm("Really?");
            if (!result) {
                window.location.href = "https://www.google.com";
            }
        }
    })
} else if (window.location.href.startsWith("https://www.youtube.com/")) {
    chrome.storage.local.get(["block1"], (result) => {
        if (result.block1) {
            window.location.href = "https://www.google.com";
        } else {
            let result = confirm("No procrastinating!");
            if (!result) {
                window.location.href = "https://www.google.com";
            }
        }
    });
} else if (window.location.href.startsWith("https://www.wikipedia.org/")) {
    let result = confirm("Use a better reference!");
    if (!result) {
        window.location.href = "https://britannica.com";
    }
}

window.addEventListener("keyup", (e) => {
    if (e.key === "\\") {
        let result = prompt("Need help?");
        if (!result) {
            return;
        } else {
            switch (result) {
                case "n":
                case "noodle":
                case "reference":
                    window.open("https://noodletools.com/");
                    break;
                case "c":
                case "class":
                case "cl":
                    window.open("https://classroom.google.com/");
                    break;
                case "drive":
                case "d":
                    window.open("https://drive.google.com");
                    break;
                case "google doc":
                case "google docs":
                case "doc":
                    window.open("https://docs.google.com/document/u/0/");
                    break;
                case "slide":
                case "google slides":
                case "google slide":
                case "slides":
                case "s":
                    window.open("https://docs.google.com/presentation/");
                    break;
                case "google":
                case "g":
                    window.open("https://www.google.com");
                    break;
                default:
                    break;
            }
        }
    }
});