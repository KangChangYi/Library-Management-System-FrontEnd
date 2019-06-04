import request from '@/utils/request';

// 登录
export function login({ email, password }) {
    return request({
        url: '/api/login',
        method: 'POST',
        data: {
            email,
            password,
        },
    });
}
