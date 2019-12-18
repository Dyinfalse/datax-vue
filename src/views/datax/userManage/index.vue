<template>
  <div>
    <div class="task-main">
      <el-input class="t-input" v-model="taskName" placeholder="姓名"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-trash">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-trash" @click="dialogVisible = true">
        新增
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-trash" @click="dialogVisible = true">
        导入
      </el-button>
    </div>
    <div class="test-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="province"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="city"
          label="电话">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="padding-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>

      <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="组名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="value" placeholder="请选择">
              <el-option key="男" label="男" value="男"></el-option>
              <el-option key="女" label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formLabelAlign.region"></el-input>
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
export default {
  data() {
    return {
      taskName: '',
      options: [],
      value: '',
      tableData: [],
      currentPage3: 5,
      multipleSelection: [],
      dialogVisible: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSubmit () {

    }
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
