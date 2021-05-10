<template>
  <div class="app-container" >
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="分类名称">
        <el-input v-model="query.name" placeholder="分类名称"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select
          v-model="query.status"
          placeholder="状态"
          style="width: 160px"
        >
          <el-option
            v-for="item in formInline"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onInquiry"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh-left" @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-plus" type="primary" @click="onAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <el-table border highlight-current-row :data="list" style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="分类名称"
        width="160"
      ></el-table-column>
      <el-table-column align="center" prop="sort" label="排序">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
        width="160"
      ></el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="160">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status ? "正常" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
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
    <Edit
      :visible="edit.visible"
      :title="edit.title"
      :formData="edit.formData"
      :remoteClose="remoteClose"
      @close="remoteClose"
    ></Edit>
  </div>
</template>

<script>
import { getList } from "@/api/category";
import Edit from "./component/edit";
import { updataList,deleteList } from "@/api/category";
export default {
  name: "Category",
  components: {
    Edit,
  },
  filters: {
    statusFilter(status) {
      const statusMap = { 0: "danger", 1: "success" };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      page: {
        //分页对象
        size: 20,
        current: 1,
        total: 0,
      },
      formInline: [
        {
          name: "启用",
          value: 1,
        },
        {
          name: "禁用",
          value: 2,
        },
      ],
      query: {
        status: "",
      }, //查询条件

      edit: {
        title: "",
        visible: false,
        formData: {},
      },
    };
  },

  created() {
    this.getList();
  },
  methods: {
    //查询
    onInquiry() {
      this.page.size = 20;
      this.page.current = 1;
      this.getList();
    },
    //重置
    onReset() {
      this.query = {};
      this.getList();
    },
    //新增
    onAdd() {
      this.edit.title = "新增";
      this.edit.visible = true;
    },
    //获取列表
    getList() {
      let data = {
        ...this.page,
        ...this.query,
      };
      getList(data).then((res) => {
        console.log("res", res);
        this.list = res.data.records;
        this.page.total = res.data.total;
      });
    },

    //编辑
    handleEdit(id) {
      this.showUpdata(id);
      this.edit.title = "编辑";
      this.edit.visible = true;
     
    },
    //显示数据
   async showUpdata(id) {
      const res=await updataList(id)
      this.edit.formData = res.data;
    },
    //删除
     handleDelete(id) { 
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res=await deleteList(id)
          console.log(res)
          if(res.code=="20000"){
            this.$message({
              type:"success",
              message:"删除成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"删除失败"
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
      

    },

    //分页
    handleSizeChange(row) {
      this.page.size = row;
      this.getList();
    },
    handleCurrentChange(row) {
      this.page.current = row;
      this.getList();
    },
    //触发弹出子组件弹窗
    remoteClose() {
      this.edit.formData = {};
      this.edit.visible = false;
    },
  },
};
</script>

<style>
</style>