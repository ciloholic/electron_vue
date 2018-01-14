<template>
  <div id="app">
    <el-container>
      <!-- header -->
      <el-header>
        <el-menu default-active="/" mode="horizontal" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/">作業画面</el-menu-item>
          <el-menu-item index="/admin">管理画面</el-menu-item>
        </el-menu>
      </el-header>
      <!-- main -->
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'next-tool-electron'
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    max-width: 100%;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Hiragino Kaku Gothic ProN,"メイリオ",meiryo,sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: #444;
    min-width: 1000px;
  }
  li {
    list-style: none;
  }
  a {
    color: #28c;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .el-header {
    padding: 0;
    position: sticky;
    top: 0;
  }
</style>
