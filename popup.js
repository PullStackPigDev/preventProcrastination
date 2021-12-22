import env from "./env.js";

window.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        document.getElementById("input").focus();
    }
});

document.getElementById("input").onkeyup = (e) => {
    if (e.key == "Enter") {
        document.getElementById("btn").click();
    }
}

document.getElementById("rec").onclick = () => {
    window.open("https://screenRecorder.nastypigz.repl.co");
}

document.getElementById("gmail").onclick = () => {
    window.open("https://mail.google.com");
}

document.getElementById("calc").onclick = () => {
    window.open("https://www.google.com/search?q=calculator&ei=_drAYdLXA_6mptQPo9iWmAQ&ved=0ahUKEwiSyv_rj_P0AhV-k4kEHSOsBUMQ4dUDCA4&uact=5&oq=calculator&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAELEDEEMyCAgAEIAEELEDMgQIABBDMggIABCABBCxAzIICAAQgAQQsQMyBQgAEIAEMggIABCABBCxAzIFCAAQgAQyBQgAEIAEMgUIABCABDoHCAAQRxCwA0oECEEYAEoECEYYAFDQAVjjBGCNBmgBcAJ4AIABjAGIAYgCkgEDMC4ymAEAoAEByAEIwAEB&sclient=gws-wiz&safe=active&ssui=on");
}

document.getElementById("class").onclick = () => {
    window.open("https://classroom.google.com");
}

document.getElementById("gale").onclick = () => {
    window.open(env.gale);
}

document.getElementById("btn").onclick = () => {
    let result = document.getElementById("input").value;
    switch (result) {
        case "n":
        case "noodle":
        case "reference":
        case "cite":
            window.open("https://noodletools.com/");
            break;
        case "c":
        case "class":
        case "cl":
        case "classroom":
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
            document.getElementById("output").innerHTML = "Invalid input";
            break;
    }
}

chrome.storage.local.get(["block1", "block2", "toggle"], (result) => {
    document.getElementById("block1").checked = result.block1;
    document.getElementById("block2").checked = result.block2;
    document.getElementById("toggle").checked = result.toggle;
});

document.getElementById("block1").onclick = () => {
    if (document.getElementById("block1").checked) {
        chrome.storage.local.set({block1: true}, () => {
            chrome.storage.local.get(["block1"], (result) => {alert(JSON.stringify(result))});
        });
    } else {
        chrome.storage.local.set({block1: false}, () => {
            chrome.storage.local.get(["block1"], (result) => {alert(JSON.stringify(result))});
        });
    }
}

document.getElementById("block2").onclick = () => {
    if (document.getElementById("block2").checked) {
        chrome.storage.local.set({block2: true}, () => {
            chrome.storage.local.get(["block2"], (result) => {alert(JSON.stringify(result))});
        });
    } else {
        chrome.storage.local.set({block2: false}, () => {
            chrome.storage.local.get(["block2"], (result) => {alert(JSON.stringify(result))});
        });
    }
}

document.getElementById("toggle").onclick = () => {
    if (document.getElementById("toggle").checked) {
        chrome.storage.local.set({toggle: true}, () => {
            chrome.tabs.query({}, function(tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    setActive(true, tabs[i].id);
                }
            });
        });
    } else {
        chrome.storage.local.set({toggle: false}, () => {
            chrome.tabs.query({}, function(tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    setActive(false, tabs[i].id)
                }
            });
        });
    }
}


var states = {
	active: {
		title: 'off',
		code: 'active.js'
	},
	inactive: {
		title: 'on',
		code: 'inactive.js'
	}
};

function setActive(activate, tabId) {
	var props = activate ? states.active : states.inactive;
	chrome.action.setTitle({ title: props.title, tabId: tabId }, function(result) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            return;
        }
        chrome.scripting.executeScript({
            target: {tabId, allFrames: true},
            files: [props.code]
        }, function(result) {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
                return;
            }
        });
    });
}

// chrome.tabs.onCreated.addListener(function(tab) {
//     setActive(document.getElementById("toggle").checked, tab.id);
// });