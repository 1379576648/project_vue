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
        <el-input v-model="form.name" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 500px;">
          <el-option label="冰箱" value="shanghai"></el-option>
          <el-option label="空调" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="条形码">
        <el-input v-model="form.name" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-select v-model="form.region" placeholder="台" style="width: 500px">
          <el-option label="冰箱" value="shanghai"></el-option>
          <el-option label="空调" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格/属性">
        <el-input v-model="form.name" style="width: 500px"></el-input>
      </el-form-item>

      <el-form-item label="是否上架">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>

      <el-form-item label="库存预警">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>



      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <div class="ant-pro-footer-toolbar">
        <div style="float: left">
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="float:left;margin: 10px">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
        </div>
      </div>
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
    <el-form ref="form" :model="form" label-width="80px" style="float: left">
      <el-form-item label="零售价" style="float: left">
        <el-input v-model="form.name" style="width: 200px" ></el-input>
      </el-form-item>
      <el-form-item label="批发价" style="float: left">
        <el-input v-model="form.name" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="最低售价" style="float: left">
        <el-input v-model="form.name" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="进货价" style="float: left">
        <el-input v-model="form.name" style="width: 200px"></el-input>
      </el-form-item>


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
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }, methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>
.edit_body{
  width: 100%;
  height: 660px;
  border: 1px solid #ddd;
  background: white;
}
.body_1{
  width: 100%;
  height: 1000px;
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