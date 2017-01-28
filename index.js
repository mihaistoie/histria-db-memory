"use strict";
class MemoryStorage {
    constructor(options) {
        let that = this;
        that._options = options || {};
    }
    findOne(entityName, filter, options) {
        return Promise.resolve(null);
    }
    find(entityName, filter, options) {
        return Promise.resolve([]);
    }
    initNameSpace(nameSpace, model, data) {
        let that = this;
        let ns = that._nameSpaces[nameSpace] = that._nameSpaces[nameSpace] || {};
        Object.keys(model).forEach((name) => {
            let entity = model[name];
            if (that._options.storeChildrenInParent && entity.meta.parent) {
                return;
            }
            else {
                ns[name] = ns[name] || { data: [] };
                ns[name].data = data;
            }
        });
        return Promise.resolve();
    }
}
