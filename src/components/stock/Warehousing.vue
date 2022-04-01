<template>
<!-- 其他入库历史 -->
 
  <div style="padding:0.5%;overflow-x:hidden;overflow-y:hidden;">
    <div style="background-color:#ffffff;padding:1%;">
      <div>
        <button class="wareorder">新增其他入库单</button>
        <div class="selectChecked">
          <el-checkbox v-model="checked"><span class="selectzfd">查看作废单据</span></el-checkbox>
          <el-input v-model="input" placeholder="编号/供应商/商品/备注" class="putone" style="width:35%;"/>
          <button class="ssbutton">搜索</button>
        </div>
        <br/>
        <br/>
        <!-- 表格 -->
         <el-table
         :header-cell-style="{background:'#f8f8f9'}"
    :data="tableData"
    border
    height="480">
    <el-table-column
      prop="number"
      label="序号"
      width="60%">
    </el-table-column>
    <el-table-column
      prop="businessdate"
      label="业务日期"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="billnumber"
      label="单据编号"
      width="135%">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      width="350%">
    </el-table-column>
    <el-table-column
      prop="wtype"
      label="入库类型"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="ckname"
      label="仓库名称"
      width="150%">
    </el-table-column>
    <el-table-column
      prop="rkprice"
      label="入库总额(元)"
      width="140%">
    </el-table-column>
    <el-table-column
      prop="jsr"
      label="经手人"
       width="140%">
    </el-table-column>
    <el-table-column
      prop="zdr"
      label="制单人"
       width="140%">
    </el-table-column>
    <el-table-column
      prop="zddate"
      label="制单时间"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="fj"
      label="附件">
    </el-table-column>
    <el-table-column
      prop="bz"
      label="备注"
       width="160%">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        <el-button type="text" size="small">作废</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
      </div>
    </div>
  </div>

 
</template>

<script>
export default {
  data() {
    return {
      // 分页
      currentPage4: 1,
      // 表格
      tableData: [
        {
          bz:'23443',
          fj:'有',
          zddate:'2022-03-30 12:00:00',
          zdr:'张三',
          jsr:'李四',
          rkprice:'13224',
          ckname:'是的地方',
          wtype:'法大师傅',
          name:'沟通',
          billnumber:'RK202203290003',
          businessdate:'2022-03-30 12:00:00',
          number:1.
        },
      ],
       checked: false,
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  created() {},
  mounted() {}
};
</script>
<style>
/* 新增其他入库单按钮样式 */
.wareorder{
  color: #fff;
    background-color: #2f54eb;
    border-color: #2f54eb;
    border: 1px solid transparent;
    cursor: pointer;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
}
/* 查看作废单据 单选框样式 */
.selectChecked{
  width:40%;
  margin-right: -9%;
  float: right;
  cursor: pointer;
}
.selectzfd{
  float: right;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  font-variant: tabular-nums;
  font-family: 微软雅黑, 宋体, 'pingFang SC', 'Microsoft YaHei UI', Helvetica, serif;
  
}
.putone{
  cursor: pointer;
  margin-left:5%;
  margin-right:5%;
}
 .el-input__inner{
  border-top: aliceblue !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #d9d9d9 !important;
  box-shadow:none !important;
  background-color: white !important;
  color: black !important;
}
/* 搜索按钮 */
.ssbutton{
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 0;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    border-color: #d9d9d9;
    cursor: pointer;
    border: 1px solid #d9d9d9;
}
</style>