const express=require('express');
const multer=require('multer');
const path=require('path');
const employee=require('./model/employee');
const router=express.Router();
const app=express();

router.use(express.static(__dirname+"./public/"));

router.get('/',(req,res,next)=>{
    employee.find((err,docs)=>{
        res.render('emphome',{employee:docs});

    }).catch((err)=>{
        console.log("something wrong");
    })
})

router.post('/add',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const mobile=req.body.mobile;
    const city=req.body.city;
    console.log(name,email,mobile);
    const emp=new employee({
        name,
        email,
        mobile,
        city
    })
    emp.save((err)=>{
        if(err){console.log("insert error" +err)}
        else{
            console.log("inserted");
            employee.find((err,docs)=>{
                res.render('edit',{employee:docs});
        
            }).catch((err)=>{
                console.log("something wrong");
            })
        }
    })
})

router.get('/edit/:id',(req,res,next)=>{
    console.log(req.params.id);
    employee.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,doc)=>{
        if(err){
            console.log("not updated");
        }
        else{
            res.render('update',{employees:doc});

        }
    })
})

router.post('/update/:id',(req,res,next)=>{
    employee.findByIdAndUpdate({_id:req.params.id},req.body,(err,doc)=>{
        if(err){
            console.log('not updataed');
        }
        else{
            console.log("updated");
            employee.find((err,docs)=>{
                res.render('edit',{employee:docs});
        
            }).catch((err)=>{
                console.log("something wrong");
            })
        }
    })
   })

   router.get('/delete/:id',(req,res,next)=>{
    employee.findByIdAndDelete({_id:req.params.id},(err,doc)=>{
        if(err){
            console.log('not deleted');
        }
        else{
            console.log('deleted succes');
            employee.find((err,docs)=>{
                res.render('edit',{employee:docs});
        
            }).catch((err)=>{
                console.log("something wrong");
            })
        }
    })
})
 
var Storage=multer.diskStorage({
//destination:"./public/upload",
destination:function(res,file,cb){
cb(null,'uploads')
},
filename:function(res,req,cb){
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
}
//filename:(req,file,cb)=>{
        // cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//}
});
var upload1=multer({
    storage:Storage
}).single('file');

router.post('/upload',upload1,(res,req)=>{
//var success=req.sendFile.fieldname+"upload successfully";
res.render('upload_file');

})

router.get('/upload',(req,res)=>{
    res.render('upload_file');
})
module.exports=router;