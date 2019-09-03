<template>
  <div id="app">
    <div id="container">
      <h1>账单打印辅助程序</h1>
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
        <el-col :span="3">
          <div>消费记录</div>
        </el-col>
        <el-col :span="3">
          <el-cascader
            clearable
            filterable
            placeholder="试试搜索：指南"
            v-model="records"
            @change="choiceRecords(records)"
            :options="options"
            :show-all-levels="false"
            :props="{ expandTrigger: 'hover', emitPath: false }"
          ></el-cascader>
        </el-col>
        <el-col :span="3">
          <div>数量</div>
        </el-col>
        <el-col :span="6">
          <el-input-number
            :disabled="numDisabled"
            v-model="num"
            :min="1"
            :max="99"
            label="数量"
          ></el-input-number>
        </el-col>
        <el-col :span="3">
          <div>{{priceName}}</div>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入内容"
            v-model="price"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            @click="add"
          >添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="21" :span="3">
          <el-button
            @click="print"
            type="primary"
            icon="el-icon-printer"
          ></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import options from './options.js'
import menus from './menus.js'

export default {
  name: 'App',
  data () {
    return {
      numDisabled: false,
      priceName: '单价',
      records: '',
      num: 1,
      price: 20,
      menus: menus,
      tableData: [
        {
          records: '口味王',
          num: 1,
          price: 20,
          totalprice: 20
        }
      ],
      options: options
    }
  },
  methods: {
    print () {
      window.print()
    },
    add () {
      if (!this.records) {
        this.$message({
          message: '请先添加记录',
          type: 'warning'
        })
        return
      }
      var records = this.menus[this.records].label
      var num = this.num
      var price = this.menus[this.records].price
      var totalprice = num * price
      this.tableData.push({
        records: records,
        num: num,
        price: price,
        totalprice: totalprice
      })
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    choiceRecords (records) {
      if (!records) return
      this.price = this.menus[records].price
      if (records === '充值') {
        this.num = 1
        this.priceName = '金额'
        this.numDisabled = true
      } else {
        this.numDisabled = false
      }
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
#container {
  width: 800px;
  margin: 0 auto;
}
</style>
