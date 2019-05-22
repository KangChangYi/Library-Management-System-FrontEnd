<template>
    <div class="book-list">
        <div class="book-list-item" v-for="book in bookInfoList" :item="book._id" :key="book._id">
            <img :src="book.image"/>
            <div class="book-description">
                <div class="book-name">
                    {{book.bookName}}
                </div>
                <!-- 组件 -->
                <Tag :name="book.bookType.typeName"></Tag>
                <br>
                <div class="book-auth">
                    <small>{{book.author}}</small>
                    <small>剩余<span> {{book.books | filterSurplusBook}} </span>本</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from '@/components/tag/index.vue';
import { mapState } from 'vuex';

export default {
    name: 'bookList',
    data() {
        return { };
    },
    created() { },
    methods: { },
    // 计算剩余图书数量
    filters: {
        filterSurplusBook(books) {
            let number = 0;
            books.forEach((val) => {
                if (!val.isLend) { number += 1; }
            });
            return number;
        },
    },
    computed: {
        ...mapState([
            'bookInfoList',
        ]),
    },
    components: {
        Tag,
    },
};
</script>

<style lang='scss' scoped>
.book-list {
    // 固定高度以免书本数量少的时候布局出现问题
    height:630px;
    padding-left:7px;
    &:after {
        content: '';
        display: block;
        clear: both;
    }
    // border:1px red solid;
    // float:left;
}

.book-list-item {
    width:204px;
    float:left;
    padding:8px;
    @include displayCenter();
    flex-direction:column;
    &:hover {
        background:white;
        box-shadow:$box-shadow-base;
        .book-name{
            color: $base-color;
        }
    }
    img {
        width:186px;
        height:229.6px;
    }
}
.book-description {
    width:100%;
    .book-name {
        font-weight: bold;
        margin:5px 0 5px 0;
        text-overflow:ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .book-auth{
        margin-top:5px;
    }
    small + small {
        margin-left:5px;
    }
    span {
        font-weight: bold;
        color: $base-color;
    }
}
</style>
