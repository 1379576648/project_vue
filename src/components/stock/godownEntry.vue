<template>

<!-- 其他出入库 -->

  <el-card>
    <div class="divcss5-4" >
      <span style="font-size: 24px;">其他入库单</span>
    </div>
    <span style="float: right;margin-right: 200px;margin-top: -35px ">单据编号：</span>
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
      <el-select v-model="value" placeholder="请选择" style="width: 150px">
        <el-option
            style="width: 150px"
            v-for="item in payments"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <span style="margin-left: 10px"> 业务日期：</span>
        <el-date-picker
            style="width: 200px"
            v-model="value3"
            type="datetime"
            placeholder="请选择时间查询"
            :default-time="defaultTime"
        />
    </div>
    <br>
    <div class="sub-Content__primary" >
      <el-table :data="tableData" height="280px"  style="width: 100%;margin-bottom: 20px;"
                :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
                :cell-style="{ textAlign: 'center' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index"  label="序号" width="70px"  />
        <el-table-column prop="a" label="商品名称"  >
          <template #default="scope">
            <el-button @click="dialogVisible = true">请选择</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="b" label="规/属性"  />
        <el-table-column prop="c" label="单位"  />
        <el-table-column prop="d" label="单价"  />
        <el-table-column prop="e" label="数量"  />
        <el-table-column prop="f" label="商品金额（元）"  />
        <el-table-column prop="g" label="备注"  />
        <!-- 操作 -->
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button style="color: red" @click.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              删除
            </el-button>
            <el-button @click="add_social()" size="small"  type="text">新增</el-button>
          </template>
        </el-table-column>

      </el-table>
      <span>合计：{{}}</span>
    </div>

  </el-card>

  <br>
  <el-card>
    备注：
    <el-input
        v-model="textarea2"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="请输入备注"
        style="margin-top: 10px"
    />
    <div style="margin-top: 10px">
      <el-button style="margin-left: 1140px">取消</el-button>
      <el-button style="background-color: #6aa1ed;color: honeydew">保存</el-button>
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

    <span style="margin-left: 437px">商品分类：</span>
    <el-select v-model="value1" placeholder="请选择" style="width: 200px">
      <el-option
          style="width: 200px"
          v-for="item in classify"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    &nbsp;
    <el-input style="width: 200px" placeholder="编号/商品名称">

    </el-input>

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
      <el-table-column prop="address" label="商品编号" width="175" sortable />
      <el-table-column property="name" label="规格/属性"  />
      <el-table-column property="name" label="单位"  />

      <el-table-column property="name" label="参考进货价"  />
      <el-table-column property="name" label="实际库存"  />
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 5px;margin-left: 550px;">
      <el-pagination
          v-model:current-page="pageInfo.currentPage"
          v-model:currentPage="pageInfo.currentPage"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          :page-sizes="[3, 4, 5, 6]"
          :page-size="3"
          :pager-count="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="pagingQuery"
          @current-change="pagingQuery"
          prev-text="上一页"
          next-text="下一页"
          background
      >
      </el-pagination>
    </div>

    <hr style="margin-top: 20px;margin-bottom: -30px;color:  #FFFFFF"/>

    <template #footer >
        <span class="dialog-footer" >
          <el-button @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="dialogVisible = false">
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
    <el-input style="width: 150px" v-model="ruleForm.retailPrice" placeholder="输入零售价">
    </el-input>
  </el-form-item>

  <el-form-item style="margin-left: 257px;margin-top: -47px;" label="批发价：">
    <el-input style="width: 150px" v-model="ruleForm.tradePrice" placeholder="输入批发价"></el-input>
  </el-form-item>

  <el-form-item style="margin-left:493px;margin-top: -50px;" label="最低售价：">
    <el-input style="width: 150px" v-model="ruleForm.goodsPriceMinPrice" placeholder="输入最低价"></el-input>
  </el-form-item>

  <el-form-item style="margin-left: 728px;margin-top: -50px;" label="进货价：">
    <el-input style="width: 150px" v-model="ruleForm.goodsPricePurchase" goodsPricePurchase="输入进货价"></el-input>
  </el-form-item>

  <el-form-item style="margin-left: 20px;" label="备注：">
    <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
  </el-form-item>

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

import { ref } from 'vue'
const value3 = ref('')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]


export default {
data(){
  return{
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
    //分类
    classifys:[{
      value4: '语文',
      label: '语文'
    }, {
      value4: '数学',
      label: '数学'
    }],
    value4:'',


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
      pagesize: 3,
      total: 0,
    },

    //备注
    textarea2:'',

    //选择对话框
    dialogVisible:false,
    //新增对话框
    added:false,

    //选择对话框表格
    tableDatas:[
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St,',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St,',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St,',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, ',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St,',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St,',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St,',
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St,',
      }
    ],
    //表格
    tableData:[
      {}
    ],
    //出库数据
    outinstocktype:[],
    //库存
    stock:[],

    //添加其他入库单
    add:{
      stockId:'',
      outinstocktypeId:'',
    },

    multipleSelection:''
  }
},

  created() {
  this.axios.get("http://localhost:9090/category/find")
      .then(res=>{
       this.all=res.data.data
      })
  this.form ()
  this.inventory()
  },

  methods:{
  //商品添加
    goodsToAdd(){
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
    },

    //节点被点击时的回调
    handleNodeClik(node,data){
      //点击赋值回调
     this.bads=data.data;
     this.ruleForm.classifys=data.data.categoryName
      this.ruleForm.categoryId=data.data.categoryId

     //console.error(data.data.categoryName)
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


    //查询出库类型表数据
    addStockDatas (){

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



    //全选
    handleSelectionChange(val) {
      this.multipleSelection.value = val
    },


    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    },

    add_social() {
      let social_row = {
        a: null, // 缴费项目
        b: null, // 基数下限、
        c: null, // 基数上限
        d: null, // 公司缴纳比例
        e: null, // 个人缴纳比例
        f:null,
        g: null, // 个人固定金额

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