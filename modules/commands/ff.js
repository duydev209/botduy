module.exports.config = {
	name:"ff",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "nsfw",
	commandCategory: "media",
  usePrefix: false,
	cooldowns: 3
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://api.quocduydev.repl.co/api/vdff.php').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/ff.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ff.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/ff.${ext}`)).on("close", callback);
			})
          }