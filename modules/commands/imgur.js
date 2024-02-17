const imgur = require("imgur");
const fs = require("fs");
const { downloadFile } = require("../../utils/index");

module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "MDong mod noprefix",
  description: "Imgur",
  commandCategory: "Tiện ích",
  usages: "[reply]",
  cooldowns: 5
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "imgur.jpeg")) request("https://i.imgur.com/VTiuzvY.jpeg").pipe(fs.createWriteStream(dirMaterial + "imgur.jpeg"));
      }
module.exports.handleEvent = async ({ api, event, Users, Threads }) => {
  const { threadID, type, messageReply, messageID } = event;
  const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
const fs = require("fs");
      if (event.body.indexOf("img")==0 ||
event.body.indexOf("Img")==0) {
  const ClientID = "771631e18e73452"
  if (type !== "message_reply" || messageReply.attachments.length == 0) return api.sendMessage("Bạn phải reply một video, ảnh nào đó", threadID, messageID);
  imgur.setClientId(ClientID);
  const attachmentSend = [];
  async function getAttachments(attachments) {
    let startFile = 0;
    for (const data of attachments) {
      const ext = data.type == "photo" ? "jpg" :
        data.type == "video" ? "mp4" :
          data.type == "audio" ? "m4a" :
            data.type == "animated_image" ? "gif" : "txt";
      const pathSave = __dirname + `/cache/${startFile}.${ext}`
      ++startFile;
      const url = data.url;
      await downloadFile(url, pathSave);
      attachmentSend.push(pathSave);
    }
  }
  await getAttachments(messageReply.attachments);
  let msg = "", Succes = 0, Error = [];
  for (const getImage of attachmentSend) {
    try {
      const getLink = await imgur.uploadFile(getImage)
      console.log(getLink);
      msg += `${++Succes}/ ${getLink.link}\n`
      fs.unlinkSync(getImage)
    } catch {
      Error.push(getImage);
      fs.unlinkSync(getImage)
    }
  }
  return api.sendMessage({body: `➩ Thành công: ${Succes}\n➩ Thất bại: ${Error.length}\n\n${msg}`, attachment: fs.createReadStream(__dirname + `/noprefix/imgur.jpeg`)}, event.threadID, event.messageID);}
  }
module.exports.run = async ({ event, api, Currencies, args, utils }) => {
return api.sendMessage("Địt mẹ đéo biết đây là lệnh noprefix à thằng ngu :)",event.threadID)
}
