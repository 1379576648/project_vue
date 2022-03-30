<template>

  <div style="height: 730px;width: 98.5%;background: white;border: 1px solid #ddd;">
    <span class="spn_sp">商品列表</span>
    <br>
    <br>
    <el-divider style="margin: 15px 0px;"></el-divider>


    <div style="padding: 10px">
  <el-button style="float:left" type="primary">添加商品</el-button>


  <div>
    <el-button plain style="float: right">高级搜索</el-button>
    <div style="width: 10px;float: right"></div>
    <el-input v-model="input" placeholder="请输入内容" style="width: 200px;float: right"></el-input>

  </div>

<br><br><br>

  <el-table
      :data="tableData"
      style="width: 99%"
      border
      :header-cell-style="{background:'rgb(248, 248, 249)'}"
      height="490"
  >

    <el-table-column
        fixed
        prop="date"
        label="序号"
        width="120%"

    >
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
  </div>
  </div>
</template>

<script scope>
export default {
  name: "goin",
  data() {
      return {
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
/*table{*/
/*  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/

/*}*/
/*th{*/
/*  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/

/*}*/
.span_1{
  color: #ddd;
}
.font_sty{

}
.edit_body span{
  font-size: 16px;
  float: left;
  margin: 20px;
  color:#2c3e50;
}
.spn_sp{
  font-size: 16px;
  float: left;
  margin: 20px;
  color: #2c3e50;
}
a{
  text-decoration:none ;
  color: #409eff;
}

</style>