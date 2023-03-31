
console.clear()

let teamOptions = ["opes", "altum", "magus", "aequor", "cinis", "virtus"];
let longestName = 6;
let maxLevel = 4;

function editDistance(t,e){t=t.toLowerCase(),e=e.toLowerCase();for(var n=new Array,r=0;r<=t.length;r++){for(var a,h=r,i=0;i<=e.length;i++)0==r?n[i]=i:0<i&&(a=n[i-1],t.charAt(r-1)!=e.charAt(i-1)&&(a=Math.min(Math.min(a,h),n[i])+1),n[i-1]=h,h=a);0<r&&(n[e.length]=h)}return n[e.length]}function getSimilarity(t,e){var n=t,r=e;t.length<e.length&&(n=e,r=t);t=n.length;return 0==t?1:(t-editDistance(n,r))/parseFloat(t)}

function processJoinCode(joinCode) {
    console.log(joinCode);
    joinCode = joinCode.toLowerCase();
    
    let team, level;
    let tooLong = joinCode.length > 19+longestName;
    if (joinCode.includes(",") && !tooLong) {
        joinCode = joinCode.match(/[\w,\d]/g).join("").split(",");
        team =  joinCode[0];
        level = +joinCode[1].charAt(0);
        if (isNaN(level)) level = 0; //not very smart obviously
    } else if(!tooLong) {
        //backup for idiots who forget the ','
        level = 0;
        team = joinCode.match(/\w+/)[0];
    } else {
        //backup for idiots who include comments
        level = 0;
        team = joinCode.match(/(?<=(\[|\$).+)(\w+)/)[0];
    }

    // correct spelling of team name
    var temp = {conf:0, team:"opes"}
    for (let i = teamOptions.length; i--;) {
        var similarity = getSimilarity(teamOptions[i], team);
        if (temp.conf < similarity) {
            temp.team = teamOptions[i];
            temp.conf = similarity;
        }
        if (temp.conf == 1) i = 0;
    }
    team = temp.team;

    // idiot
    if (level > maxLevel) maxLevel = 0;

    console.log([team, level, temp.conf])
    // return [team, level]
}

processJoinCode('Im an idiot who puts comments before the join code, here:\n$["Magus", 2]$')

// i smoked myself o.O
// (to my future employer, that can be classified as an inside joke - this was easy)
