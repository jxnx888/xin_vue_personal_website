const { MongoClient } = require('mongodb')
const _ = require('lodash')

// MongoDB cloud URL
const url = 'mongodb+srv://xinning:BLACKrose521@cluster0.5bulp.mongodb.net?retryWrites=true&w=majority'
const dbName = 'xin_website'

// MongoDB local URL
/**
 * local command
 * 1. Start the mongoDB service:  net start mongodb(the name of your mongoDB)
 * 2. run and connect mongoDB:  mongodb(the name of your mongoDB)
 * 3. Stop the mongoDB service: net stop mongodb(the name of your mongoDB)
 * 4. Exit mongoDB: Ctrl + c
 *
 */

/**
 * @Title: Database command
 * @Content:
 1. Create or use database: use <database name> (If there is no dbName database, it will create the database for you automatically or just use it)
 2. List all the database: show dbs
 3. Show current database: db
 4. Delete the database: db.dropDatabase();
 **/


// const url = 'mongodb://127.0.0.1:27017'

const connectDB = async (collectionName, type, newListing, nameOfListing) => {
  const dbName = 'xin_website'
  // Init MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    // 链接mongoDB Client
    await client.connect()

    // Check database if exist dbNmae,
    // If you do not check the dbName and there is no dbName database, it will create the database for you automatically
    const ifExist = await listDatabases(client, dbName)

    if (!ifExist) {
      return
    }

    console.log('Connect database successfully!')



  } catch (err) {
    console.error('Connect database failed!\n Info: ' + err)
  } finally {
    await client.close()
  }
}


async function listDatabases(client, dbName) {
  const databasesList = await client.db().admin().listDatabases()
  // console.log("databasesList:")
  // console.log(databasesList)
  let ifDBExist = false
  // let database;
  databasesList.databases.forEach(db => {
    if (db.name === dbName) {
      // database = db
      ifDBExist = true
      return false
    }
  })
  if (ifDBExist) {
    // console.log('Databases: ')
    // console.log(JSON.stringify(database))
    return true
  } else {
    console.error('Databases is not exist, please double check the database name ')
    return false
  }
}


async function getBlogListFn(client, collectionName) {
  const res = await client.db(dbName).collection(collectionName)
  console.log(dbName + ' - ' + collectionName + ':')
  console.log(res)
  // console.log(res.s.db)
}
const getBlogList = async () => {
  // Init MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    // 链接mongoDB Client
    await client.connect()

    // Check database if exist dbNmae,
    // If you do not check the dbName and there is no dbName database, it will create the database for you automatically
    const ifExist = await listDatabases(client, dbName)

    if (!ifExist) {
      return
    }
    console.log('Connect database successfully!')
    const collectionName = 'blog'
    const blogList = await getBlogListFn(client, collectionName);
    return blogList
  } catch (err) {
    console.error('Connect database failed!\n Info: ' + err)
  } finally {
    await client.close()
  }
}
export default {getBlogList}
