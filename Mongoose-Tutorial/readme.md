# Review on CRUD and DB

Table of Contents
=================

* [Review on CRUD and DB](#review-on-crud-and-db)
* [Table of Contents](#table-of-contents)
* [CRUD](#crud)
* [Mongoose](#mongoose)
   * [Installation and Connecting to MongoDB database](#installation-and-connecting-to-mongodb-database)
   * [Schema](#schema)
   * [Creating a Model](#creating-a-model)
      * [Constructing Documents using Models](#constructing-documents-using-models)
      * [Querying](#querying)
      * [Updating](#updating)
      * [Deleting](#deleting)
   * [Query Building](#query-building)
* [Summary](#summary)

---
# CRUD
> The acronym CRUD refers to the major operations which are implemented by databases. Each letter in the acronym can be mapped to a standard Structured Query Language (SQL) statement.


|CRUD     |	SQL   |
|------   |---    |
|Create   |	INSERT|
|Read	|SELECT|
|Update|	UPDATE|
|Delete|	DELETE|

CRUD operations could be implemented on other layers on top of a db. For example, last week we applied these operations with files and JS document objects. 

---
# Mongoose
> Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. 

---
## Installation and Connecting to MongoDB database
Install Mongoose from the command line using npm:

```
$ npm install mongoose --save
```

```js

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
```

---
## Schema
Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

Let us try to write a simple *schema* to our Unicorn mongodb collection: 

```js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const unicornSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  weight: Number,
  loves:  [String]
});
```
This is a sample document from that collection:

```json
{
  "_id": "6324fbe4998cf52fe226fb97",
  "name": "Aurora",
  "dob": "1991-01-24T21:00:00.000Z",
  "loves": [
    "carrot",
    "grape"
  ],
  "weight": 450,
  "gender": "f",
  "vampires": 43
}
```
Notice that the schema is just an object that will shape we would interact with mongodb. It will also force the types like `String` or `Number` on data while inserting or updating unicorns. Wait, how would we use this *schema* to update a unicorn?

This is our next step.

[Read More - https://mongoosejs.com/docs/schematypes.html](https://mongoosejs.com/docs/schematypes.html)

---
## Creating a Model
> A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

```js
const unicornModel = mongoose.model('unicorns', unicornSchema); // unicorns is the name of the collection in db

const aUnicornModel = new unicornModel();
```

> Instances of Models are [documents](https://mongoosejs.com/docs/documents.html). Documents have many of their own [built-in instance methods](https://mongoosejs.com/docs/api/document.html).
An instance of a model is called a document.

<details>
<summary>
`unicorns` or may be `unicorn`?
</summary>
> The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model `aUnicornModel` is for the unicorns collection in the database.

I think you might run intro troubles if you don't have your collection named in plural in mongodb.
</details>

---
### Constructing Documents using Models

```js
const unicornModel = mongoose.model('unicorns', unicornSchema);

const aUnicornModel = new unicornModel({ name: 'test' });
aUnicornModel.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

// or

unicornModel.create({ name: 'test2' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
unicornModel.insertMany([{ name: 'test3' },{ name: 'test4' }], function(err) {

});
```
<details>
<summary>
default vs custom connection 
</summary>

> Note that no unicorns will be created/removed until the connection your model uses is open. Every model has an associated connection. When you use mongoose.model(), your model will use the default mongoose connection:

```js
mongoose.connect('mongodb://localhost:27017/test');
```
If you create a custom connection, use that connection's model() function instead:

```js
const connection = mongoose.createConnection('mongodb://localhost:27017/test');
const unicornModel = connection.model('unicorns', unicornSchema);
```
This is useful if you have multiple db connections.
</details>

Viola! we have just inserted our first unicorn document to our local db from our server!
![](https://cdn.discordapp.com/attachments/1017862173881544775/1024016670215376916/unknown.png)



---
### Querying
>Finding documents is easy with Mongoose, which supports the [rich](http://www.mongodb.org/display/DOCS/Advanced+Queries) query syntax of MongoDB. Documents can be retrieved using a model's find, findById, or findOne.

```js
unicornModel.find({ name: 'Aurora' })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
```
See the chapter on [queries](https://mongoosejs.com/docs/queries.html) for more details on how to use the [Query](https://mongoosejs.com/docs/api/query.html) api.


---
### Updating
> Each model has its own update method for modifying documents in the database without returning them to your application. See the API docs for more detail.

```js
unicornModel.updateOne({ name: 'Aurora' }, { weight: '444' }, function(err, res) {
  // Updated at most one doc, `res.nModified` contains the number
  // of docs that MongoDB updated
  
});
```
> If you want to update a single document in the db and return it to your application, use findOneAndUpdate instead.

<details>
<summary>
no `$set` operator?
</summary>
Is there a difference, when updating a value in mongodb/mongoose between using $set?

```js
unicornModel.findOneAndUpdate({_id:"xxx"},{$set: {name:"blahblah"} })
```
and just setting it like this:

```js
unicornModel.findOneAndUpdate({_id:"xxx"},{name:"blahblah"})
// or

unicornModel
  .findOneAndUpdate(
    {
      name: 'test'  // search query
    }, 
    {
      weight: '33'   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
```
?

**Answer:** 
In the [documentation](https://mongoosejs.com/docs/api.html#model_Model.update) , it mentioned that:

By default, if you don't include any update operators in doc, Mongoose will wrap doc in `$set` for you. This prevents you from accidentally overwriting the document.

So there is no difference unless you specify `overwrite: true `in options.
</details>

---
### Deleting
>Models have static deleteOne() and deleteMany() functions for removing all documents matching the given filter.

```js
unicornModel.deleteOne({ name: 'test3' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one unicorn document
});

// or
unicornModel
  .findOneAndRemove({
    name: 'test2'
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })

```

---
## Query Building
> Mongoose has a very rich API that handles many complex operations supported by MongoDB. Consider a query where we can incrementally build query components.

In this example, we are going to:

Find all unicorns
Skip the first 100 records
Limit the results to 10 records
Sort the results by the firstName field
Select the firstName
Execute that query

```js
unicornModel.find()             // find all unicorns
         .skip(3)               // skip the first 3 items
         .sort({weight: 1}      // sort ascending by weight
         .limit(2)              // limit to 2 items
         .select({name: true}   // select firstName only
         .exec()                // execute the query
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })
```

<details>
<summary>
Mongoose - What does the exec function do?
</summary>
https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
</details>

<details>
<summary>
What IF - What if we swapped the limit and sort functions?
</summary>
Run and check
</details>

---
# Summary 
We have barely scratched the surface exploring some of the capabilities of Mongoose. It is a rich library full of useful and and powerful features that make it a joy to work with data models in the application layer.

While you can interact with Mongo directly using Mongo Driver, Mongoose will simplify that interaction by allowing you to model relationships between data and validate them easily.