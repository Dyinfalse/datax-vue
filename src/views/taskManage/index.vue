<template>
  <div>
    <div class="task-main">
      <el-input class="t-input" v-model="taskName" placeholder="作业名"></el-input>
      <el-select v-model="value" placeholder="组名">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-trash">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-trash">
        创建作业
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
          label="作业名">
        </el-table-column>
        <el-table-column
          prop="province"
          label="组名">
        </el-table-column>
        <el-table-column
          prop="city"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="address"
          label="输入端">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="zi1p"
          label="状态">
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
