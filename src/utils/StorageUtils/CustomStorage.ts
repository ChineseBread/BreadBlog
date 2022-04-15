// import {account, customStorageUtils} from "./index";
import {doRequest} from "../request";

declare type account = {
    User:string,
    Token:string,
    UserID:string,
    user:string,
    pwd:string
}
declare type UserInfo = {
    name:string,
    userid:string
}
class CustomStorage {

    // 心跳token
    static heartbeat:any;

    // static getUserInfoByID(userid:string):Promise<UserInfo | undefined>{
    //     return new Promise(async (resolve,reject) => {
    //         resolve(this.UserInfoArr.find(ele => ele.userid === userid))
    //     })
    // }

    // static async addUserInfo(User:UserInfo):Promise<void>{
    //     let user = await this.getUserInfoByID(User.userid);
    //     if (user) return;
    //     else this.UserInfoArr.push(User)
    // }

    static getAvatarUrl():string{
        return 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:200:200:200:200.awebp?'
    }

    static getAccount(): account {
        let account:any = sessionStorage.getItem('account');
        if (account)  return JSON.parse(account);
        return {User:'',Token:'',UserID:'',pwd:'',user:''}
    }


    static modifyAccount(changeContent:any,type:string):void{
        let account:any = sessionStorage.getItem("account")
        switch (type){
            case "password":
                account.pwd = changeContent.newpwd
                break;
            case "username":
                account.User = changeContent.name
                account.user = changeContent.name
                break;
            default:
                //do nothing
        }
        sessionStorage.setItem("account",JSON.stringify(account))
    }

    static saveAccount(Account:account): void {
        sessionStorage.setItem('account',JSON.stringify(Account))
    }

    static removeAccount():void{
        sessionStorage.removeItem("account")
        // if (this.heartbeat) clearInterval(this.heartbeat)
    }

    static checkAccount():Promise<{Ok:boolean,Msg:string | undefined}>{
        return new Promise(async resolve => {
            let account = this.getAccount()
            if (account?.Token){
                let result = await doRequest({url:'check/token',data:{token:account.Token},method:'GET'})
                if (!result?.Ok){
                    resolve({Ok:false,Msg:'您的登录会话已经过期'})
                }
            }else{
                resolve({Ok:false,Msg:'请先登录!'})
            }
            resolve({Ok:true,Msg:''})
        })
    }
    static doHearBeat():void{
        this.heartbeat = setInterval(async () => {
            let result = await this.checkAccount()
            if (!result?.Ok) clearInterval(this.heartbeat)
        },60000)
    }
    static stopHearBeat():void{
        if (this.heartbeat) clearInterval(this.heartbeat)
    }

}
export default CustomStorage;