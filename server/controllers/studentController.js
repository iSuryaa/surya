const mysql=require("mysql2");

const con=mysql.createPool({
    connectionLimit:10,
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,   
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});

exports.view=(req,res)=>{
    
    con.getConnection((err,connection)=>{
        if(err) throw err;
                 connection.query("select * from dataitems ",(err,rows)=>{
                    connection.release();
                     if(!err){
                       
                         res.render("home",{rows});
                     }else{
                         console.log("error in listening data"+err);
                     }
      });           
            
         });
     
  };


  exports.adduser=(req,res)=>{
    res.render("adduser");
  }

  exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        
        if(err) throw err;
        
        const {firstname,lastname,email,dob,education,about}=req.body;
        
                 connection.query("insert into dataitems (FirstName,LastName,Email,DOB,Education,About) values (?,?,?,?,?,?)",[firstname,lastname,email,dob,education,about],(err,rows)=>{
                    connection.release();
                     if(!err){
                       
                         res.render("adduser",{msg:"user details added sucessfully"});
                     }else{
                         console.log("error in listening data"+err);
                     }
                });           
            
             });

           };

  
  exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;

        let id=req.params.id;
                 connection.query("select * from dataitems where id=?",[id],(err,rows)=>{
                    connection.release();
                     if(!err){
                       
                         res.render("edituser",{rows});
                     }else{
                         console.log("error in listening data"+err);
                     }
      });           
            
         });
     
  };

  exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
      const {firstname,lastname,email,dob,education,about}=req.body;
        let id=req.params.id;
                 connection.query("update dataitems set  FirstName=?,LastName=?,Email=?,DOB=?,Education=?,About=? where Id=?",[firstname,lastname,email,dob,education,about,id],(err,rows)=>{
                    connection.release();
                     if(!err){

                        con.getConnection((err,connection)=>{
        if(err) throw err;

        let id=req.params.id;
                 connection.query("select * from dataitems where id=?",[id],(err,rows)=>{
                    connection.release();
                     if(!err){
                       
                        
                         res.render("edituser",{rows,msg:"user details updated sucessfully"});
                     }else{
                         console.log("error in listening data"+err);
                     }
      });           
            
         });
                       
                        
                     }else{
                         console.log("error in listening data"+err);
                     }
      });           
            
         });
     
  };






  exports.delete=(req,res)=>{
     con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;
        connection.query("delete from dataitems where id=?",[id],(err,row)=>{
        connection.release();
        if(!err) {
            res.redirect("/");
        }else{
            console.log(err);
        };
        });
     });
  };

//   exports.searchItems=(req,res)=>{
//     let firstname = "karan";

//     alert(firstname);
//     con.getConnection((err,connection)=>{
//         if(err) throw err;
//                  connection.query("select * from dataitems where FirstName like %?",[firstname],(err,rows)=>{
//                     connection.release();
//                      if(!err){
                       
//                          res.render("home",{rows});
//                      }else{
//                          console.log("error in listening data"+err);
//                      }
//       });           
            
//          });
     
//   };

