<template>
  <div class="tou">
    <div>
      <br />
      <span>客户：{{name}}</span>
      <br />
      <span>应收欠款{{money-cou-sk}}：</span>
      <span>电话：{{phone}}</span>

      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width: 150px; margin-left: 670px"
      ></el-input>
      <el-button type="primary">
        <el-icon style="vertical-align: middle">
          <search />
        </el-icon>
        <span style="vertical-align: middle" @click="mhcx()"> 搜索 </span>
      </el-button>
      <el-button @click="drawer = true">高级搜索</el-button>

      <el-drawer
        title="我是标题"
        v-model="drawer"
        :with-header="false"
        size="40%"
      >
        <span>高级搜索</span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="24">
              <br />
              <span style="margin-left: 19px; margin-right: 250px"
                >结算账户:</span
              >
              <span>经手人:</span>
            </el-col>
            <!-- 
    ==============================================================================================
    结算账户
    -->
            <el-col :span="24">
              <br />
              <el-form-item prop="value" style="margin-left: -85px;">
                <el-select
                  v-model="ruleForm.value"
                  placeholder="请选择结算账户"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <!-- 
    ==============================================================================================
    经手人 
    -->
              <el-form-item prop="value1" style="margin-left: 230px;margin-top: -50px;">
                <el-select v-model="ruleForm.value1" placeholder="请选择经手人" @click="cxjsr()">
                  <el-option
                    v-for="item in options1"
                    :key="item.staffId"
                    :label="item.staffName"
                    :value="item.staffId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 
    ==============================================================================================
    选择时间 
    -->
            <el-col :span="24">
              <br />
              <p class="demonstration" style="margin-left: 19px">业务时间：</p>
              <br />
              <el-form-item prop="value2"  style="margin-left: -85px;">
                <el-date-picker
                 
                  v-model="ruleForm.value2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-button
            @click="resetForm('ruleForm')"
            style="margin-left: 19px; margin-top: 400px"
            >清除</el-button
          >
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="margin-left: 19px; margin-top: 400px"
            >搜索</el-button
          >
        </el-form>
      </el-drawer>

      <!--
       =========================================================================================    
          表格
       -->
      <div style="   width: 100%;
  min-height: 500px;
  background: white;
  margin-top: 1%;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="tabTime" label="业务日期" width="180">
        </el-table-column>
        <el-table-column prop="customerSerial" label="单据编号" width="180">
        </el-table-column>
        <el-table-column prop="customerName" label="结算账户"> </el-table-column>
        <el-table-column prop="staffName" label="经手人"> </el-table-column>
        <el-table-column prop="receivableMoney" label="原单欠款"> </el-table-column>
        <el-table-column prop="s" label="收款金额"> </el-table-column>
        <el-table-column prop="coupon" label="优惠金额"> </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
      <el-button style=" float: right;" type="button" @click="fh()">返回应收欠款</el-button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      pageInfo:{
  currentPage4: 1,
  total:1,
  size:10,
},
      name : this.$route.query.name,
      money : this.$route.query.money,
      cou : this.$route.query.cou,
      sk : this.$route.query.qk,
      phone:this.$route.query.phone,
      id:this.$route.query.id,
      drawer: false,
      options: [
        {
          value: "现金",
          label: "现金",
        },
        {
          value: "微信",
          label: "微信",
        },
        {
          value: "支付宝",
          label: "支付宝",
        },
        {
          value: "系统账户",
          label: "系统账户",
        },
      ],
      input:"",
      options1: [],
      ruleForm: {
        value: "",
        value1: "",
        value2: "",
      },
    };
  },
  methods: {
    //查询经手人
    cxjsr(){
      this.axios.get("http://localhost:9090/staff/selectstaff",{

      }).then(response=>{
        console.log(response.data);
        this.options1=response.data
      }).catch(err=>{
        console.log(err);
      })
    },
    //模糊查询
    mhcx(){
      let sj1=this.ruleForm.value2[0]
      let sj2=this.ruleForm.value2[1]
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectreceiva1",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          sj1:sj1,
          sj2:sj2,
          ids:this.id,
    page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.axios.get("http://localhost:9090/selectreceiva2",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          ids:this.id,
    page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err);
      })
    }
    },

    handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        this.pageInfo.size = size;
        let sj1=this.ruleForm.value2[0]
      let sj2=this.ruleForm.value2[1]
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectreceiva1",{
        params:{
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          sj1:sj1,
          sj2:sj2,
          ids:this.id,
   
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.axios.get("http://localhost:9090/selectreceiva2",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          ids:this.id,
    page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
        console.log(this.tableData);
       
      }).catch(err=>{
        console.log(err);
      })
    }
      },
      handleCurrentChange(page) {
        console.log(`当前页: ${page}`);
        this.pageInfo.currentPage4 = page;
        let sj1=this.ruleForm.value2[0]
      let sj2=this.ruleForm.value2[1]
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectreceiva1",{
        params:{
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          sj1:sj1,
          sj2:sj2,
          ids:this.id,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.axios.get("http://localhost:9090/selectreceiva2",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          ids:this.id,
    page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
       
      }).catch(err=>{
        console.log(err);
      })
    }
      },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let sj1=this.ruleForm.value2[0]
      let sj2=this.ruleForm.value2[1]
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectreceiva1",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          sj1:sj1,
          sj2:sj2,
          ids:this.id,
    page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.axios.get("http://localhost:9090/selectreceiva2",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          ids:this.id,
    page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err);
      })
    }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //返回应收列表
    fh(){
        this.$router.push('/financing/debt');
    },
  },
  created(){
      this.axios.get("http://localhost:9090/selectreceiva",{
        params:{
          ids:this.id,
    page:this.pageInfo.currentPage4,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data)
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
        console.log(this.tableData);
      }).catch(err=>{
        console.log(err)
      })
    }
};
</script>

<style>
.tou {
  width: 100%;
  height: 80px;
  background: white;
 

}
</style>