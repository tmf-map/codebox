function get(path, obj) {
    while(path.length) {
        // path支持数组和字符串，如果是字符串类型将字符串转为数组
        if(!Array.isArray(path)) {
            path = path.split('.');
        }

        // 取数组头元素可能是 'str[1]'或者'str'
        const headElement = path[0];
        const pathValue = headElement.split('[')[0];
        // 头元素包含[number]时,index为number，否则为NaN
        let index = parseInt(headElement.split('[')[1]);

        //obj不是undefined时执行
        if(obj) {
            // 对象中元素值为数组
            if(Array.isArray(obj[pathValue])) {
                // [a[0], b, c]
                if(index >= 0) {
                    path = path.slice(1)
                }else{
                    // ['a', 0, 'b', 'c']
                    if(!isNaN(path[1])){
                        index = path[1];
                        path = path.slice(2);
                    }else{
                        // ['a', 'b', 'c']
                        return undefined
                    }
                }
                obj = obj[pathValue][index];
            } else {
                obj = obj[pathValue];
                path = path.slice(1);
            }
        }else {
            return obj
        }
    }
    return obj
}

module.exports = get;
