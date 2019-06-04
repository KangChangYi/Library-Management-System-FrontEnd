import request from '@/utils/request';

// 新增图书
export function putBook({ id, number }) {
    return request({
        url: `api/bookInfo/book/${id}`,
        method: 'POST',
        data: {
            number,
        },
    });
}

// 删除指定图书
export function deleteBook({ id, bid }) {
    return request({
        url: `api/bookInfo/book/${id}/${bid}`,
        method: 'DELETE',
    });
}
