<template>
  <div>
    <div class="test-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户管理">
        </el-table-column>
        <el-table-column
          prop="province"
          label="数据源查看">
        </el-table-column>
        <el-table-column
          prop="city"
          label="数据源编辑删除">
        </el-table-column>
        <el-table-column
          prop="city"
          label="日志查看">
        </el-table-column>
        <el-table-column
          prop="city"
          label="日志删除">
        </el-table-column>
      </el-table>
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
    }
  },
  methods: {
    
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
