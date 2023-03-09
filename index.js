const express = require('express')
const app = express();
app.set('view engine', 'ejs')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const con = require('./connection')
app.use(express.static('public'))
app.use(express.static('js'))

app.get('/', (req, res) => {
  res.render('about')
});

app.get('/game', (req, res) => {
  res.render('game')
});

app.get('/buy', (req, res) => {
  res.render('buy')
});

app.get('/reviews', (req, res) => {
  res.render('reviews')
})

// app.get('/index',(req,res)=>{
//   res.render('admin/index1')
// })


// post api

app.post('/auto', (req, res) => {
  var game_id = req.body.game_id;
  var game_name = req.body.game_name;
  var category = req.body.category;
  var Type = req.body.Type;

  var sql = "INSERT INTO hardy (game_id,game_name,category,Type) VALUES (?,?,?,?)";
  con.query(sql, [game_id, game_name, category, Type], function (err, result) {
    if (err) throw err;
    // console.log(result)
    res.redirect('/index')
  });
});


// get data table
app.get("/index", (req, res) => {
  var sql = "SELECT * FROM hardy"
   
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    else {
      // console.log(result)
      res.render("admin/index1", { data: result });
    }
  });
});



// app.get('/edit/:id', function (req, res) {
  
//   var id = req.params.id;

//   // console.log(id)
//   var sql = `SELECT * FROM hardy WHERE id='${req.params.id}'`;
//   con.query(sql, function (error, result) {
//     if (error) throw error
//     res.render("admin/index1", {data:result});
//   });
// });




// app.post("/update",function(req,res){
//   var game_id = req.body.game_id;
//   var game_name = req.body.game_name;
//   var category = req.body.category;
//   var Type = req.body.Type;
      
//   var sql = `UPDATE hardy SET game_id ='${game_id}',game_name='${game_name}',category='${category}',Type='${Type}' WHERE game_id = '${game_id}'`;
//      console.log(sql)
//      con.query(sql, (err, result) => {
//         console.log(result)
          
//             if (err) throw err
//             res.redirect('/index')
//         })
// })

// //edited_manage_user_post
app.post('/update',async(req, res) => {
  // let id= req.body.id;
  let game_id = req.body.game_id;
  let game_name = req.body.game_name;
  let category = req.body.category;
  let Type = req.body.Type

  console.log(res)
  var sql = `UPDATE hardy SET game_id ='${game_id}',game_name='${game_name}',category='${category}',Type='${Type}' WHERE game_id = '${game_id}'`;
  console.log(sql)
  con.query(sql, (err, result) => {
  console.log(result)
    
      if (err) throw err
      res.redirect('/index')
  })
});



// app.put('/update', (req, res) => {
//   let game_id = req.params.game_id;
//   let game_name = req.body.game_name;
//   let category = req.body.category;
//   let Type = req.body.Type;

//   var sql=`UPDATE hardy SET game_id ='${game_id}',game_name='${game_name}',category='${category}',Type='${Type}' WHERE game_id = '${game_id}'`;
//     [game_name, category, Type, game_id],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error updating game');
//       } else if (result.affectedRows == 0) {
//         res.status(404).send('Game not found');
//       } else {
//         res.status(200).send('Game updated successfully');
//       }
//     }
 
//   })
// DELETE API

app.get("/delete/:id",function(req,res,next){
  
  console.log(req.params.id)
 con.connect(function(err){
 con.query(`DELETE FROM hardy WHERE id= '${req.params.id}'`,function(err,result){
     if(err){
         console.log(err)
     }
     else{
         res.redirect("/index")
     }
 })
})
})

// upcoming game edit api
// app.get("/edit/:id",function(req,res){
//   con.connect(function(err){
//   var sql=`select * from hardy where id='${req.params.id}'`
//   con.query(sql,function(err,result){
//       if(err){    
//           console.log(err)
//       }else{
//            res.render('admin/index',{result:result})
//       }
//   })
// })
// })

// let query = 'SELECT * FROM users ORDER BY name';
  
// db_con.query(query, (err, rows) => {
//     if(err) throw err;

//     console.log(rows);
// });


// app.post('/ivr_enquiry_super_admin', async (req, res) => {
//   try {

//       let stage_filter = req.body.stage_filter;

//       let sql = `SELECT * FROM ivr_enquiry`;
//       connection.query(sql, function (err, result) {

//           if (stage_filter == "All") {
//               let sql2 = `SELECT  * FROM ivr_enquiry`;
//               connection.query(sql2, function (err, result1) {
//                   if (err) throw err;
//                   res.json({ data: result, data: result1 });
//               })
//           } else {
//               let sql2 = `SELECT  * FROM ivr_enquiry WHERE  stage ='${stage_filter}'`;
//               connection.query(sql2, function (err, result1) {
//                   if (err) throw err;
//                   res.json({ data: result, data: result1 });
//               })
//           }
//       })


//   } catch (error) {
//       console.log(error);
//       res.redirect('/error')
//   }
// });
// // manage_user_super_admin
// app.get('/manage_user_super_admin', (req, res) => {
//   var sql = `SELECT * FROM lms_login_master where status != '2' `;
//   connection.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result, 'data');
//       res.render('super_admin/manage_user_super_admin', { result: result, status: req.session.status })
//   })

// });
// //manage_user_stage_filter_super_admin
// app.post('/manage_user_stage_filter_super_admin', (req, res) => {
//   try {

//       let stage_filter = req.body.stage_filter;
//       // console.log(stage_filter, 'stage_filter_route');
//       if (stage_filter == "All") {
//           let sql2 = `SELECT  * FROM lms_login_master`;
//           connection.query(sql2, function (err, result1) {
//               // console.log(result1, 'ALL');
//               if (err) throw err;
//               res.json({ result: result1 });
//           })
//       }
//       else if (stage_filter == 'Admin') {
//           let sql2 = 'SELECT * FROM lms_login_master WHERE (status=1 OR status=2)';
//           connection.query(sql2, function (err, result1) {
//               // console.log(result1);
//               if (err) throw err;
//               res.json({ result: result1 });
//           })
//       }
//       else if (stage_filter == "Cre's") {
//           let sql2 = "SELECT * FROM lms_login_master WHERE (status='Sales' OR status='Service')";
//           connection.query(sql2, function (err, result1) {
//               // console.log(result1);
//               if (err) throw err;
//               res.json({ result: result1 });
//           })
//       }
//   }

//   catch (error) {
//       console.log(error);
//       res.redirect('/error')
//   }
// });
// // delete manage_user_super_admin
// app.get('/manage_user_delete/:admin_id', (req, res) => {
//   let admin_id = req.params.admin_id;
//   // console.log(admin_id);
//   var sql = `DELETE FROM lms_login_master WHERE admin_id='${req.params.admin_id}'`;
//   connection.query(sql, (err, result) => {
//       if (err) throw err
//       var sql = 'SELECT * FROM lms_login_master'
//       connection.query(sql, function (err, result) {
//           if (err) throw err
//           // console.log(result, 'data');
//           res.render('super_admin/manage_user_super_admin', { result: result, status: req.session.status })
//       })
//   })
// });
// // edit manage_user_super_admin
// app.get('/manage_user_edit/:admin_id', (req, res) => {
//   var sql = `SELECT * FROM lms_login_master WHERE admin_id='${req.params.admin_id}'`
//   connection.query(sql, (err, result) => {
//       if (err) throw err
//       // console.log(result, 'edit')
//       res.render('super_admin/manage_user_edit_super_admin', { result: result, status: req.session.status })
//   })
// });
// //edited_manage_user_post
// app.post('/add_user_details_super_admin', async (req, res) => {
//   let admin_id = req.body.admin_id;
//   let category = req.body.category;
//   let ivr_no = req.body.ivr_no;
//   let user_id = req.body.user_id;
//   let password = req.body.password;
//   let mobile = req.body.mobile;
//   let c_date = req.body.c_date;
//   let exp_date = req.body.exp_date;


//   var sql = `INSERT INTO lms_login_master (id, super_admin_id, admin_id, ivr_no, user_id, password, mobile, email, api_key, api_pass, login_type, created_date, user_expire, created_by, user_limit, status) VALUES (NULL, 'eicher_coco', '${admin_id}', '${ivr_no}', '${user_id}', '${password}', '${mobile}', '', 'ab25xx@', 'ab9125xx@2', '1', '${c_date}', '${exp_date}', 'eicher_coco','1', '${category}');`;
//   connection.query(sql, (err, result) => {
//       if (err) throw err

//       res.redirect('/manage_user_super_admin')
//   })
// });


// //edited_manage_user_post
// app.post('/edit_user_details_super_admin', async (req, res) => {
//   let admin_id = req.body.gfgadminid;
//   let ivr_no = req.body.gfgivrno;
//   let user_id = req.body.gfguserid;
//   let password = req.body.gfgpassword;
//   let mobile = req.body.gfgmobile;
//   let created_date = req.body.gfgcdate;
//   let user_expire = req.body.gfgexpdate;


//   var sql = `UPDATE lms_login_master SET admin_id='${admin_id}',ivr_no='${ivr_no}',user_id='${user_id}',password='${password}',mobile='${mobile}',created_date='${created_date}',user_expire='${user_expire}'WHERE admin_id = '${admin_id}'`;
//   connection.query(sql, (err, result) => {
//       if (err) throw err

//       res.redirect('/manage_user_super_admin')
//   })
// });

// //edited_manage_user_post
// app.post('/delete_user_super_admin', async (req, res) => {

//   let ivr_no = req.body.gfgivrno22;


//   var sql = `DELETE FROM lms_login_master WHERE ivr_no = '${ivr_no}'`;
//   connection.query(sql, (err, result) => {
//       if (err) throw err

//       res.redirect('/manage_user_super_admin')
//   })
// });
// app.get('/manage_user_edit_super_admin', (req, res) => {
//   var sql = 'SELECT * FROM lms_login_master'
//   connection.query(sql, function (err, result) {
//       if (err) throw err
//       // console.log(result, 'data');
//       res.render('super_admin/manage_user_edit_super_admin', { result: result, status: req.session.status })
//   })

// });
// app.get('/manage_user_edited_done_super_admin', (req, res) => {
//   var sql = 'SELECT * FROM lms_login_master'
//   connection.query(sql, function (err, result) {
//       if (err) throw err
//       // console.log(result, 'data');
//       res.render('super_admin/manage_user_edited_done_super_admin', { result: result, status: req.session.status })
//   })

// });

app.use(express.static('public'))
app.listen(4000, () => console.log("listen 4000 port"))

