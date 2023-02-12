var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    subject:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    priority:{
        type:String,
        require:false
    },
    dateDiscovered:{
        type:Array,
        require:true,
    }
});

mongoose.model("issueLog", Schema);