<template>
  <div style="width: 100%; height: 100%; background: white">
    <div
      style="
        height: 56px;
        border-bottom: 1px solid #e8e8e8;
        line-height: 56px;
        padding: 0 12px;
      "
    >
      <span>账号管理</span>
      <el-button
        color="#2F54EB"
        style="float: right; margin: 12px 0"
        type="primary"
        @click="this.drawer=true,findmenu()"
        >新增账号</el-button
      >
    </div>

    <!-- table表格 -->
    <div style="padding: 12px">
      <div>
        <div style="height:calc(100vh - 218px);border:1px solid #e8e8e8;border-top:none">
        <el-table
          :data="tableData"
          border
          id="scroll"
          style="width: 100%;max-height:calc(100vh - 218px);"
           :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column prop="staffName" label="账号名称" width="140" sortable />
          <el-table-column prop="staffState" label="账户状态" width="140">
            <template #default="scope">
                  <el-tag v-if="scope.row.staffState == 0" size="small" type="success"
            >已启用</el-tag
          >
          <el-tag
            v-else-if="scope.row.staffState == 1"
            size="small"
            type="danger"
            >已禁用</el-tag
          >
            </template>
          </el-table-column>
          <el-table-column label="账户角色">
            <template #default="scope">
            <el-tag
            style="margin-right: 5px"
            size="default"
            type="info"
            v-for="item in scope.row.roles"
            :key="item"
            >{{ item.roleName }}</el-tag
          >
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template #default="scope">
              <el-button type="text" size="small" @click="resetpassword(scope.row.staffId)" v-if="scope.row.staffName!=='admin'">重置密码</el-button>
              <el-divider direction="vertical"  v-if="scope.row.staffName!=='admin'"/>
              <el-button type="text" size="small" @click="edit(scope.row.staffId)">编辑</el-button>
              <el-divider direction="vertical" v-if="scope.row.staffName!=='admin'"/>
                <el-popconfirm
            :title="scope.row.staffState==0?'确定停用该账户吗?':'确定启用该账户吗？'"
            @confirm="Deactivate(scope.row)"
          >
            <template #reference>
              <el-button size="small" v-if="scope.row.staffName!=='admin'" type="text">{{scope.row.staffState==0?'停用':'启用'}}</el-button>
            </template>
          </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        </div>
        <div style="height:36px;border:1px solid #e8e8e8;border-top:none;line-height:36px;background:#F8F8F9;">
                <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
              <el-pagination
              style="float: right;"
      v-model:currentPage="paging.currentPage"
      v-model:page-size="paging.pageSize"
      :page-sizes="[10,20,30,40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout=" prev, pager, next,sizes, jumper, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
        </div>
      </div>
    </div>

    <!-- 新增账户对话框 -->
<el-drawer v-model="drawer" :title="tips" size="30%">
     <el-form
    ref="roleFormRef"
    label-position="left"
    :model="userForm"
    label-width="100px"
    :size="formSize"
  >
    <el-form-item label="账号名称："  prop="staffName" :rules="[
      { required: true, message: '请输入账号名称', trigger: 'blur' }]">
      <el-input v-model="userForm.staffName" :disabled="disabled" placeholder="请输入角色名称" style="width:273px;"  />
    </el-form-item>

    <el-form-item label="账号密码：" prop="staffPass" :rules="[
      { required: true, message: '请输入账号密码', trigger: 'blur' }]">
      <el-input v-model="userForm.staffPass" placeholder="账号密码" show-password style="width:273px;"  />
    </el-form-item>

    <el-form-item label="角色权限：" :rules="[
      { required: true, message: '请选择至少一个角色', trigger: 'blur' }]">
           <el-tree
                  :data="roleTreeData"
                  show-checkbox
                  ref="roleTree"
                  node-key="roleId"
                  :default-expand-all=true
                  style="width:120px"
                  :props="{label:'roleName'}">
            </el-tree>

    </el-form-item>

      <el-form-item style="margin-left:140px">
     <el-button @click="resetForm('roleFormRef'),drawer = false">取消</el-button>
        <el-button type="primary" @click="drawer = false,submitRoleForm(roleFormRef)"
          >保存</el-button
        >
  </el-form-item>

  </el-form>
  </el-drawer>

  <!-- 重置密码 -->
        <div>
     <el-dialog
    v-model="resetdialogVisible"
    title="提示"
    width="300px"
  >
    <span>重置后的密码为888888</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="resetdialogVisible = false"
          >确认重置</el-button
        >
      </span>
    </template>
  </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled:false,
      tips:'新增账户',
      resetdialogVisible:false,
      drawer:false,
      total:0,
      paging:{
        currentPage:1,
        pageSize:20,
        search:''
      },
      userForm:{},
      tableData: [],
     roleTreeData:[],
     ids:[]
    };
  },
  methods: {
     resetForm(formName) {
       this.dialogVisible=false
        this.$refs[formName].resetFields();
        this.$refs.roleTree.setCheckedKeys([])
      },
// =======================================================================================
      load(){
        this.axios.post("http://localhost:9090/account/paging",this.paging)
        .then(res=>{
          this.tableData=res.data.data.records
          this.total=res.data.data.total
        })
      },
      // 选择几条每页
      handleSizeChange(size){
        this.paging.pageSize=size
        this.load()
      },
       // 选择第几页
      handleCurrentChange(page){
        this.paging.currentPage=page
        this.load()
      },

       //查询全部权限
    findmenu(){
      const paging={
         currentPage:1,
        pageSize:99999,
        search:''
      }
      this.axios.post("http://localhost:9090/sysrole/paging",paging).then(res=>{
        this.roleTreeData=res.data.data.records
      })
    },
    // 编辑账户
    edit(staffId){
      this.drawer=true
      this.tips='编辑账户'
      this.axios.get("http://localhost:9090/account/findByStaffIdLoad/"+staffId)
      .then(res=>{
        if(res.data.data.staff.staffName=='admin'){
          this.disabled=true
        }
        this.userForm=res.data.data.staff
        this.findmenu()
        var roleIds=[]
        res.data.data.roleIds.forEach(item=>{
          roleIds.push(item.roleId)
        })
        this.$refs.roleTree.setCheckedKeys(roleIds);
      })
    },
     // 分配角色
    submitRoleForm(formName) {
            var roleIds = []
            roleIds = this.$refs.roleTree.getCheckedKeys()
            const user={
              staffId:this.userForm.staffId,
              staffName:this.userForm.staffName,
              staffPass:this.userForm.staffPass,
              staffState:this.userForm.staffState,
              deleted:this.userForm.deleted
              }
            this.axios.post("http://localhost:9090/account/perm",{staff:user,roleIds:roleIds}).then(res => {
               if(res.data.code==="200"){
                 this.$message.success(res.data.msg)
                 this.roleDialogFormVisible = false
                 this.userForm={};
                 this.load()
               }else{
                 this.$message.error(res.data.msg)
                 this.$refs[formName].resetFields();
                 this.$refs.roleTree.setCheckedKeys([])
               }
               
            })
         },
    //禁用启用
    Deactivate(row){
      const user={
        staffId:row.staffId,
        staffName:row.staffName,
        staffPass:row.staffPass,
        staffState:row.staffState==0?1:0,
        deleted:row.deleted
      }
      this.axios.post("http://localhost:9090/account/deactivate",user)
      .then(res=>{
        this.$message.success(res.data.data)
        this.load()
      })
    },     
  // 重置密码
  resetpassword(id){
    this.axios.get("http://localhost:9090/account/resetpassword/"+id)
    .then(res=>{
      this.$messageBox.alert(res.data.data)
    })
  }
  },
  created() {
    this.load()
  },
  mounted() {},
};
</script>
<style scope>
.el-pagination .el-select .el-input {
    width: 90px;
}
.el-drawer__header {
    align-items: center;
    color: #72767b;
    display: flex;
    margin-bottom: 32px;
    padding: var(--el-drawer-padding-primary);
    padding-bottom: 20px;
    border: 1px solid #E8E8E8;
}

.role{
  display: inline-block;
  text-align: center;
  width: 50px;
  background: chartreuse;
  margin: 0 10px;
}



/* 给滚动条设置样式 */
#scroll{
overflow:scroll;
overflow-x: hidden;
}
#scroll::-webkit-scrollbar{
width:5px;
}
#scroll::-webkit-scrollbar-thumb{
background:linear-gradient(rgb(17,157,212),rgb(17,212,105));
border-radius:5px;
transition:1s;
}
#scroll::-webkit-scrollbar-thumb:hover{
background:linear-gradient(rgb(17,212,105),rgb(17,157,212));
}


</style>