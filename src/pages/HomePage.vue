<template>
    <div class="HomePage">
        <table cellspacing=0>
            <tr id="title">
                <td colspan="2">
                    <h1>TYNAM后台管理系统</h1>
                </td>
            </tr>

            <tr>
                <!-- menu start -->
                <td id="menu">
                    <div v-on:click="pageSelect('home')" v-bind:class="[this.currentPage === 'home' ? 'active' : '']">
                        <h4>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</h4>
                    </div>
                    <div v-on:click="pageSelect('about')" v-bind:class="[this.currentPage === 'about' ? 'active' : '']">
                        <h4>关&nbsp;于&nbsp;我&nbsp;们</h4>
                    </div>
                    <div v-on:click="logOut">
                        <h4>退&nbsp;出&nbsp;登&nbsp;录</h4>
                    </div>
                </td>
                <!-- menu end -->
                <!-- data start -->
                <td id="container" v-show="currentPage === 'home'">
                    <h1>主页</h1>
                    <div id="searchArea">
                        <input type="text" id="search-input" v-model="searchInput">
                        <input type="button" class="btn search" value="检索" v-on:click="search">
                    </div>
                    <div id="btnArea">
                        <button class="btn" id="del" v-on:click="handleDelete">删除</button>
                        <button class="btn" id="edt" v-on:click="handleEditor">编辑</button>
                        <button class="btn" id="add" v-on:click="handleAdd">添加</button>
                    </div>
                    <div id="dataArea">
                        <table cellspacing=0>
                            <tr class="header">
                                <td class="code">学 号</td>
                                <td class="name">姓 名</td>
                                <td class="sex">性 别</td>
                                <td class="grader">年 级</td>
                            </tr>
                            <tr v-for="(data, index) in dataList" :key="index" v-on:click="rowClick(index)" v-bind:class="[currentRow === index ? 'active' : '']">
                                <td class="code">{{data.code}}</td>
                                <td class="name">{{data.name}}</td>
                                <td class="sex">{{data.sex}}</td>
                                <td class="grader">{{data.grader}}</td>
                            </tr>
                        </table>

                        <div id="del-dialog" v-show="showDeleteDialog">
                            <div class="header">删除</div>
                            <div class="text">确定要删除"{{currentData ? currentData.name : ''}}"吗？</div>
                            <button id="confirm" v-on:click="handleDeleteDialogSave">确定</button>
                            <button id="cancel" v-on:click="handleDeleteDialogCancel">取消</button>
                        </div>
                        <div id="add-dialog" v-show="showAddDialog">
                            <div class="header">添加</div>
                            <div>学号<input type="text" class="code" maxlength="8" required v-model="studentInfo.code"></div>
                            <div>姓名<input type="text" class="name" max="8" required v-model="studentInfo.name"></div>
                            <div>性别<input type="text" class="sex" maxlength="1" v-model="studentInfo.sex"></div>
                            <div>年级<input type="text" class="grader" maxlength="10" v-model="studentInfo.grader"></div>
                            <button id="confirm" v-on:click="handleAddDialogSave">确定</button>
                            <button id="cancel" v-on:click="handleAddDialogCancel">取消</button>
                        </div>
                    </div>
                </td>
                <!-- data end -->
                <td id="about" v-show="currentPage === 'about'">
                    <h1>关于我们</h1>
                    <div class="container">
                        <P>TYNAM后台管理系统 用于学习。
                        </P>
                    </div>
                </td>
            </tr>

            <tr>
                <td colspan="2" id="coperight">
                    Copyright © 2019 Tynam</td>
            </tr>
        </table>
    </div>
</template>

<script>
import util from '../Util';

export default {
    name: 'HomePage',
    data: function(){
        return {
            studentSource: [
                {id: 1, code: '30001', name: '段瑞琦', sex: '男', grader: '三年级二班'},
                {id: 2, code: '40002', name: '韩子萱', sex: '女', grader: '四年级二班'},
                {id: 3, code: '20101', name: '严寒', sex: '男', grader: '二年级一班'},
                {id: 4, code: '60012', name: '钱小龙', sex: '男', grader: '六年级六班'}
            ],
            dataList: [],
            searchInput: '',
            currentRow: 0,
            currentPage: 'home',
            showAddDialog: false,
            showDeleteDialog: false,
            isEditor: false,
            studentInfo: {
                code: '',
                name: '',
                sex: '',
                grader: ''
            }
        }
    },
    computed: {
        currentData: function () {
            if (!this.dataList || this.dataList <= 0){
                return undefined;
            }
            var currentRow = this.currentRow;
            var currentData = this.dataList.find(function(item, index){
                return index === currentRow;
            });
            return currentData;
        },
        nextId: function(){
            if (this.studentSource && this.studentSource.length > 0){
                return this.studentSource[this.studentSource.length - 1].id + 1;
            }
            return 0;
        }
    },
    methods: {
        search: function(){
            this.refreshDataSource();
        },
        refreshDataSource: function(){
            var filter = this.searchInput.toUpperCase();
            var result = this.studentSource.filter(function(data){
                if (data.code.toUpperCase().indexOf(filter) > -1){
                    return true;
                } else if (data.name.toUpperCase().indexOf(filter) > -1){
                    return true;
                } else if (data.sex.toUpperCase().indexOf(filter) > -1){
                    return true;
                } else if (data.grader.toUpperCase().indexOf(filter) > -1){
                    return true;
                }
                return false;
            });
            this.dataList = result;
        },
        rowClick: function(index){
            this.currentRow = index;
        },
        handleDelete: function(){
            this.showDeleteDialog = true;
        },
        handleEditor: function(){
            var currentData = this.currentData;
            if (currentData){
                this.studentInfo.code = currentData.code;
                this.studentInfo.name = currentData.name;
                this.studentInfo.sex = currentData.sex;
                this.studentInfo.grader = currentData.grader;

                this.showAddDialog = true;
                this.isEditor = true;
            }
        },
        handleAdd: function(){
            this.showAddDialog = true;
            this.isEditor = false;
        },
        handleAddDialogSave: function(){
            var validateResult = this.validate();
            if (!validateResult){
                return false;
            }

            if (this.isEditor){
                var currentData = this.currentData;
                var oldItem = this.studentSource.find(function(item){
                    return item.id === currentData.id;
                });
                if (oldItem){
                    oldItem.code = this.studentInfo.code;
                    oldItem.name = this.studentInfo.name,
                    oldItem.sex = this.studentInfo.sex;
                    oldItem.grader = this.studentInfo.grader;
                }
            } else {
                var data = {
                    code: this.studentInfo.code,
                    name: this.studentInfo.name,
                    sex: this.studentInfo.sex,
                    grader: this.studentInfo.grader
                };
                data.id = this.nextId;
                this.studentSource.push(data);
            }
            this.handleAddDialogCancel();
            this.refreshDataSource();
        },
        handleAddDialogCancel: function(){
            this.studentInfo.code = '';
            this.studentInfo.name = '';
            this.studentInfo.sex = '';
            this.studentInfo.grader = '';
            this.showAddDialog = false;
        },
        handleDeleteDialogSave: function(){
            if (this.currentData){
                var dataId = this.currentData.id;
                var result = this.studentSource.filter(function(item){
                    return item.id !== dataId;
                });
                this.studentSource = result;
                this.showDeleteDialog = false;
                this.refreshDataSource();
            }
        },
        handleDeleteDialogCancel: function(){
            this.showDeleteDialog = false;
        },
        pageSelect: function(page){
            this.currentPage = page;
        },
        validate: function(){
            if (!this.studentInfo.name || !this.studentInfo.code){
                alert("姓名和学号不能为空");
                return false;
            }
            return true;
        },
        logOut: function(){
            util.clearCookie('loginSatus');
            this.$router.push("/");
        }
    },
    created(){
        this.refreshDataSource();
    }
}
</script>>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

table {
    width: 80%;
    min-width: 800px;
    max-width: 1200px;
    margin: 0 auto;
    border: 0;
    height: 98%;
    min-height: 800px;
    background-color:#eee;
}

/* title */
#title {
    background-color:#000;
    color: #eee;
    height: 70px;
}
#title h1 {
    margin-left: 40px; 
}

/* menu */
#menu {
    background-color: #3ca7ed;
    width: 20%;
    vertical-align: top;
    height: 70%;
    color: #eee;
}

#menu div.active {
    background-color: #eee;
    color: #333;
}

#menu div {
    margin-top: 5px;
    margin-left: 5px;
    padding: 20px;
    cursor: pointer;
}

/* container */
#container,
#about {
    vertical-align: top;
    padding: 20px;
}

/* about */
#container h1,
#about h1 {
    margin: 10px 10px;
    color: rgb(34, 33, 33);
}

/* 检索 */
#searchArea,
#about .container {
    margin-left: 10px;
    height: 50px;
    font-size: 16px;
    float: left;
}

#searchArea input {
    height: 25px;
    margin-left: 10px;
    padding: 0 4px;
}

/* btn */
#btnArea {
    height: 50px;
    margin: 50px 5px -10px 50px;  
}

#btnArea .btn,
#searchArea .btn {
    height: 30px;
}

#btnArea .btn,
#searchArea .btn {
    width: 80px;
    height: 30px;
    background: #3ca7ed;
    color: aliceblue;
    font-size: 16px;
    outline: none;
    border-style: none;
    float: right;
    margin: 0 10px;
}

#btnArea .btn:hover,
#searchArea .btn:hover,
#del-dialog button:hover,
#add-dialog button:hover {
    background: #0a84d4;
}

/* data */
#dataArea table {
    width: 98%;
    border-collapse: collapse;
    min-height: auto;
    overflow: scroll;
}

#dataArea table .code,
#dataArea table .name,
#dataArea table .sex,
#dataArea table .grader{
    width: 25%;
    height: 40px;
    line-height: 40px;
    text-align: center;
}

#dataArea table tr:nth-child(even) {
    background: aliceblue;
}

#dataArea table tr:nth-child(odd) {
    background: rgba(230, 239, 249);
}

#dataArea table tr.active {
    background: rgb(170, 207, 247);
}

#dataArea .header {
    background: #3ca7ed !important;
    color: aliceblue;
}

/* dialog */
#del-dialog,
#add-dialog {
    margin: 50px 15%;
    width: 400px;
    height: 150px;
    position: absolute;
    top: 150px;
    background: #fff;
    text-align: center;
    line-height: 65px;
    font-size: 18px;
}

#add-dialog {
    height: 270px;
}
#add-dialog div {
    height: 40px;
}

#add-dialog div input {
    width: 200px;
    padding: 3px 5px;
    margin: 5px 15px;
}

#del-dialog .header,
#add-dialog .header {
    background: #3ca7ed;
    color: aliceblue;
    height: 35px;
    text-align: left;
    padding-left: 10px;
    line-height: 35px;
}

#del-dialog button,
#add-dialog button {
    display: inline-block;
    width: 50px;
    height: 30px;
    background: #3ca7ed;
    outline: none;
    color: #f9f9f9;
    border-style: none;
    position: absolute;
    bottom: 15px;
    right: 25px;
}

#add-dialog #confirm,
#del-dialog #confirm {
    right: 85px;
}

/* coperight */
#coperight {
    background: #fff;
    color: #333;
    text-align: center;
    height: 5%;
}
</style>