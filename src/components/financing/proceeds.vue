<!--收款单页面-->
<template>
  <div class="ant-card">
    <div class="ant-card-head" style="border-bottom: 1px dashed rgb(217, 217, 217);padding: 24px 16px 0px;">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title">
          <div class="ant-col ant-col-8" align="middle">
            <span class="font-size-24 font-bold-700">收款单</span>
          </div>
          <el-button @click="goBack()" style="margin-left: 1100px;margin-bottom: 5px;">收款历史</el-button>
          <div class="ant-col ant-col-8" align="right"><span>
<!--            <span>-->
            <!--        <span class="font-size-14"><span class="font-color-45">单据编号：</span>-->
            <!--          <span busitype="104">{{ this.collectionSerialNumber }}</span></span>&lt;!&ndash;&ndash;&gt;</span>-->
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-card-body" style="padding: 8px 16px 16px;background:#fff">
      <div class="ant-row">
        经手人：
        <el-select v-model="region" placeholder="请选择" style="width: 110px">
          <el-option
              v-for="item in staffAll"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div style="padding: 15px">
        <div>
          <el-table
              :data="tableData"
              border
              id="scroll"
              style="width: 100%;max-height:calc(100vh - 218px);"
              :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
          >
            <el-table-column prop="name" label="客户" type="index" width="235">
              <el-popover placement="bottom" :width="600" trigger="click" v-show="payClick" :key="one">
                <template #reference>
                  <el-input @click="this.payClick=true"
                            style="width: 140px;"
                            v-model="payment"
                            placeholder="请选择客户"
                            class="input-with-select">

                  </el-input>
                </template>
                <el-table :data="tableData2" @row-click="a">
                  <el-table-column width="150" property="customerSerial" label="客户编号"/>
                  <el-table-column width="300" property="customerName" label="客户名称"/>
                  <el-table-column width="150" property="customerPhone" label="联系电话"/>
                </el-table>
              </el-popover>
              <el-button @click="this.payClick=false,this.become=true">
                <el-icon>
                  <user/>
                </el-icon>
              </el-button>
            </el-table-column>
            <el-table-column prop="name" label="结算账户" width="200">
              <template #default>
                <el-select v-model="payType" placeholder="请选择" style="width: 150px">
                  <el-option label="现金" value="现金"/>
                  <el-option label="微信" value="微信"/>
                  <el-option label="支付宝" value="支付宝"/>
                  <el-option label="系统账户" value="系统账户"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="aggregate" label="欠款总计(元)" width="201">
              {{ this.tableData.aggregate }}
            </el-table-column>
            <el-table-column prop="address" label="本次付款(元)" width="203">
              <el-input-number v-model="onePay" :min="0" :max="10000000" :step="100" @change="calculateOne"/>
            </el-table-column>
            <el-table-column prop="address" label="优惠金额(元)" width="202">
              <template #default>
                <el-input-number v-model="salePay" :min="0" :max="10000000" :step="100" @change="calculateTwo"/>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="合计(元)" width="210" align="center">
              {{ this.tableData.combined }}
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="ant-card-body2" style="margin-top: 20px;padding: 10px;background: white">
      备注：
      <br/>
      <el-input v-model="remark" type="textarea" placeholder="请输入备注信息"/>
      <br/>
      <br/>
    </div>
    <div class="ant-card-body2" style="margin-top: 70px;padding: 10px;background: white">
      <div class="ant-button">
        <el-button>取消</el-button>
        <el-button type="primary" @click="addDocuments()">保存</el-button>
      </div>
    </div>

  </div>
  <!--  选择供应商弹框-->
  <div>
    <el-dialog
        v-model="become"
        title="选择客户"
        width="65%"
        :close-on-click-modal="false"
    >
      <button type="button" class="fl ant-btn" @click="this.become2=true,this.become=false"><span>新增客户</span></button>&nbsp;&nbsp;
      <el-input style="width: 250px;"
                v-model="customerName"
                placeholder="客户名称"
                class="input-with-select"
      >
        <template #append>
          <el-button @click="queryAllCustomer()">
            <el-icon>
              <search/>
            </el-icon>
          </el-button>
        </template>
      </el-input>
      <br/>
      <br/>
      <div>
        <div style="height:calc(100vh - 218px);border:1px solid #e8e8e8;border-top:none">
          <el-table
              :data="tableData3"
              border
              id="scroll3"
              style="width: 100%;max-height:calc(100vh - 218px);"
              :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
              :default-sort="{ prop: 'name', order: 'descending' }"
          >
            <el-table-column prop="name" label="序号" type="index" width="80"/>
            <el-table-column prop="name" label="操作" width="80">
              <template #default="scope">
                <el-radio
                    :label="scope.$index"
                    v-model="currentRow"
                    @click="a(scope.row)"
                    style="color: #fff; padding-left: 10px; margin-right: -25px"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="customerSerial" label="客户编号" width="150"/>
            <el-table-column prop="customerName" label="客户名称" width="170"/>
            <el-table-column prop="customerPhone" label="联系电话" width="166"/>
            <el-table-column prop="customerAddress" label="地址" width="150"/>
            <el-table-column prop="customerRemarks" label="备注" width="150"/>
          </el-table>
        </div>
      </div>
      <!-- 分页插件 -->
      <div class="demo-pagination-block">
        <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[1, 3, 5, 7]"
            v-model:page-size="pageInfo.pageSize"
            :default-page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            background
            next-text="下一页"
            prev-text="上一页"
            @size-change="queryAllCustomer()"
            @current-change="queryAllCustomer()"
            @prev-click="queryAllCustomer()"
            @next-click="queryAllCustomer()">
          prev-text="上一页"
          next-text="下一页"
          >
        </el-pagination>
      </div>
      <div style="margin-top: 10px;margin-left: 770px;">
        <el-button @click="this.become=false,this.payment = undefined,this.currentRow=undefined">取消</el-button>
        <el-button type="primary" @click="this.a(),this.become=false,this.currentRow=undefined">确认选择</el-button>
      </div>
    </el-dialog>

  </div>

  <!--  新增客户-->
  <div>
    <el-dialog
        v-model="become2"
        title="新增客户"
        width="50%"
        :close-on-click-modal="false"
    >
      <div>
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
          <el-form-item label="客户编号：" prop="id">
            <el-input disabled v-model="ruleForm.id"/>
          </el-form-item>
          <el-form-item label="客户名称：" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入客户名称"/>
          </el-form-item>
          <el-form-item label="填写电话：" prop="phone">
            <el-input v-model="ruleForm.phone"/>
          </el-form-item>
          <el-form-item label="联系地址：" prop="address">
            <el-input v-model="ruleForm.address"/>
          </el-form-item>
          <el-form-item label="备注" prop="remark2">
            <el-input v-model="ruleForm.remark2" type="textarea"/>
          </el-form-item>
          <el-form-item>
            <el-button @click=" resetForm(),this.become2=false,this.become=true">取消并返回</el-button>

            <el-button type="primary" @click="addCustomer()"
            >保存
            </el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessage} from "element-plus";

export default defineComponent({
  data() {
    return {
      // 访问地址
      url: "http://localhost:9090/",
      ruleForm: ({
        id: '',
        name: '',
        type: '',
        phone: '',
        address: '',
        remark2: '',
      }),
      //单选框
      currentRow: false,
      //搜索
      seek: '',
      //弹框
      become: false,
      //弹框2
      become2: false,
      //隐藏
      payClick: true,
      one: 1,
      //经手人
      region: '',
      //业务日期
      time: '',
      //下拉表格
      tableData2: [],
      //表格
      tableData: [{}],
      //表格
      tableData3: [],
      //客户
      payment: '',
      // 客户ID
      paymentId: '',
      //供应商2
      payment2: '',
      //结算账户
      payType: '',
      //本次付款
      onePay: '',
      //优惠金额
      salePay: '',
      //备注`
      remark: '',
      //图片
      dialogVisible: false,
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },
      //验证
      rules: {
        name: [
          {
            required: true,
            message: '请输入客户名称',
            trigger: 'blur'
          },
        ],
      },
      // 收款单编号
      collectionSerialNumber: "",
      // 客户名称-条件
      customerName: "",
      // 隐藏ID
      Id: true,
      // 经手人
      staffAll: [],
    }
  },
  methods: {
    // 生成客户流水编号
    obtainSerialNumber() {
      this.axios({
        method: 'get',
        url: this.url + 'obtainSerialNumber',
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("生成客户流水编号");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            this.ruleForm.id = response.data.data.info
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    // 添加客户
    addCustomer() {
      if (this.ruleForm.name.length === 0) {
        ElMessage({
          message: "请输入用户名称",
          type: 'warning',
        })
      } else if (this.ruleForm.phone === 0) {
        ElMessage({
          message: "请输入用户联系电话",
          type: 'warning',
        })
      } else if (this.ruleForm.address === 0) {
        ElMessage({
          message: "请输入用户联系地址",
          type: 'warning',
        })
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'customer/addCustomer',
          data: {
            'customerSerial': this.ruleForm.id,
            'customerName': this.ruleForm.name,
            'customerAddress': this.ruleForm.address,
            'customerPhone': this.ruleForm.phone,
            'customerRemarks': this.ruleForm.remark2,
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log("添加客户");
          console.log(response);
          if (response.data.code === 200) {
            if (response.data.data.state === 200) {
              ElMessage({
                message: "保存成功",
                type: 'success',
              })
              this.become2 = false;
              this.become = true
              // 清空表单
              this.resetForm();
              this.obtainSerialNumber();
              this.queryAllCustomer();
            }
          } else {
            ElMessage({
              message: response.data.message,
              type: 'warning',
            })
          }
        })
      }
    },
    // 查询所有的客户
    queryAllCustomer() {
      const customerNameOne = this.customerName === "" ? "*****1*****1*****1" : this.customerName;
      this.axios({
        method: 'get',
        url: this.url + 'customer/queryAllCustomer/' + this.pageInfo.currentPage + '/' + this.pageInfo.pageSize + '/' + customerNameOne,
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有的客户");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            this.tableData2 = response.data.data.info.records
            this.tableData3 = response.data.data.info.records
            this.pageInfo.pageSize = response.data.data.info.size;
            this.pageInfo.total = response.data.data.info.total;
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    // 根据客户编号查询其欠款总计
    selectByCustomerIdAllMoney(val) {
      this.axios({
        method: 'get',
        url: this.url + 'receivable/selectByCustomerIdAllMoney/' + val.customerId,
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("根据客户编号查询其欠款总计");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            this.tableData.aggregate = response.data.data.info
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    // 查询所有用户
    selectAllStaff() {
      this.axios({
        method: 'get',
        url: this.url + 'staff/selectAllStaff',
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有用户");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            for (let i = 0; i < response.data.data.info.length; i++) {
              this.staffAll.push({
                value: response.data.data.info[i].staffId,
                label: response.data.data.info[i].staffName
              })
            }
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    // 保存单据
    addDocuments() {
      if (this.payment.length === 0) {
        ElMessage({
          message: "请选择客户",
          type: 'warning',
        })
      } else if (this.payType === 0) {
        ElMessage({
          message: "请选择支付方式",
          type: 'warning',
        })
      } else if (this.onePay === 0) {
        ElMessage({
          message: "本次付款不能为0元",
          type: 'warning',
        })
      } else if (this.region === 0) {
        ElMessage({
          message: "经手人不能为空",
          type: 'warning',
        })
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'receivable/addDocuments',
          data: {
            // 客户编号
            'customerId': this.paymentId,
            // 用户编号
            'staffId': this.region,
            // 支付方式
            'settlement': this.payType,
            // 实收金额
            'aggregate': this.onePay,
            // 优惠金额
            'coupon': this.salePay,
            // 备注
            "remarks": this.remark
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log("保存单据");
          console.log(response);
          if (response.data.code === 200) {
            if (response.data.data.state === 200) {
              if (response.data.data.info === "成功" ) {
                ElMessage({
                  message: "成功",
                  type: 'success',
                })
              }else {
                ElMessage({
                  message: response.data.data.info,
                  type: 'warning',
                })
              }
            }
          } else {
            ElMessage({
              message: response.data.message,
              type: 'warning',
            })
          }
        })
      }
    },
    // 计算合计
    calculateOne() {
      if (this.salePay === 0) {
        this.tableData.combined = this.onePay - this.salePay
      } else {
        this.tableData.combined = this.onePay - this.salePay
      }
    },
    // 计算合计
    calculateTwo() {
      if (this.onePay === 0) {
      } else {
        this.tableData.combined = this.onePay - this.salePay
      }
    },
    // 清空表单
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    //选中名称赋值进供应商文本框
    a(val) {
      this.payment = val.customerName;
      this.paymentId = val.customerId;
      this.payClick = false;
      this.one = this.one + 1;
      // 根据客户编号查询其欠款总计
      this.selectByCustomerIdAllMoney(val);
    },
    //单选按钮选中供应商名称进文本框
    b(val) {
      this.payment = val.customerName;
    },
    //跳转到付款历史
    goBack() {
      this.$router.push({path: '/financing/collection'})
    },
  }, created() {
    // 生成客户流水编号
    this.obtainSerialNumber();
    //  查询所有客户
    this.queryAllCustomer();
    // 查询所有用户
    this.selectAllStaff();
  }

})
</script>

<style scoped>
/deep/ .ant-card {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  position: relative;
  /*background: #fff;*/
  border-radius: 2px;
  -webkit-transition: all .3s;
  transition: all .3s;
}

/deep/ .el-radio__label {
  display: none;
}

/deep/ .ant-card-head {
  min-height: 48px;
  margin-bottom: -1px;
  padding: 0 24px;
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  zoom: 1;
  background: #fff;
}

/deep/ .ant-layout * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

/deep/ .el-radio__input {
  margin-left: -24px;
}

/deep/ .el-button {
  margin-top: -1px;
}

/deep/ .ant-card-head-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

/deep/ .ant-card-head-title {
  display: inline-block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/deep/ .ant-row {
  margin-top: 10px;
  margin-left: 750px;
}

/deep/ .font-bold-700 {
  font-weight: 700;
}

/deep/ .font-size-24 {
  font-size: 24px;
}

/deep/ .font-color-45 {
  color: rgba(0, 0, 0, .45);
}

/deep/ .cell {
  color: #606266;
  font-size: 12px;
  text-align: center;
}

/deep/ .ant-card-body2 {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

/deep/ .text {
  color: rgba(0, 0, 0, .45);
  font-size: 12px;
  margin-top: 10px;
}

/deep/ .ant-button {
  margin-left: 1110px;
}

/deep/ .ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  -webkit-box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 0;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border-color: #d9d9d9;
}
</style>
