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

    <el-form ref="fo" :model="fo" :rules="rules"  label-width="120px">
<!--      <el-form-item label="编号" prop="id">
        <el-input v-model="fo.id" placeholder="Please input" style="width: 500px"></el-input>
      </el-form-item>-->
      <el-form-item label="名称" prop="commodityName">
        <el-input v-model="fo.commodityName" placeholder="例如:HB韩版衣服" style="width: 500px"></el-input>
      </el-form-item>

	  <el-form-item label="单位" prop="commodityCompany">
        <el-select v-model="fo.commodityCompany" placeholder="选择单位：" style="width: 500px">
          <el-option label="个" value="个"></el-option>
          <el-option label="台" value="台"></el-option>
          <el-option label="瓶" value="瓶"></el-option>
          <el-option label="盒" value="盒"></el-option>
          <el-option label="件" value="件"></el-option>
          <el-option label="包" value="包"></el-option>
          <el-option label="箱" value="箱"></el-option>
          <el-option label="斤" value="斤"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品分类" prop="regions">
        <el-select v-model="fo.categoryId" placeholder="选择分类：" style="width: 500px;">
          <el-option label="冰箱" value="shanghai"></el-option>
          <el-option label="空调" value="beijing"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="规格/属性">
        <el-input v-model="fo.commoditySpecifications" style="width: 500px"></el-input>
      </el-form-item>

    </el-form>



  </div>
  <br>
  <br>
  <div class="edit_body_2 ">
    <span>价格管理</span>
    <br>
    <br>
    <el-divider></el-divider>
    <br>
    <el-form ref="form" :model="fo" label-width="80px" style="float: left">
      <el-form-item label="零售价" style="float: left">
        <el-input-number
            v-model="fo.retailPrice"
            :min="1"
            :precision="2"
            :step="0.1"
            controls-position="right"
            size="large"
          />
      </el-form-item>
      <el-form-item label="批发价" style="float: left">
        <el-input-number
            v-model="fo.tradePrice"
            :min="1"
            :precision="2"
            :step="0.1"
            controls-position="right"
            size="large"
          />
      </el-form-item>


    </el-form>
  </div>

    <div class="inventory">
      <span>库存预警</span>
      <br>
      <br>
      <el-divider></el-divider>
      <el-form ref="form" :model="fo" label-width="80px" >
        <el-form-item label="低库存" style="float: left">
          <el-input-number
              v-model="fo.minNumber"
              :min="1"
              controls-position="right"
              size="large"
          />
        </el-form-item>
        <el-form-item label="高库存" style="float: left">
          <el-input-number
              v-model="fo.maxNumber"
              :min="1"
              controls-position="right"
              size="large"
          />
        </el-form-item>
      </el-form>


    </div>

    <el-affix position="bottom" :offset="30">
      <div class="low">

        <el-button style="float: right; margin-top: 11px;margin-right: 70px" type="primary" @click="submitForm('fo')">保存</el-button>
        <el-button style="float: right;margin-right:20px;margin-top: 11px;" @click="resetForm('fo')" >取消</el-button>


      </div>
    </el-affix>



  </div>
</template>

<script>
import { ref } from 'vue'
import {ElMessage} from "element-plus/es";
export default {

  name: "edit",
  data(){
    return{
      input:'',
      fo: {
        commodityName: '',
        commodityCompany: '',
        categoryId: '',
        commoditySpecifications:'',
        retailPrice:ref(1),
        tradePrice:ref(1),
        minNumber:ref(1),
        maxNumber:ref(1),
      },
      //验证
      rules: {
        commodityName:[{
          required: true,
          message: "请填写商品名称！",
          trigger: "blur",
        }],
        commodityCompany:[{
          required: true,
          message: "请选择商品单位！",
          trigger: "blur",
        }],
        categoryId:[{
          required: true,
          message: "请选择商品类型！",
          trigger: "blur",
        }]

      }

    }
  }, methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fo.commoditySpecifications=null
      this.fo.retailPrice=1
      this.fo.tradePrice=1
      this.fo.minNumber=1
      this.fo.maxNumber=1
    },
    add(){
      this.axios
          .post("http://localhost:9090/commodity/addcom", this.fo)
          .then((response) => {
            if( response.data ==="成功" ){
              ElMessage.success("添加成功")
              this.resetForm('fo')
            }else if( response.data ==="失败" ){
              ElMessage.error("添加失败")
            }else{
              ElMessage.warning(response.data)
            }
          }).catch(function (error){
            console.log(error);
          })

    }
  }
}
</script>

<style scoped>
.edit_body{
  width: 100%;
  height: 380px;
  border: 1px solid #ddd;
  background-color: white;

}
.body_1{
  width: 100%;
  height: 100%;
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
  height: 180px;
  border: 1px solid #ddd;
  background-color: white;
}
.edit_body_2 span{
  font-size: 16px;
  float: left;
  margin: 20px;
  color:#2c3e50;
}
.ant-pro-footer-toolbar {
  position: fixed;
  width: 100%;
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

.low{
	width: 100%;
	height:60px;
	margin-top: 40px;
  background-color: white;
  border: 1px solid #ddd;
}

.inventory{
  width: 100%;
  height: 150px;
  border: 1px solid #ddd;
  background-color: white;
  margin-top: 40px;
}

.inventory span{
  font-size: 16px;
  float: left;
  margin: 20px;
  color: #2c3e50;
}

</style>