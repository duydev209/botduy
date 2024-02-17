module.exports.config = {
	name:"cosplay",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "Random ảnh girl theo api",
	commandCategory: "system",
  usePrefix: false,
	cooldowns: 3
};
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
return api.sendMessage({body: `🍒`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apited-ed.chaunguyen53.repl.co')).data.data,
method: "GET",
responseType: "stream"
})).data}, event.threadID, event.messageID)
}