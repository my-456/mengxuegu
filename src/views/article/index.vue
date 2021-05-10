<template>
  <div class="app-container">
     <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="文章标题">
        <el-input v-model="query.name" placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章状态">
        <el-select
          v-model="query.status"
          placeholder="状态"
          style="width: 160px"
        >
       <el-option :value="1" label="未审核" ></el-option> 
       <el-option :value="2" label="审核通过" ></el-option> 
       <el-option :value="3" label="审核未通过" ></el-option> 
       <el-option :value="0" label="已删除" ></el-option>
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
    </el-form>
       <el-table
      :data="list"
      border
      highlight-current-row
      style="width: 100%">
          <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
      align="center"
        prop="title"
        label="文章标题"
        width="180">
      </el-table-column>
      <el-table-column
      align="center"
        prop="viewCount"
        label="浏览量"
        width="180">
      </el-table-column>
      <el-table-column
      align="center"
        prop="thumhup"
        label="点赞数">
      </el-table-column>
      <el-table-column
      align="center"
        prop="ispublic"
        label="是否公开">
        <template slot-scope="scope">
        <el-tag v-if="scope.row.ispublic === 0" type="danger">不公开</el-tag>
        <el-tag v-if="scope.row.ispublic === 1" type="warning">公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column
      align="center"
        prop="status"
        label="状态">
        <template slot-scope="scope"> 
          <el-tag v-if="scope.row.status === 1" >未审核</el-tag> 
          <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag> 
          <el-tag v-if="scope.row.status === 3" type="warning">审核未通过</el-tag> 
          <el-tag v-if="scope.row.status === 0" type="danger">已删除</el-tag> 
        </template>
      </el-table-column>
      <el-table-column
      align="center"
        prop="updateDate"
        label="最后更新时间">
       <template slot-scope="scope"> {{getFormat(scope.row.updateDate)}} </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="操作"
        width="220"
        >
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status===1"
          @click="openAudit(scope.row.id)" type="success"
          >审核</el-button>
          <el-button size="mini" v-if="scope.row.status!==0"
          @click="handleDelete(scope.row.id)" type="danger"
          >删除</el-button>
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
    <Audit :title="audit.title" :visible="audit.visible" 
    :isAudit="audit.isAudit" :id="audit.id" :remoteClose="handleClose"></Audit>
  </div>
</template>

<script>
import { getList } from "@/api/article";
import {format} from "@/utils/date"
import Audit from "./audit/audit"
export default {
  name: "Article",
  components:{
    Audit
  },
  data() {
    return {
      formInline:[
        {
          value:1,
          name:"未审核"
        },
        {
          value:2,
          name:"审核通过"
        },
        {
          value:2,
          name:"审核未通过"
        },
        {
          value:0,
          name:"已删除"
        }
      ],
      list:[],
      page:{
        total:0,
        size:20,
        current:1
      },
      query:{},//查询条件
      audit:{
        id:"",
        title:"",
        visible:false,
        isAudit:true
      }
    };
  },
  mounted(){
    this.fetchData()

  },
  methods:{
    async fetchData(){
      let data={
        ...this.page,
        ...this.query
      }
      const res=await getList(data)
      this.list=res.data.records
      this.page.total=res.data.total
      console.log(this.list)
    },
    //日期格式化
    getFormat(data){
      return format(data)
    },
    //查询
    onInquiry(){
      //将页码变成第一页
      this.page.current=1
      this.fetchData()
    },
    //重置
    onReset(){
      this.query={}
      this.fetchData()
    },
    //打开审核弹窗
     openAudit(id){
       this.audit.title="审核文章"
       this.audit.id=id
       this.audit.isAudit=true
       this.audit.visible=true
    },
    //关闭审核弹窗
    handleClose(){
      this.audit.visible=false
      this.fetchData()
    },
    handleSizeChange(res){
      this.page.size=res
      this.fetchData()
    },
    handleCurrentChange(res){
      this.page.current=res
      this.fetchData()
    },
   
    handleDelete(row){}
  }

};
</script>

<style>
</style>