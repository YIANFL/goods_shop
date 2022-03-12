<template>
  <div class="pagination">
    <!-- 当前页大于四的时候也就是start>1的时候,1和....才会显示 -->
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo ===1}">
      1
    </button>
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)" >
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo ===page}"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo ===totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算一共有多少页
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum () {
      const { continues, pageNo, totalPage } = this
      // 定义两个变量存储开始与结束的值
      // 连续的页码数至少是5,那么至少得有5页,如果页数小于5,就不正常
      let start = 0
      let end = 0
      // 总页数没有连续的页码数多,此时,起始页就是1,结束页就是最后一页
      if (continues > totalPage) {
        start = 1
        end = this.totalPage
      } else {
        // 连续页码数除以2就是前后页码的范围
        // 注意:如果当前页码的值是1,连续页码的值是5   则返回就是   -1 0 1 2 3 有负数,会出现bug
        // 分页器的前提,页数没有0,也没有负数
        // 当前是第一页,应该是 -1 0 1 2 3  ---> 1,2,3,4,5
        // 当前是第二页,应该是 0 1 2 3 4  -->1 2 3 4 5
        start = pageNo - Math.ceil(continues / 2)
        end = pageNo + Math.ceil(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        // end大于总页码
        // 当前是31   29 30 31 32 33 -->27 28 29 30 31
        // 当前是30   28 29 30 31 32 --> 27 28 29 30 31
        // 当前是29   27 28 29 30 31 正常
        if (end > totalPage) {
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active {
  background-color: skyblue;
}
</style>
