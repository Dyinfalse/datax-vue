<template>
  <div class="app-container" style="width: 1000px;">
    <el-form label-position="left" label-width="80px" :model="readerForm">
      <el-form-item label="作业名" prop="where">
        <el-input v-model="readerForm.jobName" placeholder="作业名" />
      </el-form-item>
      <el-form-item label="组">
        <el-select v-model="readerForm.groupId" filterable @change="rDsChange">
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="querySql">
        <el-input 
          v-model="readerForm.remark" 
          :autosize="{ minRows: 3, maxRows: 20}" 
          type="textarea" 
          placeholder="备注" />
      </el-form-item>
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
      groupList: [],
      loading: false,
      active: 1,
      readerForm: {
        jobName: '',
        groupId: null,
        remark: ''
      }
    }
  },
  created() {
    this.getGroup();
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
      // this.readerForm.tableName = ''
      // this.readerForm.datasourceId = e
      // 获取可用表
      // this.getTables('reader')
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
    // 获取表字段
    getColumns(type) {
      if (type === 'reader') {
        if (this.readerForm.querySql !== '') {
          this.getColumnsByQuerySql()
        } else {
          this.getTableColumns()
        }
      }
    },
    // 表切换
    rTbChange(t) {
      this.readerForm.tableName = t
      this.rColumnList = []
      this.readerForm.columns = []
      this.getColumns('reader')
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
    // 获取组
    getGroup(){
      request({
          url: '/system-manage/list-group',
          method: 'post',
          data: {pageSize: 1000}
        }).then(res => {
          this.groupList = res.data.list;
        })
    }
  }
}
</script>
