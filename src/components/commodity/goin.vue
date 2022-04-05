<template>

  <div style="height: 630px;width: 98.5%;background: white;border: 1px solid #ddd;">
    <span class="spn_sp">商品列表</span>
    <br>
    <br>
    <el-divider style="margin: 15px 0px;"></el-divider>


    <div style="padding: 10px">
      <el-button style="float:left" type="primary">添加商品</el-button>


      <div>
        <el-button plain style="float: right" @click="selectpage()">高级搜索</el-button>
        <div style="width: 10px;float: right"></div>
        <el-input v-model="pageInfo1.input" placeholder="输入你要搜索的名称" style="width: 200px;float: right"></el-input>

      </div>

      <br><br><br>

      <el-table
          :data="tableData"
          style="width: 99%"
          border
          :header-cell-style="{background:'rgb(248, 248, 249)'}"
          height="400"
      >
        <el-table-column
            fixed
            prop="commodityId"
            label="序号"
            width="120%"
        >
        </el-table-column>
        <el-table-column
            fixed
            prop="commodityName"
            label="商品名称"
            width="120">
        </el-table-column>

        <el-table-column
            prop="retailPrice"
            label="零售价"
            width="120">
        </el-table-column>
        <el-table-column
            prop="commodityCompany"
            label="规格"
            width="300">
        </el-table-column>
        <el-table-column
            prop="commoditySpecifications"
            label="单位"
            width="300">
        </el-table-column>
        <el-table-column
            prop="maxNumber"
            label="最大库存"
            width="300">
        </el-table-column>
        <el-table-column
            prop="minNumber"
            label="最低库存"
            width="300">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="200"
        >
          <template #default="scope">

            <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->
            <el-button
                class="font_sty"
                type="text"
                size="small"
                @click="to_edit(scope.row.commodityId)">
              <!--          <router-link to="edit">编辑</router-link>-->
              编辑
            </el-button>
            &nbsp;
            <span class="span_1">|</span>
            &nbsp;
            <el-button
                type="text"
                size="small"
                @click="to_details(scope.row.commodityId)"
            >
              详情
            </el-button>
            &nbsp;
            <span class="span_1">|</span>
            &nbsp;
            <el-button
                type="text"
                size="small"
                style="color: red"
                @click="deteleById(scope.row)"
            >
              移除
            </el-button>
          </template>

        </el-table-column>


      </el-table>

      <div class="demo-pagination-block" style="float: right;">
        <!--        <span class="demonstration">All combined</span>-->
        <el-pagination
            v-model:currentPage="pageInfo1.currentPage"
            v-model:page-size="pageInfo1.pageSize"
            :default-page-size="pageInfo1.pageSize"
            :page-sizes="[3, 5, 10, 50]"
            :pager-count="5"
            :total="pageInfo1.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="selectpage(2)"
            @current-change="selectpage(2)"
        >
          <!--        @size-change="selectAuditflow(2)"-->
          <!--        @current-change="selectAuditflow(2)"-->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script scope>
export default {
  name: "goin",
  data() {
    return {
      pageInfo1: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
        input: '',
      },

      tableData: []
    }
  }, methods: {
    /*
   * 根据id删除商品表
   * */
    deteleById(row){
      this.axios
          .delete("http://localhost:9090/commodity/delete/"+row.commodityId)
          .then((res=>{
            if(res.data === 1){
              this.$message({
                message: '删除成功！！！',
                type: 'success'
              });
              //调用查询
              this.selectpage()
            }else {
              this.$message({
                message: '删除失败！！！',
                type: 'error'
              });
            }
          })).catch(function (error) {
        console.log(error);
      })
    },
    //分写查询商品表
    selectpage() {
      this.axios
          .get("http://localhost:9090/commodity/selectPageC/" ,{params:this.pageInfo1})
          .then((response => {
            console.log(response);
            this.tableData = response.data.data.records;
            this.pageInfo1.total = response.data.data.total;
            console.log(this.tableData)
          })).catch(function (error) {
        console.log(error);
      })
    },
    //名称查询商品表
    selectName(){
      this.axios
      .get("http://localhost:9090/commodity/selectName/"+this.input)
      .then((response=>{
        console.error(response);
        this.tableData = response.data;
        console.error(this.tableData)
      }))
          .catch(function (error) {
            console.log(error);
          })
    },
    // 编辑
    to_edit(id) {
      // 跳转页面
      this.$router.push({path: "/edit", query: {path: this.$route.query.path,id:id}})
    },
    to_details(id){
      this.$router.push({path: "/details", query: {path: this.$route.query.path,id:id}})
    }
  }, created() {
    this.selectpage()
  }
}
</script>

<style>
/*table{*/
/*  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/

/*}*/
/*th{*/
/*  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/

/*}*/
.span_1 {
  color: #ddd;
}

.font_sty {

}

.edit_body span {
  font-size: 16px;
  float: left;
  margin: 20px;
  color: #2c3e50;
}

.spn_sp {
  font-size: 16px;
  float: left;
  margin: 20px;
  color: #2c3e50;
}

a {
  text-decoration: none;
  color: #409eff;
}

.demo-pagination-block {
  margin-left: 850px;
  margin-top: 20px;
  margin-bottom: 30px;
}

</style>