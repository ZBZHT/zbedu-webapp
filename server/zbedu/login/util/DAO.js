// Data Access Object
const MongoClient = require('mongodb').MongoClient;

class DAO{
    constructor(url, collectionName){
        this.url = url;
        this.collectionName = collectionName;
    }

    /**
     * 连接数据库
     */
    _connectDB(){
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, db) => {
                if(err){
                    if(reject) return reject(err);
                    throw err;
                }
                resolve(db);
            });
        })
    }

    /**
     * 插入数据
     * @param {arr || obj} documents
     * @param {boolean} insertMany
     */
    insert(documents, insertMany){
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                if(insertMany){
                    console.log(documents);
                    db.collection(this.collectionName).insertMany(documents).then((res) => {
                        resolve(res);
                        db.close();
                    });
                    return;
                }
                db.collection(this.collectionName).insertOne(documents).then((res) => {
                    resolve(res);
                    console.log(documents);
                    db.close();
                });
            });
        });
    }

    /**
     * 查询文档
     * @param {obj} documents
     * @param {obj} pageConf
     */
    query(documents, pageConf){
        documents = documents || {};
        pageConf = pageConf || {amount: 0, page: 0};
        let resData = [];
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                let cursor = null;
                cursor = db.collection(this.collectionName).find(documents).limit(pageConf.amount).skip(pageConf.page * pageConf.amount);
                cursor.each((err, data) => {
                    if(err){
                        if(reject) return reject(err);
                        throw err;
                    }
                    if(data !== null){
                        resData.push(data);
                    }else{
                        resolve(resData);
                        db.close();
                    }
                })
            });
        });
    }

    /**
     * 删除
     * @param {obj} query
     * @param {boolean} deleteMany
     */
    del(query, deleteMany){
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                if(deleteMany){
                    db.collection(this.collectionName).deleteMany(query).then((res) => {
                        resolve(res);
                        db.close();
                    });
                    return;
                }
                db.collection(this.collectionName).deleteOne(query).then((res) => {
                    resolve(res);
                    db.close();
                });
            });
        });
    }

    /**
     * 更新
     * @param {obj} filter
     * @param {obj} updater
     * @param {boolean} replace
     */
    update(filter, updater){
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                let updaterCpy = {$set: updater};
                db.collection(this.collectionName).updateMany(filter, updaterCpy).then((res) => {
                    resolve(res);
                    db.close();
                });
            });
        });
    }
}

module.exports = DAO;