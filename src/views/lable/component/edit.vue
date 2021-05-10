<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :rules="rules"
        ref="formData"
        :model="formData"
        label-width="80px"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="formData.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="标签分类" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择活动区域">
            <el-option
              v-for="item in nameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addLable,editLable } from '@/api/label'
export default {
    props:{
        title:{
            type:String,
            default:""
        },
        dialogVisible:{
            type:Boolean,
            default:false
        },
        formData:{
            type:Object,
            default:{}
        },
        nameList:{
            type:Array,
            default:[]
        },
        closeDialog:Function
    },
    data(){
        return{
            rules:{
                name:[
                {required:true,message:"请输入标签名称",trigger:"blur"}
                ],
                categoryId:[
                {required:true,message:"请选择分类名称",trigger:"blur"}
                ]
            }
        }
    },
    methods:{

        handleClose(){
            this.$refs["formData"].resetFields()
            this.closeDialog()
        },
        onSubmit(){
           this.$refs["formData"].validate(async(valid)=>{
               if(valid){
                    if(this.title=="新增"){
                        const res=await addLable(this.formData)
                         this.show(res)
                     }else{
                        const res=await editLable(this.formData)
                         this.show(res)
                    }
               }else{
                   return false
               }
           })
           
          
        },

        show(res){
              if(res.code=="20000"){
                this.$message({
                    type:"success",
                    message:`${this.title}成功`
                })
                this.$parent.getList()
                this.handleClose()
            }else{
                this.$message({
                    type:"error",
                    message:`${this.title}失败`
                })
            }
        }
    }
};
</script>

<style>
</style>