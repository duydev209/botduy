module.exports.config = {
    name: "rset",
    version: "2.0.2",
    hasPermssion: 2,
    credits: "Mirai Team mod by Jukie",
    description: "Khởi động lai bot",
    commandCategory: "Hệ thống admin-bot",
    usages: "restart",
    usePrefix: false,
    cooldowns: 5,
    dependencies: { }
}
 
module.exports.run = async function({ api, args, Users, event}) {
const { threadID, messageID } = event;
  let name = await Users.getNameUser(event.senderID)
 const permission = ["100074278195157"];
      if (!permission.includes(event.senderID)) return api.sendMessage("=))", event.threadID, event.messageID);
if(args.length == 0) api.sendMessage(`[⚙️] Đợi chút ..`,event.threadID, () =>process.exit(1))
}  
  /*
else{    
let time = args.join(" ");
setTimeout(() =>
api.sendMessage(`🔮Bot sẽ khỏi động lại sau: ${gio}s\n⏰Bây giờ là: ${gio}:${phut}:${giay} `, threadID), 0)
setTimeout(() =>
api.sendMessage("⌛Đang bắt đầu quá trình khỏi động lại",event.threadID, () =>process.exit(1)), 1000*`${time}`);
}
}
*/