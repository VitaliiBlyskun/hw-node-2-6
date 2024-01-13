const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
// const join = require("join");
// const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "contacts.json");
// console.log("contacts", contactsPath);

// console.log("dirname", __dirname);

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(list);
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    const contactById = list.find((item) => item.id === contactId);
    return contactById || null;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result;
  } catch (error) {
    throw error.message;
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    throw error.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    allContacts[index] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
