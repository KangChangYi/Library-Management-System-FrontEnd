import request from '@/utils/request';

export function login(email, password) {
    return request({
        url: '/api/login',
        method: 'POST',
        data: {
            email,
            password,
        },
    });
}
