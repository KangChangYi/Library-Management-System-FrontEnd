import request from '@/utils/request';

// 注册
export function register(role, email, password) {
    return request({
        url: '/api/user',
        method: 'POST',
        data: {
            role,
            email,
            password,
        },
    });
}


export function changePassword(oldPassword, newPassword) {
    return request({
        url: '/users',
        method: 'patch',
        data: {
            password: oldPassword,
            repassword: newPassword,
        },
    });
}

export function userInfo() {
    return request({
        url: '/users',
        method: 'get',
    });
}

export function updateUserInfo(info) {
    return request({
        url: '/users/modified',
        method: 'post',
        data: info,
    });
}

export function wallet() {
    return request({
        url: '/users/payment',
        method: 'get',
    });
}

export function payment(money) {
    return request({
        url: '/users/payment',
        method: 'post',
        data: {
            money,
        },
    });
}
