<template>
    <div class="book-list">
        <div class="book-list-item" v-for="book in bookList" :item="book.name" :key="book.name">
            <img src="../../../../assets/book1.png"/>
            <div class="book-description">
                <div class="book-name">
                    数据结构与算法
                </div>
                <!-- 组件 -->
                <Tag name="算法"></Tag>
                <small>陶哲轩</small>
                <small>剩余 <span>5</span> 本</small>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from '@/components/tag/index.vue';

export default {
    name: 'bookList',
    data() {
        return {
            bookList: [
                { name: '123' },
                { name: '123' },
                { name: '123' },
                { name: '123' },
                { name: '123' },
                { name: '123' },
                { name: '123' },
                { name: '123' },
            ],
        };
    },
    created() { },
    methods: {},
    computed: {},
    watch: {},
    components: {
        Tag,
    },
};
</script>

<style lang='scss' scoped>
.book-list {
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
        margin-bottom:5px;
    }
    small {
        margin-left:5px;
    }
    span {
        font-weight: bold;
        color: $base-color;
    }
}

// .book-list-item + .book-list-item{
//     margin-left:20px;
// }
</style>
