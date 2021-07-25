function FormInputProps(name, type, label, placeholder, helpText) {
  this.name = name;
  this.type = type || 'text';
  this.label = label;
  this.placeholder = placeholder;
  this.helpText = helpText;
  return this;
}

export { FormInputProps };
