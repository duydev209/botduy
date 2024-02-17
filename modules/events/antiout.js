module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "0.0.1",
    credits: "DungUwU",
    description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (!data.antiout) return;
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đuổi";
    if (type == "tự rời") {
        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
            if (error) {
                api.sendMessage(`[❗]━━━[ 𝐀𝐧𝐭𝐢𝐎𝐮𝐭 ]━━━[❗]\n◆━━━━━━━━━━━━━━━◆\n━━━━━━━━━━━━━━━━\n𝐤𝐡𝐨𝐧𝐠 𝐭𝐡𝐞 𝐭𝐡𝐞𝐦 ${name} 𝐯𝐚𝐨 𝐧𝐡𝐨𝐦.!?`, event.threadID)
            } else api.sendMessage(`[❗]━━━[ 𝐀𝐧𝐭𝐢𝐎𝐮𝐭 ]━━━[❗]\n◆━━━━━━━━━━━━━━━◆\n${name} 𝐥𝐚 𝐝𝐮𝐚 𝐭𝐡𝐢𝐜𝐡 𝐨𝐮𝐭 𝐜𝐡𝐮𝐚 !!\n
𝐛𝐨𝐭 𝐝𝐚 𝐭𝐡𝐞𝐦 𝐥𝐚𝐢 𝐭𝐡𝐚𝐧𝐡 𝐜𝐨𝐧𝐠.`, event.threadID);
        })
    }
        }