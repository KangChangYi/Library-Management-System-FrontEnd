<template>
  <div class="book-classification-layout">
      <!-- 组件 -->
      <page-header name="Classification"></page-header>
      <div class="content-layout">
            <aside class="book-categories">
                    <label class="categories">
                        类别
                    </label>
                    <ul>
                        <li v-for="type in bookType" :item="type.typeName"
                        :key="type.typeName" @click="handleBookType(type)">
                            {{type.typeName}}
                        </li>
                    </ul>
            </aside>
            <div class="book">
                <div class="book-search">
                    <el-input placeholder="请输入书名" prefix-icon="el-icon-search"
                    v-model="searchText" @change="searchBookInfo">
                    </el-input>
                </div>
                <div class="search-result-tip">
                    "{{selectedBookType}}" 共有<span> {{totalCount}} </span>本书
                </div>
                <!-- 组件 -->
                <BookList></BookList>
                <div class="paging-layout">
                    <!-- 组件 -->
                    <Paging @changePage='changePage'></Paging>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// 组件
import BookList from './components/bookList.vue';
import Paging from '@/components/paging/index.vue';
import pageHeader from '@/components/header/index.vue';
// 接口
import { getAllBookType } from '@/api/bookType';
import { getAllBookInfo } from '@/api/bookInfo';

export default {
    name: 'Classification',
    data() {
        return {
            bookType: [],
            searchText: '',
        };
    },
    created() {
        // 图书信息
        getAllBookInfo(1).then((res) => {
            this.$store.commit('changeBookInfoList', res.data.bookInfo);
            this.$store.commit('changeBookInfoListTotalCount', res.data.totalCount);
        });
        // 图书类别
        getAllBookType().then((res) => {
            const typeList = res.data;
            typeList.unshift({ typeName: '全部类别' });
            this.bookType = typeList;
        });
    },
    methods: {
        // 改变图书类别
        handleBookType(type) {
            this.$store.dispatch('handleBookType', {
                type: type.typeName,
                id: type._id,
            });
        },
        // 搜索图书
        searchBookInfo(name) {
            this.$store.dispatch('searchBookInfo', {
                name,
            });
        },
        // 子组件方法 页码改变
        changePage(pageNumber) {
            getAllBookInfo(pageNumber).then((res) => {
                this.$store.commit('changeBookInfoList', res.data.bookInfo);
            });
        },
    },
    computed: {
        ...mapState([
            'bookInfoList',
            'selectedBookType',
            'totalCount',
        ]),
    },
    watch: {},
    components: {
        BookList,
        Paging,
        pageHeader,
    },
};
</script>

<style lang="scss" scoped>
.book-classification-layout {
    width:$layout-width + 20px;
    margin:auto;
    // border:1px red solid;
    padding-bottom:30px;
    .content-layout{
        display:flex;
    }
}

.book-categories {
    // border:1px red solid;
    flex:1;
    padding:20px 15px 0 0;
    // border-right:1px #DFDFDF solid;
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
    // border: 1px red solid;
    flex: 4.25;
    border-bottom: 1px #DFDFDF solid;
    .book-search {
        margin: 15px 11px 20px 15px;
    }
    .search-result-tip {
        margin: 0 0 20px 15px;
        span {
            color:$base-color;
            font-weight: bold;
        }
    }
}
.paging-layout{
    margin: 20px;
    @include displayCenter;
}
</style>
