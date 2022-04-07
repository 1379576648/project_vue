<template>
  <div>
    <div>
      <el-button plain style="float: right" @click="shuaxin()"
        >高级搜索</el-button
      >
      <div style="width: 10px; float: right"></div>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width: 200px; float: right"
      ></el-input>
    </div>

    <br /><br /><br />
    <el-table :data="tableData" style="width: 100%" height="500px">
      <el-table-column prop="returnsaleId" label="序号" width="100px">
      </el-table-column>

      <el-table-column prop="commodityName" label="商品名称" width="180px">
      </el-table-column>

      <el-table-column prop="returnsaleReason" label="退货原因" width="180px">
      </el-table-column>

      <el-table-column prop="returnsaleMoney" label="退货金额" width="180px">
      </el-table-column>
      <el-table-column prop="salescheduleNumber" label="商品数量" width="180px">
      </el-table-column>
      <el-table-column prop="saleschedulePrice" label="商品价格" width="180px">
      </el-table-column>
      <el-table-column prop="salescheduleTotal" label="商品总价" width="180px">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <span class="span_1">|</span>
          &nbsp;
          <el-button type="text" size="small" @click="tiaozhuan(scope.row)"
            >详情</el-button
          >
          &nbsp;
          <span class="span_1">|</span>
          &nbsp;
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click="warehouse(scope.row)"
          >
            入库
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :currentPage="infopage.page"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="infopage.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="infopage.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import qs from "qs";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      radio: false,
      input: "",
      tableData: [],
      infopage: {
        size: 2,
        total: 0,
        page: 1,
      },
    };
  },
  methods: {
    tiaozhuan(row) {
      console.log(row);
      sessionStorage.setItem("userInfo", JSON.stringify(row));
      this.$router.push("/returnHistorydetails");
    },
    //分页方法
    handleCurrentChange(page) {
      var _this = this;
      this.infopage.page = page;
      var ps = qs.stringify(this.infopage);
      //   console.log(ps);
      this.axios
        .get(" http://localhost:9090/returnsale/before", {
          params: {
            page: this.infopage.page,
            size: this.infopage.size,
            like: this.input,
          },
        })
        .then((res) => {
          // console.log("1-------------------------------------------")
          // console.log(response.data)
          this.tableData = res.data.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      // var _this=this
      this.infopage.size = size;
      var ps = qs.stringify(this.infopage);
      console.log(ps);
      this.axios
        .get("http://localhost:9090/returnsale/before", {
          params: {
            page: this.infopage.page,
            size: this.infopage.size,
            like: this.input,
          },
        })
        .then((res) => {
          // console.log("2-------------------------------------------")
          // console.log(response.data)
          this.tableData = res.data.data.records;
          this.infopage.total = res.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    shuaxin() {
      this.axios
        .get("http://localhost:9090/returnsale/before", {
          params: {
            page: this.infopage.page,
            size: this.infopage.size,
            like: this.input,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.data.records;
          // this.pageInfo.total = res.data.total;
        })
        .catch(function (error) {
          console.log("失败");
          console.log(error);
        });
    },
    //入库操作
    warehouse(row){
        
    }
  },
  created() {
    this.axios
      .get("http://localhost:9090/returnsale/before", {
        params: {
          page: this.infopage.page,
          size: this.infopage.size,
          like: this.input,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.tableData = res.data.data.records;
        this.infopage.total = res.data.data.total;
      })
      .catch(function (error) {
        console.log("失败");
        console.log(error);
      });
  },
};
</script>

<style>
table {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
th {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.span_1 {
  color: #ddd;
}
a {
  text-decoration: none;
  color: #409eff;
}
</style>