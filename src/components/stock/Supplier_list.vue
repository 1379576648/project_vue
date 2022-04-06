<template>
  <div style="background-color: white;margin-top: 10px;">

    <el-button @click="dialogVisible=true" type="primary">新增</el-button>
    &nbsp;

    <div style="float: right">
      <el-checkbox v-model="checked" @change="Supplier">显示已停用</el-checkbox>

      <!-- 供应商分类 -->
      <el-select v-model="supplierCategoryNameLabel1" placeholder="选择供应商分类">
        <el-option hidden/>
        <el-tree :data="allSupplierCategory" :props="defaultProps" @node-click="handleNodeClick1"/>
      </el-select>
      <el-input
          v-model="input"
          placeholder=" 根据名称搜索"
          style="width: 130px"
          @change="Supplier(input)"
      />
      &nbsp;
      <el-button @click="drawer=true" style="margin-right: 16px;">高级搜索</el-button>
    </div>
    <el-table
        ref="filterTable1"
        row-key="date1"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
        :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column fixed :index="indexMethod" type="index" label="序号" width="55"/>
      <el-table-column prop="supplierId" label="供应商编号" width="100"/>
      <el-table-column prop="supplierName" label="供应商名称" width="100"/>
      <el-table-column prop="categoryName" label="供应商分类" width="150"/>
      <el-table-column prop="supplierPhone" label="联系电话" width="100"/>
      <el-table-column prop="supplierAddress" label="地址" width="150"/>
      <el-table-column prop="copeMoney" label="当前应付欠款" width="150"/>
      <el-table-column prop="deleted" label="供应商状态" width="150">
        <template #default="scope">
          <el-button v-if="scope.row.deleted==0" disabled type="success" plain>正常</el-button>
          <el-button v-if="scope.row.deleted==1" disabled type="danger" plain>停用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="supplierRemark" label="备注" width="150"/>

      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
            <el-button type="success" @click="edit(scope.row)" plain>编辑</el-button>
            <el-button type="primary"  @click="details(scope.row)" plain>详情
            </el-button>
            <el-button type="danger"  @click="deleted(scope.row.supplierId)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--   分页插件 -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pageSize"
          :default-page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :pager-count="5"
          @size-change="Supplier(input)"
          @current-change="Supplier(input)"
          prev-text="上一页"
          next-text="下一页"
          background
      >
      </el-pagination>
    </div>


  </div>
  <el-drawer
      v-model="drawer"
      :with-header="false"
  >
    <h3>高级搜索</h3>
    <el-divider/>
    <div style="float: left">
      <span>供应商编号</span>
      <el-input v-model="pageInfo.supplierId" placeholder="输入供应商编号"/>
      <el-divider/>
    </div>
    <div style="float: left">
      <span>供应商名称</span>
      <el-input v-model="pageInfo.supplierName" placeholder="输入供应商名称"/>
      <el-divider/>
    </div>
    <div style="float: left">
      <span>供应商地址</span>
      <el-input v-model="pageInfo.supplierAddress" placeholder="输入供应商地址"/>
      <el-divider/>
    </div>
    <div style="float: left">
      <span>供应商电话</span>
      <el-input v-model="pageInfo.supplierPhone" placeholder="输入供应商电话"/>
      <el-divider/>
    </div>
    <!--    <div style="float: left;height: 200px;width: 200px;border: #010419 5px solid"></div>-->

    <div style="float: left;height: 190px;width: 430px">
      <div style="height: 80px;width: 420px"></div>
      <el-divider/>
      <div style="float: right;margin-right: 10px">
        <el-button @click="empty">清空</el-button>
        <el-button type="primary" @click="Supplier(senior)">搜索</el-button>
      </div>
    </div>
  </el-drawer>

  <el-dialog v-model="dialogVisible" title="新增" width="50%" draggable>

    <el-form :model="form1" :inline="true" label-width="120px">

      <el-form-item label="供应商名称">
        <el-input v-model="form1.supplierName" placeholder="输入供应商名称" />
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="form1.supplierPhone" placeholder="输入联系电话" />
      </el-form-item>

      <el-form-item label="供应商分类">

        <!-- 供应商分类 -->
        <el-select v-model="supplierCategoryNameLabel" placeholder="选择供应商分类">
          <el-option hidden/>
          <el-tree :data="allSupplierCategory" :props="defaultProps" @node-click="handleNodeClick"/>
        </el-select>

      </el-form-item>

      <el-form-item label="期初应付款">
        <el-input-number v-model="form1.copeMoney" placeholder="期初应付款" />
      </el-form-item>

      <el-form-item label="地址">
        <el-input style="width: 500px" v-model="form1.supplierAddress" type="textarea" />
      </el-form-item>

      <br>

      <el-form-item label="备注">
        <el-input style="width: 500px" v-model="form1.supplierRemark" type="textarea" />
        </el-form-item>

    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="insertSupplier"
        >保存</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible2" title="编辑" width="50%" draggable>

    <el-form :model="form2" :inline="true" label-width="120px">

      <el-form-item label="供应商名称">
        <el-input v-model="form2.supplierName" placeholder="输入供应商名称" />
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="form2.supplierPhone" placeholder="输入联系电话" />
      </el-form-item>

      <el-form-item label="供应商分类">

        <!-- 供应商分类 -->
        <el-select v-model="supplierCategoryNameLabel" placeholder="选择供应商分类">
          <el-option hidden/>
          <el-tree :data="allSupplierCategory" :props="defaultProps" @node-click="handleNodeClick"/>
        </el-select>

      </el-form-item>

      <el-form-item label="期初应付款">
        <el-input-number v-model="form2.copeMoney" placeholder="期初应付款" />
      </el-form-item>

      <el-form-item label="地址">
        <el-input style="width: 500px" v-model="form2.supplierAddress" type="textarea" />
      </el-form-item>

      <br>

      <el-form-item label="备注">
        <el-input style="width: 500px" v-model="form2.supplierRemark" type="textarea" />
      </el-form-item>

    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="insertSupplier"
        >保存</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible3" title="详情" width="50%" draggable>

    <el-form :model="form3" :inline="true" label-width="120px">

      <el-form-item label="供应商名称">
        <el-input v-model="form3.supplierName" placeholder="输入供应商名称" />
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="form3.supplierPhone" placeholder="输入联系电话" />
      </el-form-item>

      <el-form-item label="供应商分类">
        <el-input v-model="form3.categoryName" placeholder="输入联系电话" />
      </el-form-item>

<!--      <el-form-item label="供应商分类">-->

<!--        &lt;!&ndash; 供应商分类 &ndash;&gt;-->
<!--        <el-select v-model="supplierCategoryNameLabel" placeholder="选择供应商分类">-->
<!--          <el-option hidden/>-->
<!--          <el-tree :data="allSupplierCategory" :props="defaultProps" @node-click="handleNodeClick"/>-->
<!--        </el-select>-->

<!--      </el-form-item>-->

      <el-form-item label="期初应付款">
        <el-input-number v-model="form1.copeMoney" placeholder="期初应付款" />
      </el-form-item>

      <el-form-item label="地址">
        <el-input style="width: 500px" v-model="form1.supplierAddress" type="textarea" />
      </el-form-item>

      <br>

      <el-form-item label="备注">
        <el-input style="width: 500px" v-model="form1.supplierRemark" type="textarea" />
      </el-form-item>

    </el-form>

<!--    <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click="insertSupplier"-->
<!--        >保存</el-button-->
<!--        >-->
<!--      </span>-->
<!--    </template>-->
  </el-dialog>



</template>

<script>
import { ElMessage } from 'element-plus'

export default {

  data() {
    return {

      form1:{
        supplierName: '',
        supplierPhone: '',
        categoryId:"",
        supplierAddress: '',
        supplierRemark: '',
        copeMoney:"",

      },

      form2:{
        supplierName: '',
        supplierPhone: '',
        categoryId:"",
        supplierAddress: '',
        supplierRemark: '',
        copeMoney:"",

      },
      form3:{
        supplierName: '',
        supplierPhone: '',
        categoryId:"",
        categoryName:"",
        supplierAddress: '',
        supplierRemark: '',
        copeMoney:"",

      },

      dialogVisible: false,
      checked: false,
      drawer: false,
      dialogVisible2: false,
      dialogVisible3: false,
      input: null,
      total:0,

      tableData: [],

      // 所有供应商分类
      allSupplierCategory:[],

      // 格式
      defaultProps:{
        children:"children",
        label:"categoryName"
      },

      // 供应商列表下拉框显示的值
      supplierCategoryNameLabel:"",

      // 供应商列表下拉框显示的值
      supplierCategoryNameLabel1:"",

      // 供应商id
      categoryId1:"",

      pageInfo: {
        supplierId: null,
        supplierName: null,
        supplierPhone: null,
        supplierAddress: null,
        categoryId:null,
        deleted:null,

        currentPage: 1,
        pageSize: 3,
        total: 0
      }
    };
  },

  methods: {
    Supplier(like) {
      if (this.checked==true){
        this.pageInfo.deleted=1
      }else {
        this.pageInfo.deleted=0
      }
      console.log("like:"+like)
      if (Object.prototype.toString.call(this.input) === Object.prototype.toString.call('abc')) {
        this.pageInfo.supplierName = this.input
        this.axios({
          method: 'post',
          url: 'http://localhost:9090/supplier/selectSupplierByLike',
          data: this.pageInfo,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log("根据供应商编号查询所有供应商");
          console.log(response);

          if (response.data.state === 200) {
            this.tableData = response.data.info.records
            this.total=response.data.info.total
          } else {
            ElMessage({
              message: response.data.message,
              type: 'warning',
            })
          }
        })
      } else if (Object.prototype.toString.call(like) === Object.prototype.toString.call(null)) {
         this.axios({
           method: 'post',
           url: 'http://localhost:9090/supplier/selectSupplierByLike',
           data: this.pageInfo,
           responseType: 'json',
           responseEncoding: 'utf-8',
         }).then((response) => {
           console.log("查询所有供应商");
           console.log(response);

           if (response.data.state === 200) {
             this.tableData = response.data.info.records
             this.total=response.data.info.total
           } else {
             ElMessage({
               message: response.data.message,
               type: 'warning',
             })
           }
         })
       }
      else {
        this.axios({
          method: 'post',
          url: 'http://localhost:9090/supplier/selectSupplierByLike',
          data: this.pageInfo,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log("高级搜索");
          console.log(response);

          if (response.data.state === 200) {
            this.tableData = response.data.info.records
            this.total=response.data.info.total
            this.drawer=false
            this.empty()
          } else {
            ElMessage({
              message: response.data.message,
              type: 'warning',
            })
          }
        })
      }

    },

    // 查询所有供应商分类
    selectAllSupplierCategory(){
      this.axios({
        method: 'get',
        url: 'http://localhost:9090/supplier/selectAllSupplierCategory',
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有供应商分类",response);

        if (response.data.state === 200) {
          this.allSupplierCategory=response.data.info
        } else {
          ElMessage({
            message: "查询所有供应商分类有错误",
            type: 'warning',
          })
        }

      })
    },

    //添加供应商
    insertSupplier(){

      this.axios({
        method: 'post',
        url: 'http://localhost:9090/supplier/insertSupplier',
        data: this.form1,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("添加供应商");
        console.log(response);

        if (response.data.code === 200) {
          ElMessage({
            message: "添加成功",
            type: 'success',
          })
          this.dialogVisible = false
          this.Supplier(null);
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
          this.dialogVisible = false
        }
      })
    },

    //清空高级搜索框
    empty(){
          this.pageInfo.supplierAddress=null,
          this.pageInfo.supplierId=null,
          this.pageInfo.supplierName=null,
          this.pageInfo.supplierPhone=null
    },

    //编辑
    edit(row){
      this.dialogVisible2=true;
      this.form2.categoryId=row.categoryId;
      this.form2.copeMoney=row.copeMoney;
      this.form2.supplierAddress=row.supplierAddress;
      this.form2.supplierPhone=row.supplierPhone;
      this.form2.supplierRemark=row.supplierRemark;
      this.form2.supplierName=row.supplierName;
    },

    //详情
    details(row){
      this.dialogVisible3=true;
      this.form3.categoryName=row.categoryName;
      this.form3.copeMoney=row.copeMoney;
      this.form3.supplierAddress=row.supplierAddress;
      this.form3.supplierPhone=row.supplierPhone;
      this.form3.supplierRemark=row.supplierRemark;
      this.form3.supplierName=row.supplierName;
    },

    deleted(id){
      this.pageInfo.supplierId=id;
      this.axios({
        method: 'post',
        url: 'http://localhost:9090/supplier/deletedSupplier',
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("删除供应商");
        console.log(response);

        if (response.data.code === 200) {
          ElMessage({
            message: "删除成功",
            type: 'success',
          })
          this.Supplier(null)
        } else {
          ElMessage({
            message: "该用户已被使用，不能被删除",
            type: 'warning',
          })
        }
      })
    },

    // 当某节点被点击时调用的方法
    handleNodeClick(data) {

      // 选中 供应商分类回显的值
      this.supplierCategoryNameLabel = data.categoryName

      // 清空供应商分类id
      this.form1.categoryId = data.categoryId

      console.error("当某节点被点击时调用的方法:", data)

    },

    // 当某节点被点击时调用的方法
    handleNodeClick1(data) {

      // 选中 供应商分类回显的值
      this.supplierCategoryNameLabel1 = data.categoryName

      // 清空供应商分类id
      this.categoryId1 = data.categoryId

      console.error("当某节点被点击时调用的方法1:", data)

    },

    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;

      // return this.pageInfo.total - (index + (curpage - 1) * limitpage);
    },

  }, created() {
    this.Supplier(null);

    // 查询所有供应商分类
    this.selectAllSupplierCategory()
  }
}
</script>

<style scoped>

</style>