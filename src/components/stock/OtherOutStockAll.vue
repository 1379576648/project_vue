<!-- 其他出库单历史 -->

<template>
  <!-- 外层div -->
  <div class="outerDiv">

    <!--左-->
    <div style="float: left">
      <router-link :to="{path:'otherOutStock',query:{path:this.$route.query.path}}">
        <el-button type="primary">
          新增其他出库单
        </el-button>
      </router-link>
    </div>

    <!--右-->
    <div style="float: right">

      出库类型:
      <el-select v-model="pageInfo.outInStockTypeId" placeholder="选择出库类型" clearable >
        <el-option v-for="item in allOutStockType" :key="item.OUTINSTOCKTYPE_ID" :label="item.OUTINSTOCKTYPE_NAME"
                   :value="item.OUTINSTOCKTYPE_ID"/>
      </el-select>
      &nbsp;&nbsp;
      <el-input v-model="pageInfo.parameter" style="width: 200px" placeholder="编号/经手人/备注" clearable />
      &nbsp;&nbsp;
      <el-button @click="selectOtheroutstockPage" type="primary">搜索</el-button>
    </div>

    <!--下-->
    <div style="margin-top: 38px">
      <!-- 表格 -->
      <el-table :data="tableData" border
                :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                :cell-style="{ textAlign: 'center' }">
        <el-table-column :index="indexMethod" type="index" label="序号" min-width="25%"/>
        <el-table-column prop="otheroutstockTime" label="业务日期" min-width="100%"/>
        <el-table-column prop="billId" label="单据编号"/>
        <el-table-column prop="outinstocktypeName" label="类型名称"/>
        <el-table-column prop="stockName" label="仓库名称"/>
<!--        <el-table-column prop="name" label="商品名称"/>-->
        <el-table-column prop="staffName" label="经手人"/>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column prop="name" label="操作" min-width="50%">
          <template #default="scope">
            <el-button @click="to_Details(scope.row)" type="text">详情</el-button>
          </template>
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
                       @size-change="selectOtheroutstockPage" @current-change="selectOtheroutstockPage">
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
        parameter: '', // 搜索框
        outInStockTypeId: "", // 出库类型id
      },

      // 表格数据
      tableData: [],

      // 所有出库类型
      allOutStockType:[]


    }
  },
  methods: {

    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;

      // return this.pageInfo.total - (index + (curpage - 1) * limitpage);
    },

    // 查看详情
    to_Details(row) {

      // 将当前行的出库单 存入 store里面，使得在其他页面也能取到
      this.$store.state.outStock = row;

      // 跳转页面
      this.$router.push({path: '/otherOutStockDetails', query: {path: this.$route.query.path}})
    },

    // 查询历史出库
    selectOtheroutstockPage() {

      this.axios.get("http://localhost:9090/otheroutstock/selectOtheroutstockPage", {params: this.pageInfo})
          .then((response) => {
            console.error("查询历史出库:", response)
            this.tableData = response.data.data.records
            this.pageInfo.total = response.data.data.total
          }).catch(function (error) {
        console.log('查询历史出库失败')
        console.log(error);
      })

    },

    // 查询出库类型
    selectAllOutStockType() {

      this.axios.get("http://localhost:9090/otheroutstock/selectAllOutStockType")
          .then((response) => {
            console.error("查询出库类型:", response)
            this.allOutStockType = response.data.data
          }).catch(function (error) {
        console.log('查询出库类型失败')
        console.log(error);
      })

    },

  },
  created() {
    // 查询历史出库
    this.selectOtheroutstockPage()
    // 查询出库类型
    this.selectAllOutStockType()
  }
}
</script>

<style>

.outerDiv {
  margin: 10px;
  padding: 10px;
  background-color: white;
}

a{
  text-decoration: none;
}

</style>
