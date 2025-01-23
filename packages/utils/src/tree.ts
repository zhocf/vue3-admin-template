interface TreeConfigOptions {
    //子属性名称，默认children
    childProps: string;
}

/**
 * 遍历树形结构，返回所有节点中指定的值
 * @param tree 树结构的数组
 * @param getValue 获取节点值的函数
 * @param options 子节点数据的可选属性名称
 */
export function traverseTreeValues<T, V>(
    tree: T[],
    getValue: (node: T) => V,
    options?: TreeConfigOptions,
): V[] {
    const result: V[] = []
    const {childProps} = options || {
        childProps: 'children',
    };
    const dfs = (treeNode: T) => {
        const value = getValue(treeNode)
        result.push(value)
        const children = (treeNode as Record<string, any>)?.[childProps]
        if (Array.isArray(children)) {
            for (const child of children) {
                dfs(child)
            }
        }
    }

    for (const treeNode of tree) {
        dfs(treeNode)
    }
    return result.filter(Boolean)
}

/**
 * 遍历树形结构，返回符合节点条件的值
 * @param tree 树形数组
 * @param validation 效验方法，true返回
 * @param options 子节点数据的可选属性名称
 */
export function treeFilter<T extends Object>(
    tree: T[],
    validation: (node: T) => boolean,
    options?: TreeConfigOptions,
): T[] {
    let {childProps} = options || {
        childProps: 'children'
    }
    const dfs = (list: T[]): T[] => {
        return list.filter(item => {
            let value = validation(item)
            if (value) {
                let childArray = (item as Record<string, any>)[childProps];
                if (item.hasOwnProperty(childProps) && Array.isArray(childArray)) {
                    childArray = dfs(childArray);
                }
                return item
            }
        })
    }
    return dfs(tree)
}
