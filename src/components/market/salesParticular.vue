<template>
  <el-button style="float:right" type="primary">添加商品</el-button>
  <div>
    <el-button plain style="float: right;margin-right: 30px">高级搜索</el-button>
    <div style="width: 10px;float: right"></div>
    <el-input v-model="input" placeholder="请输入内容" style="width: 200px;float: right"></el-input>

  </div>

  <br><br><br>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
<el-tab-pane label="已出库" name="first">
  <el-table
      :data="tableData"
      style="width: 100%"
      height="490">
    <el-table-column type="selection" width="55"/>
    <el-table-column
        fixed
        prop="salescheduleId"
        label="序号"
        width="100%">
    </el-table-column>

    <el-table-column
        fixed
        prop="commodityName"
        label="商品名称"
        width="120">
    </el-table-column>

    <el-table-column
        prop="salescheduleNumber"
        label="商品数量"
        width="120">
    </el-table-column>
    <el-table-column
        prop="commodityCompany"
        label="单位"
        width="120">
    </el-table-column>
    <el-table-column
        prop="commoditySpecifications"
        label="规格/属性"
        width="300">
    </el-table-column>
    <el-table-column
        prop="saleschedulePrice"
        label="商品价格"
        width="300">
    </el-table-column>
    <el-table-column
        prop="tradePrice"
        label="批发价"
        width="300">
    </el-table-column>
    <el-table-column
        prop="retailPrice"
        label="零售价"
        width="300">
    </el-table-column>
    <el-table-column
        prop="commodityName"
        label="分类名称"
        width="300">
    </el-table-column>

    <el-table-column
        prop="salescheduleTotal"
        label="商品总额"
        width="120">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="120"
    >

      <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->

      <el-button
          type="text"
          size="small">
        <router-link to="details">详情</router-link>
      </el-button>

    </el-table-column>

  </el-table>

  <div class="demo-pagination-block" style="margin-left: 0px">
    <!-- <span class="demonstration">All combined</span> -->
    <el-pagination
        v-model:currentPage="pageInfo.currentPage"
        :page-sizes="[3, 5, 10, 50]"
        v-model:page-size="pageInfo.pageSize"
        :default-page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        :pager-count="5"
        background
        @size-change=""
        @current-change=""
    >
    </el-pagination>
  </div>
</el-tab-pane>
    <el-tab-pane label="未出库" name="second"> <el-table
        :data="tableData2"
        style="width: 100%"
        height="490">
      <el-table-column type="selection" width="55"/>
      <el-table-column
          fixed
          prop="salescheduleId"
          label="序号"
          width="100%">
      </el-table-column>

      <el-table-column
          fixed
          prop="commodityName"
          label="商品名称"
          width="120">
      </el-table-column>

      <el-table-column
          prop="salescheduleNumber"
          label="商品数量"
          width="120">
      </el-table-column>
      <el-table-column
          prop="commodityCompany"
          label="单位"
          width="120">
      </el-table-column>
      <el-table-column
          prop="commoditySpecifications"
          label="规格/属性"
          width="300">
      </el-table-column>
      <el-table-column
          prop="saleschedulePrice"
          label="商品价格"
          width="300">
      </el-table-column>
      <el-table-column
          prop="tradePrice"
          label="批发价"
          width="300">
      </el-table-column>
      <el-table-column
          prop="retailPrice"
          label="零售价"
          width="300">
      </el-table-column>
      <el-table-column
          prop="commodityName"
          label="分类名称"
          width="300">
      </el-table-column>

      <el-table-column
          prop="salescheduleTotal"
          label="商品总额"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120"
      >

        <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->

        <el-button
            type="text"
            size="small">
          <router-link to="details">详情</router-link>
        </el-button>

      </el-table-column>

    </el-table>

      <div class="demo-pagination-block" style="margin-left: 0px">
        <!-- <span class="demonstration">All combined</span> -->
        <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[3, 5, 10, 50]"
            v-model:page-size="pageInfo.pageSize"
            :default-page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            background
            @size-change=""
            @current-change=""
        >
        </el-pagination>
      </div></el-tab-pane>
  </el-tabs>
</template>

<script>

import { ref } from 'vue'

export default {
  name: "goin",
  data() {
    return {
      activeName : 'first',
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 5,
        total: 0,
      },
      input: '',
      tableData: [],
      tableData2:[]
    }
  },methods:{
    selectBusiness() {

      this.axios
          .get("http://localhost:9090/saleschedule/saleschedule3/"+this.pageInfo.currentPage+"/"+this.pageInfo.pageSize)
          .then((response) => {
            console.log(response);
            this.tableData = response.data.data.records;
            console.log(response.data.data.records)
            this.pageInfo.total = response.data.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    selectBusiness2() {

      this.axios
          .get("http://localhost:9090/saleschedule/saleschedule4/"+this.pageInfo.currentPage+"/"+this.pageInfo.pageSize)
          .then((response) => {
            console.log(response);
            this.tableData2 = response.data.data.records;
            console.log(response.data.data.records)
            this.pageInfo.total = response.data.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  },created(){
    this.selectBusiness()
    this.selectBusiness2()
  }

}
</script>

<style>
table {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}

th {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}

.span_1 {
  color: #ddd;
}

.font_sty {

}

a {
  text-decoration: none;
  color: #409eff;
}

</style>