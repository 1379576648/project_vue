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
          
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
.max{
    width:100%;
    height: 100%;
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
</style>