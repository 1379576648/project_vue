<!-- 销售单 -->
<template>
  <div style="width: 100%;">
    <div id="scroll" style="max-height:calc(100vh - 100px) ">
      <div class="ant-card">
        <div class="ant-card-head" style="border-bottom: 1px dashed rgb(217, 217, 217); padding: 24px 12px 0px;">
          <div class="ant-card-head-wrapper">
            <div class="ant-card-head-title">
              <div class="line-height-36 ant-row">

                <div class="ant-col ant-col-8">
                  客户：
                  <el-input
                      v-model="options.customernames"
                      placeholder="请选择客户"
                      class="input-with-select"
                      style="width: 210px;"
                      disabled
                  >
                    <template #append>
                      <span><i class="iconfont" @click="selectkehuDialog=true,queryBykh()">&#xe644;</i></span>
                    </template>
                  </el-input>
                </div>
                <div class="ant-col ant-col-8" align="center">
                  <span class="font-size-24 font-bold-700">销售单</span>
                </div>
                <div class="ant-col ant-col-8" align="right">
                  <span style="color: #a5a5a5;">单据编号：</span>
                  <span>{{Fromlist.bills}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-card-body">
          <div class="ant-row_1">
            <div class="ant-row_2">
              <span style="font-size: 14px">仓库：</span>
              <el-select v-model="Fromlist.warehouse" placeholder="选择仓库">
                <el-option v-for="item in options.warehouse" :key="item.stockId" :label="item.stockName" :value="item.stockId" />
              </el-select>
              &nbsp;&nbsp;&nbsp;
            </div>
            <div class="ant-row_2" style="display: flex">
              <div style="padding-left: 65px;margin-right: 20px">
                <span style="font-size: 14px">经手人：</span>
                <el-select v-model="Fromlist.warehouse" placeholder="经手人">
                  <el-option v-for="item in options.warehouse" :key="item.stockId" :label="item.stockName" :value="item.stockId" />
                </el-select>
              </div>
              <div>
                <span style="font-size: 14px">业务日期：</span>
                <el-date-picker
                    v-model="Fromlist.businessdate"
                    type="datetime"
                    placeholder="Select date and time"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="mytable-style vxe-cell-hide vxe-table tid_1 size--mini border--full vxe-editable show--head show--foot has--height fixed--right t--animat row--highlight">

              <el-table
                  :data="tableData"
                  border
                  style="width: 100%; font-size: 12px"
                  :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
                  :default-sort="{ prop: 'name', order: 'descending' }"
              >
                <el-table-column label="序号" type="index" width="50" />
                <el-table-column  label="商品名称" align="center" width="320px">
                  <template #default="scope">
                    {{scope.row.commodityName}}
                    <div class="ant_sp" v-if="scope.row.commodityName==null">
                      <el-input
                          disabled
                          placeholder="请选择商品"
                          v-model="input"
                          clearable
                          size="small"
                          style="width: 200px">
                      </el-input>
                      &nbsp;
                      <el-button size="small"  @click="querybysps()">选择商品</el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="commoditySpecifications" label="规格/属性" />
                <el-table-column prop="commodityCompany" label="单位" />
                <el-table-column label="数量">
                  <template #default="scope">
                    <el-input-number
                        v-model="scope.row.salescheduleNumber"
                        :min="1"
                        size="small"
                        controls-position="right"
                        @click="a()"
                        @change="handleChange(scope.row.salescheduleNumber,scope.row.availablestock)"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="saleschedulePrice" label="单价(元)"/>
                <el-table-column label="销售金额">
                   <template #default="scope">
                     {{ scope.row.saleschedulePrice * scope.row.salescheduleNumber>0?scope.row.saleschedulePrice * scope.row.salescheduleNumber:'0.00'}}
                   </template>
                </el-table-column>
                <el-table-column label="操作" width="90" align="center">
                  <template #default="scope">
                    <el-button type="text" size="small" @click="delData(scope.$index, scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addhang()">添加</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>
            <div style="height: 40px;width: 100%;display: flex;align-items: center;font-weight: bold;margin-top: 25px">
              <div class="ant_from">
                <div>
                  <label title="应收金额">应收金额：</label>
                  <span class="pl12">{{xiaoshou.receivable}}元</span>
                </div>
              </div>
              <div class="ant_from">
                <div>
                  <label title="销售总额">实收金额：</label>
                  <span class="pl12">{{xiaoshou.amount}}元</span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div style="margin-top: 10px;height: 230px;width: 100%;background-color: white">
      <div style="padding: 10px">
        <span style="font-size: 14px;">备注：</span><br>
        <br>
        <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="Fromlist.vbz"
            style="width: 650px;">
        </el-input>
      </div>
      <div style="padding: 10px;width: 100%;height: 60px;">
        <el-button type="primary" style="float: right;margin-left: 10px;margin-right: 10px" @click="addsales()">保存</el-button>
        <el-button style="float: right" @click="advices()">取消</el-button>
      </div>
    </div>
  </div>




  <!-- 选择商品 对话框 -->
  <el-dialog width="60%" v-model="selectGoodsDialog" title="选择商品">
    <div style="float: right;">
      <!-- 商品名称搜索 -->
      <el-input v-model="options.vshipings" style="width: 200px;" placeholder="商品名称" />
      &nbsp;&nbsp;
      <el-button type="primary" @click="querylistsp()">搜索</el-button>

    </div>
    <br /><br />

    <el-table
        :data="tableData1"
        border
        style="width: 100%; font-size: 12px"
        :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
        :default-sort="{ prop: 'name', order: 'descending' }"
        @selection-change="queryselecttions"
    >
      <el-table-column type="index" label="序号" min-width="30%" />
      <el-table-column type="selection" min-width="25%" />
      <el-table-column prop="commodityName" label="商品名称" min-width="150%"/>
      <el-table-column prop="commoditySpecifications" label="规格/属性" />
      <el-table-column prop="commodityCompany" label="单位" />
      <el-table-column prop="saleschedulePrice" label="零售价(元)" />
      <el-table-column prop="availablestock" label="可用库存" />
    </el-table>
    <!-- 分页 -->
    <br />
    <div style="float: right;">
      <el-pagination v-model:currentPage="pageInfo.currentPage" :page-sizes="[3, 5, 10, 50]"
                     v-model:page-size="pageInfo.pageSize" :default-page-size="pageInfo.pageSize"
                     layout=" prev, pager, next, jumper, sizes, total" :total="pageInfo.total" :pager-count="4" background
                     @size-change="querylistsp()" @current-change="querylistsp()">
      </el-pagination>
    </div>
    <br />
    <template #footer>
      <div style="text-align: center;">
        <el-button @click="selectGoodsDialog = false">取消</el-button>
        <el-button type="primary" @click="addshiping(),a()">确认选择</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 选择客户 对话框 -->
  <el-dialog width="60%" v-model="selectkehuDialog" title="选择客户" destroy-on-close>
    <el-table
        :data="tableData2"
        border
        style="width: 100%; font-size: 12px"
        :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
        :default-sort="{ prop: 'name', order: 'descending' }"
        @selection-change="deleteresumeall"
    >
      <el-table-column type="index" label="序号" min-width="30%" />
      <el-table-column type="selection" min-width="25%" />
      <el-table-column prop="customerName" label="客户名称" min-width="100%"/>
      <el-table-column prop="customerPhone" label="联系电话" />
      <el-table-column prop="customerAddress" label="地址" min-width="110%"/>
      <el-table-column prop="customerRemarks" label="备注" />
    </el-table>
    <!-- 分页 -->
    <br />
    <div style="float: right;">
      <el-pagination v-model:currentPage="pageInfo.currentPage" :page-sizes="[3, 5, 10, 50]"
                     v-model:page-size="pageInfo.pageSize" :default-page-size="pageInfo.pageSize"
                     layout=" prev, pager, next, jumper, sizes, total" :total="pageInfo.total" :pager-count="4" background
                     @size-change="queryBykh()" @current-change="queryBykh()">
      </el-pagination>
    </div>
    <br />
    <template #footer>
      <div style="text-align: center;">
        <el-button @click="selectkehuDialog = false">取消</el-button>
        <el-button type="primary" @click="addkhnames()">确认选择</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return{
      selectGoodsDialog:false,
      selectkehuDialog:false,
      input:'',
      tableData: [
        {name:'1'},
        {name:'1'},
        {name:'1'},
      ],
      tableData1:[], // 商品信息
      tableData2:[], //客户信息
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },
      Fromlist:{
        businessdate:'', //业务时间
        bills:'', //单据编号
        warehouse:'', //仓库名称
        vbz:'', //销售备注
      },
      options:{
        warehouse:'', //存储仓库基本信息
        customerxx:[], //客户对话框：客户信息
        customernames:'',// 客户姓名
        customerids: '', //客户id
        vshipings:'',    //商品名称
      },
      shiping:[],

      xiaoshou:{
        receivable:0.00,//应收金额
        amount:0.00, //实收金额
      }
    }
  },
  methods: {
    a(){
      var x=0
      this.tableData.forEach(item=>{
        x += (item.saleschedulePrice * item.salescheduleNumber)

      })
      this.xiaoshou.receivable=x
      this.xiaoshou.amount = x
    },
    handleChange(sumone,sumtwo){
      if(sumone>sumtwo){
        ElMessage({
          showClose: true,
          message: '销售数量大于可用库存数量.',
          type: 'error',
        })
      }else{
        return;
      }
    },
    //获取销售单业务时间
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      _this.Fromlist.businessdate = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    },
    //销售单：销售单号
    codeId(){
      // 当前时间
      let date = new Date();
      // 年
      let year = date.getFullYear()
      // 月
      let month = date.getMonth()+1 < 10? "0"+(date.getMonth()+1) : date.getMonth()+1;
      // 日
      let day = date.getDate()
      // 时
      let hours = date.getHours()
      // 分
      let minutes = date.getMinutes()
      // 秒
      let seconds = date.getSeconds()
      //单据编号
      this.Fromlist.bills = "XS"+year+month+day+hours+minutes+seconds+date.getDay()
    },
    //table:新增行
    addhang(){
      let list = {
        name:'',
      };
      this.tableData.unshift(list)
    },
    //table:删除行
    delData(index,row){
      if (this.tableData.length>1){
        this.tableData.splice(index, 1)
      }else{
        this.$message.error("至少保留一个")
      }
    },

    //查询当前所有启用仓库
    queryByck(){
      this.axios.get("http://localhost:9090/sale/listck",{
      }).then((res)=>{
        console.error(res)
        this.options.warehouse = res.data.data
      }) .catch(function (error) {
        console.log("失败")
        console.log(error);
      })
    },
    //查询当前所有客户信息
    queryBykh(){
      this.axios.get("http://localhost:9090/sale/listkh",{
      }).then((res)=>{
        console.error(res)
        this.tableData2 = res.data.data
        this.pageInfo.total = res.data.data.length
      }) .catch(function (error) {
        console.log("失败")
        console.log(error);
      })
    },
    //客户对话框多选框事件
    deleteresumeall(val){
      this.options.customerxx = val
      console.error(this.options.customerxx)
    },
    //客户对话框确认按钮
    addkhnames(){
      this.options.customernames = this.options.customerxx[0].customerName
      this.options.customerids = this.options.customerxx[0].customerId
      this.selectkehuDialog = false
    },
    //通过仓库查询所有商品信息
    querylistsp(){
      this.axios({
        url: "http://localhost:9090/sale/salepages",
        method: "post",
        data: {
          currenPage: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize,
          stockId:this.Fromlist.warehouse,
          commodityName:this.options.vshipings
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(response.data.data.records)
        this.tableData1 = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    querybysps(){
      if(this.Fromlist.warehouse==''){
        ElMessage({
          showClose: true,
          message: '选择商品之前请先选择仓库.',
          type: 'error',
        })
      }else {
        this.selectGoodsDialog = true
        this.querylistsp();
      }
    },
    //商品复选框事件
    queryselecttions(val){
      this.shiping = val;
    },
    //商品对话框确认事件
    addshiping(){
      if(this.shiping==''){
        ElMessage({
          showClose: true,
          message: '请选择商品.',
          type: 'error',
        })
      }else{
        this.tableData = this.shiping
        this.selectGoodsDialog = false
      }
    },

    //销售单新增
    addsales(){
      if(this.options.customerids==''){
          ElMessage({
            showClose: true,
            message: '请选择客户.',
            type: 'error',
          })
      }else{
      this.axios({
        url: "http://localhost:9090/sale/insertsale",
        method: "post",
        data: {
          Sale:{
            staffId:1, //当前登录用户id
            customerId: this.options.customerids, //客户id
            stockId:this.Fromlist.warehouse, //仓库id
            billId:this.Fromlist.bills, //单据编号
            saleTime:this.Fromlist.businessdate, //业务时间
            saleMoney:this.xiaoshou.amount, //销售金额
            saleRemarks:this.Fromlist.vbz, //销售备注
            saleState:2
          },
          Saleschedule: this.tableData
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if(response.status=="200"){
          ElMessage({
            showClose: true,
            message: '操作成功.',
            type: 'success',
          })
        }
        this.deletedall();
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
      }
    },
    deletedall(){
      this.tableData= [
        {name:'1'},
        {name:'1'},
        {name:'1'},
      ];
      this.options.customernames = '';
      this.Fromlist.warehouse = '';
      this.Fromlist.vbz = '';
    },
    //取消按钮
    advices(){
      this.$router.go(-1);
    }
  },
  created() {
    //获取当前时间并打印
    this.getCurrentTime();
    this.codeId();
    this.queryByck();
  },
  mounted() {},
};
</script>


<style scoped>
.pl12{
  padding-left: 12px;
}
.ant_from{
  width: 270px;
}
.ant_sp{
  display: none;
}
.el-table--enable-row-hover .el-table__body tr:hover .ant_sp{
  display: block;
}

.vxe-table.size--mini {
  font-size: 12px;
}
.ant-card-body{
  min-height: 300px;
  padding: 12px;
}
.ant-row_1{
  display: flex;
  height: 48px;
  width: 100%;
}
.ant-row_2{
  width: 50%;
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:19px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;}

.ant-card-head {
  min-height: 48px;
  margin-bottom: -1px;
  color: rgba(0,0,0,.85);
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  zoom: 1;
  border-bottom: 1px dashed rgb(217, 217, 217);
  padding: 24px 12px 0px;
}
.ant-card {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  position: relative;
  background: #fff;
  border-radius: 2px;
}
.ant-card-head:after, .ant-card-head:before {
  display: table;
  content: "";
}

*, :after, :before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.ant-card-head:after {
  clear: both;
}
.ant-card-head:after, .ant-card-head:before {
  display: table;
  content: "";
}
*, :after, :before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.ant-card-head-wrapper {
  display: flex;
  align-items: center;
}
*, :after, :before {
  box-sizing: border-box;
}
.ant-card-head-title {
  display: inline-block;
  -webkit-box-flex: 1;
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ant-row {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.line-height-36 {
  line-height: 36px;
}
.ant-col-8 {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 33.33333333%;
}
.ant-col-8{
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  float: left;
}
.ant-col-8{
  position: relative;
  padding-right: 0;
  padding-left: 0;
}
.font-bold-700 {
  font-weight: 700;
}
.font-size-24 {
  font-size: 24px;
}
/deep/.el-input-group__append, .el-input-group__prepend {
  background-color: var(--el-fill-color-light);
  color: var(--el-color-info);
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border-radius: var(--el-input-border-radius);
  padding: 0 10px;
  width: 1px;
  white-space: nowrap;
}
.input-with-select span{
  cursor: pointer;
}




.el-pagination .el-select .el-input {
  width: 90px;
}
#scroll{
  overflow:scroll;
  overflow-x: hidden;
}
#scroll::-webkit-scrollbar{
  width:5px;
}
#scroll::-webkit-scrollbar-thumb{
  background:linear-gradient(rgb(17,157,212),rgb(17,212,105));
  border-radius:5px;
  transition:1s;
}
#scroll::-webkit-scrollbar-thumb:hover{
  background:linear-gradient(rgb(17,212,105),rgb(17,157,212));
}


</style>