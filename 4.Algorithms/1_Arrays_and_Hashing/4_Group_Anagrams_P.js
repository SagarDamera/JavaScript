const groupAnagrams = (strs) => {
    for (let str of strs) {
        const count = new Array(26).fill(0);
        for (let char of str) {
            count[char.charCodeAt(0) - 97]++;
        }
    }
}


console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));