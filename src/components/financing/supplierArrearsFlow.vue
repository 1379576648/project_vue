<template>
  <div class="max">
      <el-row :gutter="24">
        <el-col :span="6">供应商：{{name}}</el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row><br>
      <el-row :gutter="24">
          <el-col :span="6">
              应付欠款：{{fk}}
          </el-col>
          <el-col :span="6">
              联系电话：{{phone}}
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6">
              <el-input v-model="input" size="small" placeholder="编号/名称/电话" style="width:50%;margin-left:40px;">
                  <template #append>
                      <el-button size="small" @click="mhcx()" :icon="icon.search" />
                  </template>
              </el-input>
              <el-button size="small" @click="drawer=true">高级搜索</el-button>
          </el-col>
      </el-row>
      <!-- <el-row :gutter="24"> -->
          <el-table :data="tableData" border show-summary sum-text="合计" :default-sort="{ prop: 'operationTime', order: 'descending' }" width="100%" class="table">
               <el-table-column type="index" label="序号" width="80" />
               <el-table-column prop="paymenttabTime" label="业务日期" />
               <el-table-column prop="copeSerial" label="单据编号" />
               <el-table-column prop="settlement" label="结算方式"></el-table-column>
               <!-- <el-table-column label="收支类别">
                   <template #default="scope">
                       <p v-if="scope.row.type=='收入'" style="width:50px;height:30px;background-color:rgba(230,255,251,0.5);border:1px solid rgb(87,205,205);color:rgb(87,205,205);text-align:center;line-height:30px;">{{scope.row.type}}</p>
                       <p v-if="scope.row.type=='支出'" style="width:50px;height:30px;background-color:rgba(255,241,240,0.5);border:1px solid rgb(245,67,76);color:rgb(245,67,76);text-align:center;line-height:30px;">{{scope.row.type}}</p>
                   </template>
               </el-table-column> -->
               <el-table-column prop="staffName" label="经手人"></el-table-column>
               <el-table-column prop="copeMoney" label="原单欠款"></el-table-column>
               <el-table-column prop="money" label="付款金额"></el-table-column>
               <el-table-column prop="coupon" label="优惠金额"></el-table-column>
          </el-table>
      <!-- </el-row> -->
      <!-- <el-row :gutter="24"> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.page"
            :page-sizes="[10,20,30,50,80,100]"
            :page-size="pageInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            class="page"
          >
          </el-pagination>
          <el-button style=" float: right;" type="button" @click="fh()">返回应付欠款</el-button>
      <!-- </el-row> -->
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
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default {
  data() {
    return {
        tableData:[],
        name : this.$route.query.name,
      fk : this.$route.query.qk,
      phone:this.$route.query.phone,
      id:this.$route.query.id,
      drawer: false,
        icon:{
            search:Search
        },
        pageInfo:{
            page:0,
            size:10,
            total:1
        },
        gjss:{
            djbh:"",
            szlb:"全部",
            jszh:"全部",
            jsr:"0",
            jsrData:[]
        },

        options1: [],
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
      ruleForm: {
        value: "",
        value1: "",
        value2: "",
      },
      input:"",
    };
  },
  methods: {
      //返回应收列表
    fh(){
        this.$router.push('/arrearsPayable');
    },
      //模糊查询
    mhcx(){
      let sj1=this.ruleForm.value2[0]
      let sj2=this.ruleForm.value2[1]
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectcopemh1",{
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
      this.axios.get("http://localhost:9090/selectcopemh2",{
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
      this.axios.get("http://localhost:9090/selectcopemh1",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          sj1:sj1,
          sj2:sj2,
          ids:this.id,
    page:this.pageInfo.page,
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
        this.axios.get("http://localhost:9090/selectcopemh2",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          ids:this.id,
    page:this.pageInfo.page,
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
      handleCurrentChange(page) {
        console.log(`当前页: ${page}`);
        this.pageInfo.page = page;
        let sj1=this.ruleForm.value2[0]
      let sj2=this.ruleForm.value2[1]
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectcopemh1",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          sj1:sj1,
          sj2:sj2,
          ids:this.id,
    page:this.pageInfo.page,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
      //  this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err);
      })
    }else{
        this.axios.get("http://localhost:9090/selectcopemh2",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          ids:this.id,
    page:this.pageInfo.page,
    size:this.pageInfo.size,
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
      //  this.pageInfo.total=response.data.total
      }).catch(err=>{
        console.log(err);
      })
    }
      },



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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let sj1=this.ruleForm.value2[0]
      let sj2=this.ruleForm.value2[1]
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectcopemh1",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          sj1:sj1,
          sj2:sj2,
          ids:this.id,
        page:this.pageInfo.page,
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
      this.axios.get("http://localhost:9090/selectcopemh2",{
        params:{
          names:this.input,
          value:this.ruleForm.value,
          value1:this.ruleForm.value1,
          ids:this.id,
        page:this.pageInfo.page,
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
  },
  created() {
      this.axios.get("http://localhost:9090/selectcope",{
        params:{
            page:this.pageInfo.page,
            size:this.pageInfo.size,
            ids:this.id
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
      }).catch(err=>{
          console.log(err);
      })
  },
  mounted() {}
};
</script>
<style>
.max{
    width: 100%;
    height: 80vh;
    background-color: white;
    overflow-x: hidden;
    padding: 10px;
    font-size: 14px;
}
.table{
    /* height: 67vh; */
}
</style>