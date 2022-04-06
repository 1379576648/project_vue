
<!-- 其他出库单 -->

<template>
  <!-- 外围div -->
  <div style="background-color: white;padding: 20px;">
    <!-- 头部 -->
    <div style="text-align: center;border-bottom: 1px dotted lightgray;">
      <h2>销售退货单</h2>
      <span style="color: #00000073;margin-left: 80%;">
				单据编号：
				<span style="color: #000000D9;">
            {{this.desc}}
				</span>
			</span>
    </div>
    <!-- 左 -->
    <div style="margin-top: 10px;padding: 20px;float: left;">
      仓库:
      <el-select v-model="warehouse" placeholder="请选择仓库" disabled style="width: 200px;margin-left: 15px">
        <el-option
            v-for="item in stocklists"
            :key="item.STOCK_ID"
            :label="item.STOCK_NAME"
            :value="item.STOCK_ID"
        >
        </el-option>
      </el-select>


      &nbsp;&nbsp;&nbsp;

      销售单:

        <el-input type="text" placeholder="请选择销售单" v-model="desc" style="width: 220px" @click="saleBecome=true" ></el-input>

    </div>
    <!-- 右 -->
    <div style="margin-top: 10px;padding: 20px;float: right;">
      经手人:
      <el-select v-model="value" placeholder="选择经手人">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      &nbsp;&nbsp;&nbsp;

      业务日期:

      <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期">
      </el-date-picker>

    </div>

    <!-- 表格 -->
    <el-table :data="salescheduleData" border
              @selection-change="handleSelectionChange"
              :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
              :cell-style="{ textAlign: 'center' }">

      <el-table-column type="selection" :selectable="selectable " min-width="25%" />

      <el-table-column prop="date" label="序号" min-width="30%" >
        <template #default="scope">
        {{ scope.$index+1 }}
      </template></el-table-column>

      <el-table-column prop="commodityName" label="商品名称" />
      <el-table-column prop="commoditySpecifications" label="规格/属性" />
      <el-table-column prop="commodityCompany" label="单位" />
      <el-table-column prop="saleschedulePrice" label="单价" />
      <el-table-column prop="salescheduleNumber" label="数量" />
      <el-table-column prop="salescheduleTotal" label="商品金额" />
      <el-table-column prop="salescheduleState" label="状态" >
        <template #default="scope">
          <span style="color: red" v-if="scope.row.salescheduleState==1">已退货</span>
          <span style="color: #6aa1ed" v-if="scope.row.salescheduleState==2">未退货</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="name" label="操作" min-width="50%">-->
<!--&lt;!&ndash;        <el-button type="text">退货</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button type="text">添加</el-button>&ndash;&gt;-->
<!--      </el-table-column>-->
    </el-table>


  <br/>
  <div>
    <div style="width:200px;height: 80px;display: inline-block">
      <br/>
      <span>应退金额：</span><span>{{totalMoney}}</span><br/><br/>

    </div>
    <div style="width:200px;height: 80px;display: inline-block">
      <br/>
      <span style="color: orange">实退金额：</span><span>{{totalMoney}}  </span><br/><br/>


    </div>

  </div>




  </div>
  <br />
  <div  style="background-color: white;padding: 20px;">
    备注：<br /><br />
    <el-input :rows="2" v-model="remark" type="textarea" placeholder="请输入备注信息" />
    <br/> <br/>
    <el-button>取消</el-button>
    <el-button  @click="insertReturnsale(2);selectSalescheduleId()">保存</el-button>
    <el-button type="primary" @click="insertReturnsale(1);selectSalescheduleId()">退货并入库</el-button>
  </div>

  <div>
    <el-dialog
        v-model="saleBecome"
        title="选择销售单"
        width="50%">

      <div style="display: inline-block;margin-left:25px">

        <div class="block">
          <span class="demonstration" style="font-weight:bold">销售日期</span>
          <el-date-picker style="margin-left: 15px;"
                          v-model="hiredateSearch"
                          type="daterange"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          :shortcuts="shortcuts"
                          value-format="YYYY-MM-DD"
          >
          </el-date-picker>

        </div>
      </div>
      <el-button @click="selectSalePage()" type="primary" style="width: 70px;margin-left:25px;">

        搜索
      </el-button>
      <el-button style="width: 70px;" @click="replacement()">
        重置
      </el-button>

      <el-table
          :data="saleData"
          height="250"
          border
          style="width: 100%;margin-top: 20px;"
          :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
          :cell-style="{textAlign: 'center'}">

        <el-table-column width="60">
          <template #default="scope">
            <el-radio :label="scope.row.saleId" v-model="radioSale" @change.native="getCurrentRow(scope.row)">
              <!-- 以为有Label的原因，所以添加&nbsp以空格显示 -->
              &nbsp;
            </el-radio>
          </template>

        </el-table-column>

        <el-table-column
            prop="saleId"
            label="销售单号"
            >
        </el-table-column>
        <el-table-column
            prop="billId"
            label="单据编号"
            width="150"
        >
        </el-table-column>
        <el-table-column
            prop="saleTime"
            label="销售日期"
            width="170"
            >
        </el-table-column>
        <el-table-column
            prop="saleMoney"
            label="销售金额">
        </el-table-column>
        <el-table-column
            prop="saleState"
            label="销售状态">
          <template #default="scope">
            <span style="color: #6aa1ed" v-if="scope.row.saleState==1">已出库</span>
            <span style="color: red" v-if="scope.row.saleState==2">未出库</span>
          </template>

        </el-table-column>
        <el-table-column
            prop="saleRemarks"
            label="销售备注">
        </el-table-column>
      </el-table>

      <div class="demo-pagination-block">
        <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[3, 5, 10, 50]"
            v-model:page-size="pageInfo.pageSize"
            :default-page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            background
            @size-change="selectSalePage()"
            @current-change="selectSalePage()"
        >
        </el-pagination>
      </div>

      <div style="margin-top: 30px;margin-left:280px">
        <el-button @click="saleBecome=false,replacement()" style="width: 80px;">取消</el-button>
        <el-button type="primary" style="width: 80px;" @click="staffRow()">确定</el-button>
      </div>

    </el-dialog>
  </div>


</template>

<script>


import {ElMessage} from "element-plus";
import qs from "qs";

export default {
  data() {
    return {
      //弹框
      saleBecome:false,
      //仓库
      warehouse:"",

      //时间
      time:new Date(),

      //备注
      remark:"",

      //单选框数据
      radioSale:"",
      // 单选框选中的员工信息
      information: {},

      //仓库名称
      stocklists:[],

      // 退货总额
      totalMoney:0,

      //单据编号
      desc:"",

      // 选择商品 对话框
      selectGoodsDialog: false,
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数


        // 入职日期  开始时间
        clockTimeStart: '',
        // 结束时间
        clockTimeEnd: ''
      },
      //日期
      hiredateSearch:[],

      //退货表
      returnsaleVal:null,
      //退货详情表
     saledetailsVal:null,
      //销售数据
      saleData:[],
      //销售明细数据
      salescheduleData: [],


      //时间选择
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      xiangqid:[],

    }
  },
  methods: {

    // 表格多选框状态判断方法
    selectable(row,index) {

      if(row.salescheduleState==1){
        //伪代码
        return false
      }

      return true

    },

    handleSelectionChange(val){
      console.error(val)
      this.xiangqid=[]
      this.totalMoney=0
      val.forEach(item=>{
        this.totalMoney +=  item.salescheduleTotal
        this.xiangqid.push({"salescheduleId":item.salescheduleId})
      })
    },

    //查询仓库名称
    selectStock() {
      this.axios
          .get("http://localhost:9090/cdcustomer/selectDeptName")
          .then((response) => {
            console.log(response);
            this.stocklists = response.data.data;

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //获取单选框选中数据 (选中某个员工进行‘调动‘)
    getCurrentRow(row) {
      this.information = row
      this.desc=row.billId
      this.warehouse=row.stockId

    },
    //把单选框里的值点出来
    staffRow() {

      if(this.radioSale==""){
        ElMessage({
          message: '请选择销售单',
          type: 'warning',
        })
        return
      }

      this.selectSalescheduleId()
      this.saleBecome = false;

    },
    //搜索框重置
    replacement() {
      this.pageInfo.clockTimeStart = ''
      this.pageInfo.clockTimeEnd = ''
      this.hiredateSearch = []
      this.selectSalePage()

    },

    //查询销售单
    selectSalePage(){
      // 首先清空
      this.pageInfo.clockTimeStart = ""  // 开始时间
      this.pageInfo.clockTimeEnd = "" // 结束时间
      if (this.hiredateSearch != "") { // 如果选择的打卡时间不为空
        this.pageInfo.clockTimeStart = this.hiredateSearch[0] // 取 入职日期选择框 的开始时间 就是数组下标为0（第一个）
        this.pageInfo.clockTimeEnd = this.hiredateSearch[1]
      }

      let a= {

        currentPage:this.pageInfo.currentPage,
        pageSize:this.pageInfo.pageSize,

        clockTimeStart:this.pageInfo.clockTimeStart,
        clockTimeEnd:this.pageInfo.clockTimeEnd

      }

      this.axios
          .get("http://localhost:9090/cdcustomer/selectSalePage",{params:a})
          .then((response) => {
            console.log(response);
            this.saleData = response.data.data.records;
            console.log(response.data.data.records)
            this.pageInfo.total = response.data.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //查询销售明细
    selectSalescheduleId(){
      this.axios
          .get("http://localhost:9090/cdcustomer/selectSaleschedule/" + this.information.saleId)
          .then((response) => {
            console.log(response);
            this.salescheduleData = response.data.data;

          })
          .catch(function (error) {
            console.log(error);
          });


    },


    //添加退货表跟退货详情表
    insertReturnsale(isInStock) {

      if(this.xiangqid.length <1 ){
        ElMessage({
          message: '请选择所要退货的商品!',
          type: 'warning',
        })
        return
      }

      this.axios({
        url: 'http://localhost:9090/cdcustomer/insertReturnsale',
        method: 'post',
        data: {
          Returnsale: {
            //销售单编号
            saleId:this.information.saleId,
            //状态（1：已入库2：未入库）
            returnsaleState:isInStock,
            //退货原因
            returnsaleReason:this.remark,
            //退货金额
            returnsaleMoney:this.totalMoney
          },
          Saledetails: this.xiangqid,
          stockId:this.warehouse,
          saleState:this.information.saleId
        }
      }).then(response => {
        if (response.data.data > 0) {
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
        } else {
          ElMessage.error('添加失败')
        }
      }).catch(function (error) {
        console.log(error);
      });

    },



  },
  created() {
    this.selectStock()
    this.selectSalePage()
  }
}
</script>

<style>

body{
  /*background-color: gray;*/
}

/*.sel{*/
/*  position:absolute;*/
/*  !*clip:rect(2px 90px 30px 2px);*!*/
/*  width:150px;*/
/*  height:30px;*/
/*  line-height:28px;*/
/*  font-size:15px;*/
/*  font-weight:bold;*/

/*}*/

</style>
