import request from '@/utils/request';

// 获取 全部类别
export function getBookType({ page = 1, limit = 8, name = false } = {}) {
    return request({
        url: `/api/bookType?page=${page}&limit=${limit}&name=${name}`,
        method: 'GET',
    });
}

// 按照 id 查找图书类别
export function getBookTypeById({ id }) {
    return request({
        url: `/api/bookType/${id}`,
        method: 'GET',
    });
}

// 新增 图书类别
export function postBookType({ typeName }) {
    return request({
        url: '/api/bookType/',
        method: 'POST',
        data: {
            typeName,
        },
    });
}

// 更新 图书类别
export function putBookType({ id, typeName }) {
    return request({
        url: `/api/bookType/${id}`,
        method: 'PUT',
        data: {
            typeName,
        },
    });
}

// 删除 图书类别
export function deleteBookType({ id }) {
    return request({
        url: `/api/bookType/${id}`,
        method: 'DELETE',

    });
}
