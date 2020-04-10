# n个骰子点数之和及其概率

题目链接：<https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/>
比较好的题解：<https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/solution/nge-tou-zi-de-dian-shu-dong-tai-gui-hua-ji-qi-yo-3/>

这是一道标记为easy难度的动归题，要求结果返回n个骰子点数之和的概率。

关于动态规划：
可以理解为数列题，解题时可以先输出一部分结果看看规律，如下：
1、寻求子序列（建立状态转移方程）
2、缓存结果下次调用
3、从小往大计算

注：对于比较简单的场景，状态转移方程可以直接先推出一部分结果来找规律得出，比如斐波那契数列，1，1，2，3，5...fn = f(n-1) + f(n-2)。

更好的解释：<https://www.zhihu.com/question/39948290/answer/883302989>

解题思路：只要求出点数之和出现的次数，再除以点数组合数，即得解。
1、求状态转移方程
 第一步，确定问题解的表达式。可将f(n, s) 表示n个骰子点数的和为s的排列情况总数。 
 第二步，确定状态转移方程。n个骰子点数和为s的种类数只与n-1个骰子的和有关。因为一个骰子有六个点数，那么第n个骰子可能出现1到6的点数。所以第n个骰子点数为1的话，f(n,s)=f(n-1,s-1)，当第n个骰子点数为2的话，f(n,s)=f(n-1,s-2)，…，依次类推。在n-1个骰子的基础上，再增加一个骰子出现点数和为s的结果只有这6种情况！那么有：

f(n,s)=f(n-1,s-1)+f(n-1,s-2)+f(n-1,s-3)+f(n-1,s-4)+f(n-1,s-5)+f(n-1,s-6) ，0< n<=6n 
 f(n,s)=0,   s< n or s>6n

上面就是状态转移方程，已知初始阶段的解为：
当n=1时, f(1,1)=f(1,2)=f(1,3)=f(1,4)=f(1,5)=f(1,6)=1。

代码实现：

```js
/* func:获取n个骰子指定点数和出现的次数
 * para:n:骰子个数;sum:指定的点数和
 * return:点数和为sum的排列数
 */
function getNSumCount(n, sum){
    if(n<1||sum<n||sum>6*n){
        return 0;
    }
    if(n==1){
        return  1;
    }
    let resCount=0;
    resCount=getNSumCount(n-1,sum-1)+getNSumCount(n-1,sum-2)+
             getNSumCount(n-1,sum-3)+getNSumCount(n-1,sum-4)+
             getNSumCount(n-1,sum-5)+getNSumCount(n-1,sum-6);
    return resCount;
}
var twoSum = function(n) {
    const total = Math.pow(6, n);
    const res = []
    for(let i = n; i <=6*n; ++i){   //n:骰子数目
        res.push(getNSumCount(n,i)/total)
        // console.log("%d: %f/n", i, ratio);  
    }
    return res
};
```

以上即可算出结果，但是在较大规模时，使用递归会重复计算,不加优化可能会导致超时。

我们来模拟计算点数 44 和 点数 66 ，这两种点数各自出现的次数。也就是计算 getCount(2, 4)getCount(2,4) 和 getCount(2, 6)getCount(2,6)。

它们的计算公式为：

```text
getCount(2,4)=getCount(1,1)+getCount(1,2)+getCount(1,3)
getCount(2,6)=getCount(1,1)+getCount(1,2)+getCount(1,3)+getCount(1,4)+getCount(1,5)
```

我们发现递归统计这两种点数的出现次数时，重复计算了

```text
getCount(1,1),getCount(1,2),getCount(1,3)
```

所以进行第二步，缓存结果，改造求次数的函数即可。

```js
const rem = []
function getNSumCount(n, sum){
    if(n<1||sum<n||sum>6*n){
        return 0;
    }
    if(n==1){
        return  1;
    }
    if(rem[n] && rem[n].has(sum)){
        return rem[n].get(sum)
    }
    let resCount=0;
    resCount=getNSumCount(n-1,sum-1)+getNSumCount(n-1,sum-2)+
             getNSumCount(n-1,sum-3)+getNSumCount(n-1,sum-4)+
             getNSumCount(n-1,sum-5)+getNSumCount(n-1,sum-6);
    if(!rem[n]) {
        rem[n] = new Map()
    }
    rem[n].set(sum, resCount)
    return resCount;
}
```

性能比较：

```text
twoSum(10);
// before, calc-s: 920.2119140625ms
// after, calc-s: 5.602294921875ms
```
