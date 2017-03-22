"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const histria_utils_1 = require("histria-utils");
const _databases = {};
class MemoryStorage {
    constructor(options) {
        let that = this;
        that._options = options || {};
    }
    findOne(entityName, filter, options) {
        let that = this;
        let res = null;
        if (that._data[entityName])
            res = histria_utils_1.findInArray(filter, that._data[entityName], { findFirst: true });
        return Promise.resolve(res);
    }
    find(entityName, filter, options) {
        let that = this;
        let res = [];
        if (that._data[entityName])
            res = histria_utils_1.findInArray(filter, that._data[entityName], { findFirst: false }) || [];
        return Promise.resolve(res || []);
    }
    initNameSpace(nameSpace, data) {
        let that = this;
        let sm = histria_utils_1.schemaManager();
        let d = that._data = that._data || {};
        sm.enumSchemas(nameSpace, entity => {
            if (data[entity.name]) {
                if (that._options.compositionsInParent && entity.meta.parent) {
                }
                else
                    d[entity.name] = data[entity.name];
            }
        });
        return Promise.resolve();
    }
}
function store(namespace, options) {
    if (!_databases[namespace]) {
        _databases[namespace] = new MemoryStorage(options);
    }
    return _databases[namespace];
}
exports.store = store;
