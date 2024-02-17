module.exports.config={
 name:"mc",version:"1.0.0",hasPermssion:0,
 credits:"quất",description:"",commandCategory:"code",
 usages:"[từ khoá]",usePrefix:false,cooldowns:0};
this.run=async function({api:ap,event:e,args:ar}){
 const {threadID:th,senderID:sd}=e,{sendMessage:s}=ap,{log:l}=console
 var c = parseInt(ar[0]),t = parseInt(ar[1]),
 {random} = Math
 const grid = new Array(t).fill(null).map(() => new Array(c).fill(1));
 function generateMaze(x, y) {
 const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
 directions.sort(() => random() - 0.5);
 for (let i = 0; i < directions.length; i++) {
 const dx = directions[i][0];
 const dy = directions[i][1];
 const nx = x + dx * 2;
 const ny = y + dy * 2;
 if (nx > 0 && nx < c && ny > 0 && ny < t && grid[ny][nx] === 1) {
 grid[y + dy][x + dx] = 0;
 grid[ny][nx] = 0;
 generateMaze(nx, ny);
 }
 }
 }
 generateMaze(1, 1);
 let mazeString = "";
 for (let i = 0; i < t; i++) {
 for (let j = 0; j < c; j++) {
 mazeString += grid[i][j] === 1 ? '█' : ' ';
 }
 mazeString += '\n';
 }
 s(mazeString, th);
 l(mazeString);
}