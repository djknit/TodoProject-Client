function UserInfo({ id, username, firstName, lastName } = {}) {
  this.id = id;
  this.username = username;
  this.firstName = firstName;
  this.lastName = lastName;
  return this;
}

function TodoItem({ id, description, completed = false, dueDate, dateOfCreation }) {
  this.id = id;
  this.description = description;
  this.completed = completed;
  this.dueDate = dueDate;
  this.dateOfCreation = dateOfCreation;
  return this;
}

export {
  UserInfo,
  TodoItem
};
