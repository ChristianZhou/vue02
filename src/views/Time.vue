<template>
  <div class="wrapper">
    <el-button icon="el-icon-plus" type="primary" size="small" style="margin-left: 5px;margin-top: 20px"
               @click="addTask">添加
    </el-button>
    <el-button @click="batchDelete" type="danger" size="small" style="margin-top: 8px"
               :disabled="tableData.length === 0">清空
    </el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 20px">

      <el-table-column
        fixed
        prop="task"
        label="事项">
        <template scope="scope">
          <el-input size="small" v-model="scope.row.task" placeholder="请输入内容"></el-input>
<!--          <span>{{scope.row.task}}</span>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="str"
        label="耗时">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button id="stop" name="button" @click="stop(scope.row)"  type="danger">暂停</el-button>
          <el-button id="start" name="button" @click="start(scope.row)" type="success">开始</el-button>
          <el-button id="reset" name="button" @click="reset(scope.row)" style="display: none">重置</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>
<script>



export default {

  data(){
    return {
      tableData: []
      // tableData: [{
      //   task:'case处理',
      //   h:0,
      //   m:0,
      //   ms:0,
      //   s:0,
      //   time:0,
      //   str:'',
      //   mytime:''
      // }]
    }
  },
  methods:{
    timer(row){   //定义计时函数
      row.ms=row.ms+50;         //毫秒
      if(row.ms>=1000){
        row.ms=0;
        row.s=row.s+1;         //秒
      }
      if(row.s>=60){
        row.s=0;
        row.m=row.m+1;        //分钟
      }
      if(row.m>=60){
        row.m=0;
        row.h=row.h+1;        //小时
      }
      row.str =this.toDub(row.h)+":"+this.toDub(row.m)+":"+this.toDub(row.s)+""/*+row.toDubms(row.ms)+"毫秒"*/;
      // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
    },

    reset(row){  //重置
      clearInterval(row.time);
      row.h=0;
      row.m=0;
      row.ms=0;
      row.s=0;
      row.str="00:00:00";
    },
    start(row){  //开始
      // row.time=setInterval(this.timer(row),50);
      row.time=setInterval(() => this.timer(row),50);
    },

    stop(row){  //暂停
      clearInterval(row.time);
    },

    addTask(){  //暂停
      this.tableData.push({
        task:'case处理',
        h:0,
        m:0,
        ms:0,
        s:0,
        time:0,
        str:'',
        mytime:''
      })
    },

    batchDelete(){
      this.tableData = [];
    },

    toDub(n){  //补0操作
      if(n<10){
        return "0"+n;
      }
      else {
        return ""+n;
      }
    },

    toDubms(n){  //给毫秒补0操作
      if(n<10){
        return "00"+n;
      }
      else {
        return "0"+n;
      }

    }

  },
  //实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el 还不可用。需要初始化处理一些数据时会比较有用
  created:function () {
    var tasks = localStorage.getItem('tasks');
    if (tasks === "") {
      localStorage.setItem('tasks', JSON.stringify([{task:'case处理',
        h:0,
        m:0,
        ms:0,
        s:0,
        time:0,
        str:'',
        mytime:''}]));
    }
    this.tableData = JSON.parse(localStorage.getItem("tasks"));
  },

  mounted() {
    window.addEventListener('beforeunload', e => {
      localStorage.setItem('tasks', JSON.stringify(this.tableData));

    })
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => {
      localStorage.setItem('tasks', JSON.stringify(this.tableData));
    })
  },



}
</script>
<style scoped>

</style>
