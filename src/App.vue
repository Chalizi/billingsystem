<template>
  <div id="app">
    <div id="container">
      <h1>账单打印辅助程序</h1>
      <div class="table">

        <el-row>
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="records"
              label="消费记录"
              width="180">
            </el-table-column>

            <el-table-column
              prop="num"
              label="数量"
              width="180"
            ></el-table-column>

            <el-table-column
              prop="price"
              label="单价"
              width="180"
            ></el-table-column>

            <el-table-column
              prop="totalprice"
              label="金额"
              width="180"
            ></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="80"
            >

              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small"
                >移除</el-button>
              </template>

            </el-table-column>

          </el-table>
        </el-row>

      </div>

      <div class="computed">

        <el-row>
          <el-col :offset="13" :span="8">总金额</el-col>
          <el-col :span="3">{{receivables}}</el-col>
        </el-row>

      </div>

      <div class="console">

        <el-row>
          <el-col :span="2">
            <div>消费记录</div>
          </el-col>

          <el-col :span="5">
            <el-cascader
              clearable
              filterable
              placeholder="试试搜索：打火机"
              v-model="records"
              @change="choiceRecords(records)"
              :options="options"
              :show-all-levels="false"
              :props="{ expandTrigger: 'hover', emitPath: false }"
            ></el-cascader>
          </el-col>

          <el-col :span="2">
            <div>数量</div>
          </el-col>

          <el-col :span="5">
            <el-input-number
              :disabled="numDisabled"
              v-model="num"
              :min="1"
              :max="99"
              label="数量"
            ></el-input-number>
          </el-col>

          <el-col :span="2">
            <div>{{priceName}}</div>
          </el-col>

          <el-col :span="4">
            <el-autocomplete
              v-model="price"
              :disabled="priceDisabled"
              :fetch-suggestions="querySearch"
              placeholder="请输入金额"
              clearable
            ></el-autocomplete>
          </el-col>

          <el-col  :offset="1" :span="3">
            <el-button
              type="primary"
              @click="add"
            >添加</el-button>
          </el-col>
        </el-row>

      </div>

      <el-row>

        <el-col :offset="21" :span="3">
          <el-button
            @click="print"
            type="primary"
          >打印</el-button>
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
      priceDisabled: false,
      receivables: 0,
      priceName: '单价',
      records: '',
      num: 1,
      price: '',
      menus: menus,
      tableData: [],
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
      if (typeof parseFloat(this.price) === 'number' && isNaN(parseFloat(this.price))) {
        this.$message({
          message: '请先添加金额',
          type: 'warning'
        })
        return
      }
      var records, num, price, totalprice
      if (this.menus[this.records].serializable) {
        num = 1
        totalprice = price = this.price
      } else {
        num = this.num
        price = this.menus[this.records].price
        totalprice = num * price
      }
      records = this.menus[this.records].label
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
      if (this.menus[records].serializable) {
        this.num = 1
        this.priceName = '金额'
        this.numDisabled = true
        this.priceDisabled = false
      }
      if (typeof parseFloat(this.menus[records].price) === 'number' && !isNaN(parseFloat(this.menus[records].price))) {
        this.num = 1
        this.price = this.menus[records].price
        this.priceName = '单价'
        this.numDisabled = false
        this.priceDisabled = true
      }
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': '10' },
        { 'value': '20' },
        { 'value': '30' },
        { 'value': '50' },
        { 'value': '100' },
        { 'value': '200' },
        { 'value': '300' },
        { 'value': '400' },
        { 'value': '500' },
        { 'value': '1000' }
      ]
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  },
  watch: {
    tableData: {
      deep: true,
      handler (val, oldVal) {
        this.receivables = val.reduce((prev, cur) => {
          return prev + cur.num * cur.price
        }, 0)
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
.console div {
  text-align: center;
  line-height: 38px;
}
.computed {
  height: 40px;
  line-height: 40px;
}
</style>
