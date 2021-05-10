import request from "@/utils/request"

//获取列表
export function getList(data){
    return request({
        url:"/article/article/search",
        data:data,
        method:"post"
    })
}