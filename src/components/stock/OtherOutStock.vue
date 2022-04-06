<!-- 其他出库单 -->

<template>
  <!-- 外围div -->
  <div style="background-color: white;padding: 20px;">
    <!-- 头部 -->
    <div style="text-align: center;border-bottom: 1px dotted lightgray;">
      <h2>其他出库单</h2>
      <span style="color: #00000073;margin-left: 80%;">
				单据编号：
				<span style="color: #000000D9;">
          {{ billId }}
				</span>
			</span>
    </div>
    <!-- 左 -->
    <div style="margin-top: 10px;padding: 20px;float: left;">
      仓库:
      <el-select v-model="stockId" placeholder="选择仓库" clearable >
        <el-option v-for="item in allStock" :key="item.STOCK_ID" :label="item.STOCK_NAME" :value="item.STOCK_ID"/>
      </el-select>

      &nbsp;&nbsp;&nbsp;

      出库类型:
      <el-select v-model="outInStockTypeId" placeholder="选择出库类型" clearable >
        <el-option v-for="item in allOutStockType" :key="item.OUTINSTOCKTYPE_ID" :label="item.OUTINSTOCKTYPE_NAME"
                   :value="item.OUTINSTOCKTYPE_ID"/>
      </el-select>
    </div>
    <!-- 右 -->
    <div style="margin-top: 10px;padding: 20px;float: right;">
      经手人:
      <el-select v-model="value" placeholder="选择经手人">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>

      &nbsp;&nbsp;&nbsp;

      业务日期:
      <el-date-picker disabled v-model="otheroutStockTime" type="date" placeholder="选择日期"/>
    </div>

    <!-- 表格 -->
    <el-table :data="pitchOnGoods" border
              :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
              :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="date" label="序号" min-width="21%">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="commodityName" label="商品名称" min-width="150%">
        <template #default="scope">
          <el-input v-if="scope.row.commodityName==''" @click="clickSelectGoods()" placeholder="选择商品"/>
        </template>
      </el-table-column>
      <el-table-column prop="commoditySpecifications" label="规格/属性"/>
      <el-table-column prop="commodityCompany" label="单位"/>
      <!--      <el-table-column prop="commodityNumber" label="数量">-->
      <el-table-column label="数量">
        <template #default="scope">

          <span v-show="false">{{
              scope.row.goodsNumber == null ? scope.row.goodsNumber = 1 : scope.row.goodsNumber
            }}</span>

          <el-input-number v-if="scope.row.commodityName!=''" controls-position="right"
                           v-model="scope.row.goodsNumber" :min="1"
                           :max="scope.row.availablestock"
                           placeholder="输入数量"/>

        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注">
        <template #default="scope">
          <el-input v-if="scope.row.commodityName!=''" v-model="scope.row.remarks" placeholder="输入备注"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" min-width="50%">
        <template #default="scope">
          <el-button @click="deleteTableRow(scope.$index,pitchOnGoods)" type="text">删除</el-button>
          <el-button @click="addTableRow" type="text">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 选择商品 对话框 -->
    <el-dialog width="80%" v-model="selectGoodsDialog" title="选择商品">
      <div style="float: right;">
        <!-- 商品分类 -->
        <el-select v-model="categoryNameLabel" placeholder="选择商品分类" >
          <el-option hidden/>
          <el-tree :data="allCategory" :props="defaultProps" @node-click="handleNodeClick"/>
          <!--          <el-option v-for="item in allCategory" :key="item.categoryId" :label="item.categoryName"-->
          <!--                     :value="item.categoryId"/>-->
        </el-select>
        &nbsp;&nbsp;
        <!-- 商品名称搜索 -->
        <el-input v-model="commodityName" style="width: 200px;" placeholder="商品名称" clearable />
        &nbsp;&nbsp;
        <el-button @click="selectGoodsRepertoryPage" type="primary">搜索</el-button>

      </div>
      <br/><br/>
      <!-- 商品表格 -->
      <el-table :data="goodsTableData" border
                :row-key="getRowKey"
                ref="multipleTableRef"
                @selection-change="handleSelectionChange"
                :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                :cell-style="{ textAlign: 'center' }">
        <el-table-column :index="indexMethod" type="index" label="序号" min-width="25%"/>
        <el-table-column type="selection" :reserve-selection="true" min-width="25%"/>
        <el-table-column prop="commodityName" label="商品名称" min-width="150%"/>
        <el-table-column prop="categoryName" label="商品类别"/>
        <el-table-column prop="commoditySpecifications" label="规格/属性"/>
        <el-table-column prop="commodityCompany" label="单位"/>
        <!--        <el-table-column prop="name" label="参考进货价"/>-->
        <el-table-column prop="actualStock" label="实际库存"/>
        <el-table-column prop="availablestock" label="可用库存"/>

      </el-table>
      <!-- 分页 -->
      <br/>
      <div style="float: right;">
        <el-pagination v-model:currentPage="pageInfo.currentPage" :page-sizes="[3, 5, 10, 50]"
                       v-model:page-size="pageInfo.pageSize" :default-page-size="pageInfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" :pager-count="5"
                       background
                       @size-change="selectGoodsRepertoryPage" @current-change="selectGoodsRepertoryPage">
        </el-pagination>
      </div>
      <br/>
      <template #footer>
        <div style="text-align: center;">
          <el-button @click="selectGoodsDialog = false">取消</el-button>
          <el-button type="primary" @click="trueSelect">确认选择</el-button>
        </div>
      </template>
    </el-dialog>


    <!-- <el-input v-model="input3" class="w-50 m-2" placeholder="大大">
      <template #suffix>
        <el-icon class="el-input__icon">
          <el-search />
        </el-icon>
      </template>
    </el-input>
    a<i-edit />
    b<i class="i-icon-edit"></i> -->


  </div>

  <div style="background-color: white;padding: 20px;margin-top: 12px">
    备注；<br/><br/>
    <el-input v-model="remark" :rows="2" type="textarea" placeholder="请输入备注信息"/>
    <br/> <br/>

    <div style="float: right">
      <el-button @click="reset">重置</el-button>
      <el-button @click="verifyBeforeInsert" type="primary">保存并出库</el-button>
    </div>

    <br/> <br/>

  </div>


  <!-- <div style="width: 100%;height: 10%;bottom: 0px;border: 1px solid #666;box-shadow: 2px 2px 10px 5px #F63;">
    aaa
  </div> -->

</template>

<script>
// import { Calendar, Search } from '@element-plus/icons-vue'
import {
  ElMessage
} from 'element-plus'

export default {
  data() {
    return {
      // 选择商品 对话框
      selectGoodsDialog: false,
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },
      // 所有仓库
      allStock: [],
      // 仓库id
      stockId: "",
      // 所有出库类型
      allOutStockType: [],
      // 出库类型id
      outInStockTypeId: "",
      // 业务日期
      otheroutStockTime: new Date(),
      // 商品分类
      allCategory: "",
      // 商品分类id
      categoryIds: [],
      // 选中 商品分类回显的值
      categoryNameLabel: "",
      // 商品名称 输入框
      commodityName: "",

      // 单据编号
      billId: "",
      // 备注
      remark: "",

      // 商品分类 默认属性
      defaultProps: {
        children: 'children',
        label: 'categoryName',
      },

      // 出库单商品
      tableData: [],

      // 商品数据
      goodsTableData: [],

      // 选中的商品数据
      pitchOnGoods: [
        {
          commodityId: "",// 商品id
          commodityName: "",// 商品名字
          commoditySpecifications: "",// 商品规格
          commodityCompany: "",// 商品单位
          goodsNumber: 1,// 商品数量
          remark: "",// 备注
        },
      ],

    }
  },
  methods: {

    //
    test2() {

      console.log("表格表格：", this.pitchOnGoods)

    },

    // 重置出库单
    reset() {
      // 重置单据编号
      this.codeId()
      // 重置出库id
      this.stockId = ""
      // 重置出库类型
      this.outInStockTypeId = ""
      // 重置备注
      this.remark = ""
      // 重置出库详情表格
      this.pitchOnGoods = [
        {
          commodityId: "",// 商品id
          commodityName: "",// 商品名字
          commoditySpecifications: "",// 商品规格
          commodityCompany: "",// 商品单位
          goodsNumber: 0,// 商品数量
          remark: "",// 备注
        },
      ]
      // 重置选中
      this.tableData = []
      this.$refs.multipleTableRef.clearSelection()

    },

    // 测试表格回显
    clickTest() {

      alert(11)

      this.pitchOnGoods = [
        {
          "commodityId": 1,
          "commodityName": "鸿星尔克运动鞋",
          "commodityCompany": "双",
          "commoditySpecifications": "38~45码",
          "actualStock": 20,
          "availablestock": 20,
          "categoryId": 10,
          "categoryName": "男鞋"
        },
      ]

      this.goodsTableData = [
        {
          "commodityId": 1,
          "commodityName": "鸿星尔克运动鞋",
          "commodityCompany": "双",
          "commoditySpecifications": "38~45码",
          "actualStock": 20,
          "availablestock": 20,
          "categoryId": 10,
          "categoryName": "男鞋"
        },
      ]

    },

    // 当某节点被点击时调用的方法
    handleNodeClick(data) {

      // 选中 商品分类回显的值
      this.categoryNameLabel = data.categoryName

      // 清空商品分类id List
      this.categoryIds = []

      // 将选中商品分类id push 进入 商品分类id List
      this.categoryIds.push(data.categoryId)

      // 获取所有子类id
      this.gainAllChildrenId(data.children, this.categoryIds)

      console.error("商品分类id List:", this.categoryIds)

      console.error("当某节点被点击时调用的方法:", data)
    },

    // 获取商品所有子类id
    gainAllChildrenId(children, categoryIds) {
      children.forEach(item => {

        console.error("children List:", item.children)
        // 将选中商品分类的子类id 也 push 进入 商品分类id List
        categoryIds.push(item.categoryId)

        // 如果还有子类，再次循环所有子类
        if (item.children.length > 0) {
          this.gainAllChildrenId(item.children, categoryIds)
        }

      })

      console.error("子类子类：", categoryIds)

    },

    // 表格 行 唯一标识
    getRowKey(row) {
      return row.commodityId
    },

    // 选中的商品发生变化时调用的方法
    handleSelectionChange(val) {
      // 选中的商品数据
      this.tableData = val
    },

    // 确认选择时调用的方法
    trueSelect() {

      if (this.tableData.length < 1) {
        ElMessage({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }

      // 关闭对话框
      this.selectGoodsDialog = false
      // 取选中数据
      this.pitchOnGoods = this.tableData
    },

    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;

      // return this.pageInfo.total - (index + (curpage - 1) * limitpage);
    },

    // 点击表格选择商品时调用的方法
    clickSelectGoods() {
      // 是否选择仓库
      if (this.stockId != null && this.stockId != "") {
        // 打开选择商品对话框
        this.selectGoodsDialog = true
        // 调用 查询所有商品分类
        this.selectAllCategory()
        // 调用 查询商品库存
        this.selectGoodsRepertoryPage()

        return
      }

      ElMessage({
        message: '请先选择仓库',
        type: 'warning',
      })


    },

    // 单据编号生成器
    codeId() {

      // 单据编号
      let codeId = ""
      // 当前时间
      let date = new Date();

      // 年
      let year = date.getFullYear()
      // 月
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      // 日
      let day = date.getDate() + 1 < 10 ? "0" + (date.getDate()) : date.getDate();
      // 时
      let hours = date.getHours() + 1 < 10 ? "0" + (date.getHours()) : date.getHours();
      // 分
      let minutes = date.getMinutes() + 1 < 10 ? "0" + (date.getMinutes()) : date.getMinutes();
      // 秒
      let seconds = date.getSeconds() + 1 < 10 ? "0" + (date.getSeconds()) : date.getSeconds();

      console.error("现在的时间是：公元" + year + "年" + month + "月" + day + "日      " + hours + "时" + minutes + "分" + seconds + "秒       星期" + date.getDay())

      this.billId = "CK" + year + month + day + hours + minutes + seconds

    },

    // 查询所有仓库
    selectAllStock() {

      this.axios.get("http://localhost:9090/otheroutstock/selectAllStock")
          .then((response) => {
            console.error("查询所有仓库:", response)
            this.allStock = response.data.data
          }).catch(function (error) {
        console.log('查询所有仓库失败')
        console.log(error);
      })

    },

    // 查询出库类型
    selectAllOutStockType() {

      this.axios.get("http://localhost:9090/otheroutstock/selectAllOutStockType")
          .then((response) => {
            console.error("查询出库类型:", response)
            this.allOutStockType = response.data.data
          }).catch(function (error) {
        console.log('查询出库类型失败')
        console.log(error);
      })

    },

    // 删除表格行
    deleteTableRow(index, rows) {

      if (rows.length > 1) {
        rows.splice(index, 1);
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '至少留一个吧',
          type: 'warning',
        })
      }

    },

    // 添加表格行
    addTableRow() {
      let newRow = {
        commodityId: "",// 商品id
        commodityName: "",// 商品名字
        commoditySpecifications: "",// 商品规格
        commodityCompany: "",// 商品单位
        goodsNumber: 0,// 商品数量
        remarks: "",// 备注
      }
      this.pitchOnGoods.push(newRow)

    },

    // 查询所有商品分类
    selectAllCategory() {

      this.axios.get("http://localhost:9090/otheroutstock/selectAllCategory")
          .then((response) => {
            console.error("查询所有商品分类:", response)
            this.allCategory = response.data.data
          }).catch(function (error) {
        console.log('查询所有商品分类失败')
        console.log(error);
      })

    },

    /*
    * 选择商品
    *  查询商品库存 (按仓库id，商品分类，商品名称，分页)
    * */
    selectGoodsRepertoryPage() {

      this.axios({
        url: "http://localhost:9090/otheroutstock/selectGoodsRepertoryPage",
        method: "post",
        data: {
          // 当前页
          currentPage: this.pageInfo.currentPage,
          // 页大小
          pageSize: this.pageInfo.pageSize,
          // 仓库id
          stockId: this.stockId,
          //商品分类id list
          categoryId: this.categoryIds,
          // 商品名称
          commodityName: this.commodityName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error("查询商品库存:", response)
        this.goodsTableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('查询商品库存失败')
        console.log(error);
      })

    },

    // 新增前验证
    verifyBeforeInsert() {

      if (this.stockId == null || this.stockId == "") {
        ElMessage({
          message: '请选择仓库',
          type: 'warning'
        })
        return
      }

      if (this.outInStockTypeId == null || this.outInStockTypeId == "") {
        ElMessage({
          message: '请选择出库类型',
          type: 'warning'
        })
        return
      }

      if (this.pitchOnGoods.length < 1) {
        ElMessage({
          message: '请选择出库商品',
          type: 'warning'
        })
        return
      }

      let i=1

      this.pitchOnGoods.forEach(item => {

        if (item.commodityName == "") {
          ElMessage({
            message: '商品名称不能为空',
            type: 'warning'
          })
          return
        }
        // 循环到最后
        if(i==this.pitchOnGoods.length){
          // 调用添加入库单
          this.insertOtheroutstock()
        }
        i++

      })

    },

    // 添加其他出库单
    insertOtheroutstock() {

      this.axios({
        url: "http://localhost:9090/otheroutstock/insertOtheroutstock",
        method: "post",
        data: {
          // 其他出库单
          Otheroutstock: {
            // 单据编号
            billId: this.billId,
            // 仓库编号
            stockId: this.stockId,
            // 出库类型编号
            outinstocktypeId: this.outInStockTypeId,
            // 经手人编号 (员工编号)
            staffId: 1,
            // 业务日期
            otheroutStockTime: this.otheroutStockTime,
            // 备注
            remark: this.remark,

          },
          // 其他出库单详情
          Otheroutstockdetails: this.pitchOnGoods
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {

        console.error("添加其他出库单:", response)

        if (response.data.data > 0) {
          ElMessage({
            message: '出库成功',
            type: 'success'
          })

          // 跳转 出库历史
          this.$router.push({path:'otherOutStockAll',query:{path:this.$route.query.path}})

        } else {
          ElMessage({
            message: '出库失败',
            type: 'warning'
          })
        }

      }).catch(function (error) {
        console.log('添加其他出库单失败')
        console.log(error);
      })

    },

  },
  created() {
    // 生成单据编号
    this.codeId()
    // 查询所有仓库
    this.selectAllStock()
    // 查询出库类型
    this.selectAllOutStockType()
  }
}
</script>

<style>

body {
  /*background-color: gray;*/
}

</style>
