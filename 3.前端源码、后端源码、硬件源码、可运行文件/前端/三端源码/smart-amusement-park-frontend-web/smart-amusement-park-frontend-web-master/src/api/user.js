import service from '@/utils/request'

export function login(form) {
  return service({
    url: '/employee/login',
    method: 'post',
    data: form
  });
}

export function getInfo(token) {
  return new Promise();
  return service({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return new Promise();
  return service({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
