<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="70%"
  >
    <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
    <el-form
      ref="formData"
      :model="formData"
      label-width="100px"
      label-
      position="right"
    >
      <el-form-item label="标题:">
        <el-input v-model="formData.title" readonly />
      </el-form-item>
      <el-form-item label="标签:"> </el-form-item>
      <el-form-item label="主图:">
        <img
          :src="formData.imageUrl"
          class="avatar"
          style="width: 178px; heigth: 178px; display: block"
        />
      </el-form-item>
      <el-form-item label="是否公开:">
        <el-radio-group v-model="formData.ispublic" disabled>
          <el-radio :label="0">不公开 </el-radio>
          <el-radio :label="1">公开 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介:">
        <el-input
          v-model="formData.summary"
          type="textarea"
          :autosize="{ minRows: 2 }"
          readonly
        />
      </el-form-item>
      <el-form-item label="内容:"> </el-form-item>
      <el-form-item align="center" v-if="isAudit">
        <el-button @click="auditSuccess()" type="primary">审核通过</el-button>
        <el-button @click="auditFail()" type="danger">审核不通过</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    id: null,
    isAudit: true, //是否是审核
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    remoteClose: Function,
  },
  data(){
      return{
          lableOptions:[],//所有标签的数组
          formData:{},//表单数据
      }
  },
  methods: {
    handleClose() {
      this.remoteClose();
    },
    // 审核通过 
    auditSuccess () { },
    // 审核不通过 
    auditFail () { }
  },
};
</script>

<style>
</style>