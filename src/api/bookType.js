import request from '@/utils/request';

export function bookTypeList() {
    return request({
        url: '/api/bookType',
        method: 'GET',
    });
}
