function get(path, obj) {
    // 判断参数符合类型
    if(typeof path !== 'string' && !Array.isArray(path) || typeof obj !== 'object') {
        return;
    }

    // 判断参数path不为[]、''，object不为null、{}
    if(!path.length || obj === null || Object.keys(obj).length === 0 ) {
        return;
    }

    while(path.length && obj) {
            // path支持数组和字符串，如果是字符串类型将字符串转为数组
            if (!Array.isArray(path)) {
                path = path.split('.');
            }

            // 取数组头元素可能是 'str[1]'或者'str'
            const headElement = path[0];
            const pathValue = headElement.split('[')[0];
            // 头元素包含[number]时,index为number，否则为NaN
            let index = parseInt(headElement.split('[')[1]);

            // 对象中元素值为数组
            if (Array.isArray(obj[pathValue])) {
                if(isNaN(index)) {
                    if (isNaN(path[1])) {
                        // ['a', 'b', 'c']
                        return;
                    }
                    // ['a', 0, 'b', 'c']
                    index = path[1];
                    path = path.slice(2);
                }else {
                    //[a[0], b, c]
                    path = path.slice(1);
                }
                obj = obj[pathValue][index];
            } else {
                obj = obj[pathValue];
                path = path.slice(1);
            }
        }

    return obj;
}

module.exports = get;
