<template>
  <el-main class="work">
    <el-upload :on-change="handleChange" action="" :auto-upload="false" :limit="1" :show-file-list="false">
      <el-button size="small" type="success" icon="el-icon-upload">読み込み</el-button>
    </el-upload>
    <p>{{ count }}件ヒット</p>
    <ul>
      <li v-for="line in lines">
        <span v-html="line"></span>
      </li>
    </ul>
  </el-main>
</template>

<script>
  const path = require('path')
  const fs = require('fs')
  const readline = require('readline')
  const Nedb = require('nedb')

  export default {
    data () {
      return {
        defaultCheckList: JSON.parse(fs.readFileSync(path.join(__static, '/defaultCheckList.json'), 'utf8')),
        checkListDb: new Nedb({ filename: path.join(__static, '/checkList.db'), autoload: true }),
        lines: [],
        count: 0
      }
    },
    created () {
      let self = this
      this.checkListDb.count({}, function (_err, count) {
        if (count <= 0) {
          // 初回のみデフォルトルールを設定
          self.checkListDb.insert(self.defaultCheckList)
        }
      })
      this.loadCheckList()
    },
    methods: {
      loadCheckList () {
        let self = this
        this.checkListDb.find({}).sort({ word: 1 }).exec(function (_err, docs) {
          self.defaultCheckList = docs
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
          const checkList = this.defaultCheckList
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
            self.lines.push(line)
            self.count++
          }
        })
      }
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
