<template>
  <div class="tou">
    <div style="position: relative; top: 20px">
      <el-row>
        <el-col :span="24">
          <span class="demonstration">账单周期：</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="mhcx()"
          >
          </el-date-picker> 
          <el-checkbox v-model="checked" style="margin-left: 350px" @change="mhcx()"
            >欠款客户</el-checkbox
          >
          <el-checkbox v-model="checked1" @change="mhcx()">停用客户</el-checkbox>
          <el-input
            v-model="input"
            placeholder="请输入内容"
            style="width: 150px; margin-left: 10px"
          ></el-input>
          <el-button type="primary">
            <el-icon style="vertical-align: middle">
              <search />
            </el-icon>
            <span style="vertical-align: middle" @click="mhcx()"> 搜索 </span>
          </el-button>
        </el-col>
      </el-row>
    </div>

    <div class="end">
        <div>

        </div>
        <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="customerSerial" label="客户编号" width="220" />
    <el-table-column prop="customerName" label="客户名称" width="220" />
    <el-table-column prop="customerPhone" label="联系电话" width="220" />
    <el-table-column prop="receivableMoney" label="应收金额" width="220" />
    <el-table-column prop="coupon" label="优惠" width="220" />
    <el-table-column prop="s" label="实收金额" width="220" />
    <el-table-column   label="欠款总计" width="220" >
      <template #default="scope">
        {{scope.row.receivableMoney-scope.row.coupon-scope.row.s}}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)"
          >欠款流水</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked:false,
      checked1:false,
      input:'',
      value1: "",
       tableData : [],
pageInfo:{
  currentPage4: 1,
  total:1,
  size:10,
},

    };
  },
  methods: {
    //模糊查询
    mhcx(){
      let sj1=this.value1[0]
      let sj2=this.value1[1]
      console.log(sj1,":sj1");
      console.log(sj2,":sj2");
     
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectmohu",{
        params:{
          sj1:sj1,
          sj2:sj2,
          checked:this.checked,
          checked1:this.checked1,
          names:this.input,
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
        console.log(this.tableData);
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.axios.get("http://localhost:9090/selectmohu1",{
        params:{
          checked:this.checked,
          checked1:this.checked1,
          names:this.input,
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size
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
      handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        this.pageInfo.size = size;
        let sj1=this.value1[0]
      let sj2=this.value1[1]
      console.log(sj1,":sj1");
      console.log(sj2,":sj2");
      // checked:false,
      // checked1:false,
      // input:'',
      if(sj1!=null&&sj2!=null){
      this.axios.get("http://localhost:9090/selectmohu",{
        params:{
          sj1:sj1,
          sj2:sj2,
          checked:this.checked,
          checked1:this.checked1,
          names:this.input,
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        this.pageInfo.total=response.data.total
        console.log(this.tableData);
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.axios.get("http://localhost:9090/selectmohu1",{
        params:{
          checked:this.checked,
          checked1:this.checked1,
          names:this.input,
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size
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
        let sj1=this.value1[0]
      let sj2=this.value1[1]
      console.log(sj1,":sj1");
      console.log(sj2,":sj2");
      // checked:false,
      // checked1:false,
      // input:'',
      if(sj1!=null&&sj2!=null){
        console.log(sj1,":sj1");
      console.log(sj2,":sj2");
      this.axios.get("http://localhost:9090/selectmohu",{
        params:{
          sj1:sj1,
          sj2:sj2,
          checked:this.checked,
          checked1:this.checked1,
          names:this.input,
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size
        }
      }).then(response=>{
        console.log(response.data);
        this.tableData=response.data.records
        console.log(this.tableData);
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.axios.get("http://localhost:9090/selectmohu1",{
        params:{
          checked:this.checked,
          checked1:this.checked1,
          names:this.input,
          page:this.pageInfo.currentPage4,
    size:this.pageInfo.size
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
      //欠款流水
      handleClick(row){
        //scope.row.receivableMoney-scope.row.coupon-scope.row.s
        this.$router.push({path: "/financing/Balance", query: {name: row.customerName,money:row.receivableMoney,cou:row.coupon,qk:row.s,phone:row.customerPhone,id:row.receivableId}})
        //this.$router.push('/financing/Balance');
      }
    },
    created(){
      this.axios.get("http://localhost:9090/selectreceivableVopage",{
        params:{
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
.end{
    width: 100%;
  min-height: 500px;
  background: white;
  margin-top: 5%;
}
</style>