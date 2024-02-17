let { get } = require('axios')
	this.config = {
		name: 'pex',
		version: '1.0.0',
		hasPermssion: 0,
		credits: 'huynhletanphat (xavia)', //=> mirai by quất
		description: 'tải link',
		commandCategory: 'Công Cụ',
		usePrefix: false,
		cooldowns: 0
	}
	this.run = async ({ event, args, api }) => {
		let send = o => api.sendMessage(o, event.threadID, event.messageID)
		let input = args.join(' ')
		if (!input) return send('thiếu input')
			let { data } = await get(`https://project-api.phattan14.repl.co/media/pexels?img=${encodeURIComponent(input)}`, { timeout: 120000 })
			if (!data.img) return send('Lỗi')
			let img = async u => (await get(u, { responseType: "stream" })).data
			send({ body: 'Ảnh cho từ khóa \'' + args[0] + '\'', attachment: (await Promise.all([img(data.img), data.img1 && img(data.img1), data.img2 && img(data.img2)])).filter(Boolean) })
	}