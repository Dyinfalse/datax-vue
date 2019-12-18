<template>
  <div>
    <div class="task-main">
      <el-input class="t-input" v-model="taskName" placeholder="字段名/表名"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-trash">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-trash">
        批量删除
      </el-button>
    </div>
    <div class="test-content">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="数据源">
        </el-table-column>
        <el-table-column
          prop="province"
          label="数据库">
        </el-table-column>
        <el-table-column
          prop="city"
          label="表">
        </el-table-column>
        <el-table-column
          prop="address"
          label="字段名">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="zi1p"
          label="加入时间">
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
      multipleSelection: []
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
