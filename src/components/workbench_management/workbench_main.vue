<template>
  <div style="width: 100%;height: 100%;">
      <div class="homesick">

        <div class="blocks1">
           <div class="operationStatus">

             <div class="header">
               <div class="header_left">
                 <div class="header_left_title">经营概况</div>
               </div>
             </div>
             <div class="info">
               <div class="info_block_1 info_income">
                 <div class="info_block_title">
                   <span class="info_block_title_text">收入(元)</span>
<!--                   <span class="el-tooltip info_block_title_icon iconfont icon-wenhao-01"></span>-->
                 </div>
                 <div class="info_block_value">0</div>
               </div>
               <div class="info_block_1 info_cost">
                 <div class="info_block_title">
                   <span class="info_block_title_text">成本(元)</span>
                   <!--                   <span class="el-tooltip info_block_title_icon iconfont icon-wenhao-01"></span>-->
                 </div>
                 <div class="info_block_value">0</div>
               </div>
               <div class="info_block_1 info_expenses">
                 <div class="info_block_title">
                   <span class="info_block_title_text">费用(元)</span>
                   <!--                   <span class="el-tooltip info_block_title_icon iconfont icon-wenhao-01"></span>-->
                 </div>
                 <div class="info_block_value">0</div>
               </div>
               <div class="info_block_1 info_profit">
                 <div class="info_block_title">
                   <span class="info_block_title_text">利润(元)</span>
                   <!--                   <span class="el-tooltip info_block_title_icon iconfont icon-wenhao-01"></span>-->
                 </div>
                 <div class="info_block_value">0</div>
               </div>
             </div>
           </div>
        </div>


        <div class="blocks2">
          <div class="oftenNav">

            <div class="header">
              <div class="header_left">
                <div class="header_left_title">常用功能</div>
              </div>
            </div>
            <div class="infos">
              <div class="info_item">
                <router-link :to="{path:this.ones,query:{path:this.$route.query.path}}">
                   <span class="info_item_icon iconfont icon-caogaodanju-01" style="background-color: rgb(127, 211, 131);">
                  <i class="iconfont">&#xe667;</i>
                </span>
                </router-link>

                <span  class="info_item_text">销售单</span>
              </div>

              <div class="info_item">
                <router-link :to="{path:this.twos,query:{path:this.$route.query.path}}">
                <span class="info_item_icon iconfont icon-caogaodanju-01" style="background-color: rgb(59, 122, 222);">
                   <i class="iconfont">&#xe9fe;</i>
                </span>
                </router-link>
                <span  class="info_item_text">其他入库单</span>
              </div>

              <div class="info_item">
                <router-link :to="{path:this.threes,query:{path:this.$route.query.path}}">
                <span class="info_item_icon iconfont icon-caogaodanju-01" style="background-color: rgb(59, 166, 222);">
                  <i class="iconfont">&#xe957;</i>
                </span>
                </router-link>
                <span  class="info_item_text">销售历史</span>
              </div>

              <div class="info_item">
                <router-link :to="{path:this.fours,query:{path:this.$route.query.path}}">
                <span class="info_item_icon iconfont icon-caogaodanju-01" style="background-color: rgb(131, 113, 238);">
                  <i class="iconfont">&#xe605;</i>
                </span>
                </router-link>
                <span  class="info_item_text">仓库管理</span>
              </div>

              <div class="info_item">
                <router-link :to="{path:this.sixs,query:{path:this.$route.query.path}}">
                <span class="info_item_icon iconfont icon-caogaodanju-01" style="background-color: rgb(255, 173, 101);">
                   <i class="iconfont">&#xe61c;</i>
                </span>
                </router-link>
                <span  class="info_item_text">商品列表</span>
              </div>
            </div>
          </div>
        </div>


        <div class="blocks3">
          <div class="saleStatus">
            <div class="header">
              <div class="header_left">
                <div class="header_left_title">销售概况</div>
              </div>
            </div>

            <div class="infoa">
              <div class="info_block info_saleSum">
                <span class="info_block_icon icon-zongjine-01"></span>
                <div class="info_block_data">
                  <div class="info_block_data_label"><span class="block_data_label_text">销售总金额</span></div>
                  <div class="info_block_data_value"><span class="data_value_sign">¥</span><span class="data_value_num">0</span></div>
                </div>
              </div>
              <div class="info_block info_saleSum">
                <span class="info_block_icon icon-zongjine-02"></span>
                <div class="info_block_data">
                  <div class="info_block_data_label"><span class="block_data_label_text">销售成本</span></div>
                  <div class="info_block_data_value"><span class="data_value_sign">¥</span><span class="data_value_num">0</span></div>
                </div>
              </div>
              <div class="info_block info_saleSum">
                <span class="info_block_icon icon-zongjine-03"></span>
                <div class="info_block_data">
                  <div class="info_block_data_label"><span class="block_data_label_text">优惠金额</span></div>
                  <div class="info_block_data_value"><span class="data_value_sign">¥</span><span class="data_value_num">0</span></div>
                </div>
              </div>
              <div class="info_block info_saleSum">
                <span class="info_block_icon icon-zongjine-04"></span>
                <div class="info_block_data">
                  <div class="info_block_data_label"><span class="block_data_label_text">毛利润</span></div>
                  <div class="info_block_data_value"><span class="data_value_sign">¥</span><span class="data_value_num">0</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ones:"/salesTicket",
      twos:"/godownEntry",
      threes:"/salesHistory",
      fours:"/Warehouse",
      sixs:"/goin",
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:24px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;}
@font-face {
  font-family: 'iconfont';  /* Project id 3284006 */
  src: url('//at.alicdn.com/t/font_3284006_uxgg9ckmfza.woff2?t=1648801247983') format('woff2'),
  url('//at.alicdn.com/t/font_3284006_uxgg9ckmfza.woff?t=1648801247983') format('woff'),
  url('//at.alicdn.com/t/font_3284006_uxgg9ckmfza.ttf?t=1648801247983') format('truetype');
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 微软雅黑;
}
.homesick{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.blocks1,.blocks2,.blocks3{
  width: 100%;
  background-color: rosybrown;
}
.blocks2,.blocks3{
    margin: 10px 0 0 0;
}
.operationStatus{
  padding: 0 20px;
  background-color: #fff;
}
.header{
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.header{
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
  height: 46px;
  border-bottom: 1px solid #e6e6e6;
}
.header_left_title::before {
  content: "";
  display: block;
  margin: 0 6px 0 0;
  width: 4px;
  height: 14px;
  background-color: #3a7eda;
}
.header_left_title {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  color: #010419;
}

.info{
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 20px 0 0 0;
  width: 100%;
}
.info{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.info_block_title{
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.info_income{
  background-color: #6aa1ed;
}
.info_cost{
  background-color: #8371ee;
}
.info_expenses{
  background-color: #ffad65;
}
.info_profit {
  background-color: #ff6b73;
}
.info_block_1{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 23%;
  height: 170px;
  overflow: hidden;
}
.info_block_title_text{
  font-size: 18px;
  color: #fff;
}
.info_block_value{
  margin: 10px 0 0 0;
  padding: 0 10px;
  font-weight: 700;
  font-size: 28px;
  color: #fff;
  border-bottom: 4px solid #f5f5f5;
  cursor: pointer;
}
.oftenNav{
  padding: 0 20px;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}

.info_item, .info_item_icon {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}
.info_item {
  flex-direction: column;
  margin: 20px 40px 0 0;
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.info_item_icon {
  width: 54px;
  height: 54px;
  font-size: 30px;
  color: #fff;
  border-radius: 6px;
}
.infos{
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 0 20px 0;
  overflow: hidden;
}
.info_item_text{
  margin: 10px 0 0 0;
  line-height: 14px;
  font-size: 14px;
  color: #010419;
}
.saleStatus{
  padding: 0 20px;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.infoa,.info_saleSum{
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 80px;
}
.infoa{
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 30px 0;
  width: 100%;
}

.icon-zongjine-01{
  color: #ff6b73;
  background-color: #ffe2e2;
}
.icon-zongjine-02{
  color: #ffad65;
  background-color: #fdebd2;
}
.icon-zongjine-03{
  color: #8371ee;
  background-color: #dedcff;
}
.icon-zongjine-04{
  color: #6aa1ed;
  background-color: #dcefff;
}
.info_block_icon{
  -webkit-box-pack: center;
  width: 80px;
  height: 80px;
  font-size: 36px;
  border-radius: 50%;
  overflow: hidden;
}

.info_block_data,.info_block_data_label {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}
.info_block_data{
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin: 0 0 0 20px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  height: 80px;
}
.block_data_label_text {
  font-size: 18px;
  color: #333;
}
.info_block_data_value{
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: end;
  align-items: flex-end;
  margin: 10px 0 0 0;
}
.data_value_sign {
  font-weight: 700;
  line-height: 18px;
  font-size: 18px;
  color: #333;
}
.data_value_num{
  font-weight: 700;
  line-height: 27px;
  font-size: 28px;
  color: #333;
}
</style>