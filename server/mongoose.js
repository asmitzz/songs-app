const mongoose = require('mongoose');

async function initializeDB(uri){
    try {
        await mongoose.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true })
        .then( () => console.log("DB Connected") );
    } catch (error) {
        console.log(error)
    }
}

module.exports = { initializeDB };

 