module.exports.config = {
    name: "ship",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "",
    description: "ship 1 mdl nào đó cho 1 tv trog group",
    commandCategory: "Admin",
    usePrefix: false,
    usages: "ship [reply or tag or để trống] + tên mdl muốn share",
    cooldowns: 0,
    dependencies: {
        "pastebin-api": "",
        "cheerio": "",
        "request": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100074278195157"];
    if (!permission.includes(event.senderID)) return api.sendMessage( "bạn làm gì vậy",event.threadID, event.messageID);
    const axios = require('axios');
    const fs = require('fs');
    const request = require('request');
    const cheerio = require('cheerio');
  const picture = (await axios.get(`https://quatangabc.com/vnt_upload/File/Image/share_1.jpg`, { responseType: "stream"})).data;
  const moment = require("moment-timezone");
  const hmm = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
const uid = event.type == 'message_reply' ? event.messageReply.senderID: !!Object.keys(event.mentions)[0] ? Object.keys(event.mentions)[0]: !!args[0] ? args[0]: event.senderID  ;
    const { join, resolve } = require("path");
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];
    if (type == "message_reply") {
        var text = messageReply.body;
    }
    if(!text && !name) return api.sendMessage({body: `➩ Time: ${hmm} 
➩ Bạn có thể reply or tag người muốn share mdl`, attachment: (picture)},threadID, messageID);
    //(!text && name) {
        var data = fs.readFile(
          `./modules/commands/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage({body: `➩ Time: ${hmm} 
➩ Modules ${args[0]} mà bạn cần hiện không có trên hệ thống của bot ${global.config.BOTNAME}`, attachment: (picture)}, threadID, messageID);
            const { PasteClient } = require('pastebin-api')
    const client = new PasteClient("GT50TmDosqBBicH60IXyiTANFaXGBxCZ");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
        api.sendMessage(`➩ Vào lúc: ${hmm} 
➩ Tên lệnh: ${args.join("")}`, threadID, messageID);
            api.sendMessage({body: `➩ Vào lúc: ${hmm}
➩ Link mdl: ${link} 
➩ Tên lệnh: ${args.join("")}`,attachment: (picture)}, uid)
          }
        );
        return
}