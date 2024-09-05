import service from '@/utils/request'

export function getRankList() {
  return service({
    url: "/statistics/headCount/facility",
    method: "get"
  });
}

export function getFacilities() {
  return service({
    url: "/filter/amusement",
    method: "post",
    data: {}
  });
}

export function getUserCount() {
  return service({
    url: "/statistics/headCount/totalArrangeByDate",
    method: "get"
  });
}
