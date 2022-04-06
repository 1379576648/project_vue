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
          <el-input v-model="pageInfo.addressSearch" placeholder="请输入地址"/>
        </el-row>


      </div>


      <div style="display: inline-block;margin-left:25px">
        <span style="font-weight:bold">联系人电话 </span>

        <el-row style="width:200px;display: inline-block;margin-left: 15px">
          <el-input v-model="pageInfo.phoneSearch" placeholder="请输入地址"/>
        </el-row>

      </div>

      <div style="display: inline-block;margin-left:25px">
        <span style="font-weight:bold"> 状态</span>

        <el-select placeholder="请选择状态" v-model="pageInfo.stateSearch" style="margin-left: 15px;">
          <el-option label="禁用" value="2"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>

      </div>


      <el-button @click="selectCustomerPage()" type="primary" style="width: 70px;margin-left:25px">

        搜索
      </el-button>
      <el-button @click="replacement()">

        重置
      </el-button>
    </div>

    <br/>

    <el-button style="width: 80px;margin-left: 15px" type="primary" @click="addData()" >添加</el-button>


    <br/> <br/>
    <el-table
        :data="customerData"
        :header-cell-style="{textAlign: 'center',background:'#e8eaec',color:'#6C6C6C',size:5}"
        :cell-style="{ textAlign: 'center' }"
        border
        style="width: 98%;margin: auto;">
      <el-table-column
          prop="date"
          width="70"
          label="序号">
        <template #default="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
          prop="customerId"
          width="180"
          label="编号">
      </el-table-column>
      <el-table-column
          width="150"
          prop="customerName"
          label="客户名称">
      </el-table-column>
      <el-table-column
          width="200"
          prop="customerAddress"
          label="地址">
      </el-table-column>

      <el-table-column
          prop="customerPhone"
          label="联系电话">
      </el-table-column>
      <el-table-column
          prop="createdTime"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="customerState"
          label="状态">
        <template #default="scope">
          <span style="color: #6aa1ed" v-if="scope.row.customerState==1">启用</span>
          <span style="color: red" v-if="scope.row.customerState==2">禁用</span>
        </template>

      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template #default="scope">
          <!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <el-button @click="updateData(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteCustomerId(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



    <!-- 分页插件 -->
    <div class="demo-pagination-block" style="margin-right:10px;float: right">
      <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pageSize"
          :default-page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="selectCustomerPage"
          @current-change="selectCustomerPage"
      >
      </el-pagination>
    </div>

    <br><br>

    <el-drawer v-model="drawer" :title="titleMap[dialogTitle]" >
<!--      <span>新增客户</span>-->
      <hr>
      <br/>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="phones">
          <el-input v-model="ruleForm.phones"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="ruleForm.state">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>


<script>
// import xistpicker from 'v-distpicker'
import {ElMessage} from "element-plus"
export default {
  data() {
    return {
      drawer: false,
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 5, // 页大小
        total: 0, // 总页数

        //搜索绑定值
        // 员工名称
        staffNameSearch: '',
        // 地址
        addressSearch: '',
        //联系人电话
        phoneSearch: '',
        //状态
        stateSearch: '',

      },
      //储存客户信息
      customerData:[],

      //弹出框新增修改操作
      titleMap: {
        addData: "添加客户",
        updateData: "修改客户"
      },
      dialogTitle: "",

      ruleForm: {
        //id
        id:'',
        //客户名称
        name: '',
        //地址
        address: '',
        //联系人电话
        phones: '',
        //状态
        state: '',
        //备注
        remark:'',

      }, rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '地址不能为空', trigger: 'blur'},

        ],
        phones: [
          {required: true, message: '电话号不能为空', trigger: 'blur'},
          {pattern: /^1(3|4|5|7|8|9)\d{9}$/, message: '电话号格式不正确', trigger: 'change'}

        ],

        state: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        // remark: [
        //   {required: true, message: '请填写活动形式', trigger: 'blur'}
        // ]
      }
    }
  }, methods: {
    replacement(){
      this.pageInfo.stateSearch="";
          this.pageInfo.staffNameSearch="";
          this.pageInfo.addressSearch="";
          this.pageInfo.phoneSearch=""

      this.selectCustomerPage()
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.dialogTitle=="addData"){
            this.insertCustomer()
          }else{
            this.updateCustomer()
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //添加客户
    insertCustomer() {

      this.axios({
        url: 'http://localhost:9090/cdcustomer/insertCustomer',
        method: 'post',
        data: {
          //客户名字
         customerName:this.ruleForm.name,
         //客户地址
         customerAddress:this.ruleForm.address,
          //客户电话
          customerPhone:this.ruleForm.phones,
          //客户备注
          customerRemarks:this.ruleForm.remark,
          //状态
          customerState:this.ruleForm.state


        }
      }).then(response => {
        if (response.data.data > 0) {
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
          this.selectCustomerPage()
          this.drawer=false
        } else {
          ElMessage.error('添加失败')
        }
      }).catch(function (error) {
        console.log(error);
      });

    },
    //删除客户
    deleteCustomerId(index){

      this.axios
          .delete("http://localhost:9090/customer/deleteCustomer/"+index.customerId)
          .then((response) => {
            console.log(response);

            if (response.data.data >0) {
              ElMessage({
                message: '删除成功',
                type: 'success',
              })
              //调用查询
              this.selectCustomerPage()


            } else {
              ElMessage.error('删除失败')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //分页查询客户信息
    selectCustomerPage() {

      this.axios
          .get("http://localhost:9090/cdcustomer/selectCustomerPage", {params: this.pageInfo})
          .then((response) => {
            console.log(response);
            this.customerData = response.data.data.records
            this.pageInfo.total = response.data.data.total


          })
          .catch(function (error) {
            console.log(error);
          });
    },

    //修改客户
    updateCustomer(){
      this.axios({
        url: 'http://localhost:9090/cdcustomer/updateCustomer',
        method: 'put',
        data: {
          //客户id
          customerId:this.ruleForm.id,
          //客户名字
          customerName:this.ruleForm.name,
          //客户地址
          customerAddress:this.ruleForm.address,
          //客户电话
          customerPhone:this.ruleForm.phones,
          //客户备注
          customerRemarks:this.ruleForm.remark,
          //状态
          customerState:this.ruleForm.state

        }
      }).then(response => {
        console.log(response)
        if (response.data.data >0) {
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          this.drawer = false;
          this.selectCustomerPage()
        } else {
          ElMessage.error('修改失败')
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    addData() {
      this.ruleForm = {
        //客户名称
        name: '',
        //地址
        address: '',
        //联系人电话
        phones: '',
        //状态
        state: '',
        //备注
        remark:'',

      }

      this.drawer = true; // 弹出框
      this.dialogTitle = "addData"; // title 显示新增薪酬组
    },
    updateData(row) {
      this.drawer = true;
      this.dialogTitle = "updateData";

      //客户id
      this.ruleForm.id=row.customerId;
      //客户名字
      this.ruleForm.name=row.customerName;
      //客户地址
      this.ruleForm.address=row.customerAddress;
      //客户电话
      this.ruleForm.phones=row.customerPhone;
      //客户备注
      this.ruleForm.remark=row.customerRemarks;
      //状态
      this.ruleForm.state=row.customerState

    },
  },created() {
    this.selectCustomerPage()
  }
}

</script>