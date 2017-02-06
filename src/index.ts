import { IStore, schemaManager, findInArray } from 'histria-utils'



var _databases: any = {

}

class MemoryStorage implements IStore {
    private _options: any;
    private _data: any;
    constructor(options: any) {
        let that = this;
        that._options = options || {};
    }
    public findOne(entityName: string, filter: any, options?: { compositions: boolean}): Promise<any> {
        let that = this;
        let res = null;
        if (that._data[entityName]) {
            const list = findInArray(filter, that._data[entityName], { findFirst: true });
            if (list && list.length)
                res = list[0];
        }
        return Promise.resolve(res);
    }
    
    public find(entityName: string, filter: any, options?: { compositions: boolean}): Promise<any[]> {
        let that = this;
        let res = [];
        if (that._data[entityName])
            res = findInArray(filter, that._data[entityName], { findFirst: true }) || [];
        return Promise.resolve(res);
    }
    public initNameSpace(nameSpace: string, data: any): Promise<void> {
        let that = this;
        let sm = schemaManager();
        let d = that._data = that._data
        sm.enumSchemas(nameSpace, entity => {
            if (that._options.storeChildrenInParent && entity.meta.parent) {
            } else
                d[entity.name] = data;
        });
        return Promise.resolve();
    }
}

export function store(namespace: string, options: any): IStore {
    if (!_databases[namespace]) {
        _databases[namespace] = new MemoryStorage(options);
    }
    return <IStore>_databases[namespace];
}

