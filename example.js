
const {ProcessListen, getWindows} = require("./dist");

const listener = new ProcessListen(["Discord.exe", "Telegram.exe", "Code.exe"]);

listener.changed(data => {
	console.log("Active: ", data)
})



console.log(getWindows())