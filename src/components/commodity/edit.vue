<template>

  <div class="body_1">

  <div class="edit_body">
    <span>基本信息</span>

    <span style="float: right">
    <el-button><router-link to="goin">商品列表</router-link></el-button>
    </span>
    <br>
    <br>
    <el-divider></el-divider>
    <br>


    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="编号">
        <el-input v-model="form.commodityId" style="width: 500px" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.commodityName" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.categoryId" placeholder="请选择活动区域"  style="width: 500px;">
          <el-option label="冰箱" value="shanghai"></el-option>
          <el-option label="空调" value="beijing"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="条形码">-->
<!--        <el-input v-model="form.name" style="width: 500px"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="单位">
        <el-select v-model="form.commoditySpecifications" placeholder="台" style="width: 500px">
          <el-option label="瓶" value="shanghai"></el-option>
          <el-option label="盒" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格/属性">
        <el-input v-model="form.commodityCompany" style="width: 500px"></el-input>
      </el-form-item>

<!--      <el-form-item label="是否上架">-->
<!--        <el-switch v-model="form.delivery"></el-switch>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="库存预警">-->
<!--        <el-switch v-model="form.delivery"></el-switch>-->
<!--      </el-form-item>-->


<!--      <el-form-item label="备注">-->
<!--        <el-input type="textarea" v-model="form.desc"></el-input>-->
<!--      </el-form-item>-->
      <div class="ant-pro-footer-toolbar">
        <div style="float: left">
          <el-form-item>
            <el-button type="primary" @click="updateById()" style="float:left;margin: 10px" >保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </div>
      </div>

  <br>
  <br>
  <div class="edit_body_2 ">
    <span>价格管理</span>
    <br>
    <br>
    <el-divider></el-divider>
    <br>
<!--    <el-form ref="form" :model="form" label-width="80px" style="float: left">-->
      <el-form-item label="零售价" style="float: left">
        <el-input v-model="form.retailPrice" style="width: 200px" ></el-input>
      </el-form-item>
      <el-form-item label="批发价" style="float: left">
        <el-input v-model="form.tradePrice" style="width: 200px"></el-input>
      </el-form-item>
<!--      <el-form-item label="最低售价" style="float: left">-->
<!--        <el-input v-model="form.name" style="width: 200px"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="进货价" style="float: left">-->
<!--        <el-input v-model="form.name" style="width: 200px"></el-input>-->
<!--      </el-form-item>-->
      </div>

    </el-form>



  </div>


  </div>
</template>

<script>
export default {
  name: "edit",
  data(){
    return{
      input:'',
      form: {
        categoryId: '',//商品分类id
        commodityCompany: '',//单位
        commodityId:'',//商品编号
        commodityName: '',//商品名字
        // delivery: false,
        // type: [],
        commoditySpecifications: '',//规格
        maxNumber: '',//最高库存
        minNumber:'',//最低库存
        retailPrice:'',//零售价
        tradePrice:'',//批发价
      },
      updataVal:{}
    }
  }, methods: {
    onSubmit() {
      console.log('submit!');
    },
    /*
    * 根据id查询 商品表
    * */
    selectById(){
        this.axios
            .get("http://localhost:9090/commodity/selectById/" + this.$route.query.id)
            .then((response => {
              console.log(response);
              this.form = response.data;
              console.log(this.form)
            })).catch(function (error) {
          console.log(error);
        })
    },
    /*
    * 根据id修改商品表方法
    * */
    updateById(){

      this.axios
      .post("http://localhost:9090/commodity/updata",{
        commodityId:this.form.commodityId,
        categoryId:this.form.categoryId,
        commoditySpecifications:this.form.commoditySpecifications,
        commodityName:this.form.commodityName,
        maxNumber:this.form.maxNumber,
        commodityCompany:this.form.commodityCompany,//单位
        minNumber:this.form.minNumber,
        retailPrice:this.form.retailPrice,
        tradePrice:this.form.tradePrice,
      }).then((res=>{
        console.log("商品修改",res)

        if(res.data>0){
          this.$message({
            message: '修改成功！！！',
            type: 'success'
          });
        }else{
          this.$message({
            message: '修改失败！！！',
            type: 'error'
          });
        }



      })).catch(function (error) {
        console.log(error);
    })
  }
},created() {
    this.selectById()
  }
}
</script>

<style scoped>
.edit_body{
  width: 100%;
  height: 385px;
  border: 1px solid #ddd;
  background: white;
}
.body_1{
  width: 100%;
  height: 690px;
}
.edit_body span{
  font-size: 16px;
  float: left;
  margin: 20px;
  color:#2c3e50;
}
.edit_body_1{
  float: left;
  margin-top: 10px;
  margin-left: 30px;
  font-size: 16px;
  color: #2c3e50;
}
a{
  text-decoration:none ;
  color: #409eff;
}
.edit_body_2{
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
  background: white;
}
.edit_body_2 span{
  font-size: 16px;
  float: left;
  margin: 20px;
  color:#2c3e50;
}
.ant-pro-footer-toolbar {
  position: fixed;
  width: 84.3%;
  bottom: 0;
  right: 0;
  height: 56px;
  line-height: 56px;
  -webkit-box-shadow: 0 -1px 2px rgba(0,0,0,.03);

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 0 24px;
  z-index: 9;
}


</style>