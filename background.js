console.log(this);
// chrome.notifications.create("", {
//     type: "basic",
//     iconUrl: "icon.png",
//     title: "Hello",
//     message: "Hello, world!",
//     buttons: [{
//         title: "OK",
//     }, {
//         title: "Cancel"
//     }]
// }, (id) => {
//     console.log(id);
// });
"this is how to make an notification"
// chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
//     if (buttonIndex === 0) {
//         console.log("OK");
//     } else {
//         console.log("Cancel");
//     }
// });

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
    console.log(props);
	chrome.action.setTitle({ title: props.title, tabId: tabId }, function(result) {
        chrome.scripting.executeScript({
            target: {tabId},
            files: [props.code]
        }, function(result) {
            console.log(result);
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
                return;
            }
        });
    });
}

chrome.tabs.onCreated.addListener(function(tab) {
    chrome.storage.local.get(["toggle"], (result) => {
        console.log(result.toggle);
        setActive(result.toggle, tab.id);
    });
});