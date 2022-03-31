<template>
  <div style="background-color:white;padding:1%;overflow-x:hidden;overflow-y:hidden;">
       <el-tabs v-model="activeName" @tab-click="handleClick">
           <!-- 其他入库 -->
    <el-tab-pane label="其他入库" name="first">
        <div>
            <button class="insertrk" @click="dialogVisible = true">新增</button>
            <br/>
            <br/>
            <!-- 表格 -->
         <el-table
         :header-cell-style="{background:'#f8f8f9'}"
    :data="tableData"
    border
    height="440">
    <el-table-column
      prop="outinstocktypeName"
      label="类型名称">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100%">
      <template #default="scope">
        <el-button type="text" size="small" @click="handleEditrk(scope.$index, scope.row)">编辑</el-button>
      <el-button type="text" size="small" @click="open(scope.$index, scope.row)">删除</el-button>
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
      :total="total">
    </el-pagination>
      </div>
    
       
        
    </el-tab-pane>
    <!-- 其他出库 -->
    <el-tab-pane label="其他出库" name="second">
      <div>
            <button class="insertrk" @click="dialogVisibleck= true">新增</button>
            <br/>
            <br/>
            <!-- 表格 -->
         <el-table
         :header-cell-style="{background:'#f8f8f9'}"
    :data="tabletwo"
    border
    height="440">
    <el-table-column
      prop="outinstocktypeName"
      label="类型名称">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100%">
      <template #default="scope">
        <el-button type="text" size="small" @click="handleEditck(scope.$index, scope.row)">编辑</el-button>
        
        
      <el-button type="text" size="small" @click="openck(scope.$index, scope.row)">删除</el-button>

        
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChangeOne"
      @current-change="handleCurrentChangeOne"
      :current-page="currentPage3"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="sizeck"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalck">
    </el-pagination>
      </div>
    </el-tab-pane>
    <!-- 其他入库新增弹框 -->
    <el-dialog
    v-model="dialogVisible"
    title="新增"
    width="30%"
    :before-close="cancelrk"
  >
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="类别：">
    其他入库
  </el-form-item>
  <el-form-item label="名称：">
    <el-input v-model="form.name" style="width:55%;"></el-input>
  </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelrk">取消</el-button>
        <el-button type="primary" @click="insertTyperk"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 其他入库编辑弹框 -->
  <el-dialog
    v-model="dialogVisibleedit"
    title="编辑"
    width="30%"
    :before-close="cancelrkEdit"
  >
  <el-form ref="formEdit" :model="formEdit" label-width="80px">
  <el-form-item label="名称：">
    <el-input v-model="formEdit.outinstocktypeName" style="width:55%;"></el-input>
  </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelrkEdit">取消</el-button>
        <el-button type="primary" @click="updateTyperk"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 其他出库新增弹框 -->
    <el-dialog
    v-model="dialogVisibleck"
    title="新增"
    width="30%"
    :before-close="cancelck"
  >
  <el-form ref="formck" :model="formck" label-width="80px">
    <el-form-item label="类别：">
    其他出库
  </el-form-item>
  <el-form-item label="名称：">
    <el-input v-model="formck.nameck" style="width:55%;"></el-input>
  </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelck">取消</el-button>
        <el-button type="primary" @click="insertTypeck"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 其他出库编辑弹框 -->
  <el-dialog
    v-model="dialogVisibleeditck"
    title="编辑"
    width="30%"
    :before-close="cancelrkEditck"
  >
  <el-form ref="formEditck" :model="formEditck" label-width="80px">
  <el-form-item label="名称：">
    <el-input v-model="formEditck.outinstocktypeName" style="width:55%;"></el-input>
  </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelrkEditck">取消</el-button>
        <el-button type="primary" @click="updateTypeck"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  </el-tabs>
  
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
        // 标签页
        activeName: 'first',
        // 其他入库表格
         tableData: [
             {
                 businessdate:"13213",
                 number:1
             }
         ],
        //  其他出库表格
          tabletwo: [
             {
                 businessdate:"13213",
                 number:1
             }
         ],
      // 其他入库分页
      currentPage4: 1,
      size:50,
      total:400,
      // 其他出库分页
      currentPage3: 1,
      sizeck:50,
      totalck:400,
      // 其他入库新增弹框
      dialogVisible: false,
      // 其他入库新增弹框表单
       form: {
          name: '',
        },
        // 其他入库编辑弹框
        dialogVisibleedit: false,
        // 其他入库编辑弹框表单
        formEdit:{

          nameTwo: '',
        },
        // 其他出库新增弹框
        dialogVisibleck: false,
        // 其他出库新增弹框表单
        formck:{
          nameck:'',
        },
        // 其他出库编辑弹框
        dialogVisibleeditck: false,
        // 其他出库编辑弹框表单
        formEditck:{
          nameTwo:'',
        },
        
    };
  },
  methods: {
    //   标签页
    handleClick(tab, event) {
        console.log(tab, event);
      },
     // 其他入库分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size=val;
      this.selectTyperk();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage4=val;
        this.selectTyperk();
      },
      // 其他出库分页
      handleSizeChangeOne(val) {
        console.log(`每页 ${val} 条`);
        this.sizeck=val;
        this.selectTypeck();
      },
      handleCurrentChangeOne(val) {
        console.log(`当前页: ${val}`);
        this.currentPage3=val;
        this.selectTypeck();
      },
      // 其他入库新增弹框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 其他入库新增弹框内容
       onSubmit() {
        console.log('submit!');
      },
      //其他入库新增弹框取消按钮
      cancelrk(){
        this.dialogVisible = false;
        this.form={};
      },
      // 其他入库编辑弹框取消按钮
      cancelrkEdit(){
        this.dialogVisibleedit = false;
        this.formEdit={};
      },
      // 其他出库新增取消按钮
      cancelck(){
        this.dialogVisibleck= false;
        this.formck={}
      },
      // 其他出库编辑取消按钮
      cancelrkEditck(){
        this.dialogVisibleeditck= false;
        this.formEditck={}
      },
      // 查询其他入库
      selectTyperk(){
        this.axios.get("http://localhost:9090/outinstocktype/selectType",{
          params:{
            size:this.size,
            page:this.currentPage4
          }
        })
        .then((response) =>{
          console.log(response.data);
          this.tableData=response.data.records;
          this.total=response.data.total;

        })
      },
      // 查询其他出库
      selectTypeck(){
        this.axios.get("http://localhost:9090/outinstocktype/selectTypeck",{
          params:{
            size:this.sizeck,
            page:this.currentPage3
          }
        })
        .then((response) =>{
          this.tabletwo=response.data.records;
          this.totalck=response.data.total;
        })
      },
      // 其他入库新增
      insertTyperk(){
        this.axios.post("http://localhost:9090/outinstocktype/insertType",{
          outinstocktypeName:this.form.name,
          isoutin:1
        }).then((response) =>{
          ElMessage({
                showClose: true,
                message: "新增成功",
                type: "success",
              });
          this.dialogVisible = false;
          this.form={};
          this.selectTyperk();
        })
      },
      // 其他出库新增
       insertTypeck(){
        this.axios.post("http://localhost:9090/outinstocktype/insertType",{
          outinstocktypeName:this.formck.nameck,
          isoutin:0
        }).then((response) =>{
          ElMessage({
                showClose: true,
                message: "新增成功",
                type: "success",
              });
          this.dialogVisibleck = false;
          this.formck={};
          this.selectTypeck();
        })
      },
      // 其他入库编辑弹框
       handleEditrk(index, row) {
      this.dialogVisibleedit= true
      this.formEdit = Object.assign({}, row); // 这句是关键！！！
    },
    // 其他出库编辑弹框
    handleEditck(index, row) {
      this.dialogVisibleeditck = true;
      this.formEditck = Object.assign({}, row);
    },
    // 其他入库编辑
    updateTyperk(){
      this.axios.post("http://localhost:9090/outinstocktype/updateType",{
        outinstocktypeId:this.formEdit.outinstocktypeId,
        outinstocktypeName:this.formEdit.outinstocktypeName
      }).then((response) =>{
        ElMessage({
                showClose: true,
                message: "编辑成功",
                type: "success",
              });
              this.selectTyperk();
              this.dialogVisibleedit= false;
              this.formEdit={}
      })
    },
    // 其他出库编辑
    updateTypeck(){
      this.axios.post("http://localhost:9090/outinstocktype/updateType",{
        outinstocktypeId:this.formEditck.outinstocktypeId,
        outinstocktypeName:this.formEditck.outinstocktypeName
      }).then((response) =>{
        ElMessage({
                showClose: true,
                message: "编辑成功",
                type: "success",
              });
              this.selectTypeck();
              this.dialogVisibleeditck= false;
              this.formEditck={}
      })
    },
    // 入库删除
    deteTyperk(){
      this.axios.post("http://localhost:9090/outinstocktype/deleteType",{
        outinstocktypeId:this.deleterk.outinstocktypeId,
      }).then((response) =>{
        this.selectTyperk();
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
      })
    },
    // 删除
        open(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleterk=row
          this.deteTyperk();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
       // 出库删除
    deteTypeck(){
      this.axios.post("http://localhost:9090/outinstocktype/deleteType",{
        outinstocktypeId:this.deleteck.outinstocktypeId,
      }).then((response) =>{
        this.selectTypeck();
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
      })
    },
    // 出库删除
        openck(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteck=row
          this.deteTypeck();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

  },
  created() {
    this.selectTyperk();
    this.selectTypeck();
  },
  mounted() {}
};
</script>
<style>
/* 新增入库按钮样式 */
.insertrk{
    border-color: #2f54eb;
    background-color: #2f54eb;
    color: #fff;
    font-size: inherit;
    font-family: inherit;
    height: 34px;
    line-height: 1;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    width:5%;
}
</style>