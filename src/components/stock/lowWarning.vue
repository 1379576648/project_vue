<template>
  <!--  高库存预警 -->
  <div class="sub-Content__primary" style="margin-top: -40px;">
    <el-input style="width: 250px;margin-left: 875px;margin-bottom: 10px;" v-model="pageInfo.commodityName" placeholder="商品编号/商品名称/商品规格"/>
    <el-button @click="pagingQuery()" style="width: 70px; margin-top: 4px;margin-left: 10px">搜索</el-button>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 10px;"
              height="430px"
              :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
              :cell-style="{ textAlign: 'center' }"
              :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column type="index"  label="序号"  width="70px"  />
      <el-table-column prop="commodityId" label="商品编号"  />
      <el-table-column prop="commodityName" label="商品名称"  />
      <el-table-column prop="commoditySpecifications" label="规/属性"  />
      <el-table-column prop="commodityCompany" label="单位"  />
      <el-table-column prop="maxNumber" label="最高库存"  />
      <el-table-column prop="availablestock" label="可用库存"  />
    </el-table>
  </div>

  <!-- 分页 -->
  <div class="demo-pagination-block">
    <el-pagination
        v-model:current-page="pageInfo.currentPage"
        v-model:currentPage="pageInfo.currentPage"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size="pageInfo.pagesize"
        :page-sizes="[6, 9, 12, 20]"
        :page-size="6"
        :pager-count="7"
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
        pagesize: 6,
        total: 0,
        commodityName:'',
      },

    }
  },
  created() {
    this.pagingQuery()
  },
  methods:{
    pagingQuery(){
      this.axios({
        method:'post',
        url:'http://localhost:9090/repertory/low',
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        this.pageInfo.total=response.data.data.total

        this.tableData=response.data.data.records

      })
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