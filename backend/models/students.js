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
    phone: 
    { type: String, 
      required: true 
    },
    email: 
    { type: String, 
      required: true
    },
    year: 
    { type: String, 
      required: true 
    },
    branch: 
    { type: String, 
      required: true 
    },
    cgpa: 
    { type: String, 
      required: true 
    }
});

module.exports = mongoose.model("Students", userSchema);
