import {doRequest} from "../request";
import CustomStorage from "../../StorageUtils/CustomStorage";
import debounce from "../../debounce";
import errMsg from "../errMsg";
class UserOperationRequest{
    /**
     * @description 心跳token
     * @deprecated 不能做全局token使用
     */
    static beforeDoUserOperations():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await CustomStorage.checkAccount();
                if (result?.Ok){
                    resolve({Ok:true})
                    CustomStorage.doHearBeat();
                }else{
                    resolve({Ok:false,Msg:result?.Msg})
                }
            }catch (e){
                resolve({Ok:false,Msg:'网络异常'})
            }
        })
    }
    private static _doUserOperation(user:string, pwd:string, url:string):Promise<object>{
        return new Promise(async (resolve) => {
            try {
                if (!user || !pwd) {
                    resolve({Ok:false})
                }else{
                    let result:any = await doRequest({url,data:{user,pwd},method:'GET'})
                    if (result?.User) {
                        CustomStorage.saveAccount({...result,pwd})
                        resolve({Ok:true})
                    } else {
                        resolve({Ok:false,Msg:result?.Msg || errMsg})
                    }
                }

            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    private static doUserOperation = debounce(this._doUserOperation,2000,true)

    private static _doModifyOperation(token:string,changeContent:any,url:string,type:string):Promise<object>{
        return new Promise(async resolve => {
            try {
                let result:any = await doRequest({url,data:{token,...changeContent},method:'GET'})
                if (result?.Ok){
                    CustomStorage.modifyAccount(changeContent,type)
                    resolve({OK:true})
                }else {
                    resolve({OK:false})
                }
            }catch (e){
                resolve({OK:false})
            }
        })
    }
    private static doModifyOperation = debounce(this._doModifyOperation,2000,true)


    static doLogin(user: string, pwd: string): Promise<object> {
       return this.doUserOperation(user,pwd,'auth/login')
    }

    static doRegister(user: string, pwd: string): Promise<object> {
        return this.doUserOperation(user,pwd,"auth/register")
    }
    static doModifyUsePassWord(newpwd: string, oldpwd:string): Promise<object> {
        return this.doModifyOperation(CustomStorage.getAccount().Token,{newpwd,oldpwd},"user/changepwd","password")
    }

    static doModifyUserName(name: string): Promise<object> {
        return this.doModifyOperation(CustomStorage.getAccount().Token,{name},'user/changename','username')
    }

    /**
     * @description 删除用户主页已经创建的分类
     * @param sortname
     * @param force 分类所包含的文章将会全部删除
     */
    static deleteUserCateGory(sortname:string,force:boolean):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'sort/remove',data:{token:CustomStorage.getAccount().Token,sortname,force},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 创建收藏夹
     * @param favname
     */
    static createFav(favname:string):Promise<Result<{FavInfo:UserFavorite}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fav/create',data:{token:CustomStorage.getAccount().Token,favname},method:'GET'})
                if (result?.Ok){
                    resolve({Ok:true,FavInfo:{favid:result?.FavId,info:result?.Info}})
                }else{
                    resolve({Ok:false,Msg:result?.Msg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 删除收藏夹
     * @param favname
     */
    static deleteFav(favname:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fav/remove',data:{favname,token:CustomStorage.getAccount().Token},method:"GET"})
                resolve({Ok:result?.Ok,Msg:result?.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 用户删除已有文章
     * @param articleid
     */
    static deleteArticle(articleid:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'article/del',data:{token:CustomStorage.getAccount().Token,articleid},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    /**
     * @description 用户草稿箱界面删除操作
     */
    static deleteDraft(draftid:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'draft/del',data:{token:CustomStorage.getAccount().Token,draftid},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static removeTrash(trashid:string,type:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:`trash/${type === 'redo' ? 'restore' : 'remove'}`,data:{trashid,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static checkNotice():Promise<Result<any>>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'notice/checknew',data:{token,from:Date.now()},method:'GET'})
                if (result?.Ok){
                    resolve({Ok:true,count:result?.Count || 0})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 用户关注的操作
     */
    private static followUserOperation(url:string,userid:string):Promise<object>{
        let {Token:token,UserID} = CustomStorage.getAccount()
        if (!token) return Promise.resolve({Ok:false,Msg:'尚未登录'})
        if (userid === UserID) return Promise.resolve({Ok:false,Msg:'不能关注自己'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data:{userid,token},method:'GET'})
                let Msg = result?.Msg || errMsg
                if (Msg === '取消关注成功' || Msg === '关注用户成功') resolve({Ok:true,Msg})
                else resolve({Ok:false,Msg})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    /**
     * @description 检查是否关注了某个用户
     * @param userid
     */
    static checkFollow(userid:string):Promise<object>{
        let {Token:token,UserID} = CustomStorage.getAccount()
        if (!token) return Promise.resolve({Ok:false,Msg:'尚未关注'})
        if (userid === UserID) return Promise.resolve({Ok:false,Msg:'尚未关注'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'follow/check',data:{userid,token},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || '尚未关注'})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 关注用户
     */
    static followUser(userid:string):Promise<object>{
       return this.followUserOperation('follow/user',userid)
    }

    /**
     * @description 取消关注用户
     */
    static unFollowUser(userid:string):Promise<object>{
        return this.followUserOperation('unfollow/user',userid)
    }
}
export default UserOperationRequest;