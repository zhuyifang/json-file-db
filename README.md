# Json database based on file system
Support electronjs,nodejs,nwjs
## Features:

1. Small: 140 lines of file, 2.63kb
2. Simple: only rely on FS
3. Easy to manage, based on the file system, the data is very intuitive.

db: folder

table: folder

row:json format file

# 基于文件系统的json 数据库

## 特点：

1. 小：文件140行，2.63kb
2. 简单：仅依赖FS
3. 便于管理，基于文件系统，数据非常直观。

db:文件夹

table:文件夹

row:json格式文件

## Use:

```
const db = new JsonDb('/Users/xxx/Downloads/112233',23)
db.table('table1').add('a2',{a:2})
db.table('table1').list()
```
![image](https://user-images.githubusercontent.com/16346219/130312058-a9d5dcb8-c13f-4557-8e1b-bdb6ec06990e.png)



