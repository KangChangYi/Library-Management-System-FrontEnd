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

// 获取自身数据
export function getMe() {
    return request({
        url: '/api/user/me',
        method: 'GET',
    });
}

// 获取所有用户信息，除管理员
export function getUserList(page) {
    return request({
        url: `/api/user/page/${page}`,
        method: 'GET',
    });
}

// 账户通过审核
export function passAuth(id) {
    return request({
        url: `/api/user/passAuth/${id}`,
        method: 'PUT',
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
