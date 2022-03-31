<!-- 其他出库单历史 -->

<template>
  <!-- 外层div -->
  <div class="outerDiv">

    <!--左-->
    <div style="float: left">
      <el-button type="primary">新增其他出库单</el-button>
    </div>

    <!--右-->
    <div style="float: right">
      <el-input style="width: 200px" placeholder="编号/供应商/备注"/>
      &nbsp;&nbsp;
      <el-button type="primary">搜索</el-button>
    </div>

    <!--下-->
    <div style="margin-top: 38px">
      <!-- 表格 -->
      <el-table :data="tableData" border
                :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="date" label="序号" min-width="25%"/>
        <el-table-column prop="date" label="业务日期" min-width="50%"/>
        <el-table-column prop="name" label="单据编号"/>
        <el-table-column prop="name" label="类型名称"/>
        <el-table-column prop="name" label="仓库名称"/>
        <el-table-column prop="name" label="商品名称"/>
        <el-table-column prop="name" label="经手人"/>
        <el-table-column prop="name" label="备注"/>
        <el-table-column prop="name" label="操作" min-width="50%">
          <el-button @click="to_Details()" type="text">详情</el-button>
          <!--          <el-button type="text">添加</el-button>-->
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <br/>
      <div style="float: right;">
        <el-pagination v-model:currentPage="pageInfo.currentPage" :page-sizes="[3, 5, 10, 50]"
                       v-model:page-size="pageInfo.pageSize" :default-page-size="pageInfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" :pager-count="5"
                       background
                       @size-change="selectInvoiceByName" @current-change="selectInvoiceByName">
        </el-pagination>
      </div>
      <br/><br/>
    </div>


  </div>

</template>

<script>
export default {
  name: "OtherOutStockAll",
  data() {
    return {
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },

      tableData: [{
        date: '1',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
        {
          date: '2',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '3',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '4',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    }
  },
  methods: {

    // 查看详情
    to_Details() {

      // 跳转页面
      this.$router.push({path: '/otherOutStockDetails', query: {path: this.$route.query.path}})


    }

  },
  created() {

  }
}
</script>

<style>

.outerDiv {
  margin: 10px;
  padding: 10px;
  background-color: white;
}

</style>
