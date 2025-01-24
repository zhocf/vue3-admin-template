/**
 * 更新 CSS 变量的函数
 * @param variables 要更新的 CSS 变量与其新值的映射
 * @param id  样式标签的id
 */
export function updateCSSVariables(
    variables: { [key: string]: string },
    id = '__zbm-styles__',
) {
    //获取或者创建内联样式表元素
    const styleElement = document.getElementById(id) || document.createElement("style")
    styleElement.id = id;

    //构建更新的CSS样式
    let cssText = ":root{"
    for (const key in variables) {
        if (Object.prototype.hasOwnProperty.call(variables, key)) {
            cssText += `${key}: ${variables[key]};`;
        }
    }
    cssText += '}';
    // 将样式文本赋值给内联样式表
    styleElement.textContent = cssText;
    // 将内联样式表添加到文档头部
    if (!document.querySelector(`#${id}`)) {
        document.head.append(styleElement);
    }
}
