import {doRequest} from "../request";

declare type account = {
    User:string,
    Token:string,
    UserID:string,
    // user:string,
    pwd:string,
    Level:number
}
declare type UserInfo = {
    name:string,
    userid:string
}
class CustomStorage {

    // 心跳token
    static heartbeat:any;

    static getAvatarUrl():string{
        let UserID = CustomStorage.getAccount().UserID
        return UserID ? `/data/logo/${CustomStorage.getAccount().UserID || 'null'}` : 'https://p9-passport.byteacctimg.com/img/mosaic-legacy/3791/5035712059~300x300.image'
    }
    static getBackGroundUrl():string{
        let UserID = CustomStorage.getAccount().UserID
        return `/data/background/${UserID || null}`
    }
    static getAccount(): account {
        let account:any = sessionStorage.getItem('account');
        if (account)  return JSON.parse(account);
        return {User:'',Token:'',UserID:'',pwd:'',Level:0}
    }


    static modifyAccount(changeContent:any,type:string):void{
        let account:any = sessionStorage.getItem("account")
        switch (type){
            case "password":
                account.pwd = changeContent.newpwd
                break;
            case "username":
                account.User = changeContent.name
                // account.user = changeContent.name
                break;
            default:
                //do nothing
        }
        sessionStorage.setItem("account",JSON.stringify(account))
    }

    static saveAccount(Account:account): void {
        sessionStorage.setItem('account',JSON.stringify(Account))
        this.doHearBeat();
    }

    static removeAccount():void{
        sessionStorage.removeItem("account")
        if (this.heartbeat) clearInterval(this.heartbeat)
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