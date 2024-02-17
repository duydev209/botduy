module.exports.config = {
 name: "hdsdfs",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "DongDev",
	description: "admin bot",
	commandCategory: "Thông tin",
	usages: "Prefix",
	cooldowns: 5,
  usePrefix: false
};
module.exports.run = async ({ api, event, Threads }) => {
 const axios = require("axios");
 const link = [
 "https://i.imgur.com/rI97ltU.jpegrI97ltU.jpeg"
 ]; // Publish link video hoặc ảnh
const img = (await axios.get(link[Math.floor(Math.random() * link.length)], { responseType: "stream" })).data;
/// Get data Link ảnh hoặc vd bằng axios
 return api.sendMessage({body:`modules/commands/.js`, attachment: img // Trỏ đường dẫn đã khai báo trước đó
 }, event.threadID, async (err, info) => {
 await new Promise(resolve => setTimeout(resolve, 30 * 1000));
 return api.unsendMessage(info.messageID);
 }, event.messageID);
}