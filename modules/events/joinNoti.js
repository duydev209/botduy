module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "HĐGN",//mod by QuocDuy
	description: "Thông báo Bot hoặc người dùng vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event, Users }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`『 ${global.config.PREFIX} 』• ${(!global.config.BOTNAME) ? "𝐐𝐔𝐎𝐂𝐃𝐔𝐘🐬" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`  ⎔ 𝐊𝐞̂́𝐭 𝐍𝐨̂́𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 ⎔\n› 𝐏𝐫𝐞𝐟𝐢𝐱:   [  ~  ]\n› 𝐋𝐞̣̂𝐧𝐡:   [ 200 ]\n▭▭▭▭ [ 𝐇𝐃𝐒𝐃 ] ▭▭▭▭\n⋄ 𝐂𝐡𝐚𝐭 ~𝐜𝐚𝐥𝐥𝐚𝐝: 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐕𝐨̛́𝐢 𝐀𝐝𝐦𝐢𝐧 𝐁𝐨𝐭\n▭▭▭▭ [  𝐈𝐍𝐅𝐎  ] ▭▭▭▭\n⋄ 𝐅𝐁: fb.com/100074278195157 \n⋄ 𝐙𝐋: 0326289487\n◈ 𝐂𝐡𝐮́𝐜 𝐁𝐚̣𝐧 𝐒𝐮̛̉ 𝐃𝐮̣𝐧𝐠 𝐁𝐨𝐭 𝐕𝐮𝐢 𝐕𝐞̉ 𝐌𝐨𝐚𝐡𝐡`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/hello123.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
      const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
		const userName = event.logMessageData.addedParticipants[id].fullName;    iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
				nameArray.push(userName);
				mentions.push({ tag: userName, id: event.senderID });
				memLength.push(participantIDs.length - i++);
        console.log(userName)
			}
			memLength.sort((a, b) => a - b);		
		(typeof threadData.customJoin == "undefined") ? msg = "▭▭▭▭ [ 𝐖𝐞𝐥𝐥𝐜𝐨𝐦𝐞 ] ▭▭▭▭\n『☘️』𝐗𝐢𝐧 𝐂𝐡𝐚̀𝐨 {name} 𝐭𝐨̛́𝐢 𝐯𝐨̛́𝐢 𝐧𝐡𝐨́𝐦 {threadName}\n『🌐』𝐋𝐢𝐧𝐤 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 :\n fb.com/{iduser}\n {type} 𝐥𝐚̀ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐭𝐡𝐮̛́ {soThanhVien} 𝐂𝐮̉𝐚 𝐛𝐨𝐱 𝐜𝐡𝐚𝐭\n『⏰』𝐓𝐢𝐦𝐞: {time}\n▭▭▭▭ [ 𝐓𝐡𝐚𝐧𝐤𝐬 ] ▭▭▭▭": msg = threadData.customJoin;
      var getData = await Users.getData(event.author)
var nameAuthor = typeof getData.name == "undefined" ? "𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 𝐭𝐮̛̣ 𝐯𝐚̀𝐨" : getData.name
			msg = msg
      .replace(/\{iduser}/g, iduser.join(', '))
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  '𝐂𝐚́𝐜 𝐛𝐚̣𝐧' : '𝐁𝐚̣𝐧')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName)
      .replace(/\{author}/g, nameAuthor)
      .replace(/\{time}/g, time);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://vdff.hoanghuy101.repl.co/vdff')).data.data,
method: "GET",
responseType: "stream"
})).data, mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('api')).data.data,
method: "GET",
responseType: "stream"
})).data, mentions }
			}
			else formPush = { body: msg, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('api')).data.data,
method: "GET",
responseType: "stream"
})).data, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
                     }