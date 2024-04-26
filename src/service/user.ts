import {get,post,put} from '../plugins/index'

export function postSendCaptcha(email : string) {
    return get('/auth', {
      email: email
    })
}

export function postLoginByPwd(email : string, pwd : string){
    return post('/login',{
        email: email,
        pwd: pwd
    })
} 

export function postLoginByAuth(email : string, authcode : string){
    return post('/login2',{
        email: email,
        authcode: authcode,
    })
} 

export function getUserInfo() {
    return get('/info',{})
}

export function putUserInfo(data : object) {
    return put('/info', data)
}


export function postRegister(email: string,pwd: string,authcode:string, name:string, phone:string, sid:string, key:string ) {
    if (key == '1') {
        return post('/register/teacher', {
            name:name,
            email:email,
            pwd:pwd,
            auth_code: authcode,
            phone:phone
        })
    } else {
        return post('/register/student', {
            name:name,
            email:email,
            pwd:pwd,
            auth_code: authcode,
            sid:sid
        })
    }
}

export function putUserPWD(email: string, authcode:string, pwd: string) {
    return put("/pwd", {
        email: email,
        auth_code: authcode,
        pwd: pwd
    })
}