module.exports.config = {
	name:"pubg",
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
	axios.get('https://api.quocduydev.repl.co/api/pubg.php').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/pubg.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/pubg.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/pubg.${ext}`)).on("close", callback);
			})
    }