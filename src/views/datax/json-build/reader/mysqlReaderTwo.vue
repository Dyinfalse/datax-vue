<template>
  <div class="app-container">
    <el-form label-position="left" label-width="80px" :model="readerForm">
      <el-form-item label="数据源">
        <el-select v-model="readerForm.jobSource" filterable @change="rDsChange">
          <el-option
            v-for="item in databaseList"
            :key="item.id"
            :label="item.datasourceName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="表">
        <el-select v-model="readerForm.jobTable" filterable @change="rTbChange">
          <el-option v-for="item in tableList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="querySql" prop="querySql">
        <el-input v-model="readerForm.querySql" :autosize="{ minRows: 3, maxRows: 20}" type="textarea" placeholder="sql查询，一般用于多表关联查询时才用" />
        <el-button @click.prevent="getColumns('reader')">解析字段</el-button>
      </el-form-item> -->
      <el-form-item label="字段">
        <el-checkbox
          v-model="readerForm.checkAll"
          :indeterminate="readerForm.isIndeterminate"
          @change="rHandleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="readerForm.columns" @change="rHandleCheckedChange">
          <el-checkbox v-for="c in rColumnList" :key="c" :label="c">{{ c }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="where" prop="where">
        <el-input v-model="readerForm.where" placeholder="where条件" />
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
import * as dsQueryApi from '@/api/ds-query'
import { list as jdbcDsList } from '@/api/datax-jdbcDatasource'
import request from '@/utils/request'
import { Message } from 'element-ui'

export default {
  name: 'MysqlReader',
  data() {
    return {
      jdbcDsQuery: {
        current: 1,
        size: 50
      },
      rDsList: [],
      rTbList: [],
      rColumnList: [],
      loading: false,
      active: 1,
      // 库
      databaseList: [],
      // 表
      tableList: [],
      database: null,
      readerForm: {
        jobSource: null,
        jobTable: null,
        columns: []
      }
    }
  },
  created() {
    this.getGroup()
  },
  methods: {
    // 获取可用数据源
    getJdbcDs() {
      this.loading = true
      jdbcDsList(this.jdbcDsQuery).then(response => {
        const { records } = response
        this.rDsList = records
        this.loading = false
      })
    },
    // 获取表名
    getTables(type) {
      if (type === 'reader') {
        const obj = {
          datasourceId: this.readerForm.datasourceId
        }
        // 组装
        dsQueryApi.getTables(obj).then(response => {
          this.rTbList = response
        })
      }
    },
    // reader 数据源切换
    rDsChange(e) {
      // 清空
      this.readerForm.jobTable = null;
      this.readerForm.columns = [];
      // 获取可用表
      this.getTable(e)
    },
    getTableColumns() {
      const obj = {
        datasourceId: this.readerForm.datasourceId,
        tableName: this.readerForm.tableName
      }
      dsQueryApi.getColumns(obj).then(response => {
        this.rColumnList = response
        this.readerForm.columns = response
        this.readerForm.checkAll = true
        this.readerForm.isIndeterminate = false
      })
    },
    getColumnsByQuerySql() {
      const obj = {
        datasourceId: this.readerForm.datasourceId,
        querySql: this.readerForm.querySql
      }
      dsQueryApi.getColumnsByQuerySql(obj).then(response => {
        this.rColumnList = response
        this.readerForm.columns = response
        this.readerForm.checkAll = true
        this.readerForm.isIndeterminate = false
      })
    },
    // 表切换
    rTbChange(t) {
      
      this.getColumns(t);
    },
    rHandleCheckAllChange(val) {
      this.readerForm.columns = val ? this.rColumnList : []
      this.readerForm.isIndeterminate = false
    },
    rHandleCheckedChange(value) {
      const checkedCount = value.length
      this.readerForm.checkAll = checkedCount === this.rColumnList.length
      this.readerForm.isIndeterminate = checkedCount > 0 && checkedCount < this.rColumnList.length
    },
    getData() {
      return this.readerForm
    },
    
    // 获取数据源
    getGroup(){
      request({
          url: '/api/jobJdbcDatasource/list',
          method: 'get',
          data: {pageSize: 1000}
        }).then(res => {
          this.databaseList = res.data.list;
          this.database = this.databaseList[0].id;
          this.getTable(this.databaseList[0].id);
        })
    },
    // 获取表
    
    getTable(id){
      request({
          url: '/api/jdbcDatasourceQuery/getTables',
          method: 'post',
          data: {pageSize: 1000, id }
        }).then(res => {
          this.tableList = res.data;
        })
    },
    // 获取表字段
    getColumns(table) {
      request({
          url: '/api/jdbcDatasourceQuery/getColumns',
          method: 'post',
          data: {tableName: table, id: this.database}
        }).then(res => {
          console.log(res)
          this.rColumnList = res.data;
        })
    },
  }
}
</script>
