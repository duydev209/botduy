const ax = require('axios');
this.config={
    name:"bard",version:"1.0.0",hasPermssion:0,
    credits:"Nguyễn Thanh Mài",description:"",commandCategory:"Tìm kiếm",
    usages:"[từ khoá]",usePrefix:false,cooldowns:0
};
this.run = async function ({api:p,event:e,args:s}) {
    const {threadID:t,messageReply:mR,type:tp}=e,{sendMessage:sD}=p
    const a=tp==='message_reply'?s.join(' ')+' "'+ mR.body+'"':s.join(' ');
    const r=(await ax.get(`https://apibardbulol.shadowapi.repl.co/bard?ask=${encodeURIComponent(a)}`)).data.result
    sD(r,t)
};
module.exports.handleEvent = async function ({api:p,event:e}) {
    const {threadID:t,messageReply:mR,type:tp,body:b}=e,{sendMessage:sD}=p,a=tp==='message_reply'?b+' "'+mR.body+'"' : b
    let h=(b!==undefined?b:'').toLowerCase();
    if (h.charAt(h.length-1)=='_') {
        const r=(await ax.get(`https://apibardbulol.shadowapi.repl.co/bard?ask=${encodeURIComponent(a)}`)).data.result;
        sD(r,t)
    }
}