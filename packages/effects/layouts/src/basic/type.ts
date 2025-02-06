/**
 * 菜单props
 */
export interface MenuProps {
    /*** 后台名称*/
    name: string;
    /*** logo图标*/
    logo: string;
}

/**
 * 头部props
 */
export interface UserDropDownType {
    title: string,
    icon?: string,
    handle: () => void
}

export interface HeaderProps {
    menu: UserDropDownType[]
}
