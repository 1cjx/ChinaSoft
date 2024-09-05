import service from '@/utils/request'

export function getRoute(id) {
  return service({
    url: '/filter/base',
    method: 'post',
    data: {
      id: id
    }
  });
}

export function updateRoute(form) {
  const mform = Object.assign({},form);
  return service({
    url: '/baseFacility/update',
    method: 'post',
    data: mform
  });
}

export function addRoute(form) {
  const mform = Object.assign({},form);
  return service({
    url: '/baseFacility/add',
    method: 'post',
    data: mform
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
    url: '/facility/delete',
    method: 'post',
    data: {
      facilityId: id,
      facilityType: 2
    }
  });
}

export function listRoute(para) {
  return service({
    url: '/filter/base',
    method: 'post',
    data: {
      id: para.id,
      name: para.name,
      type: para.type
    }
  });
}

export function listFacilities(para) {
  return service({
    url: '/filter/base',
    method: 'post',
    data: {}
  });
}
