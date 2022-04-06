<template>

<!-- 其他出入库 -->

  <el-card>
    <div class="divcss5-4" >
      <span style="font-size: 24px;">其他入库单</span>
    </div>
    <span style="float: right;margin-right: 12px;margin-top: -30px ">单据编号：{{this.add.billId}}</span>
    <br>
    <div>
      仓库：
      <el-select v-model="this.add.stockId" placeholder="请选择">
        <el-option
            style="width: 200px"
            v-for="item in stock"
            :key="item.stockId"
            :label="item.stockName"
            :value="item.stockId">
        </el-option>
      </el-select>
      &nbsp;
      入库类型：
      <el-select v-model="this.add.outinstocktypeId" placeholder="请选择">
        <el-option

            style="width: 200px"
            v-for="item in outinstocktype"
            :key="item.outinstocktypeId"
            :label="item.outinstocktypeName"
            :value="item.outinstocktypeId">
        </el-option>
      </el-select>

     <span style="margin-left: 230px"> 经手人：</span>
      <el-select v-model="this.add.staffId" placeholder="请选择" style="width: 150px">
        <el-option
            style="width: 150px"
            v-for="item in payments"
            :key="item.staffId"
            :label="item.staffName"
            :value="item.staffId">
        </el-option>
      </el-select>

    <!--   业务日期   -->
      <span style="margin-left: 10px"> 业务日期：</span>
      <el-date-picker
          style="width: 200px"
          v-model="this.add.time"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>

    </div>
    <br>
    <div class="sub-Content__primary" >
      <el-table :data="tableData" height="280px"  style="width: 100%;margin-bottom: 20px;"
                :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
                :cell-style="{ textAlign: 'center' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index"  label="序号" width="70px"  />
        <el-table-column  prop="commodityName" label="商品名称"  >
          <template #default="scope">
            <el-button v-if="scope.row.commodityName==null" v-show="bad" @click="choicess(),selectIPages(),this.index=scope.$index">请选择</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="commoditySpecifications" label="规/属性"  />
        <el-table-column prop="commodityCompany" label="单位"  />
        <el-table-column prop="otherinstockdetailsPrice" label="单价"  >
          <template #default="scope">
          <el-input-number
              v-model="scope.row.otherinstockdetailsPrice"
              disabled
              min="0"
              size="small"
              controls-position="right">
          </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="otherInStockDetailsNumber" label="数量"  >
          <template #default="scope">
            <el-input-number
                v-model="scope.row.otherInStockDetailsNumber"
                min="1"
                size="small"
                controls-position="right"
                @change="totil()"
            >
              <!--              {{scope.row.goodsPricePurchase}}-->
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="otherInStockDetailsTotal"  label="商品金额（元）" >
          <template #default="scope">
            {{isNaN(scope.row.otherinstockdetailsPrice*scope.row.otherInStockDetailsNumber)?'0.00':scope.row.otherinstockdetailsPrice*scope.row.otherInStockDetailsNumber}}
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注" >
          <el-input  size="medium" ></el-input>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <!--获取当前表格下标-->
            <el-button style="color: red"   @click="deleteRow(scope.$index, tableData),totil()" type="text" size="small">
              删除
            </el-button>
            <el-button @click="add_social()" size="small"  type="text">新增</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span>合计：{{ isNaN(summation)?0:summation }}元</span>
    </div>

  </el-card>

  <br>
  <el-card>
    备注：
    <el-input
        v-model="this.add.remark"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="请输入备注"
        style="margin-top: 10px"
    />
    <div style="margin-top: 10px">
      <el-button style="margin-left: 1140px" @click="cancel()">取消</el-button>
      <el-button style="background-color: #6aa1ed;color: honeydew" @click="adInventory()">保存</el-button>
    </div>
  </el-card>

  <!-- 选择商品对话框  -->
  <el-dialog
      v-model="dialogVisible"
      title="选择商品"
      width="70%"
  >

    <hr style="margin-top: -20px;margin-bottom:20px;color:  #FFFFFF"/>

    <el-button style="width: 90px" @click="addStockDatas(),dialogVisible=false,added=true">新增商品</el-button>
    <span style="margin-left: 387px">商品分类：</span>
    <el-select v-model="classifysName" placeholder="请选择" style="width: 200px">
      <el-option hidden></el-option>
      <el-tree
                  :data="assignment"
                  @node-click="handleNodeCliks"
                  :props="defaultProps1"
                  default-expand-all
                  :filter-node-method="filterNode"
                  highlight-current
                  ref="tree">
      </el-tree>
    </el-select>
    &nbsp;
    <el-input style="width: 200px" v-model="pageInfo.commodityName" placeholder="商品名称"/>
    <el-button style="margin-left: 5px;margin-top: -5px" @click="selectIPages()">查询</el-button>

    <!--选择商品表格-->
    <el-table
        height="380px"
        ref="multipleTableRef"
        :data="tableDatas"
        style="width: 100%;margin-top: 10px"
        :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
        @selection-change="handleSelectionChange"
        :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index"  width="55" label="序号" />
      <el-table-column prop="commodityId" label="商品编号" width="175" sortable />
      <el-table-column property="commodityName" label="商品名称"  />
      <el-table-column property="commoditySpecifications" label="规格/属性"  />
      <el-table-column property="commodityCompany" label="单位"  />

      <el-table-column property="goodsPricePurchase" label="参考进货价" >
        <template #default="scope">
          <span v-if="scope.row.goodsPricePurchase==null">0.00</span>
          <span v-if="scope.row.goodsPricePurchase!=null">{{scope.row.goodsPricePurchase}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="actualStock" label="实际库存" >
        <template #default="scope">
          <span v-if="scope.row.actualStock==null">0.00</span>
          <span v-if="scope.row.actualStock!=null">{{scope.row.actualStock}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 5px;margin-left: 500px;">
      <el-pagination
          v-model:current-page="pageInfo.currentPage"
          v-model:currentPage="pageInfo.currentPage"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          :page-sizes="[9, 12, 18, 27]"
          :page-size="3"
          :pager-count="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="selectIPages"
          @current-change="selectIPages"
          prev-text="上一页"
          next-text="下一页"
          background
      >
      </el-pagination>
    </div>

    <hr style="margin-top: 20px;margin-bottom: -30px;color:  #FFFFFF"/>


    <template #footer >
        <span class="dialog-footer" >
          <el-button @click="abolish()">
            取消
          </el-button>
          <el-button type="primary" @click="dialogVisible = false,fuzhi(this.index),totil()">
            确定选择
          </el-button>
        </span>
    </template>
  </el-dialog>

  <!--新增商品对话框-->
  <el-dialog
      v-model="added"
      title="新增商品"
      width="70%"
  >
    <hr style="margin-top: -30px;margin-bottom:20px;color:  #FFFFFF">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item style="margin-left: 20px;"   label="名称：" prop="commodityName">
      <el-input style="width: 300px" v-model="ruleForm.commodityName" placeholder="例如：夹克"></el-input>
    </el-form-item>

  <el-form-item style="margin-left: 578px;margin-top:-50px;" label="分类：" prop="classifys">
    <el-select v-model="ruleForm.classifys" placeholder="请选择分类">
      <el-option hidden></el-option>
      <el-tree
          :data="all"
          @node-click="handleNodeClik"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          highlight-current
          ref="tree">
      </el-tree>
    </el-select>
  </el-form-item>

  <el-form-item style="margin-left: 20px" label="单位：" prop="commodityCompany">
    <el-select v-model="ruleForm.commodityCompany" placeholder="请选择单位">
      <el-option
          style="width: 200px"
          v-for="item in commodityCompany"
          :key="item.commodityCompany"
          :label="item.label"
          :value="item.commodityCompany">
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item style="margin-left: 578px;margin-top:-47px;" label="规格/属性：">
    <el-input style="width: 300px" v-model="ruleForm.commoditySpecifications" placeholder="例如：红色"></el-input>
  </el-form-item>

  <el-form-item style="margin-left: 20px;" label="零售价：" >
    <el-input style="width: 150px" oninput="value=value.replace(/[^0-9.]/g,'')" v-model="ruleForm.retailPrice" placeholder="输入零售价">
    </el-input>
  </el-form-item>

  <el-form-item style="margin-left: 257px;margin-top: -47px;" label="批发价：">
    <el-input style="width: 150px" oninput="value=value.replace(/[^0-9.]/g,'')" v-model="ruleForm.tradePrice" placeholder="输入批发价"></el-input>
  </el-form-item>

  <el-form-item style="margin-left:493px;margin-top: -50px;" label="最低售价：">
    <el-input oninput="value=value.replace(/[^0-9.]/g,'')" style="width: 150px" v-model="ruleForm.goodsPriceMinPrice"  placeholder="输入最低价"></el-input>
  </el-form-item>

  <el-form-item style="margin-left: 728px;margin-top: -50px;" label="进货价：">
    <el-input oninput="value=value.replace(/[^0-9.]/g,'')" style="width: 150px" v-model="ruleForm.goodsPricePurchase" goodsPricePurchase="输入进货价"></el-input>
  </el-form-item>

  <el-form-item style="margin-left: 20px;" label="备注：">
    <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
  </el-form-item>

  <div style="margin-left: -102px">
  <el-form-item>
    <el-table :data="addTableData" height="200px" style="width: 100%;"
              :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
              :cell-style="{ textAlign: 'center' }"
              :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column type="index"  label="序号" width="70px"  />
      <el-table-column prop="stockName" label="仓库" />
      <el-table-column prop="quantity" label="初期库存数量"  />
      <el-table-column prop="money" label="初期成本价(元)"  />
      <el-table-column prop="rental" label="初期总额"  />
    </el-table>
  </el-form-item>
  </div>
</el-form>
    <hr style="margin-top: 20px;color:  #FFFFFF">

    <div style="margin-top:5px ; margin-bottom: -10px">
            <span>多规格、多属性、多单位商品请前往[商品]菜单[添加商品]录入</span>
            <el-button style="margin-left: 460px" @click="resetForm('ruleForm'),added = false,dialogVisible=true">
              取消并返回
            </el-button>
            <el-button type="primary"  @click="goodsToAdd(),submitForm('ruleForm')">
              保存
            </el-button>
    </div>
  </el-dialog>


</template>

<script lang="ts" >
import {ElMessage} from "element-plus";

export default {
data(){
  const validateMoney = (rule,value,callback) =>{
    if(!value){
      callback(new Error('审计价格不能为空'))
    }else if(value.indexOf(".") != -1 && value.split('.').length > 2){
      callback(new Error('请输入正确格式的金额')) //防止输入多个小数点
    }else if(value.indexOf(".") != -1 && value.split('.')[1].length > 2){
      callback(new Error('请输入正确的小数位数')) //小数点后两位
    }else{
      callback();
    }
  };


  return{
    ruless: {
      auditPrice:[
        { type: 'string',required: true,trigger: 'blur', validator:validateMoney},
      ]
    },

    //经手人
    payments:[],
    //合计初始值
    summation:0,
    //表格之间参数
    index:0,
    //选择商品按钮是否显示隐藏
    bad:true,

   // adds:{
    //},

    /**
     *    选择对话框分类
     */
    //所有的分类数据
    assignment:[],
    //节点数据发生变化时将数据存入集合
    gather :{},
    //设置默认的属性值
    defaultProps1:{
      children:'categorys',
      label:'categoryName'
    },
    //显示选择的分类名称
    classifysName:'',

    //添加对话框表格
    addTableData:[],

    //树形控件
    bads:{},

    //所有的分类数据
    all:[],

    //设置默认的属性值
    defaultProps:{
      children:'categorys',
      label:'categoryName'
    },

    //单位
    commodityCompany:[
        {
      commodityCompany: '台',
      label: '台'
    }, {
      commodityCompany: '箱',
      label: '箱'
    }, {
        commodityCompany: '打',
        label: '打'
    }, {
      commodityCompany: '瓶',
      label: '瓶'
    }, {
      commodityCompany: '条',
      label: '条'
    }, {
      commodityCompany: '公斤',
      label: '公斤'
    }, {
      commodityCompany: '套',
      label: '套'
    }, {
      commodityCompany: '件',
      label: '件'
    }, {
      commodityCompany: '袋',
      label: '袋'
    }, {
      commodityCompany: '个',
      label: '个'
    }
    ],

    //添加商品数据对象
      ruleForm: {

      },
    //表单验证
    rules:{
      commodityName:[
        { required: true, message: '请输入名称', trigger: 'blur' },
        { min: 1, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      classifys:[
        { required: true, message: '请选择分类', trigger: 'blur' },
      ],
      commodityCompany:[
        { required: true, message: '请选择单位', trigger: 'blur' },
      ],
    },

    //分页
    pageInfo: {
      currentPage: 1,
      pagesize: 9,
      total: 0,
      categoryId:'',
      commodityName:'',
    },

    //选择对话框
    dialogVisible:false,

    //新增对话框
    added:false,

    //选择对话框表格
    tableDatas:[
    ],

    //表格
    tableData:[
      {otherInStockDetailsTotal:0.00,
        otherInStockDetailsNumber:0},
      {otherInStockDetailsTotal:0.00,
        otherInStockDetailsNumber: 0},
      {otherInStockDetailsTotal:0.00,
        otherInStockDetailsNumber: 0},
      {otherInStockDetailsTotal:0.00,
        otherInStockDetailsNumber: 0},
      {otherInStockDetailsTotal:0.00,
        otherInStockDetailsNumber: 0}
    ],

    //出库数据
    outinstocktype:[],

    //库存
    stock:[],

    //添加其他入库单
    add:{
      stockId:'',
      outinstocktypeId:'',
      time:'',
      billId:'',
      staffId:'',
      remark:''
    },

    //将选择商品的数据存放到数组
    multipleSelection:[],
  }
},

  created() {
    this.choice()
    this.classification()
    this.form ()
    this.inventory()
    this.billId()
    this.selectStaff()
  },

  methods:{
    //点击选择页面取消按钮
    abolish(){
      this.dialogVisible = false
      this.pageInfo.commodityName=''
      this.classifysName=''
    },
    //其他入库页面取消按钮
    cancel(){
      this.$router.push('/workbench');
    },

    //其他经手人
    selectStaff(){
      this.axios.post('http://localhost:9090/staff/selectStaff')
      .then(response=>{
        console.log(response)
        for(let i=0;i<response.data.info.length;i++){
          this.payments.push(response.data.info[i])
        }

      })
    },

    //添加其他入库单
    addTickets(){

      //转换日期格式
      let date = new Date(this.add.time);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() < 10 ? '0'+(date.getDate()) + ' ': date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0'+(date.getHours()) + ':': date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0'+(date.getMinutes()) + ':': date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0'+(date.getSeconds()): date.getSeconds();
      let time= Y+M+D+h+m+s;

      this.axios({
        method:'post',
        url:'http://localhost:9090/otherinstock/add',
        data:{
          tableData:this.tableData,
          stockId:this.add.stockId,
          outinstocktypeId:this.add.outinstocktypeId,
          time:time,
          billId:this.add.billId,
          staffId:this.add.staffId,
          remark:this.add.remark
        },
        responseType:'json',
        responseEncoding:'utf-8',
         }).then(response=>{
        console.log(response);
        if(response.data.data==='保存成功'){
          ElMessage({
            message: '保存成功',
            type:"success"
          })
          this.$router.push('/Warehousing');
           }else {
            ElMessage({
              message:'保存失败',
              type:'error'
            })
           }

          })
    },

  //查看表格里是否有商品
    adInventory(){
      let one = 0
        for (let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].commodityName==null){
           one=2
          }else {
            one=1
          }
        }
        if(one==2){
          ElMessage({
            message: '好歹选个商品啊',
            type: 'warning',
          })
        }else if(this.add.outinstocktypeId==''){
          ElMessage({
            message: '你还没选择入库类型呢',
            type: 'warning',
          })
        }else if(this.add.staffId== ''){
          ElMessage({
            message: '请选择经手人员',
            type: 'warning',
          })
        }else if(this.add.time==''){
          ElMessage({
            message: '请选择业务日期',
            type: 'warning',
          })
        }else {
          this.addTickets()
        }
    },
    //判断仓库是否被选择
    choicess(){
      if(this.add.stockId==''){
        ElMessage({
          message: '请选择仓库',
          type: 'warning',
        })
      }else {
        this.pageInfo.commodityName=''
        this.classifysName=''
        this.dialogVisible=true
      }
    },

  //合计
  totil(){
    this.summation=0
    this.tableData.forEach(item=>{
      this.summation+= item.otherInStockDetailsNumber * item.otherinstockdetailsPrice
    })
  },
    //单据
    billId(){
      this.axios({
        method:'get',
        url:'http://localhost:9090/incomingDocuments',
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{

        this.add.billId=response.data.data.info
      })
    },

    //选中获取表格里面的值存放到数组
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    //赋值方法
    fuzhi(index){
      this.tableData.splice(index,5)

      if(this.tableData.length==0){
        if(this.multipleSelection.length==0){
          this.tableData.push(
              {}
          )
        }else {

          for (let i = 0; i <this.multipleSelection.length ; i++) {
            this.tableData.push(
                {
                  commodityId:this.multipleSelection[i].commodityId,
                  commodityName:this.multipleSelection[i].commodityName,
                  commoditySpecifications:this.multipleSelection[i].commoditySpecifications,
                  commodityCompany:this.multipleSelection[i].commodityCompany,
                  otherinstockdetailsPrice:this.multipleSelection[i].goodsPricePurchase,
                  otherInStockDetailsNumber:1,
                  otherInStockDetailsTotal:this.multipleSelection[i].goodsPricePurchase*1,
                  remark:this.multipleSelection[i].remark,
                }
            )
          }
        }
      }else {
        for (let i = 0; i <this.multipleSelection.length ; i++) {
          for (let j=0;j<this.tableData.length;j++){
            if (this.tableData[j].commodityName == this.multipleSelection[i].commodityName) {
              this.multipleSelection.splice(this.multipleSelection[i], 1)
            }
          }
          this.tableData.push(
              {
                commodityId:this.multipleSelection[i].commodityId,
                commodityName: this.multipleSelection[i].commodityName,
                commoditySpecifications: this.multipleSelection[i].commoditySpecifications,
                commodityCompany: this.multipleSelection[i].commodityCompany,
                otherinstockdetailsPrice: this.multipleSelection[i].goodsPricePurchase,
                otherInStockDetailsNumber: 1,
                otherInStockDetailsTotal:this.multipleSelection[i].goodsPricePurchase*this.otherInStockDetailsNumber,
                remark: this.multipleSelection[i].remark,
              }
          )
        }
      }
    },

    //选择分页
    selectIPages(){
      this.axios.post("http://localhost:9090/commodity/selectIPages",this.pageInfo)
         .then(response=>{
        this.pageInfo.total=response.data.data.total
        this.tableDatas=response.data.data.records

      })
    },

    //树形控件节点被点击时的回调
    handleNodeCliks(node,data){
      //点击赋值回调
      this.gather=data.data;
      this.pageInfo.categoryId=data.data.categoryId
      this.classifysName=data.data.categoryName
    },

    //选择商品分类
    choice(){
      this.axios.get("http://localhost:9090/category/find")
          .then(res=>{
            this.assignment=res.data.data

          })
    },

    //商品添加方法
    goodsToAdd(){
      if(this.ruleForm.goodsPricePurchase==''){
        ElMessage({
          message: '请输入进货价',
          type: 'warning',
        })
      }else if(this.ruleForm.goodsPriceMinPrice==''){
        ElMessage({
          message: '请输入批发价',
          type: 'warning',
        })
      }else if(this.ruleForm.tradePrice==''){
        ElMessage({
          message: '请输入最低售价',
          type: 'warning',
        })
      }else if(this.ruleForm.retailPrice==''){
        ElMessage({
          message: '请输入零售价',
          type: 'warning',
        })
      }else {
        this.axios({
          method:'post',
          url:'http://localhost:9090/commodity/goodsToAdd',
          data:this.ruleForm,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(res=>{
          if(res.data.code=="200"){
            this.$message.success(res.data.msg)
            this.ruleForm='',
                this.added = false
            this.dialogVisible=true
          }else{
            this.$message.error(res.data.msg)
          }
        })
            .catch(error=>{
              console.error(error)
            })
      }

    },

    //树形控件节点被点击时的回调
    handleNodeClik(node,data){
      //点击赋值回调
     this.bads=data.data;
     this.ruleForm.classifys=data.data.categoryName
      this.ruleForm.categoryId=data.data.categoryId

    },
    //生成密码
    // generate(){
    //   //随机参数
    //   let identifyCodes= '0123456789';
    //   //初始化密码
    //   this.ruleForm.barcode='';
    //   for (let i = 0; i < 13; i++) {
    //     this.ruleForm.barcode += identifyCodes[
    //         this.randomNum(0, identifyCodes.length)]
    //   }
    //   console.log(this.ruleForm.barcode);
    // },
    // randomNum(min, max) {
    //   return Math.floor(Math.random() * (max - min) + min);
    // },

    //新增商品分类
    classification(){
      this.axios.get("http://localhost:9090/category/find")
          .then(res=>{
            this.all=res.data.data
          })
    },

    //查询出库类型表数据
    addStockDatas (){

      this.addTableData=[]
      this.ruleForm={}
      this.axios({
        method:'get',
        url:'http://localhost:9090/stock/selectStockData/'+this.add.stockId,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        console.log(response.data.data)
        this.addTableData.push(response.data.data)
      })

    },

    //查询出库类型表数据
    form (){
      this.axios({
        method:'get',
        url:'http://localhost:9090/outinstocktype/selectOutinstocktypes',
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        this.outinstocktype=response.data.data
      })
    },

    //查询全部库存
    inventory(){
      this.axios({
        method:'get',
        url:'http://localhost:9090/stock/selectStocks',
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        this.stock=response.data.data
      })
    },

  //表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 删除行
    deleteRow(index, rows) {
    if(rows.length==1){
      ElMessage({
        message: '好歹留一个吧',
        type: 'warning',
      })
    }else {
      rows.splice(index, 1);
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    }

    },

    //添加行
    add_social() {
      let social_row = {
        commodityName: null, // 缴费项目
        commoditySpecifications: null, // 基数下限、
        commodityCompany: null, // 基数上限
        otherinstockdetailsPrice: null, // 公司缴纳比例
        otherInStockDetailsNumber: null, // 个人缴纳比例
        otherInStockDetailsTotal:0.00,
        remark:null, // 个人固定金额

      }
      this.tableData.push(social_row)
    },
  }
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;

}
.divcss5-4{
  border-bottom:1px dashed #000;
  height:50px;
  width:350px;
  width: 100%;
  text-align: center ;
  line-height: 40px;
  font-weight: bold;
}
</style>