
const ActiveWindowListener = require("./main");

const listener = new ActiveWindowListener(["Discord.exe", "Telegram.exe", "Code.exe"]);

listener.changed(data => {
	console.log("Active: ", data)
})

