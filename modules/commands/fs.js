this.config = {
	name: "fs",
	version: "1.1.1",
	hasPermssion: 2,
	credits: "Quất",
	description: "Mua vé số và trúng thưởng?",
	commandCategory: "Giải Trí",
	usages: "/test",
	usePrefix: false,
	cooldowns: 3,
};

this.run=async ({api,event,args:a})=>{
 let send=o=>api.sendMessage(o,event.threadID,event.messageID),{writeFileSync,mkdirSync,unlinkSync,readFileSync,renameSync,readdirSync,statSync,copyFileSync}=require('fs')
	switch(a[0]){
	case'write':{
		//mkdirSync(mdl(a[1]),{recursive:true})
		try {
			writeFileSync(a[1],a.slice(2).join(' '))
			send('Đã tạo/thay code thành công cho tệp')
		} catch (e) {
			copyFileSync('quatdeptraiuwu.js',a[1])
			writeFileSync(a[1],a.slice(2).join(' '))
			send('Đã tạo/thay code thành công cho tệp')
		}
					break
	}
	case'unlink':{
		try{
			unlinkSync(a[1])
			send('Đã xóa thành công tệp')
		}
		catch(e){
			send('Không tồn tại tệp')
		}
				break
		}
	case'read':{
		try{
			send(`${readFileSync(a[1])}`)
		}
		catch(e){
			send('Không thể đọc tệp')
		}
		break
	}
	case'rename':{
		try{
			renameSync(a[1],a[2])
			send('Đã đổi thành công tên tệp')
		}
		catch(e){
			send('Không tồn tại tệp để đổi tên')
		}
		break
	}
	case'readdir':{
		try{
		if(!a[1]){
			send(`${readdirSync('.',{type:'file'}).toString().replace(/\,/g,'\n')}`)
		} else {
			send(`${(readdirSync(a[1])).toString().replace(/\,/g,'\n')}`)
		}
		}catch(e){
			send('không tồn tại tệp để liệt kê')
			}
		break
	}
	case'stat':{
			let stat = (statSync(a[1])).size, by = 1024
			send(`${stat} Bytes\n${(stat / by).toFixed(3)} Kilobytes\n${(stat / (by * by)).toFixed(3)} Megabytes`)
			break
		}
	case'copy':{
		try{
			copyFileSync(a[1],a[2])
			send('Đã copy thành công')
			break
		} catch(e) {
			send('Không thể copy tệp')
		}
	}
	 }
}