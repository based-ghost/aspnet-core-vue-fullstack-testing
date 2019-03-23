export const isArrayWithItems = (arr: any[] | any): boolean => {
    return  Array.isArray(arr) && arr.length > 0;
};

export const getObjectValues = (obj: any, path: string): any[] => {
    let vals = [];

    if ((path || '').trim() === '' || !obj) {
        return vals;
    }

    const paths = path.split('.');
    const shallowKeys = Object.keys(obj) || [];

    shallowKeys.forEach(key => {
        let subObj = obj[key];

        for (let i=0; i < paths.length; i++){
            if (subObj !== null && typeof subObj[paths[i]] !== 'undefined' && subObj[paths[i]] !== null) {
                subObj = subObj[paths[i]];
            }
        }

        if (subObj) {
            vals.push(subObj);
        }
    });

    return vals;
};