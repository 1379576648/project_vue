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
          <el-table border empty-text="暂无数据" :data="tableData" ref="tableT" @selection-change="handleSelectionChange"
                    size="small" style="width: 99%;" height="50vh">

            <el-table-column prop="stockId" label="序号" width="50%">
            </el-table-column>
            <el-table-column prop="stockId" label="仓库编号"  sortable   :sort-by="['stockId', 'address']">
            </el-table-column>
            <el-table-column prop="stockName" label="仓库名称" width="" sortable>
            </el-table-column>
            <el-table-column prop="stockSite" label="地址" sortable>
            </el-table-column>
            <el-table-column prop="stockState" label="仓库状态" sortable>
            </el-table-column>
            <el-table-column prop="stockRemark" label="备注" :formatter="translationStatus" sortable>
            </el-table-column>

            <el-table-column label="操作" class="tableOperation">
              <template #default="scope">
                <el-popconfirm @confirm="deleteStort(tableData[scope.$index].stockId)"
                               title="确认要删除此方案吗?">
                  <template #reference>
                    <el-button type="text" size="small" style="color:deepskyblue">删除</el-button>
                  </template>
                </el-popconfirm>
                <el-button type="text" size="small" style="color:deepskyblue"
                           @click="dialogVisible1=true,Stort1={stockId:tableData[scope.$index].stockId,stockName: tableData[scope.$index].stockName,stockSite: tableData[scope.$index].stockSite,stockState:tableData[scope.$index].stockState,stockRemark: tableData[scope.$index].stockRemark,stockDefault: tableData[scope.$index].stockDefault,deleted: tableData[scope.$index].deleted}">
                  编辑
                </el-button>

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
                @size-change="selectStort"
                @current-change="selectStort"
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
    <el-form :model="Stort" label-width="120px">
      <el-form-item label="仓库编号" style="margin-bottom: 0px;">
        <el-input v-model="Stort.stockId"/>
      </el-form-item>
      <el-form-item label="仓库名称" style="position: relative;top: -30px; right: -325px;margin-bottom: 0px;">
        <el-input v-model="Stort.stockName"/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="Stort.stockSite"/>
      </el-form-item>


      <el-form-item label="仓库状态" style="margin-bottom: 0px;">
        <el-radio-group v-model="Stort.stockState">
          <el-radio :label=0>启用</el-radio>
          <el-radio :label=1>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认仓库" style="position: relative;top: -32px;left: 339px;margin-bottom: 0px;">
        <el-radio-group v-model="Stort.stockDefault">
          <el-radio :label=0>设为默认</el-radio>
          <el-radio :label=1>取消默认</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="Stort.stockRemark" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addStort" style="position: relative;top: 25px;left: 520px;">保存</el-button>
        <el-button style="position: relative;top: 25px;left: 360px;" @click="look">取消</el-button>
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
    <el-form :model="Stort1" label-width="120px">
      <el-form-item label="仓库编号" style="margin-bottom: 0px;">
        <el-input v-model="Stort1.stockId"/>
      </el-form-item>
      <el-form-item label="仓库名称" style="position: relative;top: -30px; right: -325px;margin-bottom: 0px;">
        <el-input v-model="Stort1.stockName"/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="Stort1.stockSite"/>
      </el-form-item>


      <el-form-item label="仓库状态" style="margin-bottom: 0px;">
        <el-radio-group v-model="Stort1.stockState">
          <el-radio :label=0> 启用</el-radio>
          <el-radio :label=1>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认仓库" style="position: relative;top: -32px;left: 339px;margin-bottom: 0px;">
        <el-radio-group v-model="Stort1.stockDefault">
          <el-radio :label=0>设为默认</el-radio>
          <el-radio :label=1>取消默认</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="锁定仓库">
        <el-switch v-model="Stort1.delivery"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="Stort1.stockRemark" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateStort(),dialogVisible1=false" style="position: relative;top: 25px;left: 520px;" >保存</el-button>
        <el-button style="position: relative;top: 25px;left: 360px;" @click="dialogVisible1=false">取消</el-button>
      </el-form-item>
    </el-form>


  </el-dialog>
</template>
<script>
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      Stort: {
        stockId: '', //仓库编号
        stockName: '', //仓库名称
        stockSite: '',//仓库地址
        stockState: '',//仓库状态
        stockRemark: '',//备注
        deleted: '',// 逻辑删除列（0:可用，1：不可用）
        stockDefault: 1,// 是否默认仓库
      },
      Stort1: {
        stockId: '',
        stockName: '',
        stockSite: '',
        stockState: '',
        stockRemark: '',
        deleted: '',
        stockDefault: '',
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,

        resource: '',
        resource1: '',
        desc: '',
      },
      checked1: "",
      options: [
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
      value: "",
      options1: [
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
      dialogVisible: false,
      dialogVisible1: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 6,
        total: 0,

      },
      tableData: [],

    }


  }, methods: {
    selectStort() {
      this.axios({
        method: 'post',
        url: "http://localhost:9090/stock/selectStock",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8'
      }).then((response) => {
        console.log("查询111");
        console.log(response);
        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },
    //添加仓库
    addStort() {
      this.axios.post("http://localhost:9090/stock/addStock", this.Stort)
          .then(response => {
            if (response.data === "失败") {
              ElMessage.error('添加失败')
            } else {
              ElMessage({
                message: '成功',
                type: 'success'
              })
              this.selectStort();
            }
          })

    },
    deleteStort(id) {
      this.axios({
        url: "http://localhost:9090/stock/deleteStock",
        method: "post",
        data: [id],
        responseType: 'json',
        responseEncoding: 'utf-8'
      })
          .then((response) => {
            if (response.data === "失败") {

              ElMessage.error("删除失败");

            } else {
              this.selectStort();
              ElMessage({
                type: "success",
                message: "删除成功",

              });
              console.log(response.data[0] + "ashdja")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //修改仓库
    updateStort(){
      this.axios({
        method:"put",
        url:"http://localhost:9090/stock/updateStock",
        data:this.Stort1,
        responseType:'json',
        responseEncoding:"utf-8"
      }).then(response=>{
        console.log(response)
        if(response.data==="失败"){
          ElMessage.error("修改失败")
        }else{
          ElMessage({
            type:"success",
            message:"修改成功"
          })
          this.selectStort();
        }
      })
    },
    look() {
      this.dialogVisible = false;
      this.Stort.stockName = "";
      this.Stort.stockSite = "";
      this.Stort.stockRemark = "";
      this.Stort.stockState = "";
      this.Stort.stockId = "";
    }

  }, created() {
    this.selectStort();
  }, watch: {
    currentPage: {
      handler: function () {
        this.selectStort();
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
/deep/ .el-main {
  background-color: white;
}

.word3 {
  color: rgba(0, 0, 0, .85);
  font-size: 14px;
}

.word2 {
  color: rgba(0, 0, 0, .45);
  font-size: 12px;
}

.word1 {
  font-family: Impact
}

/deep/ .el-dialog {
  height: 480px;

}

/deep/ .el-header {

}

/deep/ .el-aside {
  height: 1000px;
  background-color: #42b983;
}

/deept/ .el-checkbox.el-checkbox--large .el-checkbox__label {
  color: rgba(0, 0, 0, .65);
  font-size: 14px;

  font-family: 微软雅黑, 宋体, pingFang SC, Microsoft YaHei UI, Helvetica, serif;
}

/deep/ .el-cascader .el-input .el-input__inner {
  width: 150px;
  margin-left: 5px;
}

/deep/ .el-input--small.el-input--suffix .el-input__inner {
  height: 33px;
  margin-left: 5px;
}

/deep/ .el-input--large.el-input--suffix .el-input__inner {
  width: 143px;
  height: 33px;

}

/deep/ .el-select--large {
  width: 143px;
  height: 33px;
  float: right;
}

.boox {
  /*  border: 1px solid #e8e8e8;*/

}

.boox_1 {
  width: 50%;
  float: left;
}

.word {
  color: rgba(0, 0, 0, .45);
  font-size: 12px;
}

/deep/ .el-form-item {
  width: 330px;
}

</style>
