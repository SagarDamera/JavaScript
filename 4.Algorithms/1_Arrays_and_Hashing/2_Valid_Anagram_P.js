const validAnagram = (str1, str2) => {
    if (s.length !== t.length) return false;
    let map = {};
    for (let ch of s + t) {
        map[ch] = (map[ch] || 0) + 1
    }
    for (let key in map) {
        if ((map[key] === 1) || ((map[key] / map[key]) === 0)) {
            return false;
        }
    }
    return map;
}

console.log(validAnagram('anagram', 'nagaram'))