import service from '@/utils/request'

export function getRoute(id) {
  return service({
    url: '/filter/restaurant',
    method: 'post',
    data: {
      id: id
    }
  });
}

export function updateRoute(form) {
  const mform = Object.assign({},form);
  mform.type = form.type.join("/");
  return service({
    url: '/restaurantFacility/update',
    method: 'post',
    data: mform
  });
}

export function addRoute(form) {
  const mform = Object.assign({},form);
  mform.type = form.type.join("/");
  return service({
    url: '/restaurantFacility/add',
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
      facilityType: 1
    }
  });
}

export function listRoute(para) {
  return service({
    url: '/filter/restaurant',
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
    url: '/filter/restaurant',
    method: 'post',
    data: {}
  });
}
