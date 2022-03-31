

<template>
  <div class="common-layout">
    <el-container>


      <el-container>

        <el-main>

          <div class="boox">
            <div style="height: 50px;border-bottom: 1px solid #e8e8e8;">
              <div class="boox_1">
                <div><span class="word">全部商品>全部仓库</span></div>
                <div><span style="font-size: 12px">库存总额：￥</span><span style="font-family: Impact">0.00</span>  <span style="font-size: 12px">库存总数：</span><span style="font-family: Impact">0</span><span style="font-size: 12px">/个</span></div>
              </div>
              <div class="boox_1">
                <div style="width: 670px;height: 20px;float: right">
                  <el-checkbox v-model="checked1" label="过滤零库存商品" size="large" />
                  <el-cascader :options="options" clearable  :show-all-levels="false"  placeholder="商品分类"/>
                  <el-cascader :options="options" clearable  :show-all-levels="false"  placeholder="全部仓库"/>
                  <el-input size="small" v-model="checked1" placeholder="编号/商品/规格/属性" style="width:143px; height: 100px;">
                    <template #suffix>
                      <el-icon style="margin-top:9px;margin-right:0px"><i-search></i-search></el-icon>
                    </template>
                  </el-input>
                  <el-button>导出</el-button>
                </div>

              </div>

            </div>

          </div>
          <el-table  border empty-text="暂无数据" :stripe="true" :data="tableData" ref="tableT" @selection-change="handleSelectionChange" size="small" style="width: 99%;"  height="50vh">
            <el-table-column fixed type="selection" width="35">
            </el-table-column>
            <el-table-column prop="customerName" label="序号" width="100" sortable fixed>
            </el-table-column>
            <el-table-column prop="billMouth" label="商品编号" width="100" sortable fixed>
            </el-table-column>
            <el-table-column prop="totalAmount" label="商品名称" width="100" sortable fixed>
            </el-table-column>
            <el-table-column prop="date" label="条形码" width="100" sortable>
            </el-table-column>
            <el-table-column prop="status" label="主单位" :formatter="translationStatus" width="100" sortable>
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="规格/属性" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="零售价" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="批发价" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="最低售价" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="交货价" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="成本价" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="代入库数量" width="110">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="代出库数量" width="110">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="入库数量" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="出库数量" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="实际库存" width="100">
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="库存总额" width="100">
            </el-table-column>
            <el-table-column label="操作" fixed="right" class="tableOperation" width="130">
              <template #default="scope">
                <el-button type="text"  style="font-size: 12px" @click="dialogVisible1=true">库存流水 </el-button>
                <el-button type="text" style="font-size: 12px" @click="dialogVisible = true">  库存分布</el-button>

              </template>
            </el-table-column>

            <div slot="empty">
              <p>
                <img src="../../img/异常记录.png"/>
              </p>
              <p><span>暂无翻译记录</span></p>
            </div>
          </el-table>
          <div class="demo-pagination-block" style="float: right">
            <el-pagination
                v-model:currentPage="pageInfo.currentPage"
                v-model:page-size="pageInfo.pageSize"
                :default-page-size="pageInfo.pageSize"
                :page-sizes="[3, 4, 5, 6]"
                :page-size="3"
                :pager-count="4"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo.total"
                @size-change="selectEndAuditflow"
                @current-change="selectEndAuditflow"
                prev-text="上一页"
                next-text="下一页"
                background
            >
            </el-pagination>

          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="库存分布"
      width="50%"

      :before-close="handleClose"
  >
    <div style="border-bottom: 1px solid #e8e8e8; position: relative; top: -15px">

    </div>
    <span style="margin-bottom: 10px">asdasd</span><br>
    <span>商品编号：</span><span>1231231231</span>   <span style="margin-left: 20px">商品单位  </span><span>斤</span><br>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="80" />
      <el-table-column prop="name" label="仓库名称" width="100" />
      <el-table-column prop="address" label="代入库数量" width="100"/>
      <el-table-column prop="address" label="代出库数量" width="100" />
      <el-table-column prop="address" label="入库数量"  />
      <el-table-column prop="address" label="出库数量" />
      <el-table-column prop="address" label="实际数量" />
      <el-table-column prop="address" label="可用库存" />
    </el-table>

  </el-dialog>
  <el-dialog
      v-model="dialogVisible1"
      title="库存流水"
      width="70%"

      :before-close="handleClose"
  >
    <div style="border-bottom: 1px solid #e8e8e8; position: relative; top: -15px">

    </div>
    <span style="margin-bottom: 10px;font-weight: 700;">asdasd</span><br>
    <span class="word3">商品编号：</span><span class="word3">1231231231</span>   <span style="margin-left: 20px" class="word3">时间周期  </span><span class="word3" style="margin-right: 20px">全部</span>  <span style="margin-left: 20px" class="word3">仓库  </span><span class="word3" style="margin-right: 20px">默认仓库</span>
    <span style="margin-left: 20px" class="word3">单位  </span><span>斤</span>
    <br>
    <div style="width: 100%;height: 90px;/*background-color: #42b983*/ ">
      <div style=" border-top: 1px solid #e8e8e8">
        <div style="text-align: center;width: 80px; margin-top: 20px;margin-bottom: 20px;  float: left;margin-right: 25px;" >
          <span style="text-align: center" class="word2">可用库存</span><br>
          <span class="word1">0.00</span>
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          =
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          <span style="text-align: center" class="word2" >入库数量</span><br>
          <span class="word1">0.00</span>
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          -
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          <span style="text-align: center" class="word2">出库数量</span><br>
          <span class="word1">0.00</span>
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          +
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          <span style="text-align: center" class="word2">代入库数量</span><br>
          <span class="word1">0.00</span>
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          -
        </div>
        <div style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;" >
          <span style="text-align: center" class="word2">待出库数量</span><br>
          <span class="word1">0.00</span>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 50px;border-top: 5px solid #B0C4DE">

      <el-select v-model="value" class="m-2" placeholder="全部" size="large" >
        <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"

        />
      </el-select>
      <el-input size="small" v-model="checked1" placeholder="单据编号" style="width:143px; height: 100px; float: right">
        <template #suffix>
          <el-icon style="margin-top:9px;margin-right:0px"><i-search></i-search></el-icon>
        </template>
      </el-input>

      <span style="float: right;margin-top: 10px">业务类型: </span>

    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="80" />
      <el-table-column prop="name" label="仓库名称" width="100" />
      <el-table-column prop="address" label="代入库数量" width="100"/>
      <el-table-column prop="address" label="代出库数量" width="100" />
      <el-table-column prop="address" label="入库数量"  />
      <el-table-column prop="address" label="出库数量" />
      <el-table-column prop="address" label="实际数量" />
      <el-table-column prop="address" label="可用库存" />
    </el-table>

  </el-dialog>
</template>
<script>

export default {
  data(){
    return{
      checked1:"",
      options:[
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency',
                },
                {
                  value: 'feedback',
                  label: 'Feedback',
                },
                {
                  value: 'efficiency',
                  label: 'Efficiency',
                },
                {
                  value: 'controllability',
                  label: 'Controllability',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation',
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation',
                },
              ],
            },
          ],
        },
        {
          value: 'component',
          label: 'Component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout',
                },
                {
                  value: 'color',
                  label: 'Color',
                },
                {
                  value: 'typography',
                  label: 'Typography',
                },
                {
                  value: 'icon',
                  label: 'Icon',
                },
                {
                  value: 'button',
                  label: 'Button',
                },
              ],
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio',
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox',
                },
                {
                  value: 'input',
                  label: 'Input',
                },
                {
                  value: 'input-number',
                  label: 'InputNumber',
                },
                {
                  value: '商品分类',
                  label: '商品分类',
                },
                {
                  value: 'cascader',
                  label: 'Cascader',
                },
                {
                  value: 'switch',
                  label: 'Switch',
                },
                {
                  value: 'slider',
                  label: 'Slider',
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker',
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker',
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker',
                },
                {
                  value: 'upload',
                  label: 'Upload',
                },
                {
                  value: 'rate',
                  label: 'Rate',
                },
                {
                  value: 'form',
                  label: 'Form',
                },
              ],
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table',
                },
                {
                  value: 'tag',
                  label: 'Tag',
                },
                {
                  value: 'progress',
                  label: 'Progress',
                },
                {
                  value: 'tree',
                  label: 'Tree',
                },
                {
                  value: 'pagination',
                  label: 'Pagination',
                },
                {
                  value: 'badge',
                  label: 'Badge',
                },
              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert',
                },
                {
                  value: 'loading',
                  label: 'Loading',
                },
                {
                  value: 'message',
                  label: 'Message',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox',
                },
                {
                  value: 'notification',
                  label: 'Notification',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'Menu',
                },
                {
                  value: 'tabs',
                  label: 'Tabs',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown',
                },
                {
                  value: 'steps',
                  label: 'Steps',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip',
                },
                {
                  value: 'popover',
                  label: 'Popover',
                },
                {
                  value: 'card',
                  label: 'Card',
                },
                {
                  value: 'carousel',
                  label: 'Carousel',
                },
                {
                  value: 'collapse',
                  label: 'Collapse',
                },
              ],
            },
          ],
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'docs',
              label: 'Design Documentation',
            },
          ],
        },
      ],
      value:"",
      options1:[
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      dialogVisible:false,
      dialogVisible1:false,
      pageInfo: {
        currentPage: 1,
        pageSize: 3,
        total: 0,

      },
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
      ],

    }


  },methods:{
    path(){
      this.$router.push({path: '/ck'})
    }
  }
}
</script>

<style scoped>

.word3{
  color: rgba(0,0,0,.85);
  font-size: 14px;
}
.word2{
  color: rgba(0,0,0,.45);
  font-size: 12px;
}
.word1{
  font-family: Impact
}
/deep/ .el-dialog  {
  height: 480px;

}
/deep/ .el-header {
  background-color: red;
}
/deep/ .el-aside{
  height: 1000px;
  background-color: #42b983;
}
/deept/ .el-checkbox.el-checkbox--large .el-checkbox__label{
  color: rgba(0,0,0,.65);
  font-size: 14px;

  font-family: 微软雅黑,宋体,pingFang SC,Microsoft YaHei UI,Helvetica,serif;
}
/deep/ .el-cascader .el-input .el-input__inner{
  width: 150px;
  margin-left:5px;
}
/deep/ .el-input--small.el-input--suffix .el-input__inner{
  height: 33px;
  margin-left:5px;
}
/deep/ .el-table th.el-table__cell>.cell {

}
/deep/ .el-input--large.el-input--suffix .el-input__inner{
  width:143px; height: 33px;

}
/deep/ .el-select--large{
  width:143px; height: 33px;
  float: right;
}
.boox{
  /*  border: 1px solid #e8e8e8;*/

}

.boox_1{
  width: 50%;
  float: left;
}
.word{
  color: rgba(0,0,0,.45);
  font-size: 12px;
}
</style>
