const { default: mongoose } = require("mongoose");


class MainDB{
    // connection(){
    //     mongoose.connect('mongodb+srv://ntdat3120411046:gcqk3jxjcBnuyqoW@project.ruflakt.mongodb.net/test').then(() => {
    //         console.log('=====Database connected=====')
    //       }).catch((err) => {
    //         console.log(err)
    //       })
    // }

  async connection() {
    await mongoose.connect('mongodb+srv://ntdat3120411046:gcqk3jxjcBnuyqoW@project.ruflakt.mongodb.net/test')
    console.log('=====Database connected=====')
  } catch(error) {
    console.log(error)
  }
}

module.exports = new MainDB();