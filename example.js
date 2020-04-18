
const ActiveWindowListener = require("./main");

const listener = new ActiveWindowListener.ProcessListen(["Discord.exe", "Telegram.exe", "Code.exe"]);

listener.changed(data => {
	console.log("Active: ", data)
})



console.log(ActiveWindowListener.getWindows())