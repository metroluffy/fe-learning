## N 数之和系列解题模板

解题套路：

1. 直接用哈希表来找（只适合两数之和）

2.  先排序，然后固定首个数字，剩下的交给双指针来找

### 哈希表解「两数之和」

#### 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。

#### 暴力解法

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let res = []
    let N = nums.length
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            if (nums[i] + nums[j] === target) {
              	return [i, j]
            }
        }
    }
    return []
};
```

- 时间复杂度：$O(n^2)$
- 空间复杂度：$O(1)$

显而易见，我们还能再优化一下。

#### 哈希表解法

直接将 ``num`` 和对应的下标存到 ``哈希表`` 里面，遍历一次 ``nums``，我们只要在 ``哈希表`` 里找到 ``target - num`` 即可。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = new Map()
    nums.forEach((num, index) => {
      	map.set(num, index)
    })
  	nums.forEach((num, index) => {
      	let val = target - num
      	if (map.has(val)) {
          	return [index, map.get(val)]
        }
    })
};
```

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

#### 哈希表解法优化

上面我们遍历了两次 ``nums``，其实也可以只遍历一次。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    nums.forEach((num, index) => {
      let val = target - num
      if (map.has(val)) {
      		return [index, map.get(val)]
      }
      map.set(val, index)
    })
  	return []
};
```

- 时间复杂度：$O(n)$

- 空间复杂度：$O(n)$

### 双指针解三（三或三以上）数之和

#### 题目

参考上面的「两数之和」，这里不再赘述。

#### 解法

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums, target) {
    let res = []
    let N = nums.length
    nums.sort((a, b) => a - b)
    for (let i = 0; i < N; i++) {
        // 跳过重复的元素
        if (nums[i] === nums[i - 1]) {
            continue
        }
        let left = i + 1
        let right = N - 1
        // 找到 nums[i] + nums[left] + nums[right] === 0
        // 将结果加到 res 中
        // 过程注意剔除重复的数字
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right]
            if (sum === target) {
                res.push([nums[i], nums[left], nums[right]])
                while (left < right && nums[left] === nums[left + 1]) {
                    left++
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--
                }
                left++
                right--
            } else if (sum < target) {
                left++
            } else {
                right--
            }
        }
    }
    return res
};
```

#### 四数之和

「四数之和」解法如下（跟上面的思路是一样的，只不过是多了一个循环，这里不再注释）：

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  let res = []
  let N = nums.length
  nums.sort((a, b) => a - b)
  for (let i = 0; i < N; i++) {
    if (nums[i] === nums[i - 1]) {
      continue
    }
    for (let j = i + 1; j < N; j++) {
      if (nums[j] === nums[j - 1]) {
        continue
      }
      let left = j + 1
      let right = N - 1
      while (left < right) {
        let sum = nums[i] + nums[j] + nums[left] + nums[right]
        if (sum === target) {
          res.push([nums[i], nums[j], nums[left], nums[right]])
          while (left < right && nums[left] === nums[left + 1]) {
            left++
          }
          while (left < right && nums[right] === nums[right - 1]) {
            right--
          }
          left++
          right--
        } else if (sum < target) {
          left++
        } else {
          right--
        }
      }
    }
  }
}
```

那么对于 $N$ 数之和，我们只要利用一下 ``DFS`` 就可以解决了，参考以下代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var nSum = function(nums, target) {
    const helper = (index, N, temp) => {
	    // 如果下标越界了或者 N < 3 就没有必要在接着走下去了
        if (index === len || N < 3) {
            return
        }
        for (let i = index; i < len; i++) {
	          // 剔除重复的元素
            if (i > index && nums[i] === nums[i - 1]) {
                continue
            }
	        // 如果 N > 3 的话就接着递归
            // 并且在递归结束之后也不走下边的逻辑
            // 注意这里不能用 return
            // 否则循环便不能跑完整
            if (N > 3) {
                helper(i + 1, N - 1, [nums[i], ...temp])
                continue
            }
            // 当走到这里的时候，相当于在求「三数之和」了
		    // temp 数组在这里只是把前面递归加入的数组算进来
            let left = i + 1
            let right = len - 1
            while (left < right) {
                let sum = nums[i] + nums[left] + nums[right] + temp.reduce((prev, curr) => prev + curr)
                if (sum === target) {
                    res.push([...temp, nums[i], nums[left], nums[right]])
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++
                    }
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--
                    }
                    left++
                    right--
                } else if (sum < target) {
                    left++
                } else {
                    right--
                }
            }
        }
    }
    let res = []
    let len = nums.length
    nums.sort((a, b) => a - b)
    helper(0, 4, [])
    return res
};
```

总而言之，要点是：先排序，然后把循环降低到两个之后，利用双指针来找最后两个值。


相关题目：

- [两数之和](https://leetcode-cn.com/problems/two-sum/)
- [三数之和](https://leetcode-cn.com/problems/3sum/)
- [最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/)
- [较小的三数之和](https://leetcode-cn.com/problems/3sum-smaller/)
- [四数之和](https://leetcode-cn.com/problems/4sum/)
