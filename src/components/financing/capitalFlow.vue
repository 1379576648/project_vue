<template>
  <div class="max">
      <br>
      <el-row :gutter="24">
          <div style="width:100%;">
              <div style="width:50%;float:right;text-align:right;padding-right:1%">
                <el-input v-model="likeinput" placeholder="编号/往来单位" style="width:30%;margin-right:1%">
                    <template #append>
                        <el-button :icon="icon.search" />
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
                            <el-input v-model="gjss.djbh" placeholder="请输入单据编号" size="small" style="width:90%"></el-input>
                        </el-col>
                        <el-col :span="12" >
                            <el-select v-model="gjss.szlb" :clearable="true" size="small" style="width:90%">
                                <el-option value="0" label="全部" style="background-color:rgb(250,250,250)">全部</el-option>
                                <el-option value="1" label="收入">收入</el-option>
                                <el-option value="2" label="支出">支出</el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row :gutter="24" style="text-align:left;font-size:15px;">
                        <el-col :span="12">
                            结算账户：
                        </el-col>
                        <el-col :span="12">
                            经手人：
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" style="text-align:left;font-size:15px;">
                        <el-col :span="12">
                            <el-select v-model="gjss.jszh" style="width:90%" :clearable="true" size="small">
                                <el-option value="0" label="全部" style="background-color:rgb(250,250,250)">全部</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <el-select v-model="gjss.jsr" style="width:90%" :clearable="true" size="small">
                                <el-option value="0" label="全部" style="background-color:rgb(250,250,250)">全部</el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <template #footer>
                        <el-button @click="drawer=false">取消</el-button>
                        <el-button type="primary">查询</el-button>
                    </template>
                </el-drawer>
              </div>
          </div>
      </el-row>
      <br>
      <el-row :gutter="24">
          <el-table :data="tableData" border show-summary sum-text="合计" width="100%" class="table">
               <el-table-column type="index" label="序号" width="180" />
               <el-table-column prop="name" label="业务日期" />
               <el-table-column prop="amount1" label="单据编号" />
               <el-table-column prop="amount2" label="业务名称" />
               <el-table-column prop="amount3" label="往来单位" />
               <el-table-column prop="" label="结算账户"></el-table-column>
               <el-table-column prop="" label="收支类别"></el-table-column>
               <el-table-column prop="" label="收入金额"></el-table-column>
               <el-table-column prop="" label="支出金额"></el-table-column>
               <el-table-column prop="" label="当前余额"></el-table-column>
               <el-table-column prop="" label="经手人"></el-table-column>
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
            szlb:"0",
            jszh:"0",
            jszhData:[],
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
            total:5,
            like:""
        },
        tableData:[
            {
                id: '12987122',
                name: 'Tom',
                amount1: '234',
                amount2: '3.2',
                amount3: 10
            },
            {
                id: '12987123',
                name: 'Tom',
                amount1: '165',
                amount2: '4.43',
                amount3: 12
            },
            {
                id: '12987124',
                name: 'Tom',
                amount1: '324',
                amount2: '1.9',
                amount3: 9
            },
            {
                id: '12987125',
                name: 'Tom',
                amount1: '621',
                amount2: '2.2',
                amount3: 17
            },
            {
                id: '12987126',
                name: 'Tom',
                amount1: '539',
                amount2: '4.1',
                amount3: 15
            }
        ]
    };
  },
  methods: {
      selectAll(){
          this.axios.get("http://localhost:9090/fund/selectFundAll",{
              params:{
                  "page":this.pageInfo.page,
                  "size":this.pageInfo.size
              }
          })
          .then(res =>{
              console.log(res.data);
          })
          .catch(err =>{
              console.log(err);
          })
      }
  },
  created() {},
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
