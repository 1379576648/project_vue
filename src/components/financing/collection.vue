<template>
  <div style="width: 100%;height: 100%;">
    <div>
    <el-button>新增收款</el-button>
    &nbsp;
    <el-checkbox>
      查看作废单据
    </el-checkbox>
    &nbsp;
    <el-button @click="drawer = true">高级搜索</el-button>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="date"
          label="序号"
          width="80">
      </el-table-column>
      <el-table-column
          prop="businessDate"
          label="业务日期"
          width="130">
      </el-table-column>
      <el-table-column
          prop="invoicesId"
          label="单据编号"
          width="130">
      </el-table-column>
      <el-table-column
          prop="clientName"
          label="客户名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="Payment"
          label="结算账号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="collectPayment"
          label="本单收回欠款（元）"
          width="120">
      </el-table-column>
      <el-table-column
          prop="coupon"
          label="本单优惠金额"
          width="120">
      </el-table-column>
      <el-table-column
          prop="handlerName"
          label="经手人"
          width="120">
      </el-table-column>
      <el-table-column
          prop="preparedName"
          label="制单人"
          width="120">
      </el-table-column>
      <el-table-column
          prop="preparedDate"
          label="制单时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="picture"
          label="图片附件"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cancellation"
          label="是否作废"
          width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button type="text" size="small" @click="handleClick"
          >详情
          </el-button
          >
          <el-button type="text" size="small">作废</el-button>
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
          @size-change=""
          @current-change=""
          @prev-click=""
          @next-click="">
        prev-text="上一页"
        next-text="下一页"
        >
      </el-pagination>
    </div>
    <!-- 抽屉 -->
    <el-drawer v-model="drawer" :with-header="false">
      <span>高级搜索</span>
      <el-divider/>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="收款单编号:" prop="collectionId">
          <el-input v-model="formInline.collectionId" placeholder="输入收款单编号"></el-input>
        </el-form-item>
        <el-form-item label="结算账户:" prop="closeAccount">
          <el-select v-model="formInline.closeAccount" placeholder="全部">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="现金" value="现金"></el-option>
            <el-option label="微信" value="微信"></el-option>
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="系统账户" value="系统账户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人:" prop="name">
          <el-select v-model="formInline.preparedName" placeholder="全部">
          </el-select>
        </el-form-item>
        <el-form-item label="经手人:" prop="passName">
          <el-select v-model="formInline.passName" placeholder="全部">
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称:" prop="clientName">
          <el-select v-model="formInline.clientName" placeholder="全部">
          </el-select>
        </el-form-item>
        <el-form-item label="业务时间:" prop="operationDate">
          <el-date-picker
              v-model="formInline.operationDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm()">清空</el-button>
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格
      tableData: [{
        date: '1',
        businessDate: '2016-05-02',
        invoicesId: 'SK202203280001',
        clientName: '小花',
        Payment: '支付宝',
        collectPayment: 200,
        coupon: 100,
        handlerName: '小红',
        preparedName: '小黑',
        preparedDate: '2016-05-02',
        picture: '无',
        cancellation: '正常'
      }],
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },
      // 抽屉
      drawer: false,
      // 抽屉表单
      formInline: {
        collectionId: '',
        closeAccount: '',
        preparedName: '',
        passName: '',
        clientName: '',
        operationDate:[]
      },
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 清空表单
    resetForm() {
      this.$refs.formInline.resetFields()
    }
  },
}
</script>