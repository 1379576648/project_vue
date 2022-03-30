<template>

  <el-button style="float:right" type="primary">添加商品</el-button>
  <div>
    <el-button plain style="float: right;margin-right: 30px">高级搜索</el-button>
    <div style="width: 10px;float: right"></div>
    <el-input v-model="input" placeholder="请输入内容" style="width: 200px;float: right"></el-input>

  </div>

  <br><br><br>
  <el-table
      :data="tableData"
      style="width: 100%"
      height="490">
    <el-table-column type="selection" width="55"/>
    <el-table-column
        fixed
        prop="date"
        label="序号"
        width="100%">
    </el-table-column>

    <el-table-column
        fixed
        prop="name"
        label="商品名称"
        width="120">
    </el-table-column>

    <el-table-column
        prop="province"
        label="零售价"
        width="120">
    </el-table-column>
    <el-table-column
        prop="city"
        label="市区"
        width="120">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址"
        width="300">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址"
        width="300">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址"
        width="300">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址"
        width="300">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址"
        width="300">
    </el-table-column>

    <el-table-column
        prop="zip"
        label="邮编"
        width="120">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="200"
    >

      <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->
      <el-button
          class="font_sty"
          type="text"
          size="small">
        <router-link to="edit">编辑</router-link>
      </el-button>
      &nbsp;
      <span class="span_1">|</span>
      &nbsp;
      <el-button
          type="text"
          size="small">
        <router-link to="details">详情</router-link>
      </el-button>
      &nbsp;
      <span class="span_1">|</span>
      &nbsp;
      <el-button
          type="text"
          size="small"
          style="color: red"
      >
        移除
      </el-button>

    </el-table-column>

  </el-table>

  <div class="demo-pagination-block" style="margin-left: 0px">
    <!-- <span class="demonstration">All combined</span> -->
    <el-pagination
        v-model:currentPage="pageInfo.currentPage"
        :page-sizes="[3, 5, 10, 50]"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        :pager-count="5"
        background
        @size-change=""
        @current-change=""
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "sales_history",
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },
      input: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
    }
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





