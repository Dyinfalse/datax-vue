<template>
  <div>
    <div class="task-main">
      <el-input class="t-input" v-model="filter.username" placeholder="组名"></el-input>
      <el-button class="filter-item" type="primary" @click="getTaskList(1)" icon="el-icon-trash">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-trash" @click="openAdd()">
        新增
      </el-button>
    </div>
    <div class="test-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editForm(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteTaskList(scope.row.id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="padding-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <el-dialog
        title="新增"
        :visible.sync="showAddForm"
        width="50%">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">

          <el-form-item label="组名">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-select v-model="formLabelAlign.sex" placeholder="请选择">
              <el-option key="1" label="男" value="男"></el-option>
              <el-option key="0" label="女" value="女"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电话">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input type="textarea" v-model="formLabelAlign.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      isEdit: false,
      options: [],
      value: '',
      tableData: [],
      currentPage3: 1,
      multipleSelection: [],
      showAddForm: false,
      labelPosition: 'right',
      total: 0,
      pageSize: 10,
      filter: {
        username: ''
      },
      formLabelAlign: {
        username: '',
        sex: '',
        phone: '',
        remark: ''
      },
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getTaskList(val)
    },
    onSubmit () {
      if(this.formLabelAlign.phone.length < 11){
        Message.warning('请填写正确的手机号');
        return;
      }
      request({
        url: this.isEdit ? '/system-manage/update-user' : '/system-manage/add-user',
        method: 'post',
        data: { ...this.formLabelAlign }
      }).then(res => {
        this.showAddForm = false;
        Message.success(this.isEdit ? '编辑成功' : '添加成功');
        this.getTaskList(1);
      })
    },
    /**
     * 获取作业组列表
     */
    getTaskList(pageNum){
      request({
        url: '/system-manage/user-list',
        method: 'post',
        data: { pageNum, pageSize: this.pageSize, username: this.filter.username }
      }).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.total
      })
    },
    /**
     * 删除作业组列表
     */
    deleteTaskList(id, index){
      this.$confirm('是否确认删除', '提示').then(() => {
        request({
          url: '/system-manage/update-delete',
          method: 'post',
          data: { id }
        }).then(res => {
          Message.success('删除成功');
          this.tableData = this.tableData.splice(index, 1);
        })
      })
    },
    /**
     * 编辑
     */
     editForm(row) {
      this.formLabelAlign = row;
      this.showAddForm = true;
      this.isEdit = true;
     },
     /**
      * 新建
      */
      openAdd(){
        this.formLabelAlign = {
          username: '',
          sex: '',
          phone: '',
          remark: ''
        };
        this.showAddForm = true;
        this.isEdit = false;
      }
  },
  mounted(){
    this.getTaskList(1);
  }
}
</script>

<style scoped>
  .task-main{
    padding: 20px;
  }
  .t-input {
    width: 200px;
  }
  .test-content {
    padding: 20px;
  }
</style>

