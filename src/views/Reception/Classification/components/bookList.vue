<template>
    <div class="book-list">
        <div class="book-list-item" v-for="book in bookList" :item="book" :key="book">
            <img src="../../../../assets/book1.png"/>
            <div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bookList',
    data() {
        return {
            bookList: [
                {
                    name: '123',
                },
                {
                    name: '123',
                },
                {
                    name: '123',
                },
                {
                    name: '123',
                },
                {
                    name: '123',
                },
            ],
        };
    },
    created() { },
    methods: {},
    computed: {},
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
.book-list {
    padding-left:7px;
    &:after {
        content:'';
        display:block;
        clear:both;
    }
    // border:1px red solid;
    // float:left;
}

.book-list-item {
    width:202px;
    height:310px;
    float:left;
    padding:8px;
    &:hover {
        background:white;
        box-shadow:$box-shadow-base;
    }
    img {
        width:186px;
        height:229.6px;
    }
}

// .book-list-item + .book-list-item{
//     margin-left:20px;
// }
</style>
