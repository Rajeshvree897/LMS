

const mongoose = require('mongoose')
const PORT = process.env.PORT;
async function mainConnection(){
    console.log('vd');
   await mongoose.connect(process.env.DB, (err) => {
            if(err){
                console.log(err);
            }else{
                console.log(PORT);
                console.log("Connection Done");
            }
    })

}
mainConnection()