<template>
  <div>
    <div class="task-main">
      <el-input class="t-input" v-model="filter.username" placeholder="组名"></el-input>
      <el-button class="filter-item" type="primary" @click="getTaskList(1)" icon="el-icon-trash">
        搜索
      </el-button>
    </div>
    
    <div class="test-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="角色">

        </el-table-column>
        <el-table-column
          prop="username"
          label="用户管理">
           <template slot-scope="{row,$index}">
            <el-checkbox-group @change="changeRole(row)" v-model="row.code1">
              <el-checkbox></el-checkbox>
            </el-checkbox-group>
           </template>
        </el-table-column>

        <el-table-column
          prop="sex"
          label="数据源查看">
           <template slot-scope="{row,$index}">
            <el-checkbox-group @change="changeRole(row)" v-model="row.code3">
              <el-checkbox></el-checkbox>
            </el-checkbox-group>
           </template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="数据源编辑删除">
           <template slot-scope="{row,$index}">
            <el-checkbox-group @change="changeRole(row)" v-model="row.code2" >
              <el-checkbox></el-checkbox>
            </el-checkbox-group>
           </template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="日志查看">
           <template slot-scope="{row,$index}">
            <el-checkbox-group @change="changeRole(row)" v-model="row.code4">
              <el-checkbox></el-checkbox>
            </el-checkbox-group>
           </template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="日志删除">
           <template slot-scope="{row,$index}">
            <el-checkbox-group @change="changeRole(row)" v-model="row.code5">
              <el-checkbox></el-checkbox>
            </el-checkbox-group>
           </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="small" @click="editForm(scope.row)">编辑</el-button>-->
            <!-- <el-button type="danger" size="small" @click="deleteTaskList(scope.row.id, scope.$index)">删除</el-button>-->
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

          <el-form-item label="角色">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>

          <el-form-item label="用户管理">
            <el-select v-model="formLabelAlign.sex" placeholder="请选择">
              <el-option key="1" label="男" value="男"></el-option>
              <el-option key="0" label="女" value="女"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="数据源查看">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>

          <el-form-item label="数据源编辑删除">
            <el-input type="textarea" v-model="formLabelAlign.remark"></el-input>
          </el-form-item>

          <el-form-item label="日志查看">
            <el-input type="textarea" v-model="formLabelAlign.remark"></el-input>
          </el-form-item>
          
          <el-form-item label="日志删除">
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
      /**
       * 权限列表
       */
      roleList: ['1', '2', '3', '4', '5'],
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
        url: this.isEdit ? '/system-manage/update-role-permission' : '',
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
        url: '/system-manage/role-list',
        method: 'post',
        data: { pageNum, pageSize: this.pageSize, username: this.filter.username }
      }).then(res => {
        res.data = res.data.map(dItem => {
          this.roleList.map((rItem)=>{
            dItem['code' + rItem] = dItem.permissionList.some(fItem => fItem.code == rItem);
          })
          return dItem;
        })
        this.tableData = res.data;
        this.total = res.data.total
      })
    },
    /**
     * 删除用户列表
     */
    deleteTaskList(id, index){
      this.$confirm('是否确认删除', '提示').then(() => {
        request({
          url: '/system-manage/delete-user',
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
        this.formLabelAlign = {
          username: '',
          sex: '',
          phone: '',
          remark: ''
        };
        this.showAddForm = true;
        this.isEdit = false;
      },
      // 修改权限
      changeRole(row){
        console.log(row)
        let permissionList = this.roleList.filter(item => row['code'+item]);
        request({
          url: '/system-manage/update-role-permission',
          method: 'post',
          data: { roleId: row.id, permissionList }
        }).then(res => {
          // Message.success('');
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

