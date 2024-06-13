const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: 
    { type: String, 
      required: true 
    },
    usn: 
    { type: String, 
      required: true
    },
    
    Score: 
    { type: Number, 
        required: true
    }
});

module.exports = mongoose.model("Studentmarks", userSchema);
