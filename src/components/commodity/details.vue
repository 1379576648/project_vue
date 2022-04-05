<template>
  <div class="det_body_1">
    <div class="btn_sp">
      <el-button><router-link to="goin">商品列表</router-link></el-button>
    </div>
    <div class="det_body_2" style="margin:0px;">

      <div class="det_body_3">

        <div class="det_cl">
          <div style="float:left;margin-left: 100px;margin-top: 10px" class="edt_font">{{this.tatadata.commodityName}}</div>
        </div>

          <span class="det_zs"  style="float:left;margin-left: 100px">在售</span>
          <br>
          <div class="det_cl" >
            <br>

          <div class="det_bh"  style="float:left;margin-left: 100px;width: 15%;text-align: left">
           <span>编号&nbsp;:&nbsp;&nbsp;</span>
           <span>{{this.tatadata.commodityId}}</span>
          </div>

            <div class="det_bh"  style="float:left;margin-left: 100px;width: 15%;text-align: left">
              <span>分类&nbsp;:&nbsp;&nbsp;</span>
              <span>{{this.tatadata.categoryId}}</span>
            </div>

<!--            <div class="det_bh"  style="float:left;margin-left: 100px;width: 15%;text-align: left">-->
<!--              <span>条形码&nbsp;:&nbsp;&nbsp;</span>-->
<!--              <span>68032608506</span>-->
<!--            </div>-->

            <div class="det_bh"  style="float:left;margin-left: 100px;width: 25%;text-align: left">
              <span>单位&nbsp;:&nbsp;&nbsp;</span>
              <span>{{this.tatadata.commodityCompany}}</span>
            </div>

            <div class="det_bh"  style="float:left;margin-left: 100px;width: 100%;text-align: left" >
              <span>规格&nbsp;:&nbsp;&nbsp;</span>
              <span>{{this.tatadata.commoditySpecifications}}</span>
            </div>
            <div class="det_bh"  style="float:left;margin-left: 100px;width: 100%;text-align: left" >
              <span>备注&nbsp;:&nbsp;&nbsp;</span>
              <span>无</span>
              <div class="productPrice">
                <span>零售价&nbsp;:&nbsp;&nbsp;</span>
                <span style="color: #1dcf6a;">￥{{this.tatadata.retailPrice}}</span>
                <span>/{{this.tatadata.commoditySpecifications}}</span>
                <br>
                <span>进货价&nbsp;:&nbsp;&nbsp;</span>
                <span style="color: #1dcf6a;">￥{{this.tatadata.tradePrice}}</span>
                <span>/{{this.tatadata.commoditySpecifications}}</span>
                <br>
                <span>最低售价&nbsp;:&nbsp;&nbsp;</span>
                <span style="color: #1dcf6a;">￥{{this.tatadata.retailPrice}}</span>
                <span>/{{this.tatadata.commoditySpecifications}}</span>
                <br>
                <span>批发价&nbsp;:&nbsp;&nbsp;</span>
                <span style="color: #1dcf6a;">￥{{this.tatadata.tradePrice}}</span>
                <span>/{{this.tatadata.commoditySpecifications}}</span>
                <br>

              </div>

            </div>

            <br>




          </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "details",
  data(){
    return{
      tatadata:{},
    }
  },methods:{
    /*
   * 根据id查询 商品表
   * */
    selectById(){
      this.axios
          .get("http://localhost:9090/commodity/selectById/" + this.$route.query.id)
          .then((response => {
            console.log(response);
            this.tatadata = response.data;
            console.log(this.tatadata)
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
.edt_font{
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
  box-sizing: border-box;
  color: rgba(0,0,0,.65);
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
}
.det_body_1{
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
}
a{
  text-decoration:none ;
  color: #409eff;
}
.det_zs{
  color: #52c41a;
  background: #f6ffed;
  border-color: #b7eb8f;
  border: 1px solid #d9d9d9;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 0;
  cursor: default;
  opacity: 1;
  height: auto;
  margin-right: 8px;
  padding: 0 7px;
  float: left;
}
.det_bh{
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
}
.det_cl{
  float: left;
  width: 100%;
}
.det_body_2{
  width: 93%;
  height: 340px;
  border: 1px solid #ddd;
  background: white;
}
.btn_sp{
  position: absolute;
  right: 145px;
  top:90px;

}
.productPrice{
  background: #e5e5e5;
  padding: 12px;
  width: 85%;
/*  height: 20px;*/
  margin-top: 10px;

}
</style>