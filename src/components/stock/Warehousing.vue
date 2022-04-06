<template>
  <!-- 其他入库历史 -->

  <div style="padding: 0.5%; overflow-x: hidden; overflow-y: hidden">
    <div style="background-color: #ffffff; padding: 1%">
      <div>
        <!-- <button class="wareorder">新增其他入库单</button> -->
        <div class="selectChecked">
          <el-checkbox v-model="checked" @change="selectHistroy"
            ><span class="selectzfd">查看作废单据</span></el-checkbox
          >
          <el-input
            v-model="input"
            placeholder="输入商品名称"
            class="putone"
            style="width: 35%"
          />
          <button class="ssbutton" @click="selectHistroy">搜索</button>
        </div>
        <br />
        <br />
        <br/>
        <!-- 表格 -->
        <el-table
          :header-cell-style="{ background: '#f8f8f9' }"
          :data="tableData"
          border
          height="480"
        >
          <el-table-column prop="time" label="业务日期" width="200%">
          </el-table-column>
          <el-table-column prop="billId" label="单据编号" width="135%">
          </el-table-column>
          <el-table-column prop="commodityName" label="商品名称" width="350%">
          </el-table-column>
          <el-table-column prop="outInStockTypeName" label="入库类型" width="200%">
          </el-table-column>
          <el-table-column prop="stockName" label="仓库名称" width="150%">
          </el-table-column>
          <el-table-column prop="otherInStockDetailsTotal" label="入库总额(元)" width="140%">
          </el-table-column>
          <el-table-column prop="staffName" label="经手人" width="140%">
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="160%">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
              <el-button type="text" size="small" @click="goBack(scope.$index, scope.row)"
                >详情</el-button
              >
                  <el-button
                    type="text"
                    size="small"
                    
                    @click="open(scope.$index, scope.row)"
                    >作废</el-button
                  >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[50, 100, 150, 200]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { useSizeProp } from 'element-plus';
export default {
  data() {
    return {
      input: "",
      // 作废弹出框
      visible: false,
      // 分页
      currentPage4: 1,
      size:50,
      total:400,
      // 表格
      tableData: [
       
      ],
      checked: false,
    };
  },
  methods: {
    // 作废
    deletedHistroy(id){
      console.log("this.tableData.otherinstockdetailsId",this.tableData.otherInStockDetailsId);
      this.axios.post("http://localhost:9090/otherinstockdetails/deletedHistroy",{
        otherinstockdetailsId:id
      }).then((response) =>{
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.selectHistroy();
      })
    },
    // 删除
        open(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("this.tableData",this.tableData);
          this.deletedHistroy(row.otherInStockDetailsId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    // 查询
    selectHistroy(){
      this.axios.get("http://localhost:9090/otherinstockdetails/selectHistroy",{
        params:{
          page:this.currentPage4,
          size:this.size,
          deleted:this.checked,
          commodityName:this.input
        }
      }).then((response) =>{
    
        this.tableData=response.data.records;
        this.total=response.data.total;
      }).catch(err =>{
        console.log(err);
      })
    },
    // 详情跳页面
    goBack(index,row) {
      this.$router.push({ path: "/Warehousedetails" });
      sessionStorage.setItem("otherInStockDetailsId",row.otherInStockDetailsId);
    },
    // 分页
    handleSizeChange(val) {
      this.size=val
      this.selectHistroy();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page=val
      this.selectHistroy();
      console.log(`当前页: ${val}`);
    },
  },
  created() {
    // 查询
    this.selectHistroy();
  },
  mounted() {},
};
</script>
<style>
/* 新增其他入库单按钮样式 */
.wareorder {
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
.selectChecked {
  width: 40%;
  margin-right: -9%;
  float: right;
  cursor: pointer;
}
.selectzfd {
  float: right;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  font-variant: tabular-nums;
  font-family: 微软雅黑, 宋体, "pingFang SC", "Microsoft YaHei UI", Helvetica,
    serif;
}
.putone {
  cursor: pointer;
  margin-left: 5%;
  margin-right: 5%;
}
.el-input__inner {
  border-top: aliceblue !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #d9d9d9 !important;
  box-shadow: none !important;
  background-color: white !important;
  color: black !important;
}
/* 搜索按钮 */
.ssbutton {
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 0;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
  cursor: pointer;
  border: 1px solid #d9d9d9;
}
</style>