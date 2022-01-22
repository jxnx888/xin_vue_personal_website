const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://xinning:BLACKrose521@cluster0.5bulp.mongodb.net/huiData?retryWrites=true&w=majority";

  // Init MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
   /* await client.connect(err => {
      const collection = client.db("test").collection("devices");
    });*/
    // 链接mongoDB
    await client.connect();
    //client.db("数据库名"); // 链接对应数据库
    //client.db("数据库名").collection("集合名"); // 链接对应集合

    console.log("Connect database successfully!")

    // await listDatabases(client);
    await creatListing(client, {
      name: 'name',
      email: '123@.qq.com',
      phone: '123',
      subject:'test',
      message: 'test message'
    })
    // await updateListingByName(client, )
  } catch (e) {
    console.error("Connect database failed! Info: " + e)
  } finally {
    // perform actions on the collection object
    await client.close();
  }

}
async function listDatabases(client){
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases: ");
  databasesList.databases.forEach(db=>{
    if(db.name == 'huiData'){
      console.log(JSON.stringify(db));
    }
  })
}
async function creatListing(client, dbName, collectionName, newListing){
  //client.db("数据库名"); // 链接对应数据库
  //client.db("数据库名").collection("集合名"); // 链接对应集合
  const res = await client.db('huiData').collection('huiData').insertOne(newListing)
  console.log(`New listing created with the following id: ${res.insertedId}`)
}


async function upsertListingByName(client, dbName, key, nameOfListing, updatedListing){
  const result = await client.db(dbName).collection(key).updateOne({name:nameOfListing},{$set: updatedListing}, {upsert: true})
  console.log(`${result.matchedCount} document(s) matched the query criteria`)
  if(result.upsertedCount > 0){
    console.log(`One document was inserted with the id ${result.upsertedId}`)
  }
}
async function updateListingByName(client, dbName, key, nameOfListing, updatedListing){
  const result = await client.db(dbName).collection(key).updateOne({name:nameOfListing},{$set: updatedListing})
  console.log(`${result.matchedCount} document(s) matched the query criteria`)
}

const saveWebsiteContactForm = async (client, newListing ) => {
//client.db("数据库名"); // 链接对应数据库
  //client.db("数据库名").collection("集合名"); // 链接对应集合
  const res = await client.db('huiData').collection('huiData').insertOne(newListing)
  console.log(`New listing created with the following id: ${res.insertedId}`)
}
main().catch(console.error)

