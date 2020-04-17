# ActiveWindowListener
Listen to active windows by specifying them

This will be used in Nertivia in the future to show playing status and more!

# Usage
```js
  const ActiveWindowListener = require("./main");

  const listener = new ActiveWindowListener(["Discord.exe", "Telegram.exe", "Code.exe"]);

  listener.changed(data => {
    console.log("Active: ", data)
  })
```

#Package used
This package was mainly used to get all the active window information.
https://github.com/sentialx/node-window-manager/ 
