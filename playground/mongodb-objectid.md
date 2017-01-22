# Mongo database ObjectId

## ObjectID specification

```javascript
// from insertOne into collection 'Todos'
[
  {
    "text": "something to do",
    ...
    "_id": "58847eb74b264483b6c37436"
  }
]
```

```javascript
// from insertOne into collection 'Users'
[
  {
    "name": "Juan Zuriaga",
    ...
    "_id": "58847f8ec60a2c83d761ce9b"
  }
]
```

MongoDB docs are very detailed and the
[ObjectId](http://www.mongodb.org/display/DOCS/Object+IDs#ObjectIDs-BSONObjectIDSpecification) specification helps us break down the ObjectId automatically generated value into distinctive parts. These parts are (consecutively):

__The 12-byte value consists of:__

1. *timestamp* → (4 bytes) Generation timestamp
2. *machine* → (3 bytes) MD5 hash of the machine host name, or of the mac/network address, or the virtual machine id.
3. *pid* → (2 bytes) The process (or thread) ID generating the ObjectId.
4. *inc* → (3 bytes) ever incrementing integer value.
