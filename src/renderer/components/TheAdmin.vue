<template>
  <el-main class="admin">
    <el-button size="small" type="danger" icon="el-icon-refresh" @click="resetCheckList">リセット</el-button>
    <el-input placeholder="単語 or 正規表現" v-model="addWord" clearable>
      <el-button slot="append" size="mini" @click="createCheckList()">追加</el-button>
    </el-input>
    <el-table :data="checkList" stripe>
      <el-table-column label="初期設定" align="center" prop="default">
        <template slot-scope="record">
          <el-tag type="info" v-if="defaultCheck(record.row.default)">デフォルト</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="単語 or 正規表現" align="center" prop="word"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="record">
          <el-button size="mini" type="danger" @click="deleteCheckList(record.row._id)">削除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        checkList: this.getCheckList(),
        addWord: ''
      }
    },
    created () {
      this.loadCheckList()
    },
    methods: {
      loadCheckList () {
        this.getCheckListDb().find({}).sort({ word: 1 }).exec((_err, docs) => {
          this.checkList = docs
        })
      },
      resetCheckList () {
        this.resetDefaultCheckList()
        this.loadCheckList()
      },
      createCheckList () {
        this.insertCheckListDb({ word: this.addWord })
        this.loadCheckList()
        this.addWord = ''
      },
      deleteCheckList (id) {
        this.getCheckListDb().remove({ _id: id }, (_err, _numRemoved) => {})
        this.loadCheckList()
      },
      defaultCheck (boot) {
        return typeof (boot) !== 'undefined' && boot === true
      },
      ...mapGetters([
        'getCheckListDb',
        'getCheckList'
      ]),
      ...mapActions([
        'resetDefaultCheckList',
        'insertCheckListDb'
      ])
    }
  }
</script>

<style>
  .el-main.admin {
    width: 60%;
    padding: 5px 5px 0 5px;
    margin: 0px auto;
    &:ul {
      display: flex;
      flex-direction: column;
    }
  }
  .el-input {
    margin-top: 5px;
  }
</style>
