<!--付款单页面-->
<template>
  <div class="ant-card">
    <div class="ant-card-head" style="border-bottom: 1px dashed rgb(217, 217, 217);padding: 24px 16px 0px;">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title">
          <div class="ant-col ant-col-8" align="middle">
            <span class="font-size-24 font-bold-700">付款单</span>
          </div>
            <el-button @click="goBack()" style="margin-left: 1100px;margin-bottom: 5px;">付款历史</el-button>
          <div class="ant-col ant-col-8" align="right"><span><span>
        <span class="font-size-14"><span class="font-color-45">单据编号：</span>
          <span busitype="104">{{this.fk}}</span></span><!----></span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-card-body" style="padding: 8px 16px 16px;background:#fff">
      <div class="ant-row">
        经手人：
        <el-select v-model="region" placeholder="请选择" style="width: 110px">
          <el-option
              v-for="item in staffName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        业务日期：
        <el-date-picker style="width: 190px;"
                        v-model="time"
                        type="date"
                        placeholder="请选择"
                        :disabled-date="disabledDate"
                        :shortcuts="shortcuts"/>
      </div>
      <div style="padding: 15px">
        <div>
          <el-table
              :data="tableData"
              border
              id="scroll"
              style="width: 100%;max-height:calc(100vh - 218px);"
              :header-cell-style="{background:'#F8F8F9',color:'#606266'}
              "
          >
            <el-table-column prop="name" label="供应商" type="index" width="235">
              <el-popover placement="bottom" :width="600" trigger="click" v-show="payClick" :key="one">
                <template #reference>
                  <!--         <el-input v-model="payment" placeholder="请选择供应商"  @click="this.payclick=true"/>-->
                  <el-input @click="this.payClick=true"
                            style="width: 140px;"
                            v-model="payment"
                            placeholder="请选择供应商"
                            class="input-with-select">
                  </el-input>
                </template>
                <el-table :data="tableData2" @row-click="a">
                  <el-table-column width="150" prop="supplierSerial" label="供应商编号"/>
                  <el-table-column width="300" property="supplierName" label="供应商名称"/>
                  <el-table-column width="150" property="supplierPhone" label="联系电话"/>
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
            <el-table-column prop="agregateTotal" label="欠款总计(元)" width="201">
              <el-input v-model="this.tableData5.agregateTotal" disabled>
              </el-input>
            </el-table-column>
            <el-table-column prop="address" label="本次付款(元)" width="203">
              <template #default>
                <el-input v-model="onePay" placeholder="请输入" style="width: 150px;"/>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="优惠金额(元)" width="202">
              <template #default>
                <el-input v-model="salePay" placeholder="请输入" style="width: 150px;"/>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="合计(元)" width="210" align="center">
              {{ parseInt(this.onePay) + parseInt(this.salePay)}}
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
<!--      附件上传：-->
<!--      <el-upload action="#" list-type="picture-card" :auto-upload="false">-->
<!--        <el-icon>-->
<!--          <Plus/>-->
<!--        </el-icon>-->

<!--        <template #file="{ file }">-->
<!--          <div>-->
<!--            <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>-->
<!--            <span class="el-upload-list__item-actions">-->
<!--          <span-->
<!--              class="el-upload-list__item-preview"-->
<!--              @click="handlePictureCardPreview(file)"-->
<!--          >-->
<!--            <el-icon><zoom-in/></el-icon>-->
<!--          </span>-->
<!--          <span-->
<!--              v-if="!disabled"-->
<!--              class="el-upload-list__item-delete"-->
<!--              @click="handleDownload(file)"-->
<!--          >-->
<!--            <el-icon><Download/></el-icon>-->
<!--          </span>-->
<!--          <span-->
<!--              v-if="!disabled"-->
<!--              class="el-upload-list__item-delete"-->
<!--              @click="handleRemove(file)"-->
<!--          >-->
<!--            <el-icon><Delete/></el-icon>-->
<!--          </span>-->
<!--        </span>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-upload>-->

<!--      <el-dialog v-model="dialogVisible">-->
<!--        <img width="50%" :src="dialogImageUrl" alt=""/>-->
<!--      </el-dialog>-->
<!--      <div class="text">-->
<!--        仅支持jpg/jpeg/png格式，最多5张图片-->
<!--      </div>-->
    </div>
    <div class="ant-card-body2" style="margin-top: 70px;padding: 10px;background: white">
      <div class="ant-button">
        <el-button @click="restinsert()">取消</el-button>
        <el-button type="primary" @click="insertCope()">保存</el-button>
      </div>
    </div>

  </div>
  <!--  选择供应商弹框-->
  <div>
    <el-dialog
        v-model="become"
        title="选择供应商"
        width="65%"
        :close-on-click-modal="false"
    >
      <button type="button" class="fl ant-btn" @click="this.become2=true,this.become=false"><span>新增供应商</span></button>&nbsp;&nbsp;
<!--      <el-select v-model="payType" placeholder="全部分类" style="width: 150px;">-->
<!--        <el-option label="现金" value="现金"/>-->
<!--        <el-option label="微信" value="微信"/>-->
<!--        <el-option label="支付宝" value="支付宝"/>-->
<!--        <el-option label="系统账户" value="系统账户"/>-->
<!--      </el-select>&nbsp;&nbsp;-->
      <el-input style="width: 250px;"
                v-model="seek"
                placeholder="编号、名称、联系信息"
                class="input-with-select"
      >
        <template #append>
          <el-button @click="this.payClick=false,this.become=true,selectSupplierPage()">
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
            <el-table-column prop="supplierSerial" label="供应商编号" width="150"/>
            <el-table-column prop="supplierName" label="供应商名称" width="170"/>
            <el-table-column prop="supplierPhone" label="联系电话" width="166"/>
            <el-table-column prop="supplierAddress" label="地址" width="150"/>
            <el-table-column prop="supplierRemark" label="备注" width="150"/>
          </el-table>
        </div>
      </div>
      <!-- 分页插件 -->
      <div style="margin-top: 10px;">
        <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[4, 5, 10, 50]"
            v-model:page-size="pageInfo.pagesize"
            :default-page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            prev-text="上一页"
            next-text="下一页"
            @size-change="selectSupplierPage()"
            @current-change="selectSupplierPage()"
            background
        >
        </el-pagination>
      </div>
      <div style="margin-top: 10px;margin-left: 770px;">
        <el-button @click="this.become=false,this.payment = undefined,this.currentRow=undefined">取消</el-button>
        <el-button type="primary" @click="this.become=false,this.currentRow=undefined">确认选择</el-button>
      </div>
    </el-dialog>

  </div>

  <!--  新增供应商-->
  <div>
    <el-dialog
        v-model="become2"
        title="新增供应商"
        width="50%"
        :close-on-click-modal="false"
    >
      <div>
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
          <el-form-item label="供应商编号：">
            <el-input v-model="ruleForm.id"/>
          </el-form-item>
          <el-form-item label="供应商名称：" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入供应商名称"/>
          </el-form-item>
<!--          <el-form-item label="供应商分类:" required>-->
<!--            <el-select v-model="ruleForm.type" placeholder="全部分类">-->
<!--              <el-option label="家电" value="家电"/>-->
<!--              <el-option label="批发" value="批发"/>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="期初应付款：">-->
<!--            <el-input v-model="ruleForm.money"/>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="期初预付款：">-->
<!--            <el-input v-model="ruleForm.money2"/>-->
<!--          </el-form-item>-->
          <el-form-item label="电话：">
            <el-input v-model="ruleForm.phone"/>
          </el-form-item>
          <el-form-item label="联系地址：">
            <el-input v-model="ruleForm.address"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="ruleForm.remark2" type="textarea"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="this.become2=false,this.become=true,rest()">取消并返回</el-button>
            <el-button type="primary" @click="this.become2=false,this.become=true,addSupplier()"
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
import {ElMessage,ElNotification} from "element-plus";
export default defineComponent({
  data() {
    return {
      // 访问地址
      url: "http://localhost:9090/",
      ruleForm: ({
        id: '',
        name: '',
        type: '',
        money: '',
        money2: '',
        address: '',
        remark2: '',
        phone:'',
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
      tableData3:[],
      //欠款信息
      tableData5: [],
      //表格
      //供应商
      payment: '',
      //供应商2
      payment2: '',
      //结算账户
      payType: '',
      //本次付款
      onePay: '',
      //优惠金额
      salePay: '',
      //备注
      remark: '',
      //付款流水号
      fk:'',
      //图片
      dialogVisible: false,
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 5, // 页大小
        total: 0, // 总页数
      },
      staffName:[],
      //验证
      rules: {
        name: [
          {
            required: true,
            message: '请输入供应商名称',
            trigger: 'blur'
          },
        ],
      }
    }

  },
  methods: {
    //清空
    rest(){
      this.ruleForm.name="";
      this.ruleForm.phone="";
      this.ruleForm.remark2="";
      this.ruleForm.address="";
    },
    //清空
    restinsert(){
      this.payment="";
      this.tableData5.agregateTotal="";
      this.onePay="";
      this.salePay="";
      this.region="";
      this.remark="";
      this.time="";
    },
    //选中名称赋值进供应商文本框
    a(val) {
      this.payment = val.supplierName;
      this.payClick = false;
      this.one = this.one + 1;
      this.selectSupplierAll(this.payment);
    },
    //跳转到付款历史
    goBack() {
      this.$router.push({path: '/financing/payment_history'})
    },
    //查询供应商
    selectSupplier() {
      this.axios({
        method: 'post',
        url: this.url + 'supplier/selectSupplier',
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有供应商");
        console.log(response);
        if (response.data.state === 200 && response.data.msg === "查询成功") {
          this.tableData2 = response.data.info;
        } else {
          ElMessage({
            message: response.data.msg,
            type: 'warning',
          })
        }
      })
    },
    //分页查询供应商
    selectSupplierPage() {
      this.axios({
        method: 'post',
        url: this.url + 'supplier/selectSupplierPage',
        data: {
          //当前页
          currentPage: this.pageInfo.currentPage,
          //页大小
          pageSize: this.pageInfo.pagesize,
          //供应商名称
          supplierName:this.seek,
          //供应商号码
          supplierPhone:this.seek,
          //供应商地址
          supplierAddress:this.seek,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("分页查询所有供应商");
        console.log(response);
        if (response.data.state === 200 && response.data.msg === "查询成功") {
          this.tableData3 = response.data.info.records
          this.pageInfo.total = response.data.info.total
        } else {
          ElMessage({
            message: response.data.msg,
            type: 'warning',
          })
        }
      })
    },
    //添加供应商
    addSupplier() {
      this.axios({
        method: 'post',
        url: this.url + 'supplier/addSupplier',
        data: {
          //供应商编号
          supplierSerial:this.ruleForm.id,
          //供应商名称
          supplierName:this.ruleForm.name,
          //电话
          supplierPhone:this.ruleForm.phone,
          //地址
          supplierAddress:this.ruleForm.address,
          //备注
          supplierRemark:this.ruleForm.remark2,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              this.selectSupplierPage();
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
              this.obtainSupplierNumber();
              this.selectSupplier();
              this.selectSupplierPage();
              this.ruleForm={}
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
          }else {
            ElNotification.error({
              title: '提示',
              message: response.data.data.info,
              offset: 100,
            })
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
        }
      })
    },
    // 生成供应商流水编号
    obtainSupplierNumber() {
      this.axios({
        method: 'get',
        url: this.url + 'obtainSupplierNumber',
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("生成供应商流水编号");
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
    //查询供应商欠款信息
    selectSupplierAll() {
      this.axios({
        method: 'post',
        url: this.url + 'supplier/selectSupplierAll',
        data: {
          supplierName:this.payment,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有供应商欠款信息");
        console.log(response);
        if (response.data.state === 200 && response.data.msg === "查询成功") {
              this.tableData5 = response.data.info[0];
              if(response.data.info.length==0){
                this.tableData5=[];
              }
        } else {
          ElMessage({
            message: response.data.msg,
            type: 'warning',
          })
        }
      })
    },
    // 查询所有用户名称
    selectStaff() {
      this.axios({
        method: 'post',
        url: this.url + 'staff/selectStaff',
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询所有用户名称");
        console.log(response);
        if (response.data.state === 200 && response.data.msg === "查询成功") {
          for (let i = 0; i < response.data.info.length; i++) {
            this.staffName.push({
              value: response.data.info[i].staffId,
              label: response.data.info[i].staffName
            })
          }
        } else {
          ElMessage({
            message: response.data.msg,
            type: 'warning',
          })
        }
      })
    },
    // 生成付款流水编号
    obtainCopeNumber() {
      this.axios({
        method: 'get',
        url: this.url + 'obtainCopeNumber',
        data: {},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("生成付款流水编号");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data.state === 200) {
            this.fk = response.data.data.info
          }
        } else {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
    },
    //添加应付欠款
    insertCope() {
      this.axios({
        method: 'post',
        url: this.url + 'cope/insertCope',
        data: {
          //付款编号
          copeSerial:this.fk,
          //供应商名称
          supplierId:this.tableData5.supplierId,
          //应付金额
          copeMoney:this.onePay,
          //实付金额
          copeReceipts:this.onePay,
          //优惠金额
          coupon:this.salePay,
          //总计
          agregate:this.tableData5.agregateTotal,
          //业务日期
          paymenttabTime:this.time,
          //应付欠款编号
          copeId:this.tableData5.copeId,
          //金额
          money:this.tableData5.agregate,
          //用户编号
          staffId:this.region,
          //结算金额
          settlement:this.payType,
          //备注
          remarks:this.remark,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              this.selectSupplierPage();
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
              this.obtainCopeNumber();
              this.payment="";
              this.tableData5.agregateTotal="";
              this.onePay="";
              this.salePay="";
              this.region="";
              this.remark="";
              this.time="";
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
          }else {
            ElNotification.error({
              title: '提示',
              message: response.data.data.info,
              offset: 100,
            })
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
        }
      })
    },
  },
  mounted() {
    //查询供应商
    this.selectSupplier();
    //分页查询供应商
    this.selectSupplierPage();
    //生成供应商编号
    this.obtainSupplierNumber();
    //查询所有用户名称
    this.selectStaff();
    //生成付款流水号
    this.obtainCopeNumber();
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
  margin-top: -4px;
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