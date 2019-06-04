import request from '@/utils/request';

// POST 注册
export function register({ role, email, password }) {
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

// GET 获取所有用户信息，除管理员
export function getUserList({ page = 1, limit = 8, name = false }) {
    return request({
        url: `/api/user?page=${page}&limit=${limit}&name=${name}`,
        method: 'GET',
    });
}

// PUT 账户通过审核
export function passAuth({ id }) {
    return request({
        url: `/api/user/passAuth/${id}`,
        method: 'PUT',
    });
}

// GET 获取自身数据
export function getMe() {
    return request({
        url: '/api/user/me',
        method: 'GET',
    });
}

// PUT 更新用户信息
export function putUserInfo({ id, nickName, gender }) {
    return request({
        url: `/api/user/${id}`,
        method: 'PUT',
        data: {
            nickName,
            gender,
        },
    });
}

// PUT 修改密码
export function modifyPassword({ id, oldPassword, newPassword }) {
    return request({
        url: `/api/user/password/${id}`,
        method: 'PUT',
        data: {
            oldPassword,
            newPassword,
        },
    });
}
