const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient,
  ObjectId = MongoDB.ObjectID


var Config = require('./config.js');

class Db {

  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = "";
    // this.connect(); //
  }

  connect() { //连接数据库
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(Config.dbUrl, Config.dbParser, (err, client) => {
          if (err) {
            reject(err)
          } else {
            this.dbClient = client.db(Config.dbName)
            resolve(this.dbClient)
          }
        })
      } else {
        resolve(this.dbClient)
      }
    })

  }

  insert(collectName, json) { //数据插入
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).insertOne(json, (err, res) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(res)
          }
        })
      })
    })
  }

  find(collectName, json, n) { //数据查询
    return new Promise((resolve, reject) => {
      this.connect().then(db => {

        if (n) {
          let result = db.collection(collectName).find(json).limit(n);
          result.toArray((err, doc) => {
            if (err) {
              reject(err);
              return;
            } else {
              resolve(doc);
            }

          })

        } else {
          let result = db.collection(collectName).find(json);
          result.toArray((err, doc) => {
            if (err) {
              reject(err);
              return;
            } else {
              resolve(doc);
            }

          })
        }

      })
    })
  }
  // array search
  findArray(collectName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        let result = db.collection(collectName).find(json1, json2);
        result.toArray((err, doc) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(doc);
          }

        })
      })
    })
  }

  update(collectName, json, json2) { //数据更新
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).updateOne(json, {
          $set: json2
        }, (err, result) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(result);
          }
        })
      })
    })

  }

  //int数据更新 $inc
  updateInt(collectName, json, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).updateOne(json, {
          $inc: json2
        }, (err, result) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(result);
          }
        })
      })
    })

  }

  //数组跟新 增加某项  $addToSet
  updateArray(collectName, json, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).updateOne(json, { $addToSet: json2 }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }


        })
      })
    })
  }

  //数组跟新 删除某项 $pull
  deleteArray(collectName, json, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).updateOne(json, { $pull: json2 }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
    })
  }


  remove(collectName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).removeOne(json, (err, result) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(result);
          }
        })
      })
    })
  }

  delete(collectName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).remove(json, (err, result) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(result);
          }
        })
      })
    })
  }

  setObjectId(id) { //mongodb 里面查询_id把字符串转换成对象
    return new ObjectId(id)
  }


}


module.exports = Db.getInstance();

// let mydb = Db.getInstance()

// console.time("start")
// mydb.find('cats', {}).then(e => {
//     // console.log(e)
//     console.timeEnd("start")
// })

// setTimeout(() => {
//     console.time("start1")
//     mydb.find('cats', {}).then(e => {
//         // console.log(e)
//         console.timeEnd("start1")
//     })
// }, 2000)

// let mydb2 = Db.getInstance()

// setTimeout(() => {
//     console.time("start3")
//     mydb2.find('cats', {}).then(e => {
//         // console.log(e)
//         console.timeEnd("start3")
//     })
// }, 3000)


// setTimeout(() => {
//     console.time("start4")
//     mydb2.find('cats', {}).then(e => {
//         // console.log(e)
//         console.timeEnd("start4")
//     })
// }, 4000)
