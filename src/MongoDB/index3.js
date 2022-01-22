const { MongoClient } = require('mongodb')

// MongoDB cloud URI
const url = 'mongodb+srv://xinning:BLACKrose521@cluster0.5bulp.mongodb.net/xin_website?retryWrites=true&w=majority'

const connectDB = async (dbName, collectionName,) => {
    console.log(1);
    // Init MongoClient
  await MongoClient.connect(url, (err, client) => {
      if (err) {
        console.log('Connect Failed: ' + err)
      } else {
        console.log('Connect MongoClient successfully!')
        // console.log('MongoClient: ')
        // console.log(client)

        // Connect database
        const database = client.db(dbName);

        // Connect collection
        const collection = database.collection(collectionName)
        console.log('contactForm: ')
        console.log(collection)

        // Connect doc
        // List database list
        // listDatabases(client);
        console.log(2);
        // Close Client after you get db
        client.close()
      }
    })
    console.log(3);
  }

connectDB("xin_website","project_list");


export default { connectDB };
// const listDatabases = (client) => {
//   const databasesList = client().admin().listDatabases()
//   console.log('Databases List: ')
//   databasesList.databases.forEach(db => {
//     if (db.name === 'huiData') {
//       console.log('huiData: ' + JSON.stringify(db))
//     }
//   })
// }
/*

const creatListing = (client, dbName, collectionName, newListing) => {
//client.db("数据库名"); // 链接对应数据库
  //client.db("数据库名").collection("集合名"); // 链接对应集合
  const res =  client.db('huiData').collection('huiData').insertOne(newListing)
  console.log(`New listing created with the following id: ${res.insertedId}`)
}

const upsertListingByName = (client, dbName, key, nameOfListing, updatedListing) => {
  const result =  client.db(dbName).collection(key).updateOne({name:nameOfListing},{$set: updatedListing}, {upsert: true})
  console.log(`${result.matchedCount} document(s) matched the query criteria`)
  if(result.upsertedCount > 0){
    console.log(`One document was inserted with the id ${result.upsertedId}`)
  }
}

const updateListingByName = (client, dbName, key, nameOfListing, updatedListing) => {
  const result =  client.db(dbName).collection(key).updateOne({name:nameOfListing},{$set: updatedListing})
  console.log(`${result.matchedCount} document(s) matched the query criteria`)
}

const saveWebsiteContactForm = (client, newListing)=> {
//client.db("数据库名"); // 链接对应数据库
  //client.db("数据库名").collection("集合名"); // 链接对应集合
  const res =  client.db('huiData').collection('huiData').insertOne(newListing)
  console.log(`New listing created with the following id: ${res.insertedId}`)
}

*/
