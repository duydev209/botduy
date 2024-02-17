module.exports.config = {
	name:"gaimup",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "",
	description: "nsfw",
	commandCategory: "media",
  usePrefix: false,
	cooldowns: 20
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://api.quocdyy123.repl.co/api/out.php').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/trai.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/trai.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/trai.${ext}`)).on("close", callback);
			})
}