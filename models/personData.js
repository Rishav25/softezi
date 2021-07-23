import mongoose from "mongoose";

let personSchema = new mongoose.Schema({
    fname : {type : String,
            required : true},
    email : {
        type: String,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required : true
    },
    mobile : {type : String, required : true},
    pass : {type : String, required : true}
});

const Person = mongoose.model('Person', personSchema);

export default Person;