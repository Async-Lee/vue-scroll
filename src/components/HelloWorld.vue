<template>
  <div class="hello">
    <search-bar v-model="value" @change="inputVal" :list="resultList" @selectHandle="selectHandle" :prop="'id'" :label="'text'"/>
  </div>
</template>
<script>
  import SearchBar from '@/components/SearchBar'
  const resultList = [{
    id: 0,
    text: '搜索值的气味1'
  }, {
    id: 1,
    text: '搜索值2'
  }, {
    id: 2,
    text: '搜索值3'
  }, {
    id: 3,
    text: '搜索值4'
  }]
  export default {
    name: 'HelloWorld',
    components: {SearchBar},
    data () {
      return {
        value: '',
        resultList: []
      }
    },
    methods: {
      inputVal (val) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.resultList = []
        if (!val) {
          return
        }
        this.timer = setTimeout(() => {
          this.resultList = resultList
          // console.log(resultList)
        }, 1000)
      },
      selectHandle () {
        // console.log(this.value)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
的撒话就看啥即可
