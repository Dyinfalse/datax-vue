<template>
  <div>
    <div class="task-main">
      <el-input class="t-input" v-model="filter.taskName" placeholder="作业名"></el-input>
      <el-button class="filter-item" type="primary" @click="getTaskList(1)" icon="el-icon-trash">
        搜索
      </el-button>
      <!--<el-button class="filter-item" type="primary" icon="el-icon-trash" @click="openAdd()">
        新增
      </el-button>-->
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
          prop="jobName"
          label="作业名">
        </el-table-column>

        <el-table-column
          prop="groupName"
          label="组名">
        </el-table-column>

        <el-table-column
          prop="createUserName"
          label="创建人">
        </el-table-column>

        <el-table-column
          prop="sourceIp"
          label="输入端">
        </el-table-column>
        
        <el-table-column
          prop="targetIp"
          label="输出端">
        </el-table-column>
        
        <el-table-column
          prop="createTime"
          label="日期">
        </el-table-column>
        
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="{row,$index}">
             {{ row.status == 1 ? '进行中': '未开启' }}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" v-show="scope.row.status == 0" size="small" @click="doing(scope.row)">启动</el-button>
            <el-button type="warning" v-show="scope.row.status == 1" size="small" @click="stop(scope.row)">停止</el-button>
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
          <el-form-item label="作业名">
            <el-input v-model="formLabelAlign.name"></el-input>
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
        taskName: ''
      },
      formLabelAlign: {
        name: '',
        remark: '',
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

      request({
        url: this.isEdit ? '/api/jobConfig/update' : '/api/jobConfig/add',
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
        url: '/api/jobConfig/list',
        method: 'post',
        data: { pageNum, pageSize: this.pageSize, name: this.filter.taskName }
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
          url: '/api/jobConfig/delete',
          method: 'post',
          data: { id }
        }).then(res => {
          Message.success('删除成功');
          this.tableData.splice(index, 1);
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
        this.formLabelAlign = { name: '', remark: ''};
        this.showAddForm = true;
        this.isEdit = false;
      },
      /** 启动 */
      doing(row){
        request({
          url: '/api/runJobLog',
          method: 'post',
          data: { jobManagerId: row.id }
        }).then(res => {
          row.status = 1;
        })
      },
      /** 停止 */
      stop(row){
        request({
          url: '/api/killJob',
          method: 'post',
          data: { jobManagerId: row.id }
        }).then(res => {
          row.status = 0;
        })
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
