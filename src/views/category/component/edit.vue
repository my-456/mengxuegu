<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form
      ref="formData"
      :model="formData"
      label-width="100px"
      label-position="right"
      style="width: 400px"
      :rules="rules"
    >
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number
          style="width: 300px"
          v-model="formData.sort"
          :min="1"
          :max="1000"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          type="textarea"
          v-model="formData.remark"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formData')">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {addList,updataList,updata} from '@/api/category'
export default {
  //接收父组件属性
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      //标题
      type: String,
      default: "",
    },
    remoteClose: Function,
    formData: {
      id: null,
      name: "",
      sort: null,
      remark: "",
    },
  },

  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        sort: [{ required: true, message: "请输入排序号", trigger: "change" }],
      },
    };
  },
  created(){

  },
  methods: {
    //关闭弹窗
    handleClose(done) {
      this.$refs["formData"].resetFields();
      //this.remoteClose();//1.通过父组件传值，关闭
      //this.$emit('close')//2.通过子组件关闭
      this.$parent.remoteClose()//3.直接调用父组件方法
    },
    //提交表单
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过，提交数据
          if(this.formData.id){
            //修改数据
            this.submitUpdata()
          }else{
            //新增数据
            this.submitData();
          }
          
        } else {
          // 验证不通过
          return false;
        }
      });
    },

    submitData(){
      addList(this.formData).then(res=>{
        if(res.code=="20000"){
          this.$message({
            message:"添加成功",
            type:"success"
          })
          //this.remoteClose()
          this.$emit('close')
        }else{
          this.$message({
            message:"添加失败",
            type:"error"
          })
        }
      })
    },


    submitUpdata(){
      updata(this.formData).then(res=>{
          if(res.code=="20000"){
          this.$message({
            message:"修改成功",
            type:"success"
          })
          this.remoteClose()
        }else{
          this.$message({
            message:"修改失败",
            type:"error"
          })
        }
      
      })
    }

  },
};
</script>

<style>
</style>