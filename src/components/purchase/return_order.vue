<!-- 其他出库单 -->

<template>
  <!-- 外围div -->
  <div style="background-color: white;padding: 20px;">
    <!-- 头部 -->
    <div style="text-align: center;border-bottom: 1px dotted lightgray;">
      <h2>退货单</h2>
      <span style="margin-left: 80%;">
        <el-button style="width: 85px;height: 35px">
          <router-link to="returnHistory">退货历史</router-link></el-button>
      </span>
      <span style="color: #00000073;margin-left: 80%;">
				单据编号：
				<span style="color: #000000D9;">
					JH202203290001
				</span>
			</span>
    </div>
    <!-- 左 -->
    <div style="margin-top: 10px;padding: 20px;float: left;">
      仓库:
      <el-select v-model="value" placeholder="选择仓库">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>

      供应商:
      <el-select v-model="value" placeholder="请选择供应商">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </div>

    <!-- 右 -->
    <div style="margin-top: 10px;padding: 20px;float: right;">
      经手人:
      <el-input style="width: 180px" disabled></el-input>

      业务日期:
      <el-date-picker
          v-model="datetime"
          type="datetime"
          placeholder="Select date and time"
      />
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" border
              :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
              :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="date" label="序号" min-width="21%"/>
      <el-table-column prop="date" label="商品名称" width="200px"/>
      <el-table-column prop="name" label="单位"/>
      <el-table-column prop="name" label="单价"/>
      <el-table-column prop="name" label="数量"/>
      <el-table-column prop="name" label="总金额"/>
      <el-table-column prop="name" label="备注"/>
      <el-table-column prop="name" label="操作" min-width="50%">
        <el-button type="text">删除</el-button>
        <el-button type="text">添加</el-button>
      </el-table-column>

    </el-table>
    <div style="margin-top:10px;height: 30px">
      <span>退货金额：</span><span></span>
    </div>
  </div>
  <br/>
  <div style="background-color: white;padding: 20px;">
    备注；<br/><br/>
    <el-input :rows="2" type="textarea" placeholder="请输入备注信息"/>
  </div>
  <div class="button_box">
    <div style="display: inline-block;margin-left: 1076px">
      <el-button>取消</el-button>
      <el-button>保存</el-button>
      <el-button type="primary">保存出库</el-button>
    </div>

  </div>


</template>

<script>
// import { Calendar, Search } from '@element-plus/icons-vue'
import {
  ElMessage
} from 'element-plus'
import {ref} from 'vue'

export default {
  data() {
    return {
      //时间
      datetime:ref(''),
      // 选择商品 对话框
      selectGoodsDialog: false,
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },

      tableData: [{
        date: '1',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
        {
          date: '2',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '3',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '4',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]

    }
  },
  methods: {},
  created() {

  }
}
</script>

<style>

body {

}

.button_box {
  margin-top: 15px;
  background: white;
  height: 60px;
  width: 100%;
  line-height: 60px;
}
a{
  text-decoration: none;
  color: deepskyblue;
}

</style>
