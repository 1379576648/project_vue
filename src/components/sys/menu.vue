<template>
  <div>
    <div style="background: white; margin: 10px">
      <p style="color: #337ab7; padding: 30px 70px">
        线上版本没有开放动态路由功能
      </p>

      <div style="padding: 0px 30px;display: flex;">
          <!-- ==================================== -->
          <div>
               <el-dropdown
          trigger="click"
          style="padding: 8px 15px; border: 1px solid #dcdfe6"
        >
        <span class="el-dropdown-link">
          更多操作
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
            <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="unFoldAll2(data)"
                >展开全部</el-dropdown-item
              >
              <el-dropdown-item @click="collapseAll2(data)"
                >收起全部</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <br/>
        <el-input
          v-model="powerName"
          style="width: 329px; margin: 15px 0"
          placeholder="输入菜单名称搜索"
          suffix-icon="Search"
          @keyup="load()"
        />
        <br />

         <el-tree
        :data="data"
        :props="{ children:'powers' ,label: 'powerName' }"
        highlight-current
        ref="selectTree"
        :expand-on-click-node="false"
        @node-click="findByPowerId"
        node-key="powerId"
      ></el-tree>
          </div>
         <!-- ================================= JSON.stringify(this.menu)!=='{}' || -->
         <div style="flex: 1;padding: 0 150px;" v-show="show==true">
            <p class="flex" style="padding:10px 0 10px 27px" v-if="menu.powerType!=null">类型： {{menu.powerType==0?'聚合菜单':menu.powerType==1?'页面菜单':'数据接口'}}</p>
            <p class="flex" v-if="menu.powerPid!=0">上级菜单： {{superior}}</p>
            <p class="flex" v-if="menu.powerName!=null" style="padding:10px 0 10px 27px">名称： {{menu.powerName}}</p>
            <p class="flex" v-if="menu.powerUrl!=null" style="padding:10px 0 10px 27px">路径：<el-input v-model="menu.powerUrl"/></p>
            <p class="flex" v-if="menu.powerPerms!=null">路由名称：<el-input v-model="menu.powerPerms"/></p>
            <p class="flex" v-if="menu.powerComponent!=null" >菜单组件：<el-input v-model="menu.powerComponent"/></p>
            <p class="flex" v-if="menu.powerType!=2" style="padding:10px 0 10px 25px">meta：
                <p 
                style="width: 637px;
                height: 350px;
                background: black;
                color:white;
                padding:5px;
                display: -webkit-inline-box;">{
                    <br/>
                    <br/>
                    <span style="margin:0 5px 0 15px;color:rgb(240, 128, 71)">"title"</span>:<span style="margin:0 5px;color:rgb(240, 128, 71)">{{menu.powerName}}</span>
                    <br/>
                    <br/>
                }</p>
            </p>
            <p class="flex">是否启用：<el-switch
  v-model="menu.powerState"
   :active-value=0
   :inactive-value=1
  active-text="启用"
  inactive-text="禁用"
  @click="put">
</el-switch></p>
         </div>
      </div>

     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      data: [],
      menu: {},
      superior: undefined,
      powerName: undefined,
    };
  },
  methods: {
    put(){
      const power={
        powerId:this.menu.powerId,
        powerState:this.menu.powerState
      }
      this.axios.put("http://localhost:9090/menu/put",power)
      .then(res=>{
        console.error(res);
        if(res.data.code=="0"){
          this.$message.success(res.data.msg)
          this.show=false
          this.load()
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    findByPowerId(v) {
      this.axios
        .get("http://localhost:9090/menu/findByPowerId/" + v.powerId)
        .then((res) => {
          this.menu = res.data.data;
        });
      this.axios
        .get("http://localhost:9090/menu/findByPowerId/" + v.powerPid)
        .then((res) => {
          if (res.data.data.powerName) {
            this.superior = res.data.data.powerName;
          }
        });
      this.show = !this.show;
    },

    findByPowerName() {
      this.axios
        .get("http://localhost:9090/menu/findBypowerName", {
          params: {
            powerName: this.powerName,
          },
        })
        .then((res) => {
          this.data = res.data.data;
        });
    },
    // 全部展开
    unFoldAll2(data) {
      let self = this;
      data.forEach((el) => {
        self.$refs.selectTree.store.nodesMap[el.powerId].expanded = true;
        el.children && el.powers.length > 0 ? self.unFoldAll2(el.powers) : ""; // 子级递归
      });
    },
    // 全部折叠
    collapseAll2(data) {
      let self = this;
      data.forEach((el) => {
        self.$refs.selectTree.store.nodesMap[el.powerId].expanded = false;
        el.children && el.powers.length > 0 ? self.collapseAll2(el.powers) : ""; // 子级递归
      });
    },
    // ===========================================
    load() {
      this.axios.get("http://localhost:9090/menu/load",{params:{powerName:this.powerName}}).then((res) => {
        this.data = res.data.data;
      });
    },
  },
  created() {
    this.load();
  },
  mounted() {},
};
</script>
<style>
.flex {
  padding: 10px 0;
  color: #606266;
  font-size: 14px;
}
.el-input {
  width: 587px;
  height: 32px;
}
</style>