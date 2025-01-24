/**
 * 将十六进制颜色转为rgba格式
 * @param color 十六进制颜色
 * @param opacity 透明度
 */
export function getRgbColor(color: string, opacity: number) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            let colorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        let colorChange = [];
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgba(" + colorChange.join(",") + "," + opacity + ")";
    } else {
        return color;
    }
}

/**
 * 获取rgba或者rgb颜色字符串中的红、绿、懒
 * @param colorString
 */
export function getRGBValuesAsString(colorString: string): string {
    // 正则匹配 rgba 或 rgb 格式
    const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/;
    const match = colorString.match(regex);

    if (match) {
        // 提取红、绿、蓝三个值
        const red = match[1];
        const green = match[2];
        const blue = match[3];

        // 返回拼接后的字符串
        return `${red}, ${green}, ${blue}`;
    }
    return ''
}

/**
 * 设置全局主题色
 * @param color
 */
export function setThemeColor(color: string) {
    //设置主题颜色
    let root = document.documentElement
    let rgbColor = getRgbColor(color, 1)
    root.style.setProperty(`--primary`, getRGBValuesAsString(rgbColor))
}
