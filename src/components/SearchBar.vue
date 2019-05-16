<template>
  <div class="search-bar">
     <div class="container">
      <div class="bgDiv">
        <input type="text" class="search-input-text" autofocus placeholder="关键词" v-model="keyWord"
          ref="search-input"
          @input="change"
          @blur="focus(false)"
          @focus="focus(true)"
          @keyup.up="keyUp"
          @keyup.down="keyDown"
          @keyup.enter="keyEnter">
        <div class="suggest" v-if="isList && list.length">
          <ul id="search-result">
            <li v-for="(item, index) in list" :key="index" :id="item.id"
              :class="selectIndex === index ? 'active' : ''"
              @click="selectHandle(index)">{{item.text}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      timer: null,
      keyWord: '',
      selectItem: {},
      selectIndex: -1,
      isList: false,
      isSelect: false,
      activeIndex: -1
    }
  },
  props: {
    value: [String, Number, Object],
    list: Array,
    prop: String
  },
  watch: {
    selectItem (newItem) {
      this.keyWord = newItem.text
      this.$emit('input', this.prop ? newItem[this.prop] : newItem)
    },
    selectIndex (index) {
      if (index > -1 && this.list[index]) {
        this.keyWord = this.list[index]['text']
        // this.selectItem = {}
        // this.selectItem = this.list[index]
      }
    },
    list (newList) {
      // this.isList = true
      this.selectIndex = -1
    },
    keyWord (val) {
      this.isList = true
      if (!val) {
        this.clearContent()
      }
    }
  },
  mounted () {
    this.inputKeyUp = e => {
      if ([38, 40].includes(e.keyCode)) {
        e.preventDefault()
      }
      return false
    }
    this.$refs['search-input'].addEventListener('keydown', this.inputKeyUp)
  },
  beforeDestroy () {
    console.log(this.$refs['search-input'])
    this.$refs['search-input'].removeEventListener('keydown', this.inputKeyUp)
  },
  methods: {
    change () {
      this.$emit('change', this.keyWord)
    },
    clearContent () {
      this.isList = false
    },
    selectHandle (index = this.selectIndex) {
      this.selectIndex = this.activeIndex = index
      this.isSelect = true
      if (index > -1) {
        this.selectItem = {}
        this.selectItem = this.list[index]
        this.keyWord = this.selectItem['text']
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.$emit('selectHandle')
          this.clearContent()
        })
      })
    },
    keyUp () {
      if (this.selectIndex > 0) {
        --this.selectIndex
      } else {
        this.selectIndex = this.list.length - 1
      }
    },
    keyDown () {
      if (this.selectIndex < this.list.length - 1) {
        ++this.selectIndex
      } else {
        this.selectIndex = 0
      }
    },
    keyEnter () {
      if (this.selectIndex < 0) {
        ++this.selectIndex
      }
      this.selectHandle()
      this.$refs['search-input'].blur()
    },
    focus (flag) {
      setTimeout(() => {
        if (!this.isSelect) {
          this.keyWord = this.selectItem['text']
          // this.selectIndex = this.activeIndex
        }
        this.isSelect = !flag
        this.$nextTick(() => {
          this.isList = flag
        })
      }, 150)
    }
  }
}
</script>

<style scoped>
  .container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .bgDiv {
      box-sizing: border-box;
      width: 200px;
      height: 55px;
      position: relative;
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    }

    .search-input-text {
      border: 1px solid #b6b6b6;
      width: 200px;
      background: #fff;
      height: 33px;
      line-height: 33px;
      font-size: 18px;
      padding: 3px 0 0 7px;
    }

    .search-input-button {
      width: 90px;
      height: 38px;
      color: #fff;
      font-size: 16px;
      letter-spacing: 3px;
      background: #3385ff;
      border: .5px solid #2d78f4;
      margin-left: -5px;
      vertical-align: top;
      opacity: .9;
    }

    .search-input-button:hover {
      opacity: 1;
      box-shadow: 0 1px 1px #333;
      cursor: pointer;
    }

    .suggest {
      width: 200px;
      position: absolute;
      top: 38px;
      border: 1px solid #999;
      background: #fff;
    }

    .suggest ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .suggest ul li {
      padding: 3px;
      font-size: 17px;
      line-height: 25px;
      cursor: pointer;
      transition: .5s;
    }
    .suggest ul li.active {
      background-color: #e5e5e5
    }
    .suggest ul li:hover {
      background-color: #e5e5e5
    }
</style>
