<template>
  <div class="rich-text">
    <div class="tools">
      <button @click="execCommand('bold')">加粗</button>
      <button @click="execCommand('createLink')">链接</button>
    </div>
    <div class="content" contenteditable="true"></div>
  </div>
</template>
<script>
  export default {
    name: 'RichText',
    data () {
      return {
      }
    },
    methods: {
      execCommand (aCommandName = '', aValueArgument = null) {
        let bool = document.execCommand(aCommandName, false, aValueArgument)
        console.log(bool)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .rich-text .tools {
    text-align: left;
  }
  .rich-text .tools b {
    cursor: pointer;
  }
  .rich-text .content{
    border: 1px solid #ddd;
    height: 300px;
    width: 800px;
    overflow-x: hidden;
    overflow-y: scroll;
    text-align: left;
    padding: 10px;
  }
</style>
