<template>
  <el-main class="work">
    <el-upload :on-change="handleChange" action="" :auto-upload="false" :limit="1" :show-file-list="false">
      <el-button size="small" type="success" icon="el-icon-upload">読み込み</el-button>
    </el-upload>
    <p v-if="count > 0">{{ count }}件ヒット</p>
    <el-table :data="lines" :show-header="false" stripe>
      <el-table-column prop="value">
        <template slot-scope="props">
          <span v-html="props.row['value']"></span>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  const fs = require('fs')
  const readline = require('readline')

  export default {
    data () {
      return {
        lines: [],
        count: 0
      }
    },
    created () {
      let self = this
      this.getCheckListDb().count({}, function (_err, count) {
        if (count <= 0) {
          // 初回のみデフォルトルールを設定
          self.insertCheckListDb(self.getDefaultCheckList())
        }
      })
      this.loadCheckList()
    },
    methods: {
      loadCheckList () {
        let self = this
        this.getCheckListDb().find({}).sort({ word: 1 }).exec(function (_err, docs) {
          self.setDefaultCheckList(docs)
        })
      },
      handleChange (file) {
        this.loadCheckList()
        const stream = fs.createReadStream(file.raw.path, 'utf8')
        const rl = readline.createInterface({ input: stream })
        rl.on('line', (data) => {
          let line = ''
          let self = this
          // チェックリストの単語をタグ付きに置換
          const checkList = this.getDefaultCheckList()
          Object.keys(checkList).forEach(function (i) {
            let word = checkList[i].word
            let replaceData = data.replace(/\r?\n|\s+/g, '')
            if (replaceData.match(new RegExp(word, 'g'))) {
              if (line) {
                line = line.replace(new RegExp(word, 'g'), '<font color="red">$&</font>')
              } else {
                line = replaceData.replace(new RegExp(word, 'g'), '<font color="red">$&</font>')
              }
            }
          })
          // チェックリストの単語を含む行を表示
          if (line) {
            self.lines.push({'value': line})
            self.count++
          }
        })
      },
      ...mapGetters([
        'getCheckListDb',
        'getDefaultCheckList'
      ]),
      ...mapActions([
        'insertCheckListDb',
        'setDefaultCheckList'
      ])
    }
  }
</script>

<style>
  .el-main.work {
    padding: 5px 5px 0 5px;
    &:ul {
      display: flex;
      flex-direction: column;
    }
  }
</style>
