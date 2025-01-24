/**
 * 深克隆将一个或多个源对象的可枚举属性复制到目标对象
 * @param target 目标对象
 * @param sources 一个或多个源对象
 */
function deepMerge(target: object, ...sources: any[]): any {
    if (target === null || typeof target !== 'object') {
        return target;
    }

    // 处理数组
    if (Array.isArray(target)) {
        const mergedArray = [...target];
        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            if (Array.isArray(source)) {
                source.forEach((item, index) => {
                    mergedArray[index] = deepMerge(mergedArray[index], item);
                });
            }
        }
        return mergedArray; // 转回 T 类型
    }

    // 处理对象
    const mergedObject: any = {...target};

    for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        if (source === null || typeof source !== 'object') continue;

        for (const key of Object.keys(source)) {
            const sourceValue = source[key];
            const targetValue = mergedObject[key];

            // 如果目标属性是对象，递归进行合并
            if (typeof sourceValue === 'object' && sourceValue !== null) {
                mergedObject[key] = deepMerge(targetValue || {}, sourceValue);
            } else {
                // 否则直接覆盖或添加属性
                mergedObject[key] = sourceValue;
            }
        }
    }

    return mergedObject;
}

export default deepMerge;
