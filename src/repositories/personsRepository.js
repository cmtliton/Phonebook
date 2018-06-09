import db from './../persistence'
// const uniqueId = require('lodash.uniqueid')
// import lodashId from 'lodash-id'

// const shortid = require('shortid')

// db._.mixin(lodashId)

db.defaults({
persons:[]
}).write()

export default {
  get () {
    console.log(`${JSON.stringify(db.getState())}`)
  },
  addPersonToEnd (name, address, mobileno) {
    return db
      .get('persons')
      .insert({
        id: shortid(),
        name,
        address,
        mobileno,
        created: new Date()
      })
      .write()
  },
   addPersonToBegin (text) {
    return db
      .get('persons')
      .unshift({
        BRCOD: text.BRCOD,
        BRNAM: text.BRNAM,
        ZNNAM: text.ZNNAM,
        DSTNAM: text.DSTNAM,
        TELNO: text.TELNO,
        MOBNO: text.MOBNO,
        EMAIL: text.EMAIL,
        ADDR: text.ADDR,
        DATE: text.DATE,
        CREATORID: text.CREATORID
      })
      .write()
  },
  existInmobile(MOBNO) {
    return db
    .get('persons')
    .find({ MOBNO: MOBNO })
    .value()
  },
  branchfound(BRCOD) {
    return db
    .get('persons')
    .find({ BRCOD: BRCOD })
    .value()
  },
  removePerson (personid) {
    db.get('persons')
      .remove({id: personid})
      .write()
  },
  updatePerson (BRCOD, text) {
    db.get('persons')
    .find({ BRCOD: BRCOD })
    .assign({
        BRNAM: text.BRNAM,
        ZNNAM: text.ZNNAM,
        DSTNAM: text.DSTNAM,
        TELNO: text.TELNO,
        MOBNO: text.MOBNO,
        EMAIL: text.EMAIL,
        ADDR: text.ADDR 
    })
    .write()
  },
  getPersons () {
    return db
      .get('persons')
      .cloneDeep()
      .value()
  }
}
