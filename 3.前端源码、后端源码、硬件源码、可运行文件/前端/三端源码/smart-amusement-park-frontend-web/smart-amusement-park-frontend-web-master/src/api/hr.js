import service from '@/utils/request'

export function getEmployee(id) {
  return service({
    url: '/employee/getEmployee',
    method: 'post',
    data: {
      id: id
    }
  });
}

export function updateEmployee(form) {
  return service({
    url: '/employee/updateEmployee',
    method: 'post',
    data: {
      id: form.id,
      name: form.name,
      phone: form.phone,
      age: parseInt(form.age),
      gender: form.gender
    }
  });
}

export function addEmployee(form) {
  return service({
    url: '/employee/addEmployee',
    method: 'post',
    data: {
      name: form.name,
      phone: form.phone,
      age: parseInt(form.age),
      gender: form.gender
    }
  });
}

export function delEmployee(id) {
  return service({
    url: '/employee/deleteEmployee',
    method: 'post',
    data: {
      id: id
    }
  });
}

export function listEmployee(para) {
  return service({
    url: '/employee/getEmployee',
    method: 'post',
    data: {
      name: para.name || null,
      gender: para.gender || null
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
