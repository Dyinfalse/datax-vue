<template>
  <div class="app-container">
    <MysqlReader ref="readerTwo" />
  </div>
</template>

<script>
import MysqlReader from './reader/mysqlReaderTwo'
export default {
  name: 'ReaderTwo',
  components: { MysqlReader },
  methods: {
    getData() {
      return this.$refs.reader.getData()
    }
  }
}
</script>
