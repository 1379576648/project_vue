<script>
export default{
  data(){
    return{
      menulist:this.$store.state.menu,
      user:this.$store.state.user,
      isCollapse:false
    }
  },
  computed: {
    noChildern() {
      return this.$store.state.menu.filter((item) => item.powers<1);
    },
    hasChildern() {
      return this.$store.state.menu.filter((item) => item.powers);
    },
  },
  methods:{
    a(){
      location.reload();
    },
  },
}
</script>

<template>
  <el-container>
    <el-aside width="190px" style="background-color:#252832;overflow-x: hidden" id="container">
      <div>
        <div class="logo">
          <img src="https://jingdouyun888.com/assets/images/logo.png" style="width: 150px;margin: 10px 0;" alt="">
        </div>
      <el-menu
      :default-active="$route.path"
      text-color="white"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#272a36"
      style="height: calc(100vh - 65px);border-right: none"
      :unique-opened="true"
      router
    >
      <el-menu-item
        v-for="mune in noChildern"
        :key="mune"
        :index="mune.powerUrl"
      >
        <!-- <template #title> -->
        <el-icon><img :src="mune.navigationIcon" alt="" /></el-icon>
        <span>{{ mune.powerName }}</span>
        <!-- </template> -->
      </el-menu-item>

      <el-sub-menu
        v-for="mune in hasChildern"
        :key="mune"
        :index="mune.powerUrl"
        v-show="mune.powers.length>0"
      >
        <template #title >
          <el-icon><img :src="mune.navigationIcon" alt="" /></el-icon>
          <span>{{ mune.powerName }}</span>
          <!-- {{ mune.children }} -->
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="childern in mune.powers"
            :key="childern"
            :index="childern.powerUrl"
          >
            <el-icon
              ><img
                :src="childern.navigationIcon"

            /></el-icon>
            <span>{{ childern.powerName }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
      </div>
    </el-aside>

    <el-container>
      <el-header style="display: flex;height: 65px;padding:0 10px">
        <div style="flex:1;">
         
        </div>
        <div style="line-height: 65px">
          <div style="display: flex;align-items: center">
            <div style="padding:0 12px">注册试用14天</div>
            <div style="padding:0 12px" class="iconfontdiv">
              <i class="iconfont" @click="a()">&#xe8aa;</i>
            </div>
            <div style="padding: 0px 5px 12px 0px;">
              <div style="height: 32px;width: 32px;border-radius: 32px;">
                <el-avatar style="height: 32px;width: 32px;border-radius: 32px;" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              </div>
            </div>
            <div style="padding:0 12px 0 0">{{user.staffName}}</div>
            <div>退出</div>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>



<style scoped>
#scroll{
  overflow:scroll;
  overflow-x: hidden;
}
#scroll::-webkit-scrollbar{
  width:5px;
}
#scroll::-webkit-scrollbar-thumb{
  background:linear-gradient(rgb(17,157,212),rgb(17,212,105));
  border-radius:5px;
  transition:1s;
}
#scroll::-webkit-scrollbar-thumb:hover{
  background:linear-gradient(rgb(17,212,105),rgb(17,157,212));
}

@font-face {
  font-family: 'iconfont';  /* project id 3284006 */
  src: url('');
  src: url('?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_3284006_idy38ak0bmb.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_3284006_idy38ak0bmb.woff') format('woff'),
  url('//at.alicdn.com/t/font_3284006_idy38ak0bmb.ttf') format('truetype'),
  url('#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;}
.logo {
  position: relative;
  height: 65px;
  text-align: center;
  padding: 0;
  overflow: hidden;
  line-height: 65px;
  background: #002140;
  -webkit-transition: all .3s;
  transition: all .3s;
}

.el-main{
  margin: 0;
  padding: 8px 8px 25px 8px;
  background-color: #E8E8E8;
}
.el-breadcrumb-item{
  display: inline-block;
  padding: 8px;
  margin:35px 1px 0px;
  /*line-height: 40px;*/
  background-color: white;
  color: #000;
}
/deep/.el-sub-menu__title{
  padding-left: 40px;
  color: white;
  background-color: rgb(39, 42, 54);
}

.iconfontdiv:hover{
    cursor: default ;
  background-color: #F8F8F8;
}
#container::-webkit-scrollbar{
width:5px;
}
#container::-webkit-scrollbar-thumb{
background:linear-gradient(rgb(17,157,212),rgb(17,212,105));
border-radius:5px;
transition:1s;
}
#container::-webkit-scrollbar-thumb:hover{
background:linear-gradient(rgb(17,212,105),rgb(17,157,212));
}
</style>