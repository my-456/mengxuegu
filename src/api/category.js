import request from '@/utils/request'

export function getList(data){
    return request({
        url:"/article/category/search",
        method:"post",
        data
    })
}

export function addList(data){
    return request({
        url:"/article/category",
        method:"post",
        data
    })
}

export function updataList(id){
    return request({
        url:`/article/category/${id}`,
        method:"get",
    })
}

export function updata(data){
    return request({
        url:`/article/category`,
        method:"put",
        data
    })
}

export function deleteList(id){
    return request({
        url:`/article/category/${id}`,
        method:"delete"
    })
}