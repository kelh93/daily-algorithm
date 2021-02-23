# 珠玑妙算游戏
> [!原题](https://leetcode-cn.com/problems/master-mind-lcci/)
珠玑妙算游戏（the game of master mind）的玩法如下。

计算机有4个槽，每个槽放一个球，颜色可能是红色（R）、黄色（Y）、绿色（G）或蓝色（B）。例如，计算机可能有RGGB 4种（槽1为红色，槽2、3为绿色，槽4为蓝色）。作为用户，你试图猜出颜色组合。打个比方，你可能会猜YRGB。要是猜对某个槽的颜色，则算一次“猜中”；要是只猜对颜色但槽位猜错了，则算一次“伪猜中”。注意，“猜中”不能算入“伪猜中”。

给定一种颜色组合solution和一个猜测guess，编写一个方法，返回猜中和伪猜中的次数answer，其中answer[0]为猜中的次数，answer[1]为伪猜中的次数。

示例：
```js
    输入： solution="RGBY",guess="GGRR"
    输出： [1,1]
    解释： 猜中1次，伪猜中1次。
```
提示：
- len(solution) = len(guess) = 4
- solution和guess仅包含"R","G","B","Y"这4种字符

```js
    /**
     * @param {string} solution
     * @param {string} guess
     * @return {number[]}
     */
    var masterMind = function(solution, guess) {

    };
```
思路:
1. 猜中: 位置和颜色都能对上.
2. 伪猜中: 颜色对的上,但是位置对不上.
3. 4个槽位,所以solution和guess的长度都是4.
4. 输出数组第一项为猜中次数,第二项为伪猜中次数.
5. 暴力法,遍历比较
- 猜中很简单,遍历时位置和值一一对应.
- 伪猜中要在solution里面查找guess里面的每个颜色是否存在,并要去除猜中.

> 如何在2个字符串中,查找到某一个是否存在,而不用双层循环?

``` js
    var masterMind = function(solution, guess){
        let bingoCount = 0, deBingoCount = 0;
        for(let i = 0; i < solution.length; i++){
            const sub = solution[i];
            if(sub === guess.charCodeAt(i)){
                bingoCount++;
            }

        }
        return [bingoCount, deBingoCount];
    }
```