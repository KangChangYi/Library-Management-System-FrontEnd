<template>
  <div class="book-classification-layout">
      <header class="header">
          <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name:'Classification'}">图书分类</el-breadcrumb-item>
          </el-breadcrumb>
      </header>
      <div class="content-layout">
            <aside class="book-categories">
                    <label class="categories">
                        类别
                    </label>
                    <ul>
                        <li v-for="type in bookType" :item="type" :key="type">
                            {{type.name}}
                        </li>
                    </ul>
            </aside>
            <div class="book">
                <div class="book-search">
                    <el-input placeholder="请输入书名" prefix-icon="el-icon-search" v-model="searchText">
                    </el-input>
                </div>
                <div class="search-result-tip" v-if="searchedBookList">
                    "Az" 共 <b>2</b> 个搜索结果
                </div>
                <BookList></BookList>
            </div>
      </div>
  </div>
</template>

<script>
import BookList from './components/bookList.vue';

export default {
    name: 'Classification',
    data() {
        return {
            searchedBookList: 'has',
            searchText: '',
            bookType: [
                { name: '文学类' },
                { name: '科研类' },
                { name: '技术类' },
                { name: 'JavaScript' },
                { name: 'Node' },
                { name: 'Android' },
                { name: 'Java' },
            ],
        };
    },
    created() {},
    methods: {},
    computed: {},
    watch: {},
    components: {
        BookList,
    },
};
</script>
<style lang="scss" scoped>
.book-classification-layout {
    width:1070px;
    height:100%;
    margin:auto;
    border:1px red solid;
    .header{
        padding:25px 10px;
    }
    .content-layout{
        height:calc(100% - 70px);
        border:1px red solid;
        @include displayCenter($align-items:flex-start);
    }
}

.book-categories {
    border:1px red solid;
    height:100%;
    flex:1;
    padding:20px 15px 0 0;
    border-right:1px #DFDFDF solid;
    border-bottom:1px #DFDFDF solid;
    .categories {
        padding:8px 10px;
        font-size:$font-size-large;
        color:$text-color-primary;
    }
    ul {
         list-style-type:none;
         margin:0;
         padding:20px 0 0 0;
         li {
             padding:8px 10px;
             cursor: pointer;
             border-radius: 5px;
             &:hover {
                 background:#f1f1f1;
                 color:$base-color;
             }
         }
         li + li {
             margin:10px 0 0 0;
         }
    }
}
.book {
    border:1px red solid;
    height:100%;
    flex:3.7;
    border-bottom:1px #DFDFDF solid;
    .book-search{
        margin:15px 15px 20px 15px;
    }
    .search-result-tip{
        margin:0 0 20px 15px;
    }
}
</style>
