<template>
  <div id="app">
    <h1>网咖账单打印辅助程序</h1>
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="records"
          label="消费记录"
          width="180">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="totalprice"
          label="金额">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-button @click="print" type="primary" icon="el-icon-printer"></el-button>
    </el-row>
    <div>{{totalprice}}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      tableData: [
        {
          records: '2016-05-02',
          num: 1,
          price: 5
        }
      ]
    }
  },
  methods: {
    print () {
      window.print()
    }
  },
  computed: {
    totalprice () {
      return this.tableData.num * this.tableData.price
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
