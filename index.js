function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const freq = new Array(26).fill(0);
  const length = str1.length;

  for (let i = 0; i < length; i++) {
    let str1Index = str1.charCodeAt(i) - 97;
    let str2Index = str2.charCodeAt(i) - 97;

    freq[str1Index]++;
    freq[str2Index]--;
  }

  for (const f of freq) {
    if (f !== 0) {
      return false;
    }
  }
  return true;
}

console.log(isAnagram("car", "Rac"));
