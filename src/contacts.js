import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  const response = await fetch("http://localhost:3000/contacts");
  let contacts = await response.json();
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let payload = { id, createdAt: Date.now() };
  const response = await fetch("http://localhost:3000/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const contact = response.json();
  return contact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  const response = await fetch(`http://localhost:3000/contacts/${id}`);
  let contact = await response.json();
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  const contact = await getContact(id);
  Object.assign(contact, updates);
  const response = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(contact),
  });
  const nextContact = await response.json();
  return nextContact;
}

export async function deleteContact(id) {
  const response = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "DELETE",
  });
  let contact = await response.json();
  return contact ? true : false;

  // let index = contacts.findIndex((contact) => contact.id === id);
  // if (index > -1) {
  //   contacts.splice(index, 1);
  //   await set(contacts);
  //   return true;
  // }
  // return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
