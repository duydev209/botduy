const fs = require('fs-extra');
const pathFile = __dirname + '/hethong/autoseen.txt';
if (!fs.existsSync(pathFile))
  fs.writeFileSync(pathFile, 'false');
  
module.exports.config = {
	name: "autoseen",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Bật/tắt tự động seen khi có tin nhắn mới",
	commandCategory: "ADMIN",
  usePrefix: false,
	usages: "on/off",
	cooldowns: 5
};

module.exports.handleEvent = async ({ api, event, args }) => {
  const isEnable = fs.readFileSync(pathFile, 'utf-8');
  if (isEnable == 'true')
    api.markAsReadAll(() => {});
};

module.exports. run = async ({ api, event, args }) => {
  const permission = ["100074278195157"];
      if (!permission.includes(event.senderID)) return api.sendMessage("cac", event.threadID, event.messageID);
  try {
	if (args[0] == 'on') {
	  fs.writeFileSync(pathFile, 'true');
	  api.sendMessage('Đã Bật ✅', event.threadID, event.messageID);
	}
	else if (args[0] == 'off') {
	  fs.writeFileSync(pathFile, 'false');
	  api.sendMessage('Đã Tắt ❎', event.threadID, event.messageID);
	}
	else {
	  api.sendMessage('Sai cú pháp', event.threadID, event.messageID);
	}
  }
  catch(e) {
    console.log(e);
  }
};