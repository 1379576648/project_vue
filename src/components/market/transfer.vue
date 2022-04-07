<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="已入库"></el-tab-pane>
    <el-tab-pane label="未入库" ></el-tab-pane>
  </el-tabs>
    <router-view></router-view>
</div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      activeName:sessionStorage.getItem("activeName"),
    }
  }, 
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      if(this.activeName=='0'){
        sessionStorage.setItem("activeName",'0')
        this.$router.push("/refundHistory")
      }else if(this.activeName=='1'){
        sessionStorage.setItem("activeName",'1')
		    this.$router.push("/BeforeRefundHistory")
      }
    },
  },
   created(){	
	  console.log("dassadadasdasa"+sessionStorage.getItem("activeName"))
	if(this.activeName==null){
		this.activeName='0'
		sessionStorage.setItem("activeName",'0')
	}
  this.handleClick()
	  	 
  }
}
</script>
