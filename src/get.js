function get(obj, path, def) {
    while(path.length) {
        // path支持数组和字符串，将字符传转为数组
        if(!Array.isArray(path)) {
            path = path.split('.');
        }
        // 判断路径的第一个元素种类： 'a[1]','a'
        const pathValue = path[0].slice(0,1);
        let index = pathValue.search(/[\d]/);
        // 对象中元素值为数组
        if(Array.isArray(obj[pathValue])) {
            // 'a[0].b.c'
            if(index !== -1) {
                path = path.slice(1)
            }else{
                // ['a', 0, 'b', 'c']
                if(!isNaN(path[1])){
                    index = path[1];
                    path = path.slice(2);
                }else{
                    // ['a', 'b', 'c']
                    index = 0;
                    path = path.slice(1)
                }
            }
            obj = obj[pathValue][index];
        } else {
            obj = obj[pathValue];
            path = path.slice(1);
        }
    }
    return obj === undefined ? def : obj;
}