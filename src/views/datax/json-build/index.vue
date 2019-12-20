<template>
  <div class="app-container">
    <div class="build-container">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" description="通用配置">1</el-step>
        <el-step title="步骤 2" description="构建reader">2</el-step>
        <el-step title="步骤 3" description="构建writer">3</el-step>
        <el-step title="步骤 4" description="构建JSON">4</el-step>
      </el-steps>

      <!-- <el-button style="margin-top: 12px;" @click="last">上一步</el-button> -->
      <el-button style="margin-top: 12px;margin-bottom: 12px;" @click="next">下一步</el-button>

      <div v-show="active===1" class="step1">
        <Reader ref="reader" :stepData="stepObject_1" />
      </div>
      <div v-show="active===2" class="step2">
        <ReaderTwo ref="readerTwo" />
      </div>
      <div v-show="active===3" class="step3">
        <Writer ref="writer" />
        <!-- <FieldMapper ref="fieldMapper" /> -->
      </div>
      <div v-show="active===4" class="step4">
        <el-button type="primary" @click="buildJson">构建</el-button>
        <el-button type="info" @click="handleCopy(inputData,$event)">保存</el-button>
        <div style="margin-bottom: 20px;" />
        <json-editor v-show="active===4" ref="jsonEditor" v-model="configJson" />
      </div>
    </div>
  </div>
</template>

<script>
import * as dataxJsonApi from '@/api/datax-json'
import JsonEditor from '@/components/JsonEditor'
import Reader from './reader'
import ReaderTwo from './readerTwo'
import Writer from './writer'
import FieldMapper from './components/fieldMapper'
import clip from '@/utils/clipboard'

export default {
  components: { Reader, ReaderTwo, Writer, JsonEditor, FieldMapper },
  data() {
    return {
      configJson: '',
      active: 1,
      // 第一步数据
      stepObject_1: {
        jobName: '',
        groupId: null,
        remark: ''
      },
    }
  },
  created() {
    // this.getJdbcDs()
  },
  methods: {
    next() {
      // 第一步 reader 判断是否已选字段
      if (this.active === 1) {
        
        // 取子组件的数据
        console.info(this.$refs.reader.getData())
        this.active++
        
      } else {
        if (this.active++ === 4) {
          // 切回第一步
          this.active = 1
        }
      }
    },
    beforeBuildJson() {
      const data = this.$refs.writer.getData()
      console.log(data)
      if (data.writerForm.columns.length > 0 || data.ifStreamWriter === true) {
        this.buildJson()
      }
    },
    // 构建json
    buildJson() {
      const readerData = this.$refs.reader.getData()
      const writeData = this.$refs.writer.getData()
      // console.log(readerData)
      // console.log(writeData)
      // return
      // if (writeData.columns.length > 0 || writeData.ifStreamWriter === true) {
      // }
      const obj = {
        readerDatasourceId: readerData.datasourceId,
        readerTables: [readerData.tableName],
        readerColumns: readerData.columns,
        ifStreamWriter: writeData.ifStreamWriter,
        writerDatasourceId: writeData.datasourceId,
        writerTables: [writeData.tableName],
        writerColumns: writeData.columns,
        whereParams: readerData.where,
        querySql: readerData.querySql,
        preSql: writeData.preSql
      }
      console.info(obj)
      // 调api
      dataxJsonApi.buildJobJson(obj).then(response => {
        console.log(response)
        this.configJson = JSON.parse(response)
      })
    },
    handleCopy(text, event) {
      clip(this.configJson, event)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
