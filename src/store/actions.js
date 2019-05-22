import { getBookInfoByType, getAllBookInfo, getBookInfoBySearch } from '@/api/bookInfo';

export default {
    // 改变图书类别
    async handleBookType({ commit }, { type, id }) {
        console.log(`获取 ${type} 的图书信息`);
        let result;
        if (type === '全部类别') {
            result = await getAllBookInfo().then(res => res.data);
        } else {
            result = await getBookInfoByType(id).then(res => res.data);
        }
        commit('changeBookInfoList', result.bookInfo);
        commit('changeBookInfoListTotalCount', result.totalCount);
        commit('changeBookTypeSelected', type);
    },
    // 改变搜索图书
    async searchBookInfo({ commit }, { name }) {
        console.log(`搜索图书 ${name}`);
        let result;
        if (name) {
            result = await getBookInfoBySearch(name).then(res => res.data);
            commit('changeBookTypeSelected', name);
        } else {
            result = await getAllBookInfo().then(res => res.data);
            commit('changeBookTypeSelected', '全部类别');
        }
        commit('changeBookInfoList', result.bookInfo);
        commit('changeBookInfoListTotalCount', result.totalCount);
    },
};
