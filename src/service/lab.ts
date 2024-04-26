import {get,post,put} from '../plugins/index'

export function getLaboratory(date : string) {
    return get('/student/booking', {
        date: date
      })
}

export function postLaboratory(data : object) {
  return post("/teacher/laboratory", data)
}

export function postBookingLaboratory(data : object) {
  return post("/student/booking", data)
}

export function getAlreadyBookingLaboratory() {
  return get("/student/already/booking", {})
}

export function getTeaLaboratory() {
  return get("/teacher/mypublishlab", {})
}

export function getStuStatus(lid : string) {
  return get("/teacher/laboratory",{
    lid: lid
  })
}

export function getExcel(lid : string) {
  return get("/teacher/excel", {
    lid: lid
  })
}

export function postTBooking(data : object) {
  return post("/teacher/booking", data)
}

export function getTBookingLaboratory() {
  return get("/teacher/already/booking",{})
}