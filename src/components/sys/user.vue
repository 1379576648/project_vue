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
        @click="this.drawer=true"
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
          <el-table-column prop="name" label="角色名称" width="140" sortable />
          <el-table-column prop="address" label="角色描述" />
          <el-table-column label="操作" width="180" align="center">
            <template #default="scope">
              <el-button type="text" size="small" @click="resetdialogVisible=true" v-if="scope.row.date=='2016-05-03'">重置密码</el-button>
              <el-divider direction="vertical"  v-if="scope.row.date=='2016-05-03'"/>
              <el-button type="text" size="small" @click="this.drawer=true,this.Tips='编辑角色'" v-if="scope.row.date=='2016-05-03'">编辑</el-button>
              <el-divider direction="vertical" v-if="scope.row.date=='2016-05-03'"/>
              <el-button type="text" size="small">停用</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
        <div style="height:36px;border:1px solid #e8e8e8;border-top:none;line-height:36px;background:#F8F8F9;">
                <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
              <el-pagination
              style="float: right;"
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout=" prev, pager, next,sizes, jumper, total"
      :total="400"
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
    :model="roleForm"
    label-width="100px"
    :size="formSize"
  >
    <el-form-item label="账号名称：" prop="name" :rules="[
      { required: true, message: '请输入账号名称', trigger: 'blur' }]">
      <el-input v-model="roleForm.name" placeholder="请输入角色名称" style="width:273px;"  />
    </el-form-item>

    <el-form-item label="账号密码：" prop="name" :rules="[
      { required: true, message: '请输入账号密码', trigger: 'blur' }]">
      <el-input v-model="roleForm.name" placeholder="账号密码" style="width:273px;"  />
    </el-form-item>

    <el-form-item label="角色权限：" prop="name" :rules="[
      { required: true, message: '请选择至少一个角色', trigger: 'blur' }]">
      
     <el-checkbox v-model="checked1" label="Option 1" size="large" />
     <br />
    <el-checkbox v-model="checked2" label="Option 2" size="large" />

    </el-form-item>

      <el-form-item style="margin-left:140px">
     <el-button @click="resetForm('roleFormRef')">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
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
      tips:'新增账户',
      resetdialogVisible:false,
      drawer:false,
      roleForm:[],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },{
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },{
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },{
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
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
      }
  },
  created() {},
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