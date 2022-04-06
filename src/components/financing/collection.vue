<!--付款历史-->
<template>
  <div class="ant-card ant-card-bordered">
    <div class="ant-card-head" style="padding: 24px 16px 0px;">
      <div class="ant-card-body">
        <el-button type="primary" @click="goBack()">新增付款</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-checkbox label="查看作废单据" v-model="judge" @change="examine"/>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input style="width: 200px;"
                  v-model="seek"
                  placeholder="根据客户名称"
                  class="input-with-select"
                  clearable
        >
          <template #append>
            <el-button @click="selectAllTab()">
              <el-icon>
                <search/>
              </el-icon>
            </el-button>
          </template>
        </el-input>
        &nbsp;
<!--        <el-button @click="drawer = true">高级搜索</el-button>-->
        <br/>
        <br/>
        <el-table
            :data="tableData"
            border
            id="scroll3"
            style="width: 100%;max-height:calc(100vh - 218px);"
            :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
            :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <el-table-column label="序号" type="index" width="80"/>
          <el-table-column prop="tabTime" label="业务日期" width="160" sortable/>
          <el-table-column prop="receivableId" label="单据编号" width="160" sortable/>
          <el-table-column prop="customerName" label="客户名称" width="160" sortable/>
          <el-table-column prop="settlement" label="结算账户" width="160" sortable/>
          <el-table-column prop="tabMoney" label="本单收回欠款(元)" width="160" sortable/>
          <el-table-column prop="coupon" label="本单优惠金额(元)" width="160" sortable/>
          <el-table-column prop="customerName" label="经手人" width="160" sortable/>
          <el-table-column prop="customerName" label="制单人" width="160" sortable/>
          <el-table-column prop="tabTime" label="制单时间" width="160" sortable/>
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button type="text" size="small" @click="(value= {id:scope.row.tabId,id2:scope.row.receivableId}),goBack2(value)"
              >详情
              </el-button>
              <el-popconfirm title="您确定要作废该单据吗？" @confirm="(value= {id:scope.row.tabId}),cancellationById(value)">
                <template #reference>
                  <el-button type="text" size="small">作废</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[1, 3, 5, 7]"
              v-model:page-size="pageInfo.pageSize"
              :default-page-size="pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              background
              next-text="下一页"
              prev-text="上一页"
              @size-change="selectAllTab()"
              @current-change="selectAllTab()"
              @prev-click="selectAllTab()"
              @next-click="selectAllTab()">
            prev-text="上一页"
            next-text="下一页"
            >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>

<!--  &lt;!&ndash; 抽屉 &ndash;&gt;-->
<!--  <el-drawer v-model="drawer" :with-header="false">-->
<!--    <span>高级搜索</span>-->
<!--    <el-divider/>-->
<!--    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">-->
<!--      <el-form-item label="收款单编号:" prop="collectionId">-->
<!--        <el-input v-model="formInline.collectionId" placeholder="输入收款单编号"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="结算账户:" prop="closeAccount">-->
<!--        <el-select v-model="formInline.closeAccount" placeholder="全部">-->
<!--          <el-option label="全部" value="全部"></el-option>-->
<!--          <el-option label="现金" value="现金"></el-option>-->
<!--          <el-option label="微信" value="微信"></el-option>-->
<!--          <el-option label="支付宝" value="支付宝"></el-option>-->
<!--          <el-option label="系统账户" value="系统账户"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="制单人:" prop="name">-->
<!--        <el-select v-model="formInline.preparedName" placeholder="全部">-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="经手人:" prop="passName">-->
<!--        <el-select v-model="formInline.passName" placeholder="全部">-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户名称:" prop="clientName">-->
<!--        <el-select v-model="formInline.clientName" placeholder="全部">-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="业务时间:" prop="operationDate">-->
<!--        <el-date-picker-->
<!--            v-model="formInline.operationDate"-->
<!--            type="daterange"-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始时间"-->
<!--            end-placeholder="结束时间"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button @click="resetForm()">清空</el-button>-->
<!--        <el-button>查询</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </el-drawer>-->

</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      // 访问地址
      url: "http://localhost:9090/",
      //表格数据
      tableData: [{}],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },
      //搜索
      seek: '',
      // 抽屉
      drawer: false,
      // 抽屉表单
      formInline: {
        collectionId: '',
        closeAccount: '',
        preparedName: '',
        passName: '',
        clientName: '',
        operationDate: []
      },
      // 多选框判断
      judge: false
    }

  },
  methods: {
    // 查询所有付款历史
    selectAllTab() {
      const seek = this.seek === "" ? "*****1*****1*****1" : this.seek;
      this.axios({
        method: 'get',
        url: this.url + 'tab/selectAllTab/' + this.pageInfo.currentPage + '/' + this.pageInfo.pageSize + '/' + seek,
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有付款历史");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            this.tableData = response.data.data.info.records
            this.pageInfo.pageSize = response.data.data.info.size;
            this.pageInfo.total = response.data.data.info.total;
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    // 查询所有作废付款历史
    selectAllTabAbolish() {
      this.axios({
        method: 'get',
        url: this.url + 'tab/selectAllTabAbolish/' + this.pageInfo.currentPage + '/' + this.pageInfo.pageSize,
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有付款历史");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            this.tableData = response.data.data.info.records
            this.pageInfo.pageSize = response.data.data.info.size;
            this.pageInfo.total = response.data.data.info.total;
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    // 作废记录根据编号ID
    cancellationById(value) {
      this.axios({
        method: 'delete',
        url: this.url + 'tab/cancellationById/' + value.id,
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("作废记录根据编号ID");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            ElMessage({
              message: response.data.data.info,
              type: 'success',
            })
            this.selectAllTab();
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    // 判断多选框
    examine() {
      // 如果为true 则调 查询所有作废付款历史
      if (this.judge === true) {
        this.selectAllTabAbolish();
      }else {
       this.selectAllTab();
      }
    },
    //跳转到收款单
    goBack() {
      this.$router.push({path: '/financing/proceeds'})
    },
    //跳转到收款详情
    goBack2(value) {
      this.$router.push({path: '/financing/collection_details',query:{NowId:value.id,NowId2:value.id2}})
    },
    // 清空表单
    resetForm() {
      this.$refs.formInline.resetFields()
    }
  }, created() {
    // 查询所有付款历史
    this.selectAllTab();
  }
}
</script>

<style scoped>
/deep/ .ant-card-bordered {
  border: 1px solid #e8e8e8;
}

/deep/ .ant-card-body {
  padding: 12px;
}

/deep/ .ant-card-head {
  min-height: 48px;
  margin-bottom: -1px;
  padding: 0 24px;
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  zoom: 1;
  background: #fff;
}

/deep/ .ant-card {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  -webkit-transition: all .3s;
  transition: all .3s;
}

/deep/ .cell {
  color: #606266;
  font-size: 12px;
  text-align: center;
}
</style>