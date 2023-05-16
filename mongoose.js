const mongoose = require('mongoose');

main().catch(err => console.log(err));

//'async' keyword is used to define a asynchronous code execution.
// check how promises work in asynchronous code execution(notepad) 
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demodb'); // 'await' is used to wait until connection is established with mongodb
    console.log("conneection Established");

    // Schema is a way to define the structure of mongodb colllection.The schema defines the fields and their data types that can be stored in a document, as well as any constraints or validation rules for those fields.

    const kittySchema = new mongoose.Schema({
        name: String
    });


     // methods are functions that are added to the schema and can be called on instances of the schema model.
    //Here we define speak method which is literally a function by using method property of schema 'kitty'
    kittySchema.methods.speak = function speak() {
        const greeting = this.name

        console.log(greeting);
    };


    //Models(It is like a form which have already defined fields to fill) are fancy constructors compiled from Schema definitions.An instance of a model is called a document.
    //like creating a new blog is an example of document as the instance of model.
    //.model(name of the collection in lowercase plural form, schema)
    const Kitten = mongoose.model('Kitten', kittySchema);

    // creating a document using model kitten
    const silence = new Kitten({ name: 'keo' });
   



   
    
    await silence.save();//waits until data in saved in database
    silence.speak();//calls speak function
}

