module.exports.config = {
	name: 'bank',
	commandCategory: 'Tiện nghi',
  usePrefix: false,
	cooldowns: 0,
	hasPermssion: 0,
	credit: 'Mr.Ben',
	description: 'Ngân Hàng',
  usePrefix: false
};
const fs = require('fs-extra'),
	Mpath = __dirname + '/hethong/bank.json',
	laixuat = 0.7;
setInterval(async () => {
	const data = require(Mpath);
	for (var i of data) {
		i.money = Math.ceil(i.money / laixuat);
	}
	return fs.writeFileSync(Mpath, JSON.stringify(data, null, 2));
}, 20 * 60 * 1000);
module.exports.onLoad = async () => {
	if (!fs.existsSync(Mpath)) fs.writeFileSync(Mpath, JSON.stringify([]));
};
module.exports.run = async function({ api, event, args, Users }) {
	try {
		const { threadID, messageID, senderID } = event,
			data = require(Mpath);
		if (args.length == 0)
			return api.sendMessage(
				`[ NGÂN HÀNG ]\n` +
					`𖢨 Hướng Dẫn Sử Dụng\n\n` +
					`-r/register: tạo tài khoản.\n` +
					`-i/info: xem thông tin tài khoản.\n` +
					`-s/send: gửi tiền vào tài khoản.\n` +
					`-c/change: thay đổi mật khẩu.\n` +
					`-v/vay: Vay tiền/ trả tiền.\n` +
					`-b/rút: Rút tiền từ tài khoản.\n\n` +
					`Lãi Xuất: Nhận ${laixuat}% Mỗi 20 Phút`,
				threadID,
				messageID
			);
		else {
			const findU = await data.find(i => i.senderID === senderID);
			switch (args[0].toLowerCase()) {
				case '-r':
				case 'register': {
					if (!args[1])
						return api.sendMessage(
							'vui lòng nhập password',
							threadID,
							messageID
						);
					else password = args[1];
					if (!findU) {
						data.push({
							senderID,
							password,
							money: 100,
							timeStart: Date.now(),
							loans: 0
						});
					} else
						return api.sendMessage(
							'Bạn đã có tài khoản trên hệ thống vui lòng dùng -i/info: để xem thông tin',
							threadID,
							messageID
						);
					return api.sendMessage(
						'Đã tạo tài khoản thành công vui lòng dùng -i/info: để xem thông tin',
						threadID,
						() => fs.writeFileSync(Mpath, JSON.stringify(data, null, 2)),
						messageID
					);
				}
				case '-i':
				case 'info': {
					if (!findU)
						return api.sendMessage(
							'Bạn chưa có tải khoản trên hệ thống, vui lòng dùng -r/register: để tạo tài khoản',
							threadID,
							messageID
						);
					else
						return api.sendMessage(
							'Reply tin nhắn này để nhập password',
							threadID,
							(err, info) => {
								global.client.handleReply.push({
									name: this.config.name,
									author: senderID,
									messageID: info.messageID,
									data: findU,
									type: 'enter-password'
								});
							},
							messageID
						);
				}
				case '-s':
				case 'send': {
					return api.sendMessage(
						'Vui lòng nhập mật khẩu',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								messageID: info.messageID,
								author: senderID,
								data: findU,
								type: 'enter-password',
								theme: 'send'
							});
						},
						messageID
					);
				}
				case '-b':
				case 'rút': {
					if (!findU)
						return api.sendMessage(
							'Bạn chưa có tài khoản trên ngân hàng vui lòng dùng -r/register: để đăng ký',
							threadID,
							messageID
						);
					return api.sendMessage(
						'Vui lòng Reply tin nhắn này để nhập mật khẩu',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								messageID: info.messageID,
								author: senderID,
								data: findU,
								type: 'enter-password',
								theme: 'back'
							});
						},
						messageID
					);
				}
				case '-c':
				case 'change': {
					if (!findU)
						return api.sendMessage(
							'Vui lòng tạo tài khoản trước.',
							threadID,
							messageID
						);
					return api.sendMessage(
						'Vui lòng nhập mật khẩu trước khi thay đổi',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								messageID: info.messageID,
								author: senderID,
								data: findU,
								type: 'enter-password',
								theme: 'change'
							});
						},
						messageID
					);
				}
				case '-v':
				case 'vay': {
					if (!findU)
						return api.sendMessage(
							'Vui lòng tạo tài khoản trước',
							threadID,
							messageID
						);
					return api.sendMessage(
						'Vui lòng nhập mật khẩu trước',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								author: senderID,
								data: findU,
								messageID: info.messageID,
								type: 'enter-password',
								theme: 'vay'
							});
						},
						messageID
					);
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
};
module.exports.handleReply = async function({
	api,
	event,
	handleReply: H,
	Users,
	Currencies
}) {
	try {
		const { threadID, messageID, senderID, args } = event,
			data = require(Mpath);
		if (senderID != H.author)
			return api.sendMessage(
				'chỉ người dùng lệnh mới được nhập password',
				threadID,
				messageID
			);
		switch (H.type) {
			case 'enter-password': {
				if (args[0] != H.data.password)
					return api.sendMessage('Mật khẩu bạn nhập sai', threadID, messageID);
				else if (!H.theme) {
					const time = require('moment-timezone')(H.data.timeStart)
							.tz('Asia/Ho_Chi_minh')
							.format('DD/MM/YYYY - HH:mm:ss'),
						Day = (t1, t2) => {
							var d1 = new Date(t1),
								d2 = new Date(t2);
							return Math.ceil(
								(d1.getTime() - d2.getTime()) / (24 * 60 * 60 * 1000)
							);
						};
					return api.sendMessage(
						`[ Bank Info ]\n Tên Tài khoản: ${await Users.getNameUser(
							H.data.senderID
						)}\n ID tài khoản: ${H.data.senderID}\n Số tiền: ${
							H.data.money
						}\n Số tiền đang vay: ${H.data.loans}\n Mật khẩu: ${
							H.data.password
						}\n Tổng thời gian đăng ký lúc: ${time} ( ${Day(
							Date.now(),
							H.data.timeStart
						)} Ngày )`,
						threadID,
						messageID
					);
				} else if (H.theme == 'send') {
					return api.sendMessage(
						'[ IseKai BANKING ]\n- 1. chuyển cho người khác.\n- 2. chuyển vào tài khoản của bạn.',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								author: senderID,
								messageID: info.messageID,
								type: 'send',
								data: H.data
							});
						},
						messageID
					);
				} else if (H.theme == 'back') {
					return api.sendMessage(
						'Reply tin nhắn này để nhập số tiền cần rút',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								messageID: info.messageID,
								author: H.author,
								type: 'back'
							});
						},
						messageID
					);
				} else if (H.theme == 'change') {
					return api.sendMessage(
						'Reply để nhập mật khẩu muốn đổi',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								messageID: info.messageID,
								author: H.author,
								type: 'change'
							});
						},
						messageID
					);
				} else if (H.theme == 'vay') {
					return api.sendMessage(
						'[ IseKai Loans ]\n 1: Vay tiền\n 2: Trả tiền\n- Reply stt bạn muốn ở trên',
						threadID,
						(err, info) => {
							global.client.handleReply.push({
								name: this.config.name,
								messageID: info.messageID,
								author: H.author,
								type: 'vay'
							});
						},
						messageID
					);
				}
			}
			case 'send': {
				if (!H.theme) {
					if (!parseInt(args[0]))
						return api.sendMessage('vui lòng chỉ nhập số', threadID, messageID);
					if (args[0] == '1') {
						return api.sendMessage(
							'vui lòng nhập theo chỉ dẫn: {id người muốn chuyển} {số tiền cần chuyển}',
							threadID,
							(err, info) => {
								global.client.handleReply.push({
									name: this.config.name,
									messageID: info.messageID,
									author: senderID,
									type: 'send',
									data: H.data,
									theme: '1'
								});
							},
							messageID
						);
					}
					if (args[0] == '2') {
						return api.sendMessage(
							'reply nhập số tiền muốn gửi',
							threadID,
							(err, info) => {
								global.client.handleReply.push({
									name: this.config.name,
									messageID: info.messageID,
									author: senderID,
									type: 'send',
									theme: '2'
								});
							},
							messageID
						);
					}
				} else if (H.theme == '1') {
					const id = args[0],
						moneySend = args[1],
						findU = await data.find(i => i.senderID === id),
						findA = await data.find(i => i.senderID === H.author);
					if (!findU)
						return api.sendMessage(
							'Người dùng bạn nhập không tồn tại',
							threadID,
							messageID
						);
					if (findA.money < parseInt(moneySend))
						return api.sendMessage(
							'Số tiền bạn muốn chuyển lớn hơn số tiền bạn có',
							threadID,
							messageID
						);
					else {
						findU.money += parseInt(moneySend);
						return api.sendMessage(
							`Đã chuyển thành công cho người dùng: ${await Users.getNameUser(
								id
							)} money: ${moneySend}`,
							threadID,
							async () => {
								findA.money -= parseInt(moneySend);
								fs.writeFileSync(Mpath, JSON.stringify(data, null, 2));
							},
							messageID
						);
					}
				} else if (H.theme == '2') {
					var moneySend = parseInt(args[0]);
					const findU = await data.find(i => i.senderID === H.author);
					const dataU = await Currencies.getData(H.author)
					if (!parseInt(args[0]))
						return api.sendMessage('vui lòng chỉ nhập số', threadID, messageID);
					if (dataU.money < moneySend)
						return api.sendMessage(
							'số tiền bạn muốn chuyển lớn hơn số tiền bạn có',
							threadID,
							messageID
						);
					else {
						return api.sendMessage(
							`Đã chuyển thành công ${moneySend} vào tài khoản `,
							threadID,
							async () => {
								await Currencies.decreaseMoney(H.author, moneySend);
								if (findU.loans != 0) {
									moneySend -= findU.loans;
									moneySend < 0 ? 0 : moneySend;
									findU.money += moneySend;
									findU.loans -= parseInt(args[0]);
									api.sendMessage(
										`[ Bank Loans ]\n- Thanh toán thành công: ${parseInt(
											args[0]
										) - findU.loans}, số tiền còn phải trả là: ${findU.loans}`,
										threadID,
										messageID
									);
								}
								fs.writeFileSync(Mpath, JSON.stringify(data, null, 2));
							},
							messageID
						);
					}
				}
			}
			case 'back': {
				const findU = await data.find(i => i.senderID === H.author);
				if (findU.money < parseInt(args[0]))
					return api.sendMessage(
						'Số tiền bạn muốn rút lớn hơn số tiền trong tài khoản của bạn',
						threadID,
						messageID
					);
				else {
					return api.sendMessage(
						`Đã rút thành công ${
							args[0]
						} vui lòng dùng -i/info: để xem thông tin/ dùng lệnh money để xem số tiền rút được.`,
						threadID,
						async () => {
							findU.money -= parseInt(args[0]);
							await Currencies.increaseMoney(H.author, parseInt(args[0]));
							fs.writeFileSync(Mpath, JSON.stringify(data, null, 2));
						},
						messageID
					);
				}
			}
			case 'change': {
				const findU = await data.find(i => i.senderID === H.author);
				if (findU == args.join(' '))
					return api.sendMessage(
						'Mật khẩu bạn nhập trùng với mật khẩu cũ',
						threadID,
						messageID
					);
				else {
					return api.sendMessage(
						`Đã chuyển mật khẩu: ${findU.password} Thành: ${args.join(' ')}`,
						threadID,
						() => {
							findU.password = args.join(' ');
							fs.writeFileSync(Mpath, JSON.stringify(data, null, 2));
						},
						messageID
					);
				}
			}
			case 'vay': {
				if (!parseInt(args[0]))
					return api.sendMessage('Vui lòng chỉ nhập số', threadID, messageID);
				if (!H.theme) {
					if (args[0] == '1') {
						return api.sendMessage(
							'Reply tin nhắn này để nhập số tiền bạn muốn vay',
							threadID,
							(err, info) => {
								global.client.handleReply.push({
									name: this.config.name,
									messageID: info.messageID,
									author: H.author,
									type: 'vay',
									theme: '1'
								});
							},
							messageID
						);
					}
					if (args[0] == '2') {
						return api.sendMessage(
							'Reply tin nhắn này để nhập số tiền bạn muốn Trả',
							threadID,
							(err, info) => {
								global.client.handleReply.push({
									name: this.config.name,
									messageID: info.messageID,
									author: H.author,
									type: 'vay',
									theme: '2'
								});
							},
							messageID
						);
					}
				} else if (H.theme == '1') {
					if (!parseInt(args[0]))
						return api.sendMessage('Vui lòng chỉ nhập số', threadID, messageID);
					const findU = await data.find(i => i.senderID === H.author),
						moneyLoans = parseInt(args[0]);
					return api.sendMessage(
						'Đã vay thành công: ' + args[0],
						threadID,
						(err, info) => {
							findU.loans += moneyLoans;
							findU.money += moneyLoans;
							fs.writeFileSync(Mpath, JSON.stringify(data, null, 2));
						},
						messageID
					);
				} else if (H.theme == '2') {
					if (!parseInt(args[0]))
						return api.sendMessage('Vui lòng chỉ nhập số', threadID, messageID);
					const findU = await data.find(i => i.senderID === H.author);
					if (findU.loans < parseInt(args[0]))
						return api.sendMessage(
							'Số tiền bạn trả lớn hơn số tiền đang vay là: ' + findU.loans,
							threadID,
							messageID
						);
					const dataU = await Currencies.getData(H.author)
					if (parseInt(args[0]) > dataU.money)
						return api.sendMessage(
							'Số tiền bạn nhập lớn hơn số tiền bạn có',
							threadID,
							messageID
						);
					else {
						findU.loans -= parseInt(args[0]);
						return api.sendMessage(
							`Đã trả thành công: ${
								args[0]
							} tiền vay, tiền còn cần phải trả là: ${findU.loans}`,
							threadID,
							async () => {
								await Currencies.decreaseMoney(H.author, parseInt(args[0]));
							},
							messageID
						);
					}
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
};