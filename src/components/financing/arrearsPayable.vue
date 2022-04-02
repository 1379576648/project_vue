<template>
  <div class="max">
      <div class="maxOne">
          <el-row :gutter="24" style="line-height:50px;text-align:center;">
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
          </el-row>
          <el-row :gutter="24" style="font-weight:bold;text-align:center;">
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
          </el-row>
      </div>
      <div class="maxTwo">
          <div class="twoHead">
              <el-checkbox size="small" v-model="qkgys" label="欠款供应商"></el-checkbox>
              <el-checkbox size="small" v-model="tygys" label="停用供应商"></el-checkbox>
              <el-input v-model="likeinput" size="small" placeholder="编号/名称/电话" @keyup.enter.native="select()" style="width:50%;margin-left:40px;">
                    <template #append>
                        <el-button size="small" @click="tiaozhuan()" :icon="icon.search" />
                    </template>
              </el-input>
          </div>
          
          <div class="twoBody">
              <el-table class="table" :data="tableData">
                  <el-table-column type="index" label="序号"></el-table-column>
                  <el-table-column prop="" label="供应商编号"></el-table-column>
                  <el-table-column prop="" label="供应商名称"></el-table-column>
                  <el-table-column prop="" label="联系电话"></el-table-column>
                  <el-table-column prop="" label="期初应付款(元)"></el-table-column>
                  <el-table-column prop="" label="期初预付款(元)"></el-table-column>
                  <el-table-column prop="" label="期初应付欠款(元)"></el-table-column>
                  <el-table-column prop="" label="支付欠款(元)"></el-table-column>
                  <el-table-column prop="" label="优惠金额(元)"></el-table-column>
                  <el-table-column prop="" label="欠款总计(元)"></el-table-column>
                  <el-table-column prop="" label="操作"></el-table-column>
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
        qkgys:false,
        tygys:false,
        tableData:[],
        icon:{
            search:Search
        },
        pageInfo:{
            page:0,
            size:10,
            total:2
        }
    };
  },
  methods: {
      tiaozhuan(){
          this.$router.push("/supplierArrearsFlow");
      }
  },
  created() {},
  mounted() {}
};
</script>
<style>
.max{
    width:100%;
    height: 90vh;
    overflow-x: hidden;
}
.maxOne{
    width:100%;
    height: 10%;
    background-color: white;
}
.maxTwo{
    width: 100%;
    height: 88%;
    margin-top: 1%;
    background-color: white;
}
.twoHead{
    width: 30%;
    height: 30px;
    line-height: 30px;
    float: right;
}
.twoBody{
    width: 100%;
    height: 93%;
}
.table{
    height: 72vh;
}
</style>