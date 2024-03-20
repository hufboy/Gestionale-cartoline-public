const path = require('path');

class DatabaseLocal{
    
    
    constructor(sqliteInstance, LoggerInstance){
        
            if(LoggerInstance != undefined){
                LoggerInstance.LogInfo("Trying to load db at path: " + path.resolve(__dirname, 'database.db'));
            }
            
          this.db  = new sqliteInstance.Database(path.resolve(__dirname, 'database.db'), sqliteInstance.OPEN_READWRITE, (err) => {
            if (err) {
                this.isConnected = false;
              console.error(err.message);
            }else{
                this.isConnected = true;
                console.log('Connected to the database.');
            }
          });
    }

    get DbInstance(){
        return this.db;
    }

    get CloseConnection(){
        this.db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Close the database connection.');
          });
    }

    

    async GetAllCartoline(){

        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Cartoline`;
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
    
                let result = [];

                rows.forEach((row) => {
                    
                    let roww = [];
                    roww.push(row.ID);
                    roww.push(row.Categoria);
                    roww.push(row.Tipo);
                    roww.push(row.Note);
                    roww.push(row.Data);
                    roww.push(row.Nome);

                    result.push(roww);

                });

                var data_arr = [];
                for (var i = 0; i < result.length; i++) {

                    var obj = {};
                    obj.id = result[i][0];
                    obj.cat = result[i][1];
                    obj.type = result[i][2];
                    obj.name = result[i][3];
                    obj.date = result[i][4];
                    obj.notes = result[i][5];
                    data_arr.push(obj);
                }
                resolve(data_arr);
                
            });
          });
    }

    async InsertCartoline(obj){

        return new Promise((resolve, reject) => {
            let values = [ obj.cat, obj.data,obj.nome,obj.note,obj.tipo];
            
            
            let sql = 'INSERT INTO Cartoline(Categoria,Data,Nome,Note,Tipo) VALUES (?,?,?,?,?);';
            this.db.run(sql, values, function(err) {
                if (err) {
                    console.error(err.message);
                  reject(false);
                  
                }
                console.log(`Rows inserted ${this.changes}`);
                resolve(true);
              });
          });
    }


    async UpdateCartoline(obj){
        console.log(obj);
        return new Promise((resolve, reject) => {
            let values = [ obj.cat, obj.data,obj.nome,obj.note,obj.tipo, obj.id];
            
            let sql = `UPDATE Cartoline
             SET Categoria = ?, Data = ?, Nome = ?, Note = ?,Tipo = ?
            WHERE ID = ?`;
            this.db.run(sql, values, function(err) {
                if (err) {
                    console.error(err.message);
                  reject(false);
                  
                }
                console.log(`Rows inserted ${this.changes}`);
                resolve(true);
              });
          });
    }


}

module.exports = {
    DatabaseLocal
}