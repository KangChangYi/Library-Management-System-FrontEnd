import request from '@/utils/request';

// 全部图书信息列表
export function getBookInfo({
    page = 1, limit = 8, name = false, type = false,
} = {}) {
    return request({
        url: `/api/bookInfo?page=${page}&limit=${limit}&name=${name}&type=${type}`,
        method: 'GET',
    });
}

// 按指定id获取图书
export function getBookInfoById({ id }) {
    return request({
        url: `api/bookInfo/id/${id}`,
        method: 'GET',
    });
}

// 新增图书信息
export function postBookInfo({
    bookName, bookType, author, image, press, publicationDate,
}) {
    return request({
        url: '/api/bookInfo/',
        method: 'POST',
        data: {
            bookName, bookType, author, image, press, publicationDate,
        },
    });
}

// 更新图书信息
export function putBookInfo({
    id, bookName, bookType, author, image, press, publicationDate,
}) {
    return request({
        url: `/api/bookInfo/${id}`,
        method: 'PUT',
        data: {
            bookName, bookType, author, image, press, publicationDate,
        },
    });
}

// 图书信息删除
export function deleteBookInfo({ id }) {
    return request({
        url: `api/bookInfo/${id}`,
        method: 'DELETE',
    });
}
