import mongoose from "mongoose";

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.lsbzxli.mongodb.net/phonebook`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Contact = mongoose.model("Contact", contactSchema);

const contact = new Contact({
  name,
  phone,
});

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((contact) => {
      console.log(`${contact.name} - ${contact.phone}`);
    });

    mongoose.connection.close();
  });
} else {
  contact.save().then((result) => {
    console.log(`added ${result.name} ${result.phone} to phonebook`);
    mongoose.connection.close();
  });
}
