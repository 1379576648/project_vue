

<template>
  <div class="common-layout">
    <el-container>
      <el-header>



      </el-header>

      <el-container>

        <el-main>

          <div class="boox">
            <span>仓库管理</span>
            <div style="height: 50px;border-bottom: 1px solid #e8e8e8;">

            </div>
            <el-button style="margin-top: 20px;margin-bottom: 10px;" @click="dialogVisible=true">新增</el-button>
          </div>
          <el-table  border  empty-text="暂无数据"  :data="tableData" ref="tableT" @selection-change="handleSelectionChange" size="small" style="width: 99%;"  height="50vh">

            <el-table-column prop="customerName" label="序号" width="50%"  >
            </el-table-column>
            <el-table-column prop="billMouth" label="仓库编号" width="" sortable >
            </el-table-column>
            <el-table-column prop="totalAmount" label="地址"  sortable >
            </el-table-column>
            <el-table-column prop="date" label="仓库状态"  sortable>
            </el-table-column>
            <el-table-column prop="status" label="备注" :formatter="translationStatus" sortable>
            </el-table-column>

            <el-table-column label="操作"  class="tableOperation">
              <template #default="scope">
                <el-button type="text"  style="font-size: 12px" @click="dialogVisible1=true">编辑 </el-button>
                <el-button type="text" style="font-size: 12px" @click="dialogVisible = true">  删除</el-button>

              </template>
            </el-table-column>

            <div slot="empty">
              <p>

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
      title="新增"
      width="55%"

      :before-close="handleClose"
  >
    <br>
    <el-form :model="form" label-width="120px">
      <el-form-item label="仓库编号" style="margin-bottom: 0px;">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="仓库名称" style="position: relative;top: -30px; right: -325px;margin-bottom: 0px;">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="仓库编号">
        <el-input v-model="form.name" />
      </el-form-item>


      <el-form-item label="仓库状态" style="margin-bottom: 0px;">
        <el-radio-group v-model="form.resource">
          <el-radio label="启用" />
          <el-radio label="停用" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认仓库" style="position: relative;top: -32px;left: 339px;margin-bottom: 0px;">
        <el-radio-group v-model="form.resource1">
          <el-radio label="设为默认" />
          <el-radio label="取消默认" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="锁定仓库">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="position: relative;top: 25px;left: 520px;">保存</el-button>
        <el-button style="position: relative;top: 25px;left: 360px;">取消</el-button>
      </el-form-item>
    </el-form>




  </el-dialog>
  <el-dialog
      v-model="dialogVisible1"
      title="编辑"
      width="55%"

      :before-close="handleClose"
  >
    <br>
    <el-form :model="form" label-width="120px">
      <el-form-item label="仓库编号" style="margin-bottom: 0px;">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="仓库名称" style="position: relative;top: -30px; right: -325px;margin-bottom: 0px;">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="仓库编号">
        <el-input v-model="form.name" />
      </el-form-item>


      <el-form-item label="仓库状态" style="margin-bottom: 0px;">
        <el-radio-group v-model="form.resource">
          <el-radio label="启用" />
          <el-radio label="停用" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认仓库" style="position: relative;top: -32px;left: 339px;margin-bottom: 0px;">
        <el-radio-group v-model="form.resource1">
          <el-radio label="设为默认" />
          <el-radio label="取消默认" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="锁定仓库">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="position: relative;top: 25px;left: 520px;">保存</el-button>
        <el-button style="position: relative;top: 25px;left: 360px;">取消</el-button>
      </el-form-item>
    </el-form>




  </el-dialog>
</template>
<script>

export default {
  data(){
    return{
      form:{
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,

        resource: '',
        resource1: '',
        desc: '',
      },
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
/deep/ .el-main{
  background-color: white;
}
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
/deep/ .el-form-item{
  width: 330px;
}

</style>
