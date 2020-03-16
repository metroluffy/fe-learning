var checkInclusion = function(s1, s2) {
    const s1l = s1.length, s2l = s2.length;
    if(s2l < s1l) return false;
    let s1_cmap = Array(26).fill(0);
    let s2_cmap = Array(26).fill(0);
    s1.split('').forEach(item => {
        s1_cmap[item.charCodeAt() - 97] += 1;
    })
    s2.substring(0,s1l).split('').forEach(item => {
        s2_cmap[item.charCodeAt() - 97] += 1;
    })
    if(s2_cmap.join() === s1_cmap.join()) return true;
    for(let i = s1l ; i < s2l; i++){
        let pop = s2[i-s1l];
        if(pop === s2[i]) continue;
        s2_cmap[pop.charCodeAt() - 97] -= 1;
        s2_cmap[s2[i].charCodeAt() - 97] += 1;
        if(s2_cmap.join() === s1_cmap.join()) return true;
    }
    return false;
};