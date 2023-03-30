let teamOptions = ["opes", "altum", "magus", "aequor", "cinis", "virtus"];

function editDistance(t,e){t=t.toLowerCase(),e=e.toLowerCase();for(var n=new Array,r=0;r<=t.length;r++){for(var a,h=r,i=0;i<=e.length;i++)0==r?n[i]=i:0<i&&(a=n[i-1],t.charAt(r-1)!=e.charAt(i-1)&&(a=Math.min(Math.min(a,h),n[i])+1),n[i-1]=h,h=a);0<r&&(n[e.length]=h)}return n[e.length]}function getSimilarity(t,e){var n=t,r=e;t.length<e.length&&(n=e,r=t);t=n.length;return 0==t?1:(t-editDistance(n,r))/parseFloat(t)}

function processJoinCode(joinCode) {
    joinCode = joinCode.toLowerCase();
    joinCode = joinCode.match(/[\w,\d]/g).join("").split(",");
    let team =  joinCode[0];
    let level = +joinCode[1].charAt(0);
    if (isNaN(level)) level = 0; //not very smart obviously

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
    
    console.log([team, level, temp.conf])
}
processJoinCode(`$["virtes",3]$`);

// i smoked myself o.O
// (to my future employer, that can be classified as an inside - joke this was easy)
