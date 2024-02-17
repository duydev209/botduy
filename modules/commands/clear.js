module.exports.config = {
  name: "clear",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Kshitiz", 
  description: "unsent the message sent by the bot",
  usePrefix: false,
  commandCategory: "boxchat",
  usages: "clear",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event }) {

  const unsendBotMessages = async () => {
    const threadID = event.threadID;

    const botMessages = await api.getThreadHistory(threadID, 50); // Adjust the limit as needed (50 = 50 messages)

    const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

    for (const message of botSentMessages) {
      await api.unsendMessage(message.messageID);
    }
  };

  await unsendBotMessages();
};
