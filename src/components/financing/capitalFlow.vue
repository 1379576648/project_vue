<template>
  <div class="max">
      <br>
      <el-row :gutter="24">
          <div style="width:100%;">
              <div style="width:50%;float:right;text-align:right;padding-right:1%">
                <el-input v-model="likeinput" placeholder="单据编号/往来单位" style="width:30%;margin-right:1%">
                    <template #append>
                        <el-button @click="selectAll()" :icon="icon.search" />
                    </template>
                </el-input>
                <el-button @click="drawer=true">高级搜索</el-button>
                <el-drawer v-model="drawer" :with-header="false">
                    <el-row :gutter="24">
                        <h2 style="margin-left:2%;">高级搜索</h2>
                    </el-row>
                    <br>
                    <hr>
                    <br>
                    <el-row :gutter="24" style="text-align:left;font-size:15px;">
                        <el-col :span="12">
                            单据编号：
                        </el-col>
                        <el-col :span="12">
                            收支类别：
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" style="text-align:left;font-size:15px;">
                        <el-col :span="12">
                            <el-input v-model="gjss.djbh" placeholder="请输入单据编号" size="small" style="width:90%" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="12" >
                            <el-select v-model="gjss.szlb" size="small" style="width:90%">
                                <el-option value="全部" label="全部" style="background-color:rgb(250,250,250)">全部</el-option>
                                <el-option value="收入" label="收入">收入</el-option>
                                <el-option value="支出" label="支出">支出</el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row :gutter="24" style="text-align:left;font-size:15px;">
                        <el-col :span="12">
                            结算方式：
                        </el-col>
                        <el-col :span="12">
                            经手人：
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" style="text-align:left;font-size:15px;">
                        <el-col :span="12">
                            <el-select v-model="gjss.jszh" style="width:90%" size="small">
                                <el-option value="全部" label="全部" style="background-color:rgb(250,250,250)">全部</el-option>
                                <el-option value="现金" label="现金">现金</el-option>
                                <el-option value="微信" label="微信">微信</el-option>
                                <el-option value="支付宝" label="支付宝">支付宝</el-option>
                                <el-option value="系统账户" label="系统账户">系统账户</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <el-select v-model="gjss.jsr" style="width:90%" size="small" :disabled="true">
                                <el-option value="0" label="全部" style="background-color:rgb(250,250,250)">全部</el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <template #footer>
                        <el-button @click="drawer=false">取消</el-button>
                        <el-button type="primary" @click="selectAll();drawer=false">查询</el-button>
                    </template>
                </el-drawer>
              </div>
          </div>
      </el-row>
      <br>
      <el-row :gutter="24">
          <el-table :data="tableData" border show-summary sum-text="合计" :default-sort="{ prop: 'operationTime', order: 'descending' }" width="100%" class="table">
               <el-table-column type="index" label="序号" width="80" />
               <el-table-column prop="operationTime" label="业务日期" />
               <el-table-column prop="billId" label="单据编号" />
               <el-table-column prop="businessName" label="业务名称" />
               <el-table-column prop="correspondentUnit" label="往来单位" />
               <el-table-column prop="settlementMethod" label="结算方式"></el-table-column>
               <el-table-column label="收支类别">
                   <template #default="scope">
                       <p v-if="scope.row.type=='收入'" style="width:50px;height:30px;background-color:rgba(230,255,251,0.5);border:1px solid rgb(87,205,205);color:rgb(87,205,205);text-align:center;line-height:30px;">{{scope.row.type}}</p>
                       <p v-if="scope.row.type=='支出'" style="width:50px;height:30px;background-color:rgba(255,241,240,0.5);border:1px solid rgb(245,67,76);color:rgb(245,67,76);text-align:center;line-height:30px;">{{scope.row.type}}</p>
                   </template>
               </el-table-column>
               <el-table-column prop="revenueAmount" label="收入金额"></el-table-column>
               <el-table-column prop="expenditureAmount" label="支出金额"></el-table-column>
               <el-table-column prop="currentBalance" label="当前余额"></el-table-column>
               <el-table-column prop="staffId" label="经手人"></el-table-column>
          </el-table>
      </el-row>
      <el-row :gutter="24">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.page"
            :page-sizes="[10,20,30,50,80,100]"
            :page-size="pageInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            class="page"
          >
          </el-pagination>
      </el-row>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default {
  data() {
    return {
        likeinput:"",
        gjss:{
            djbh:"",
            szlb:"全部",
            jszh:"全部",
            jsr:"0",
            jsrData:[]
        },
        drawer:false,
        icon:{
            search:Search
        },
        pageInfo:{
            page:1,
            size:10,
            total:5
        },
        tableData:[]
    };
  },
  methods: {
      //表尾合计列统计规则方法
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }

          if(index === 9){
            sums[index] = '—';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = '￥'+sums[index];
          } else {
            sums[index] = '—';
          }
        });

        return sums;
      },
      //查询方法
      selectAll(){
          this.axios.get("http://localhost:9090/fund/selectFundAll",{
              params:{
                  "page":this.pageInfo.page,
                  "size":this.pageInfo.size,
                  "like":this.likeinput,
                  "type":this.gjss.szlb,
                  "method":this.gjss.jszh
              }
          })
          .then(res =>{
              this.tableData=res.data.data.records;
              this.pageInfo.total=res.data.data.total;
          })
          .catch(err =>{
              console.log(err);
          })
      },
      //分页每页多少条方法
      handleSizeChange(size){
          this.pageInfo.size=size;
          this.selectAll();
      },
      //分页切换页数方法
      handleCurrentChange(page){
          this.pageInfo.page=page;
          this.selectAll();
      },
  },
  created() {
      this.selectAll();
  },
  mounted() {}
};
</script>
<style>
.max{
    width:100%;
    height: 100%;
    background-color: white;
    overflow-x: hidden;
}
.page{
    margin-left: 10px;
}
.table{
    height: 750px;
    margin-left: 10px;
}
</style>
