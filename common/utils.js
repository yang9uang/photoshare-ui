/**
 * 人性化时间处理 传入时间戳
 */
function beautify_time(timestamp){
    var mistiming = Math.round(new Date() / 1000)-timestamp;
    var postfix = mistiming>0 ? '前' : '后'
    mistiming = Math.abs(mistiming)
    var arrr = ['年','个月','星期','天','小时','分钟','秒'];
    var arrn = [31536000,2592000,604800,86400,3600,60,1];
 
    for(var i=0; i<7; i++){
        var inm = Math.floor(mistiming/arrn[i])
        if(inm!=0){
            return inm+arrr[i] + postfix
        }
    }
}