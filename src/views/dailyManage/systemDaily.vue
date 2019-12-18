<template>
  <div>
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
          label="任务名">
        </el-table-column>
        <el-table-column
          prop="province"
          label="操作">
        </el-table-column>
        <el-table-column
          prop="city"
          label="ip">
        </el-table-column>
        <el-table-column
          prop="address"
          label="任务启动时刻">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="任务结束时刻">
        </el-table-column>
        <el-table-column
          prop="zi1p"
          label="任务总计耗时">
        </el-table-column>
        <el-table-column
          prop="zi1p"
          label="任务平均流量">
        </el-table-column>
        <el-table-column
          prop="zi1p"
          label="记录写入速度">
        </el-table-column>
        <el-table-column
          prop="zi1p"
          label="读出记录总数">
        </el-table-column>
        <el-table-column
          prop="zi1p"
          label="读写失败总数">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">删除</el-button>
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
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
