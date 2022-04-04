<template>
  <div class="max">
      <div class="maxOne">
          <!-- <el-row :gutter="24" style="line-height:50px;text-align:center;">
              <el-col :span="1"></el-col>
              <el-col :span="2">应付欠款</el-col>
              <el-col :span="2">=</el-col>
              <el-col :span="2">期初应付款</el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="2">期初预付款</el-col>
              <el-col :span="2">+</el-col>
              <el-col :span="2">增加应付欠款</el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="2">支付欠款</el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="2">优惠金额</el-col>
              <el-col :span="1"></el-col>
          </el-row> -->
          <!-- <el-row :gutter="24" style="font-weight:bold;text-align:center;">
              <el-col :span="1"></el-col>
              <el-col :span="2">￥0.00</el-col>
              <el-col :span="2"></el-col>
              <el-col :span="2">￥0.00</el-col>
              <el-col :span="2"></el-col>
              <el-col :span="2">￥0.00</el-col>
              <el-col :span="2"></el-col>
              <el-col :span="2">￥0.00</el-col>
              <el-col :span="2"></el-col>
              <el-col :span="2">￥0.00</el-col>
              <el-col :span="2"></el-col>
              <el-col :span="2">￥0.00</el-col>
              <el-col :span="1"></el-col>
          </el-row> -->
      </div>
      <div class="maxTwo">
          <div class="twoHead">
              <el-checkbox size="small" v-model="qkgys" label="欠款供应商" @change="mhcx()"></el-checkbox>
              <el-checkbox size="small" v-model="tygys" label="停用供应商" @change="mhcx()"></el-checkbox>
              <el-input v-model="likeinput" size="small" clearable placeholder="供应商名称" style="width:50%;margin-left:40px;">
                    <template #append>
                        <el-button size="small" :icon="icon.search" @click="mhcx()" />
                    </template>
              </el-input>
          </div>
          
          <div class="twoBody">
              <el-table class="table" :data="tableData">
                  <el-table-column  prop="supplierSerial" label="供应商编号"></el-table-column>
                  <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
                  <el-table-column prop="supplierPhone" label="联系电话"></el-table-column>
                  <el-table-column prop="mon" label="应付金额(元)"></el-table-column>
                  <el-table-column prop="rect" label="实付金额(元)"></el-table-column>
                   <el-table-column prop="coup" label="优惠金额(元)"></el-table-column>
                  <el-table-column label="欠款总计(元)">
                    <template #default="scope">
                        {{scope.row.mon-scope.row.coup-scope.row.rect}}
                      </template>
                  </el-table-column>
                  <el-table-column prop="" label="操作">
                      <template #default="scope">
                        <el-button type="text" size="small" @click="tiaozhuan(scope.row)"
          >欠款详情</el-button
        >
                      </template>
                  </el-table-column>
              </el-table>
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
          </div>
      </div>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default {
  data() {
    return {
        likeinput:"",
        qkgys:false,
        tygys:false,
        tableData:[],
        icon:{
            search:Search
        },
        pageInfo:{
            page:1,
            size:10,
            total:1
        }
    };
  },
  methods: {
      tiaozhuan(row){
        //   sessionStorage.setItem("payable",row);
        //   this.$router.push("/supplierArrearsFlow");
          this.$router.push({path: "/supplierArrearsFlow", query: {name: row.supplierName,qk:row.agr,phone:row.supplierPhone,id:row.supplierId}})
 
      },
      mhcx(){
          this.axios.get("http://localhost:9090/selectcopemhpage",{
            params:{
                page:this.pageInfo.page,
            size:this.pageInfo.size,
                qkgys:this.qkgys,
               tygys:this.tygys,
                names:this.likeinput,
            }
          }).then(response=>{
            console.log(response.data);
            this.tableData=response.data.records
        this.pageInfo.total=response.data.total
          }).catch(err=>{
              console.log(err);
          })
      },
  },
  created() {
      this.axios.get("http://localhost:9090/selectcopepage",{
        params:{
            page:this.pageInfo.page,
            size:this.pageInfo.size
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
    width:100%;
    height: 86vh;
    overflow-x: hidden;
    overflow-y: hidden;
    font-size: 12px;
}
.maxOne{
    width:100%;
    height: 10%;
    background-color: white;
    line-height: 10%;
}
.maxTwo{
    width: 100%;
    height: 88%;
    margin-top: 1%;
    background-color: white;
}
.twoHead{
    width: 40%;
    height: 30px;
    line-height: 30px;
    float: right;
}
.twoBody{
    width: 100%;
    height: 93%;
}
.table{
    height: 66vh;
    font-size: 12px;
}
.page{
    font-size: 12px;
}
</style>