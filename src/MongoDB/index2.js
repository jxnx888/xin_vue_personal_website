const { MongoClient } = require('mongodb')
const _ = require('lodash')

// MongoDB cloud URL
const url = 'mongodb+srv://xinning:BLACKrose521@cluster0.5bulp.mongodb.net?retryWrites=true&w=majority'

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

const connectDB = async (dbName, collectionName, type, newListing, nameOfListing) => {
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
    // Check which function type you want to use.
    if (!type) {
      console.error('Parameter \'Type\' missing! \nPlease check your parameter \'Type\'.')
      return
    }

    console.log('Connect database successfully!')
    if ((type === 2 || type === 3) && _.isEmpty(newListing)) {
      console.error('Parameter \'newlisting\' missing! \nPlease check your parameter \'newlisting\'.')
      return
    }
    /**
     *  @Param: type
     *  1: list
     *  2: create single list
     *  3: crete multiple list
     *  4: find one list
     **/

    switch (type) {
      case 1:
        await listCollection(client, dbName, collectionName)
        break
      case 2:
        await creatListing(client, dbName, collectionName, newListing)
        break
      case 3:
        await creatMultipleListing(client, dbName, collectionName, newListing)
        break
      case 4:
        await findOneListingByName(client, dbName, collectionName, nameOfListing)
        break
      default:
        await listCollection(client, dbName, collectionName)
    }

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
  let database
  databasesList.databases.forEach(db => {
    if (db.name === dbName) {
      database = db
      ifDBExist = true
      return false
    }
  })
  if (ifDBExist) {
    console.log('Databases: ')
    console.log(JSON.stringify(database))
    return true
  } else {
    console.error('Databases is not exist, please double check the database name ')
    return false
  }
}

async function listCollection(client, dbName, collectionName) {
  const res = await client.db(dbName).collection(collectionName)
  console.log(dbName + ' - ' + collectionName + ':')
  console.log(res)
  // console.log(res.s.db)
}

async function creatListing(client, dbName, collectionName, newListing) {
  console.log('Start insert one list...')
  const res = await client.db(dbName).collection(collectionName).insertOne(newListing)
  console.log(`New listing created with the following id: ${res.insertedId}`)
}

async function creatMultipleListing(client, dbName, collectionName, newListing) {
  console.log('Start insert multiple lists...')
  const res = await client.db(dbName).collection(collectionName).insertMany(newListing)
  console.log(`${res.insertedCount} new listings created withe the following id(s):`)
  console.log(res.insertedIds)
}

async function findOneListingByName(client, dbName, collectionName, nameOfListing) {
  console.log('Start finding lists by name...')
  // the key of 'name' is the key in your list.
  const res = await client.db(dbName).collection(collectionName).findOne({ name: nameOfListing })
  if (res) {
    console.log(`Found a listing in the collection with the name ${nameOfListing}`)
    console.log(res)
  } else {
    console.warn(`No listings found with the name ${nameOfListing}`)
  }
}



const list = {
  name: 'test',
  email: 'test@.qq.com',
  phone: '123',
  subject: 'test',
  message: 'test message'
}
const list1 =  [{
  name: '222',
  email: '222@.qq.com',
  phone: '222',
  subject: '222',
  message: '222'
}, {
  name: '333',
  email: '333@.qq.com',
  phone: '333',
  subject: '333',
  message: '333'
}]
// connectDB('xin_website', 'project_list', 3,list1)
// connectDB('xin_website', 'project_list', 1)
// connectDB('xin_website', 'project_list', 4, "","222")
