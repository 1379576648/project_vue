<template>
<!--  高库存预警 -->
    <div class="sub-Content__primary" style="margin-top: -40px;">
      <el-input style="width: 250px;margin-left: 875px;margin-bottom: 10px;" placeholder="商品编号/商品名称/商品规格"/>
      <el-button style="width: 70px; margin-top: 4px;margin-left: 10px">搜索</el-button>
      <el-table :data="tableData" style="width: 100%;margin-bottom: 10px;"
                height="430px"
                :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
                :cell-style="{ textAlign: 'center' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index"  label="序号" width="70px"  />
        <el-table-column prop="noticeTitle" label="商品编号"  />
        <el-table-column prop="noticeType" label="商品名称"  />
        <el-table-column prop="noticeState" label="规/属性"  />
        <el-table-column prop="noticePeople" label="单位"  />
        <el-table-column prop="createdTime" label="最高库存"  />
        <el-table-column prop="createdTime" label="可用库存"  />
      </el-table>
    </div>

  <!-- 分页 -->
  <div class="demo-pagination-block">
    <el-pagination
        v-model:current-page="pageInfo.currentPage"
        v-model:currentPage="pageInfo.currentPage"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size="pageInfo.pagesize"
        :page-sizes="[3, 4, 5, 6]"
        :page-size="3"
        :pager-count="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="pagingQuery"
        @current-change="pagingQuery"
        prev-text="上一页"
        next-text="下一页"
        background
    >
    </el-pagination>
  </div>


</template>

<script>

import {ref} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'

export default {
data(){
  return{
    tableData:[],
  // 分页的功能,初始化
    pageInfo: {
      currentPage: 1,
      pagesize: 3,
      total: 0,

    },
  }
}
}
</script>

<style scoped>


.demo-pagination-block{
  margin-top: -10px;
  margin-bottom: -33px;
  float: right;
}

</style>