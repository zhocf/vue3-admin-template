import type {RouteRawType} from "@zbm/typings";
import {treeToArray} from "@zbm/utils";


interface PermissionOptions {
    pathKey: string,
}

/**
 *  根据数据配置可访问路由
 * @param routes 路由表
 * @param permissions  能访问的菜单
 * @param callBack  当找到匹配路由后的回调
 * @param options 配置
 */
export function permission<T extends RouteRawType>(
    routes: T[],
    permissions: any[],
    callBack?: (route: T) => void,
    options: PermissionOptions = {pathKey: 'path'}
): T[] {
    const menuList = treeToArray(permissions);

    // 递归查询路由表
    const processRoutes = (list: T[], parentUri: string): T[] => {
        return list.filter((item) => {
            const path = [parentUri, item.path].join("/").replaceAll("//", "/");
            const menuData = menuList.find((menu) => menu[options.pathKey] === path);

            // 如果符合条件，处理路由
            if (item.meta.ignore) {
                return item
            } else if (menuData) {
                item.meta.title = menuData.title || item.meta.title;
                item.meta.sort = menuData.sort || item.meta.sort;

                if (Array.isArray(item.children)) {
                    item.children = processRoutes(item.children as any, path); // 修正递归调用
                }

                if (callBack) {
                    callBack(item);
                }
                return item; // 确保该项保留在结果数组中
            }
            return false; // 不符合条件时过滤掉
        });
    };
    // console.log(processRoutes(routes, ""))
    return processRoutes(routes, "");
}
