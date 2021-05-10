import request from "@/utils/request"
export function search(data){
    return request({
        url:"/article/label/search",
        method:"post",
        data
    })
}

export function nameList(data){
    return request({
        url:"/article/category/list",
        method:"get",
    })
}

export function addLable(data){
    return request({
        url:"/article/label",
        method:"post",
    })
}


export function showLable(id){
    return request({
        url:`/article/label/${id}`,
        method:"get",
    })
}

export function editLable(data){
    return request({
        url:`/article/label`,
        method:"put",
        data
    })
}

export function deleteList(id){
    return request({
        url:`/article/label/${id}`,
        method:"delete",
    })
}