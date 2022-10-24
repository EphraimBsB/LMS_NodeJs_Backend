const removeEmptyObject = (obj) => {
     Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value === undefined || value === null || value === "") {
            delete obj[key];
        }
    });

    return obj;
}
export default  removeEmptyObject;