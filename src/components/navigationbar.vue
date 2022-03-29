<script>
export default{
  data(){
    return{
      menulist:this.$store.state.menu
    }
  },
  methods:{
    a(){
      location.reload();
    },
  },
  mounted() {
    const route=[]
    const a=[]
    this.menulist.forEach(item=>{

        if (item.son){
          route.path=item.MENU_ROUTE
          route.component='()=>import(../'+item.MENU_MODULE+')'
        }
      route.path=item.MENU_ROUTE
      route.component='()=>import(../'+item.MENU_MODULE+')'
       a.push(route)
    })

  }
}
</script>

<template>
  <el-container>
    <el-aside width="190px" style="background-color: #001529;overflow-x: hidden">
      <div>
        <div class="logo">
          <img src="https://jingdouyun888.com/assets/images/logo.png" style="width: 150px;margin: 10px 0;" alt="">
        </div>
        <el-menu
            :default-active="$route.path"
            text-color="white"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#001529"
            style="height: calc(100vh - 65px);border-right: none"
            :unique-opened="true"
            router
        >
          <template v-for="(item,i) in menulist">
            <!-- 判断一级导航是否有叶子: 有-->
            <el-sub-menu :index="item.MENU_ROUTE +''" :key="item.MENU_ID" v-if="item.MENU_LEAF==0" >
              <!--一级菜单模板区域-->
              <template #title>
                <!--图标-->
                <el-icon>
                  <i-menu/>
                </el-icon>

                <span>{{ item.MENU_NAME }}</span>
              </template>


              <!--二级菜单-->
              <template v-if="item.son[0].MENU_LEAF==1">
                <el-menu-item :index="subItem.MENU_ROUTE +'' " v-for="subItem in item.son"
                              :key="subItem.MENU_ID"
                              @click="selectquerts(subItem)">
                  <template #title><span style="margin-left:30px">{{ subItem.MENU_NAME }}</span></template>
                </el-menu-item>
              </template>
            </el-sub-menu>


            <!-- 判断一级导航是否有叶子: 无-->
            <el-menu-item :index="item.MENU_ROUTE +'' " :key="item.MENU_ID" v-if="item.MENU_LEAF==1"
                          @click="selectquerts(item)">
              <!--一级菜单模板区域-->
              <el-icon><i-fold /></el-icon>
              <template #title>
                <span>{{ item.MENU_NAME }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-aside>

    <el-container>
      <el-header style="display: flex;height: 65px;padding:0 10px">
        <div style="flex:1;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item class="el-breadcrumb-item" :to="{ path: '/' }"></el-breadcrumb-item>
            <el-breadcrumb-item class="el-breadcrumb-item" v-for="items in this.a">
              <a :href="items.MENU_ROUTE">{{items.MENU_NAME}}</a>
            </el-breadcrumb-item>

          </el-breadcrumb>
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
            <div style="padding:0 12px 0 0">123123</div>
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
.el-menu {
  --el-menu-active-color: var(--el-color-primary);
  --el-menu-text-color: var(--el-text-color-primary);
  --el-menu-hover-text-color: var(--el-text-color-primary);
  --el-menu-bg-color: var(--el-fill-color-blank);
  --el-menu-hover-bg-color: var(--el-color-primary-light-9);
  --el-menu-item-height: 45px;
  --el-menu-item-font-size: var(--el-font-size-base);
  --el-menu-item-hover-fill: var(--el-color-primary-light-9);
  --el-menu-border-color: var(--el-border-color);
  border-right: solid 1px var(--el-menu-border-color);
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: var(--el-menu-bg-color);
  box-sizing: border-box;
}
.el-main {
  --el-main-padding: 10px;
  display: block;
  flex: 1;
  flex-basis: 0%;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: var(--el-main-padding);
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
  background-color: #f5f5f5;;
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
</style>