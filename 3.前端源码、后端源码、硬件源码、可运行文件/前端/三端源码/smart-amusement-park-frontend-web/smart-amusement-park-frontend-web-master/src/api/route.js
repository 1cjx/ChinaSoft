import service from '@/utils/request'

export function getRoute(id) {
  return service({
    url: '/recommendation',
    method: 'post',
    data: {
      id: id,
      name: null
    }
  });
}

export function updateRoute(form) {
  return service({
    url: '/recommendation/updateRoute',
    method: 'post',
    data: {
      id: form.id,
      name: form.name,
      imgUrl: form.imgUrl,
      facilityIdList: form.checkedFacilities
    }
  });
}

export function addRoute(form) {
  return service({
    url: '/recommendation/addRoute',
    method: 'post',
    data: {
      name: form.name,
      imgUrl: form.imgUrl,
      facilityIdList: form.checkedFacilities
    }
  });
}

export function uploadImg(fileheader) {
  let formData = new FormData();
  formData.append("file", fileheader.file);
  return service({
    url: '/common/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export function delRoute(id) {
  return service({
    url: '/recommendation/deleteRoute',
    method: 'post',
    data: {
      id: id
    }
  });
}

export function listRoute(para) {
  return service({
    url: '/recommendation',
    method: 'post',
    data: {
      name: para.name || null
    }
  });
}

export function listFacilities(para) {
  return service({
    url: '/filter/amusement',
    method: 'post',
    data: {}
  });
}
