<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form :inline="true" size="mini">
      <el-form-item label="标签名称:">
        <el-input v-model.trim="query.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称:">
        <!-- clearable 清空按钮，filterable 是否可搜索 -->
        <el-select v-model="query.categoryId" clearable filterable>
          <el-option
            v-for="item in nameList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload"
          >重置</el-button
        >
        <el-button @click="clickAdd" type="primary" size="mini" icon="el-icon-circle-plus-outline"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      border
      highlight-current-row
      :data="lableList"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="标签名称"
        width="auto"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="categoryName"
        label="分类名称"
        width="auto"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <Edit :dialogVisible="edit.dialogVisible" :nameList="nameList" 
          :title="edit.title" :formData="edit.formData" :closeDialog="closeDialog"
    ></Edit>
  </div>
</template>

<script>
import { search, nameList,showLable,deleteList } from "@/api/label";
import Edit from './component/edit'
export default {
  name: "Lable",
  components:{
    Edit
  },
  data() {
    return {
      nameList:[],
      lableList: [],
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      query: {},

      edit:{
        title:"",
        dialogVisible:false,
        formData:{
          id:""
        }
      },
      
    };
  },
  created() {
    this.getList();
    this.getNameList();
  },
  methods: {
  //列表
    async getList() {
      let data = {
        ...this.page,
        ...this.query,
      };
      const res = await search(data);
      console.log("标签列表", res);
      this.lableList = res.data.records;
      this.page.total = res.data.total;
    },
  //标签名称
    async getNameList() {
      const res = await nameList();
      this.nameList = res.data;
    },
  //查询
    queryData(){
      this.page.current=1
      this.getList()
    },
  //重置
    reload(){
      this.query={}
      this.getList()
    },
  //新增
  clickAdd(){
    this.getNameList();
    this.edit.title="新增"
    this.edit.dialogVisible=true
  },
  //编辑
  handleEdit(id){
    console.log("id",id)
    this.showLable(id)
    this.edit.title="编辑"
    this.edit.dialogVisible=true
  },
  //编辑回显
  async showLable(id){
    const res=await showLable(id)
    console.log("回显",res)
    this.edit.formData=res.data
    this.edit.formData.id=id
  },
  //删除
  handleDelete(id){
     this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res=await deleteList(id)
            this.$message({
              type:res.code=="20000"?"success":"error",
              message:res.code=="20000"?"删除成功":"删除失败"
            })
         
        })

  },
    handleSizeChange(row) {
      this.page.size = row;
      this.getList();
    },
    handleCurrentChange(row) {
      this.page.current = row;
      this.getList();
    },
    closeDialog(){
      this.edit.dialogVisible=false
    }
  },
};
</script>

<style>
</style>