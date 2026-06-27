var topKFrequent = function (nums, k) {
    const map = new Map();
    for (let num of nums) {
        if (!map.has(num)) {
            map.set(num, 0);
        }
        map.set(num, map.get(num) + 1)
    }
    const res = [...map.entries().filter((val) => val[1] >= k).map((val) => val[0])];
    return res.length === 2 ? res : res.slice(0, k);
};


console.log(topKFrequent([1, 1, 1, 2, 2, 3, 9, 9, 9, 9, 44], 2));