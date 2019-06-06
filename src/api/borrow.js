import request from '@/utils/request';

// 获取借还信息  id(userId)
export function getBorrowInfo({ id, page = 1, limit = 8 }) {
    return request({
        url: `api/borrow?id=${id}&page=${page}&limit=${limit}`,
        method: 'GET',
    });
}

// 借书   id (bookInfoId)
export function borrowBook({ id, userId }) {
    return request({
        url: `api/borrow/${id}`,
        method: 'POST',
        data: {
            userId,
        },
    });
}

// 还书    id (borrowInfoId)
export function returnBook({ id, bookInfoId, bookId }) {
    return request({
        url: `api/borrow/${id}`,
        method: 'PUT',
        data: {
            bookInfoId,
            bookId,
        },
    });
}
