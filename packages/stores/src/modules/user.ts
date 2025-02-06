/**
 * 用户信息
 */
import {defineStore} from "pinia";

interface UserState {
    avatar: string,
    name: string,
    account: string
}

export const useUserStore = defineStore("zbm-user", {
    state: (): UserState => ({
        avatar: 'https://taolive.top/api/assets/1/acg/konanchan/a9d44522760ab3db4132421357f2e532.jpg?size=500',
        name: 'Zbm',
        account: 'test@qq.com'
    })
})
