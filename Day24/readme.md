# 30.串联所有单词的子串

https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/

给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符 ，但不需要考虑 words 中单词串联的顺序。


示例 1：

输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。  
示例 2：  

输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]  
示例 3：   

输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
输出：[6,9,12]
 

提示：  

1 <= s.length <= 104  
s 由小写英文字母组成  
1 <= words.length <= 5000  
1 <= words[i].length <= 30  
words[i] 由小写英文字母组成  


## 思路
在字符串里面找`substring`，那么对应的解法就是`滑动窗口+hashMap`；
要点：
1. words里面的字符串长度都相同。
2. 使用`Hash`保存`words`里面出现过的值和出现的次数。然后对s进行截断，  
截取的长度就是words的长度。
3. 在截断的字符串中查找是否存在map中的值，存在则将其计数-1，直到所有的都为空
则说明是目标位置，返回此时的起始位置。  

```javascript
  var findSubString = function(s, words){
    const wLen = words[0].length;
    const sLen = wLen * words.length;
    let wordsMap = Object.create(null);
    // 将words里面的字符保存到map中。
    for(let i = 0; i < words.length; i++){
      wordsMap[words[i]] ? wordsMap[words[i]]++ : (wordsMap[words[i]] = 1);
    }
    let targetIndex = [];
    // j < s.length - sLen + 1;最后一节的长度至少要是slen的个数。不然肯定找不到。
    // j 就是起始位置。
    for(let j = 0; j < s.length - sLen + 1;j++){
      const sub = s.substring(j, sLen);
      let c = 0;
      while(c > wLen){
        const char = sub.substring(c, wLen);
        if(wordsMap[char]){
          wordsMap[char]--;
        }else{
          break;
        }
      }
    }

  };
```
10
6
10-6=4
0 1 2 3 4 5 6 7 8 9 10  

## 思路

滑动窗口 

## 代码

```javascript
  var findSubstring = function(s, words){
    let memo = new Map();
    const wLen = words[0].length;
    for(let w of words){
      memo.set(w, (memo.get(w) || 0) + 1);
    }
    const result = [];
    // i 不能大于words里面字符串的长度。
    for(i = 0; i <= s.length - wLen * words.length;i++){
      const tempMemo = new Map(memo);
      let wordLeft = words.length;
      // 
      for(let j = i; j < i + wLen * words.length;j+=wLen){
        // 截取单个单词
        const curWord = s.slice(j, j + wLen);
        // 找不到 || curWord匹配完成清零了。
        if(!tempMemo.has(curWord) || tempMemo.get(curWord) <= 0) break;
        wordLeft--;
        // 找到一个匹配的。将之前单词的计数 - 1
        tempMemo.set(curWord, tempMemo.get(curWord) - 1);
      }
      if(wordLeft == 0) result.push(i);
    }
    return result;
  }
```

## 复杂度分析

时间复杂度: O(MN). M是字符串的长度，N是单词的长度
空间复杂度: O(N). N是单词的个数。
