<!-- 其他出库单 -->

<template>
  <!-- 外围div -->
  <div style="background-color: white;padding: 20px;">
    <!-- 头部 -->
    <div style="text-align: center;border-bottom: 1px dotted lightgray;">
      <h2>采购退货单</h2>
      <span style="margin-left: 80%;">
        <el-button style="width: 85px;height: 35px">
          <router-link to="returnHistory">退货历史</router-link></el-button>
      </span>
    </div>
    <!-- 左 -->
    <div style="margin-top: 10px;padding: 20px;float: left;" id="demo">
      仓库:
      <el-select v-model="stock" placeholder="选择仓库" @change="selectCommodity()">
        <el-option v-for="item in returnStock" :key="item.stockId" :label="item.stockName" :value="item.stockId"/>
      </el-select>

      供应商:
      <el-select v-model="supplier" placeholder="请选择供应商">
        <el-option v-for="item in returnSupplier" :key="item.supplierId" :label="item.supplierName" :value="item.supplierName"/>
      </el-select>
    </div>

    <!-- 右 -->
    <div style="margin-top: 10px;padding: 20px;float: right;">
      经手人:
      <el-input style="width: 180px" disabled v-model="returnStaff">
      </el-input>
    </div>

    <!-- 表格 -->
    <el-table :data="returnCommodity" border
              :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
              :cell-style="{ textAlign: 'center' }"
              @selection-change="handleSelectionChange">

      <el-table-column type="index" label="序号" width="60px"/>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="commodityName" label="商品名称" width="200px"/>
      <el-table-column prop="commodityCompany" label="单位"/>
      <el-table-column prop="purchaseDetailsPrice" label="单价"/>
      <el-table-column prop="purchaseDetailsNumber" label="数量"/>
      <el-table-column prop="purchaseDetailsTotal" label="总金额" />
      <el-table-column prop="purchaseRemarks" label="备注"/>

    </el-table>
    <div style="margin-top:10px;height: 30px">
      <span>退货金额：</span><span>{{purchaseDetailsTotal}}</span>
    </div>
  </div>
  <br/>
  <div style="background-color: white;padding: 20px;">
    退货原因：<br/><br/>
    <el-input :rows="2" type="textarea" placeholder="请输入退货原因" v-model="reason"/>
  </div>
  <div class="button_box">
    <div style="display: inline-block;margin-left: 1076px">
      <el-button @click="clear">取消</el-button>
      <el-button @click="insertReturnGoods()">保存</el-button>
      <el-button type="primary" @click="insertStock()">保存出库</el-button>
    </div>

  </div>


</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      //选中的节点
      sels:[],
      purchaseDetailsTotal:0,
      // 选择商品 对话框
      selectGoodsDialog: false,
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },

      //退货数组
      returnOrder: [],
      //仓库数组
      returnStock:[],
      //供应商数组
      returnSupplier:[],
      //商品数组
      returnCommodity:[],

      //经选人数组
      returnStaff:'管理员',
      //仓库
      stock:"",
      //供应商
      supplier:"",
    //  采购id
      purchaseId:'',
    //  采购明细id
      purchaseDetailsId:'',
    //  退货原因
      reason:''

    }
  },
  methods: {
    clear(){
      this.$router.push("/returnHistory")
    },
    //获取选中的复选框
    handleSelectionChange(sels) {
      this.purchaseDetailsTotal=0
      sels.forEach(item=>{
        this.purchaseDetailsTotal=this.purchaseDetailsTotal+item.purchaseDetailsTotal;
      })
    this.sels=sels
      console.log("选中的值：", this.sels);
    },
    //查询仓库
    selectStock(){
      this.axios.get("http://localhost:9090/stock/selectStock",{
      }).then(res=>{
        console.log(res)
        this.returnStock = res.data.data;
      }).catch(error=>{
        console.log(error)
      })
    },
  //  查询供应商
    selectSupplier(){
      this.axios.get("http://localhost:9090/returngoods/selectSupplier",{
      }).then(res=>{
        console.log(res)
        this.returnSupplier=res.data.data;
      }).catch(error=>{
        console.log(error)
      })
    },
  //  查询所有的商品
    selectCommodity(){
      // this.returnCommodity.push();
      this.axios.get("http://localhost:9090/returngoods/selectReturnCommodity/"+this.stock
      ).then(res=>{
        console.log(res)
        this.returnCommodity=res.data.data;
      }).catch(error=>{
        console.log(error)
      })
    },

    //保存退货信息
    insertReturnGoods(){
      let a = this.sels;
      if(a==0){
        ElMessage({
          message: "请选中你要添加的一行",
          type: "error",
        });
      }else{
        for(let i=0;i<a.length;i++){
          this.axios.post("http://localhost:9090/returngoods/insertReturnGoods/"+a[i].purchaseDetailsId,{
            purchaseId:a[i].purchaseId,
            returngoodsReason:this.reason,
            returngoodsMoney:this.purchaseDetailsTotal,
            returngoodsState:2
          }).then(res=>{
            console.log(res.data.msg)
            if(res.data.msg=='成功'){
              ElMessage({
                message: "退货成功",
                type: "success",
              });
              this.$router.push("/returnHistory")
            }else{
              ElMessage({
                message: "退货失败",
                type: "error",
              });
            }
          }).catch(error=>{
            console.log(error)
          })
        }
      }
    },
    //保存退货信息
    insertStock(){
      let a = this.sels;
      if(a==0){
        ElMessage({
          message: "请选中你要添加的一行",
          type: "error",
        });
      }else{
        for(let i=0;i<a.length;i++){
          this.axios.post("http://localhost:9090/returngoods/insertReturnGoods/"+a[i].purchaseDetailsId,{
            purchaseId:a[i].purchaseId,
            returngoodsReason:this.reason,
            returngoodsMoney:this.purchaseDetailsTotal,
            returngoodsState:1
          }).then(res=>{
            console.log(res.data.msg)
            if(res.data.msg=='成功'){
              ElMessage({
                message: "退货成功",
                type: "success",
              });
              this.$router.push("/returnHistory")
            }else{
              ElMessage({
                message: "退货失败",
                type: "error",
              });
            }
          }).catch(error=>{
            console.log(error)
          })
        }
      }
    }

  },
  created() {
      this.selectStock();
      this.selectSupplier();
  }
}
</script>

<style>

body {

}

.button_box {
  margin-top: 15px;
  background: white;
  height: 60px;
  width: 100%;
  line-height: 60px;
}
a{
  text-decoration: none;
  color: deepskyblue;
}

</style>
