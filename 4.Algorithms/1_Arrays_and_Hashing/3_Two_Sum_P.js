const twoSums = (nums, target) => {
    const map = {}; // value -> index

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.hasOwnProperty(complement)) {
            return [map[complement], i];
        }

        map[nums[i]] = i;
    }
}

console.log(twoSums([15, 5, 2, 7], 9));