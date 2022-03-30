<template>
  <div class="ant-card ant-card-bordered">
    <div class="ant-card-head" style="padding: 24px 16px 0px;">
      <div class="ant-card-body">
        <el-button type="primary" @click="goBack()">新增付款</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-checkbox label="查看作废单据"/>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input style="width: 200px;"
                  v-model="seek"
                  placeholder="编号、备注"
                  class="input-with-select"
        >
          <template #append>
            <el-button>
              <el-icon>
                <search/>
              </el-icon>
            </el-button>
          </template>
        </el-input>
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
            <el-table-column prop="name" label="序号" type="index" width="80"/>
            <el-table-column prop="name" label="业务日期" width="160" sortable/>
            <el-table-column prop="address" label="单据编号" width="160" sortable/>
            <el-table-column prop="address" label="供应商名称" width="160" sortable/>
            <el-table-column prop="address" label="结算账户" width="160" sortable/>
            <el-table-column prop="address" label="本单付出欠款(元)" width="160" sortable/>
            <el-table-column prop="address" label="本单优惠金额(元)" width="160" sortable/>
            <el-table-column prop="address" label="经手人" width="160" sortable/>
            <el-table-column prop="address" label="制单人" width="160" sortable/>
            <el-table-column prop="address" label="制单时间" width="160" sortable/>
            <el-table-column prop="address" label="图片附件" width="160"/>
            <el-table-column prop="address" label="是否作废" width="160"/>
            <el-table-column fixed="right" label="操作" width="160">
              <template #default="scope">
                <el-button type="text" size="small"
                >详情
                </el-button>
                <el-popconfirm title="您确定要作废该单据吗？">
                  <template #reference>
                    <el-button type="text" size="small">作废</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        <!-- 分页插件 -->
        <div style="margin-top: 10px;">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[4, 5, 10, 50]"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              prev-text="上一页"
              next-text="下一页"
              @size-change=""
              @current-change=""
              background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表格数据
      tableData: [{
        name: '111',
      }],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 5, // 页大小
        total: 0, // 总页数
      },
      //搜索
      seek: '',
    }
  },
  methods: {
    //跳转到付款单
    goBack() {
      this.$router.push({path: '/financing/payment'})
    },
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