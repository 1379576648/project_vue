<template>
  <el-card style="height: 690px;">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="高库存预警" name="first">
        <highAlert/>
      </el-tab-pane>
      <el-tab-pane label="低库存预警" name="second">
        <lowWarning/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" >
//注册组件
import highAlert from '../stock/highAlert.vue'
import lowWarning from '../stock/lowWarning.vue'
import {TabsPaneContext} from "element-plus/es";




export default{
  components:{
    highAlert,
    lowWarning,
  },
  data(){
    return{
      activeName:'first'
    }
  },
  methods:{
    handleClick () {
      console.log(tab, event)
    }
  }
}

</script>
<style>
 .el-tabs__item {
  padding: 0 20px;
  padding-left: 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 18px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  position: relative;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
