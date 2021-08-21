/**
 * by zhuyifang@qq.com
 * created 2021-8021
 */
const Path = require("path");
const fs = require('fs')

class JsonDb {
  #db
  #table;

  constructor (path, name) {
    if (!name && !path) {
      throw new Error('数据库初始化失败,参数不完整')
    }
    this.#db = Path.join(path.toString(), name.toString())
    this.initDb()
  }

  initDb () {
    this.#mkdirSync(this.#db)
    return this
  }

  table (name) {
    this.#table = Path.join(this.#db, name)
    this.#mkdirSync(this.#table)
    return this
  }

  add (key, data) {
    try {
      if(!this.#table){
        throw new Error('缺少参数 #table')
      }

      let file = Path.join(this.#table, key)
      if (fs.existsSync(file)) {
        console.warn('重复的key')
        return false
      }
      fs.writeFileSync(file, this.#json2str({key, data}))
      return this
    }catch (e) {
      console.error(e)
      return this
    }

  }

  find (keys) {
    try {
      if (!this.#table) {
        throw new Error('缺少参数 #table')
      }
      let files = fs.readdirSync(this.#table)
      let list = []
      files.forEach((file) => {
        if(keys && !keys.includes(file)){
          return
        }
        const filePath = Path.join(this.#table, file)
        const stats = fs.statSync(filePath)
        if (stats.isFile()) {
          list.push(this.get(file))
        }
      })
      return list
    } catch (e) {
      console.warn(e)
      return []
    }
  }

  del (key) {
    try {
      if (!this.#table) {
        throw new Error('缺少参数 #table')
      }
      fs.unlinkSync(Path.join(this.#table, key))
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  get (key) {
    try {
      return this.#str2json(this.#readFileSync(Path.join(this.#table, key)))
    } catch (e) {
      console.error(e)
      return null
    }
  }


  #str2json (str) {
    try {
      return JSON.parse(str)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  #json2str (str) {
    try {
      return JSON.stringify(str)
    } catch (e) {
      console.error(e)
      return ''
    }
  }


  #readFileSync (path) {
    try {
      return fs.readFileSync(path, 'utf-8')
    } catch (e) {
      console.error(e)
      return ''
    }
  }

  /**
   * 递归创建文件夹
   * @param path
   * @returns {boolean}
   */
  #mkdirSync (path) {
    try {
      if (fs.existsSync(path)) {
        return true;
      } else {
        if (this.#mkdirSync(Path.dirname(path))) {
          fs.mkdirSync(path);
          return true;
        }
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }
}

export default JsonDb
