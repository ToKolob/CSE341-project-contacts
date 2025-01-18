const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);  
  });
};

const getSingleContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find( { _id: contactId } );
  if (result) {
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);    
    });
  } else {
    res.status(404).send('Contact not found');
  };
};

const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    phoneNumber: req.body.phoneNumber
  };
  const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    phoneNumber: req.body.phoneNumber
  };
  const result = await mongodb.getDatabase().db().collection('contacts').updateOne( { _id: contactId }, { $set: contact } );
  if (result.modifiedCount > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } 
  //if the contact was found but not modified
  else if (result.matchedCount > 0) {
    res.status(304).send('Contact not modified');
  }
  //if the contact was not found
  else {
    res.status(404).send('Contact not found');
  };
};

const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').deleteOne( { _id: contactId } );
  if (result.deletedCount > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } else {
    res.status(404).send('Contact not found');
  };
};

module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact };