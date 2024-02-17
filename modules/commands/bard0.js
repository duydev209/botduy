const axios = require("axios");

const config = {
 name: "bard0",
 version: "1.0.0",
 hasPermission: 2,
 credits: "//mod",
 description: "bard-based AI with no prefix",
 commandCategory: "AI",
 usages: "...",
 cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {
 if (event.body.indexOf("bard") === 0 || event.body.indexOf("Bard") === 0) {
 const { threadID, messageID } = event;
 const input = event.body;
 const message = input.split(" ");

 if (message.length < 2) {
 api.sendMessage("Xin chào! tôi có thể giúp bạn gì nào? Tôi là Bard AI. Hãy hỏi tôi một câu hỏi.", event.threadID); 
 } else {
 try {
 api.sendMessage(`Đang xử lý yêu cầu của bạn "${message.slice(1).join(" ")}", vui lòng chờ..`, event.threadID);
 const startTime = Date.now();
 const response = await axios.get(`https://hazeyy-api-blackbox.kyrinwu.repl.co/ask?q=${encodeURIComponent(message.slice(1).join(" "))}`);
 const answer = response.data.message;
 const processingTime = Math.floor((Date.now() - startTime) / 1000);

 api.sendMessage(`Time processing: ${processingTime}s\nHere's your request: "${message.slice(1).join(" ")}" \n📜${answer}`, event.threadID);

 api.setMessageReaction("❤", messageID, (err) => {}, true);
 } catch (err) {
 console.error(err);
 api.sendMessage("Hiện tại tôi đang gặp khó khăn trong việc tìm câu trả lời.", event.threadID);
 }
 }
 }
};

const run = function ({ api, event, client, __GLOBAL }) {};

module.exports = { config, handleEvent, run };