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
      <span>角色管理</span>
      <el-button
        color="#2F54EB"
        style="float: right; margin: 12px 0"
        type="primary"
        @click="this.dialogVisible=true"
        >新增角色</el-button
      >
    </div>

    <!-- table表格 -->
    <div style="padding: 12px">
      <div>
        <div style="height:calc(100vh - 218px);border:1px solid #e8e8e8;border-top:none">
        <el-table
          :data="roleData"
          border
          id="scroll"
          style="width: 100%;max-height:calc(100vh - 218px);"
           :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column prop="roleName" label="角色名称" width="140" sortable />
          <el-table-column prop="roleCreated" label="创建时间" width="180"/>
          <el-table-column prop="roleUpdated" label="修改时间" width="180"/>
          <el-table-column prop="roleDescribe" label="角色描述" />
          <el-table-column label="操作" width="160" align="center">
            <template #default="scope">
              <el-button type="text" size="small" @click="permDialogFormVisible=true,editmenu(scope.row.roleId)" 
                >授权</el-button
              >
              <el-divider direction="vertical" />
              <el-button type="text" size="small" @click="loadByid(scope.row.roleId)">编辑</el-button>
              <el-divider direction="vertical" />
             <el-popconfirm
            title="确定要删除该角色吗？"
            @confirm="del(scope.row.roleId)"
          >
            <template #reference>
              <el-button size="mini" type="text">删除</el-button>
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
      :page-sizes="[10, 20, 30, 40]"
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

    <!-- 新增角色对话框 -->
    <div>
      <el-dialog
    v-model="dialogVisible"
    :title="Tips"
    width="400px"
  :before-close="handleClose">
    <el-form
    ref="roleFormRef"
    :model="roleForm"
    label-width="80px"
    :size="formSize"
  >
    <el-form-item label="角色名称" prop="roleName" :rules="[
      { required: true, message: '请输入角色名称', trigger: 'blur' }]">
      <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" style="width:273px;"  />
    </el-form-item>

    <el-form-item label="角色描述" prop="roleDescribe" >
     <el-input
     class="textarea"
   v-model="roleForm.roleDescribe"
     :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="请输入角色描述"
    style="width:273px;"
  />
    </el-form-item>

      <el-form-item>
     <el-button @click="resetForm('roleFormRef')">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false,insert(),resetForm('roleFormRef')"
          >保存</el-button
        >
  </el-form-item>

  </el-form>
   
  </el-dialog>
    </div>

<!-- 授权 树形控件-->
<div>
  <el-dialog
        title="分配权限"
        v-model="permDialogFormVisible"
        width="600px"
      >
        <el-form :model="menuForm" ref="permForm">
          <el-tree
            :data="menuTreeData"
            show-checkbox
            ref="permTree"
            node-key="powerId"
            check-strictly
            :default-expand-all="true"
            :default-expanded-keys="ids"
            :props="{children: 'powers', label: 'powerName'}"
          >
          </el-tree>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="permDialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitPermForm('permForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
</div>
     
  </div>
</template>

<script>
export default {
  data() {
    return {
      Tips:'新增角色',
      dialogVisible:false,
      permDialogFormVisible:false,
      total:0,
      paging:{
        currentPage:1,
        pageSize:20,
        search:''
      },
      role_id:'',
      roleForm:{},
      roleData: [],
      menuTreeData:[],
      menuForm:{},
    };
  },
  methods: {

    handleClose(done) {
            this.$refs['roleFormRef'].resetFields();
            done();
      },
     resetForm(formName) {
       this.dialogVisible=false
        this.$refs[formName].resetFields();
      },
//=============================================================   

//   分页   
      load(){
        this.axios.post("http://localhost:9090/sysrole/paging",this.paging)
        .then(res=>{
          this.roleData=res.data.data.records
          this.total=res.data.data.total
        })
      },
//   查询全部菜单
      menuList(){
        this.axios.get("http://localhost:9090/menu/find")
        .then(res=>{
         this.menuTreeData=res.data.data
        })
      },
//  根据角色编号查看现有权限
      editmenu(roleId){
       this.menuList()
       this.role_id=roleId
       alert(roleId);
        this.axios.get("http://localhost:9090/menu/findByRoleIdload/"+roleId)
        .then(res=>{
          const menuIds=[]
          res.data.data.forEach(item => {
            menuIds.push(item.powerId)
          });
          this.$refs.permTree.setCheckedKeys(menuIds);
        })
      },
      submitPermForm(){
         var menuIds = this.$refs.permTree.getCheckedKeys()
         this.axios.post("http://localhost:9090/sysrole/perm/"+this.role_id,menuIds)
         .then(res=>{
           if(res.data.code=="200"){
             this.$message.success(res.data.msg)
             this.permDialogFormVisible=false
             this.load()
           }else{
             this.$message.error(res.data.msg)
           }
         })
      },
//   根据编号查询
      loadByid(id){
        this.dialogVisible=true
        this.Tips='编辑角色'
        this.axios.get("http://localhost:9090/sysrole/findById/"+id)
        .then(res=>{
          this.roleForm=res.data.data
        })
      },

//    添加
      insert(){
        this.axios.post("http://localhost:9090/sysrole/insert",this.roleForm)
        .then(res=>{
          if(res.data.code=="200"){
             this.$message.success(res.data.msg)
          this.load()
          }else{
            this.$message.error(res.data.msg);
          }
         
        })
      },
//    删除
      del(id){
        this.axios.delete("http://localhost:9090/sysrole/delete/"+id)
        .then(res=>{
          this.$message.success(res.data.msg)
          this.load()
        })
      }
  },
  created() {},
  mounted() {
    this.load()
  },
};
</script>
<style>
.el-pagination .el-select .el-input {
    width: 90px;
}


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