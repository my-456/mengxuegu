import request from "@/utils/request"
// export default {
//    test(){
//        return request({
//            url: '/test',
//            method: 'get'
//        })
//    }
// }
export function test(){
    return request({
        url:"/test",
        method:"post",
        data:{
            title:"测试"
        }
    })
}