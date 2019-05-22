import request from '@/utils/request';

// 全部图书信息列表
export function getAllBookInfo(page) {
    return request({
        url: `/api/bookInfo/page/${page}`,
        method: 'GET',
    });
}

// 按指定id获取图书
export function getBookInfoById(id) {
    return request({
        url: `api/bookInfo/id/${id}`,
        method: 'GET',
    });
}

// 按图书类型获取图书
export function getBookInfoByType(id) {
    return request({
        url: `api/bookInfo/type/${id}`,
        method: 'GET',
    });
}

// 按名称搜索图书
export function getBookInfoBySearch(name) {
    return request({
        url: `api/bookInfo/name/${name}`,
        method: 'GET',
    });
}
