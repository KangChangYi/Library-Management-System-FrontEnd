import request from '@/utils/request';

export function getRoleList() {
    return request({
        url: '/api/role',
        method: 'GET',
    });
}
