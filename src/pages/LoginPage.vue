<template>
    <div class="LoginPage">
        <h1>TYNAM 后台管理系统</h1>
        <div class="login box">
            <div class="login-form">
                <div class="txt">
                    <input placeholder="请输入您的邮箱" class="email" v-model="email"/>
                    <div class="msg" v-show="error.email">{{error.email}}</div>
                </div>
                <div class="txt">
                    <input type="password" placeholder="请输入密码" class="password" v-model="password"/>
                    <div class="msg" v-show="error.password">{{error.password}}</div>
                </div>
                <div class="login-btn">
                    <input type="button" v-on:click="login" value="登  录">
                </div>
                <div class="account">
                    <p>账号: admin@tynam.com; 密码: tynam123</p>
                </div>
            </div>
        </div>
        <div class="copyright">
            <p>Copyright © 2019 Tynam</p>
        </div>
    </div>
</template>

<script>
import util from '../Util';

export default {
    name: 'LoginPage',
    data: function(){
        return {
            error: {
                email: '',
                password: ''
            },
            email: '',
            password: ''
        };
    },
    methods: {
        login: function(){
            var isValidate = this.validate();
            if (isValidate){
                if (this.email === "admin@tynam.com" && this.password === "tynam123"){
                    this.email = "";
                    this.password = "";
                    util.setCookie('loginSatus', true, 1);
                    this.$router.push("home");
                } else {
                    alert("邮箱或密码错误！");
                }
            }
        },
        validate: function(){
            var emailIsRight = this.validateEmail();
            var passwordIsRight = this.validatePassword();
            if (emailIsRight && passwordIsRight){
                return true;
            }
            return false;
        },
        validateEmail: function(){
            var regex_mail = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;

            if (this.email === ""){
                this.error.email = "邮箱地址不可为空";
            } else if (this.email.indexOf(" ") != -1){
                this.error.email = "邮箱地址中不能有空格";
            } else if (this.email.length < 6 || this.email.length > 30){
                this.error.email = "邮箱地址长度在 6～30 位";
            } else if (!regex_mail.test(this.email)){
                this.error.email = "邮箱地址格式不正确";
            } else {
                this.error.email = "";
                return true;
            }
            return false;
        },
        validatePassword: function(){
            if (this.password === ""){
                this.error.password = "密码不可为空";
            } else if (this.password.length < 6 || this.password.length > 20){
                this.error.password = "密码长度在 6～20 位";
            } else {
                this.error.password = "";
                return true;
            }
            return false;
        }
    }
}
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 2.8em;
    font-weight: 300;
    text-transform: capitalize;
    color: #333;
    text-shadow: 1px 1px 1px #000;
    letter-spacing: 2px;
    margin: 1.2em 1vw;
    text-align: center;
}

.login-form {
    max-width: 500px;
    margin: 0 5vw;
    padding: 3.5vw;
    border-width: 5px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
}

.txt {
    flex-basis: 100%;
    margin-bottom: 1.5em;
}
.email, .password {
    width: 100%;
    color: rgb(0, 0, 0);
    outline: none;
    background: rgba(192, 192, 192, 0.726);
    font-size: 17px;
    letter-spacing: 0.5px;
    padding: 12px;
    box-sizing: border-box;
    border: none;
    -webkit-appearance: none;
    font-family: 'Catamaran', sans-serif;
}

 .login ::placeholder {  
    color:rgb(95, 95, 95);
 }

 .msg {
     color: red;
     text-align: left;
     margin: 5px 0;
     font-size: 14px;
 }

.login-btn input {
    color: rgb(255, 255, 255);
    background: rgba(46, 45, 45, 0.904);
    width: 100%;
    padding: 0.4em 0;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 2px;
    cursor: pointer;
    border: none;
    outline: none;
}

.login-btn input:hover {
    color: rgb(255, 255, 255);
    background: rgb(46, 46, 46);
}

.login-btn {
    margin-top: 1em;
    width: 100%;
}

.account {
    font-size: .8em;
    color: rgb(95, 95, 95);
}

.copyright {
    margin: 4em 0 2em;
    text-align: center;
}

.copyright p {
    color: #333;
    font-size: 1em;
    letter-spacing: 1.5px;
    line-height: 1.8;
    margin: 0 3vw;
}
</style>