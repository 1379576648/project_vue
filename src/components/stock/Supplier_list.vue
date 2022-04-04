<template>
  <div style="background-color: white;margin-top: 10px;">

      <el-button @click="xBox=true">新增</el-button>
      &nbsp;

      <div style="float: right">
        <el-checkbox v-model="checked">显示已停用</el-checkbox>
        <el-cascader :options="options" :show-all-levels="false"></el-cascader>
        <el-input
            v-model="input"
            placeholder="输入供应商编号/名称搜索"
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
      >
        <el-table-column prop="auditflowdetaiDate" label="序号" width="140"/>
        <el-table-column prop="supplierId" label="供应商编号" width="100"/>
        <el-table-column prop="supplierName" label="供应商名称" width="100"/>
        <el-table-column prop="categoryName" label="供应商分类" width="150"/>
        <el-table-column prop="supplierPhone" label="联系电话" width="100"/>
        <el-table-column prop="supplierAddress" label="地址" width="150"/>
        <el-table-column prop="copeMoney" label="当前应付欠款" width="150"/>
        <el-table-column prop="createdTime" label="供应商状态" width="150"/>
        <el-table-column prop="supplierRemark" label="备注" width="150"/>

        <el-table-column label="操作">
          <template #default="scope">
            <template>
              <el-button type="success" plain>编辑</el-button>
            </template>

            <template>
              <el-button type="danger" plain>详情</el-button>
            </template>
            <template>
              <el-button type="danger" plain>删除</el-button>
            </template>
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
            :total="pageInfo.total"
            :pager-count="5"
            @size-change="Supplier(input)"
            @current-change="Supplier(input)"
            prev-text="上一页"
            next-text="下一页"
            background
        >
        </el-pagination>
      </div>
{{this.tableData}}

  </div>
  <el-drawer
      v-model="drawer"
      :with-header="false"
    >
    <h3>高级搜索</h3>
    <el-divider />
    <div style="float: left">
      <span>供应商编号</span>
      <el-input v-model="supplierId" placeholder="输入供应商编号"/>
      <el-divider />
    </div>
    <div style="float: left">
      <span>供应商名称</span>
      <el-input v-model="supplierName" placeholder="输入供应商名称"/>
      <el-divider />
    </div>
    <div style="float: left">
      <span>供应商地址</span>
      <el-input v-model="supplierAddress" placeholder="输入供应商地址"/>
      <el-divider />
    </div>
    <div style="float: left">
      <span>供应商电话</span>
      <el-input v-model="supplierPhone" placeholder="输入供应商电话"/>
      <el-divider />
    </div>
<!--    <div style="float: left;height: 200px;width: 200px;border: #010419 5px solid"></div>-->

<div style="float: left;height: 190px;width: 430px">
  <div style="height: 80px;width: 420px"></div>
  <el-divider />
  <div style="float: right;margin-right: 10px">
    <el-button>清空</el-button>
    <el-button type="primary">搜索</el-button>
  </div>
</div>
  </el-drawer>

</template>

<script>
export default {

  data() {
    return {

      checked: false,
      drawer:false,
      xBox:false,
      input:null,
      supplierId:null,
      supplierName:null,
      supplierPhone:null,
      supplierAddress:null,

      tableData:[],

      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],

      pageInfo:{
        supplierId:null,
        supplierName:null,
        supplierPhone:null,
        supplierAddress:null,

        currentPage:1,
        pageSize:3,
        total:0
      }
    };
  },

  methods:{
    Supplier(like) {
     console.log(like)
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
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
            this.tableData=response.data.info.records
          }
          else {
            ElMessage({
              message: response.data.message,
              type: 'warning',
            })
          }
        })}
      // else if (like.length==11){
      //   this.pageInfo.supplierPhone=like
      //   this.axios({
      //     method: 'post',
      //     url: 'http://localhost:9090/supplier/selectSupplierByLike',
      //     data: this.pageInfo,
      //     responseType: 'json',
      //     responseEncoding: 'utf-8',
      //   }).then((response) => {
      //     console.log("根据电话号码查询所有供应商");
      //     console.log(response);
      //
      //     if (response.data.state === 200) {
      //       this.tableData=response.data.info.records
      //     }
      //     else {
      //       ElMessage({
      //         message: response.data.message,
      //         type: 'warning',
      //       })
      //     }
      //   })
      // }
       else if(Object.prototype.toString.call(like)===Object.prototype.toString.call(123)){
        this.pageInfo.supplierPhone=like
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
            this.tableData=response.data.info.records
          }
          else {
            ElMessage({
              message: response.data.message,
              type: 'warning',
            })
          }
        })
      }
      else {
        this.pageInfo.supplierName=like
        this.axios({
          method: 'post',
          url: 'http://localhost:9090/supplier/selectSupplierByLike',
          data: this.pageInfo,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log("根据名字所有供应商");
          console.log(response);

          if (response.data.state === 200) {
            this.tableData=response.data.info.records
          }
          else {
            ElMessage({
              message: response.data.message,
              type: 'warning',
            })
          }
        })
      }

    },
  },created() {
    this.Supplier(null);
  }
}
</script>

<style scoped>

</style>