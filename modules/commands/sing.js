const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 128 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                uploadDate: data.videoDetails.uploadDate,
                sub: data.videoDetails.author.subscriber_count,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "phương tiện",
    usages: "[searchMusic]",
    usePrefix: false,
    cooldowns: 0
}

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('Không thể gửi file, vui lòng chọn bài khác', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `◆━━━━[ MusicPro ]━━━━◆\n『🎬』𝐁𝐚̀𝐢 𝐡𝐚́𝐭: ${data.title}\n『⏰』𝐓𝐡𝐨̛̀𝐢 𝐥𝐮̛𝐨̛̣𝐧𝐠: ${this.convertHMS(data.dur)}\n『📆』𝐍𝐠𝐚̀𝐲 𝐭𝐚̉𝐢 𝐥𝐞̂𝐧: ${data.uploadDate}\n『🔎』𝐓𝐞̂𝐧 𝐤𝐞̂𝐧𝐡: ${data.author}\n『🌐』𝐋𝐮̛𝐨̛̣𝐭 𝐱𝐞𝐦: ${data.viewCount}\n『⏳』𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧 𝐱𝐮̛̉ 𝐥𝐲́: ${Math.floor((Date.now()- data.timestart)/1000)} 𝐠𝐢𝐚̂𝐲\n『📥』𝐋𝐢𝐧𝐤 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝: https://www.y2meta.com/vi/youtube/${handleReply.link[event.body - 1]}\n◆━━━━[ Quoc Duy ]━━━━◆`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
  let axios = require('axios');
    if (args.length == 0 || !args) return api.sendMessage('» Phần tìm kiếm không được để trống', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 2621440000) return api.sendMessage('𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗴𝘂̛̉𝗶 𝗳𝗶𝗹𝗲 𝗰𝗼́ 𝘁𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝘁𝘂̛̀ 01:10:10 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗳𝗶𝗹𝗲 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗮̂𝗺 𝘁𝗵𝗮𝗻𝗵.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `◆━━━━[ Quoc Duy ]━━━━◆\n『🎬』𝗕𝗮̀𝗶 𝗵𝗮́𝘁: ${data.title}\n『⏰』𝗧𝗵𝗼̛̀𝗶 𝗹𝘂̛𝗼̛̣𝗻𝗴: ${this.convertHMS(data.dur)}\n『📆』𝗡𝗴𝗮̀𝘆 𝘁𝗮̉𝗶 𝗹𝗲̂𝗻: ${data.uploadDate}\n『🔎』𝗧𝗲̂𝗻 𝗸𝗲̂𝗻𝗵: ${data.author}\n『👤』𝗦𝘂𝗯𝘀𝗰𝗿𝗶𝗯𝗲: ${data.sub}\n『🌐』𝗟𝘂̛𝗼̛̣𝘁 𝘅𝗲𝗺: ${data.viewCount}\n『👍』𝗟𝘂̛𝗼̛̣𝘁 𝘁𝗵𝗶́𝗰𝗵: ${data.likes} 𝐥𝐢𝐤𝐞\n『⏳』𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝘅𝘂̛̉ 𝗹𝗶́: ${Math.floor((Date.now()- data.timestart)/1000)} 𝐠𝐢𝐚̂𝐲\n◆━━━━[ MusicPro ]━━━━◆`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0,
                numb = 0;
            var imgthumnail = []
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              let folderthumnail = __dirname + `/cache/${numb+=1}.png`;
                let linkthumnail = `https://img.youtube.com/vi/${value.id}/hqdefault.jpg`;
                let getthumnail = (await axios.get(`${linkthumnail}`, {
                    responseType: 'arraybuffer'
                })).data;
                  let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=AIzaSyAygWrPYHFVzL0zblaZPkRcgIFZkBNAW9g`)).data;
                     fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));
              imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));
              let channel = datac.items[0].snippet.channelTitle;
              num = num+=1
  if (num == 1) var num1 = "🐳①. "
  if (num == 2) var num1 = "🐳②. "
  if (num == 3) var num1 = "🐳③. "
  if (num == 4) var num1 = "🐳④. "
  if (num == 5) var num1 = "🐳⑤. "
  if (num == 6) var num1 = "🐳⑥. "

              msg += (`${num1} ➩ ${value.title} ( ${value.length.simpleText} )\n📻 𝐊𝐞̂𝐧𝐡: ${channel}\n◆━━━━━━━━━━━━━━━━◆\n`);
            }
            var body = `◆━━━━[ MusicPro ]━━━━◆\n〖🐧〗Có ${link.length} kết quả trùng với tìm kiếm của bạn:\n◆━━━━━━━━━━━━━━━━◆\n${msg}➩ Hãy reply ( phản hồi ) chọn một trong những tìm kiếm trên`
            return api.sendMessage({
              attachment: imgthumnail,
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            /*return api.sendMessage('Đã xảy ra lỗi, vui lòng thử lại trong giây lát!!\n' + e, event.threadID, event.messageID);*/
        }
    }
}
