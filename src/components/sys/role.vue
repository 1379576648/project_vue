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
          <el-table-column label="操作" width="140" align="center">
            <template #default>
              <el-button type="text" size="small" @click="handleClick"
                >授权</el-button
              >
              <el-divider direction="vertical" />
              <el-button type="text" size="small" @click="this.dialogVisible=true,this.Tips='编辑角色'">编辑</el-button>
              <el-divider direction="vertical" />
              <el-button type="text" size="small">删除</el-button>
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
    <el-form-item label="角色名称" prop="name" :rules="[
      { required: true, message: '请输入角色名称', trigger: 'blur' }]">
      <el-input v-model="roleForm.name" placeholder="请输入角色名称" style="width:273px;"  />
    </el-form-item>

    <el-form-item label="角色描述" prop="name" >
     <el-input
     class="textarea"
   v-model="roleForm.name"
     :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="请输入角色描述"
    style="width:273px;"
  />
    </el-form-item>

      <el-form-item>
     <el-button @click="resetForm('roleFormRef')">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >保存</el-button
        >
  </el-form-item>

  </el-form>
   
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