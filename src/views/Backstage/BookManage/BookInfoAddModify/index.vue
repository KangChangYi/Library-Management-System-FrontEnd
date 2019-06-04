<template>
  <main class="add-modify-layout">
      <table cellspacing=0 cellpadding=10>
          <tr>
              <td>书名：</td>
              <td>
                  <el-input v-model="formData.bookName" placeholder="请输入书名"></el-input>
              </td>
          </tr>
          <tr>
              <td>类别：</td>
              <td>
                <el-select v-model="formData.bookType" placeholder="请选择类别">
                    <el-option v-for="item in bookTypeList" :key="item.value"
                    :value="item.value" :label="item.label"></el-option>
                </el-select>
              </td>
          </tr>
          <tr>
              <td>作者：</td>
              <td>
                  <el-input v-model="formData.author" placeholder="请输入作者"></el-input>
              </td>
          </tr>
          <tr>
              <td>出版社：</td>
              <td>
                  <el-input v-model="formData.press" placeholder="请输入出版社"></el-input>
              </td>
          </tr>
          <tr>
              <td>出版日期：</td>
              <td>
                 <el-tooltip effect="dark" content="如：2019/6/3"
                 placement="right">
                     <el-input v-model="formData.publicationDate" placeholder="请输入日期"></el-input>
                 </el-tooltip>
              </td>
          </tr>
          <tr>
              <td colspan="2">
                <el-upload class="upload" ref="upload"
                :action="serverUrl" :auto-upload="false" :limit="1"
                :on-exceed="exceed"
                :on-change="selectImg">
                    <el-button slot="trigger" type="primary">
                        选取图片
                    </el-button>
                    <small slot="tip" class="upload-tip">jpg / png 的图片并且仅一张</small>
                </el-upload>
              </td>
          </tr>
          <tr>
              <td colspan="2" align="center" class="button-td">
                  <el-button v-if="!bookId" type="success" @click="handleSubmit()">提交</el-button>
                  <el-button v-else type="warning" @click="handleModify()">修改</el-button>
              </td>
          </tr>
      </table>
  </main>
</template>

<script>
// api
import { getBookInfoById, postBookInfo, putBookInfo } from '@/api/bookInfo';
import { getBookType } from '@/api/bookType';

export default {
    name: 'BookInfoAddModify',
    data() {
        return {
            formData: {
                bookName: '',
                bookType: '',
                author: '',
                image: '',
                press: '',
                publicationDate: '',
            },
            bookId: null,
            serverUrl: this.$store.state.serverUrl,
            bookTypeList: [],
        };
    },
    created() {
        // 根据是否有 id 判断是新增还是修改
        const { id } = this.$route.query || false;
        this.bookId = id;
        if (id) {
            this.getBookDataById(id);
        }
        this.getType();
    },
    methods: {
        // 点击提交
        handleSubmit() {
            const result = this.validateForm();
            if (!result) {
                this.$message.warning('请将表单填写完整');
            }
            // 新增图片信息 api
            postBookInfo({ ...result }).then((res) => {
                if (res.status === 200) {
                    this.$message.success('新增完成');
                    this.initFormData();
                }
            }).catch(() => {
                this.$message.error('新增出错！');
            });
        },
        // 修改
        handleModify() {
            const result = this.validateForm();
            if (!result) {
                this.$message.warning('请将表单填写完整');
            }
            // 新增图片信息 api
            putBookInfo({ id: this.bookId, ...result }).then((res) => {
                if (res.status === 200) {
                    this.$message.success('修改完成');
                    this.initFormData();
                }
            }).catch(() => {
                this.$message.error('修改出错！');
            });
        },
        // 选取图片
        selectImg(file) {
            const fileData = file;
            this.blobToDataURI(fileData.raw, (res) => {
                this.formData.image = res;
            });
        },
        // blob to base64
        blobToDataURI(blob, callback) {
            const reader = new FileReader();
            reader.onload = function read(e) {
                callback(e.target.result);
            };
            reader.readAsDataURL(blob);
        },
        // 图片最多选择一张
        exceed() {
            this.$message.warning('最多上传一张图片');
        },
        // 用 id 获取图片信息
        getBookDataById(id) {
            getBookInfoById({ id }).then((res) => {
                console.log(res.data);
                const result = res.data;
                this.formData = {
                    ...result,
                    bookType: result.bookType._id,
                    publicationDate: new Date(result.publicationDate).toLocaleDateString(),
                };
            });
        },
        // 获取类别
        getType() {
            getBookType().then((res) => {
                const list = [];
                res.data.forEach((val) => {
                    list.push({ label: val.typeName, value: val._id });
                });
                this.bookTypeList = list;
            });
        },
        validateForm() {
            const {
                bookName, bookType, author, image, press, publicationDate,
            } = this.formData;
            if (!bookName) { return false; }
            if (!bookType) { return false; }
            if (!author) { return false; }
            if (!image) { return false; }
            if (!press) { return false; }
            if (!publicationDate) { return false; }
            return {
                bookName, bookType, author, image, press, publicationDate,
            };
        },
        initFormData() {
            this.formData = {
                bookName: '',
                bookType: '',
                author: '',
                image: '',
                press: '',
                publicationDate: '',
            };
        },
    },
    computed: {},
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
.add-modify-layout {
    height:85vh;
    padding:15px;
    margin-top:20px;
    background:white;
    box-shadow: $box-shadow-base;
}
tr {
    height:70px;
}
.button-td {
    button {
        width:310px;
    }
}
.upload{
    button {
        width:310px;
    }
    .upload-tip{
        margin-top:5px;
        display:block;
    }
}
</style>
