module.exports.config = {
  name: "outt",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "DũngUwU",
  description: "out box",
  commandCategory: "Tài khoản",
  usages: "[tid]",
  usePrefix: false,
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  var id;
  if (!args.join(" ")) {
    id = event.threadID;
  } else {
    id = parseInt(args.join(" "));
  }
  return api.sendMessage('☑', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
}