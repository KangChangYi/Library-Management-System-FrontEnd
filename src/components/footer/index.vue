
<template>
  <div class="footer-layout">
      <div class="content-box">
          <small>© 2019</small>
          <small id="clickable"><a href="https://github.com/KangChangYi">Github</a></small>
          <img class="footer-icon" src="@/assets/icon-smail32.png" />
          <small id="clickable"><a href="https://kangchangyi.github.io/">Blog</a></small>
          <small id="clickable"><a href="https://kangchangyi.github.io/about/">About</a></small>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {};
    },
    created() {},
    methods: {},
    computed: {},
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
.footer-layout{
    width:100%;
    height:120px;
    background: white;
    @include displayCenter;
    .content-box{
        width:1050px;
        margin:auto;
        @include displayCenter($justify-content:center);
        small{
            width:80px;
            margin:0 10px;
            text-align:center;
        }
        img{
            margin:0 50px;
        }
    }
}
#clickable{
    color:$base-color;
    cursor:pointer;
}
.footer-icon{
    width:32px;
    height:32px;
    box-shadow: $box-shadow-dark;
    border-radius: 50%;
}
</style>
