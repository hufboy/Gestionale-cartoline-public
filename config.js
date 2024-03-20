const fs = require('fs/promises');
const path = require('path');

const fs_path = path.resolve(__dirname, 'config.json')

let cf_data = undefined;

class Configs{
    constructor(){
        fs.readFile(path)
        .then((data) => {
          this.isAvailable = true;
          cf_data = JSON.parse(data);
          if(cf_data){
            this.DatabasePath = cf_data.db_path;
          }
        })
        .catch((error) => {
          this.isAvailable = false;
        });
    }

    get Available(){
        return this.isAvailable;
    }

    get DatabasePath() {
        return this.DatabasePath;
    }

    


}





module.exports = {

}