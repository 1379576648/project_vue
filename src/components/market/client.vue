<template>
  <div style="width: 100%;height: 100%;background: white;">
    <br/>
  <div style="margin-top:10px;">
    <!--搜索输入框-->
    <div style="display: inline-block">
      <span style="font-weight:bold;margin-left: 30px">客户名称</span>
      <el-row style="width:200px;display: inline-block;margin-left: 15px">
        <el-input v-model="pageInfo.staffNameSearch" placeholder="请输入用户名称"/>
      </el-row>
    </div>

    <div style="display: inline-block;margin-left:25px">
      <span style="font-weight:bold">地址 </span>

      <el-row style="width:200px;display: inline-block;margin-left: 15px">
        <el-input v-model="pageInfo.staffNameSearch" placeholder="请输入地址"/>
      </el-row>


    </div>


    <div style="display: inline-block;margin-left:25px">
      <span style="font-weight:bold">联系人电话 </span>

      <el-row style="width:200px;display: inline-block;margin-left: 15px">
        <el-input v-model="pageInfo.staffNameSearch" placeholder="请输入地址"/>
      </el-row>

    </div>

    <div style="display: inline-block;margin-left:25px">
      <span style="font-weight:bold"> 状态</span>

      <el-select placeholder="请选择状态" v-model="pageInfo.stateSearch" style="margin-left: 15px;">
        <el-option label="禁用" value="7" ></el-option>
        <el-option label="启用" value="30" ></el-option>
      </el-select>

    </div>



    <el-button @click="selectProbation()" type="primary" style="width: 70px;margin-left:25px">

      搜索
    </el-button>
    <el-button  @click="replacement()">

      重置
    </el-button>
  </div>

  <br/>

  <el-button style="width: 80px;margin-left: 15px" type="primary" @click="drawer = true">添加</el-button>



  <br/> <br/>
  <el-table
      :data="tableData"
      :header-cell-style="{textAlign: 'center',background:'#e8eaec',color:'#6C6C6C',size:5}"
      :cell-style="{ textAlign: 'center' }"
      border
      style="width: 98%;margin: auto;">
    <el-table-column
        prop="date"
        width="70"
        label="序号">
    </el-table-column>
    <el-table-column
        prop=""
        width="180"
        label="编号">
    </el-table-column>
    <el-table-column
        width="150"
        prop="address"
        label="客户名称">
    </el-table-column>
    <el-table-column
        width="200"
        prop="address"
        label="地址">
    </el-table-column>

    <el-table-column
        prop="address"
        label="联系电话">
    </el-table-column>
    <el-table-column
        prop="address"
        label="创建时间">
    </el-table-column>
    <el-table-column
        prop="address"
        label="状态">
    </el-table-column>

    <el-table-column
        fixed="right"
        label="操作"
        width="150">
      <template #default="scope">
        <!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页插件 -->
  <div class="demo-pagination-block" style="margin-right:10px;float: right">
    <el-pagination
        v-model:currentPage="pageInfo.currenPage"
        :page-sizes="[3, 5, 10, 50]"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        :pager-count="5"
        background
        @size-change="selectProbation"
        @current-change="selectProbation"
    >
    </el-pagination>
  </div>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>新增客户</span>
    <hr>
    <br/>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="客户名称" prop="name">
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="name">
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="联系人电话" prop="name">
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="启用"></el-radio>
          <el-radio label="禁用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
  </div>
</template>



<script>
// import xistpicker from 'v-distpicker'

export default {
  data() {
    return {
      drawer: false,
      pageInfo: {
        // 分页参数
        currenPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数

        //搜索绑定值
        // 员工名称
        staffNameSearch: '',
        // 部门名称
        deptSearch: '',
        //部门职位名称
        postSearch: '',
        //快转正员工
        stateSearch: '',

        // 入职日期  开始时间
        clockTimeStart: '',
        // 结束时间
        clockTimeEnd: ''
      },

      tableData: [{
        date: '1',
        name: '王小虎',
        address: '1518 弄'
      }],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  }, methods: {
    handleClick(row) {
      console.log(row);
    }, submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>