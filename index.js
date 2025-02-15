//creating an http server
//express
// node default library =>no

// const express = require("express");

// const app  = express();

// function sum(n) {
//     let ans = 0;
//     for (let i = 0; i <=n; i++) {
//        ans = ans+i 
//  }
//     return ans;
    
// }

// app.get("/",function(req, res) {
//     const n = req.query.n;
//     const ans = sum(n);
//     res.send("hi your ans is: " + ans);
// })


// app.listen(4000);


const express =  require("express");
const app = express();



var users = [{
    name:"Shridhar",
    kidneys: [{
        healthy: false
    },]
}]

app.use(express.json());

app.get("/",function(req,res) {
     const ShriKidneys = users[0].kidneys;    
     const numberOfKidneys = ShriKidneys.length;
     let numberOfHealthyKidneys = 0;
     for (let i = 0; i < ShriKidneys.length; i++) {
        if(ShriKidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        };  
     }
     const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
     res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
     })
     
})

app.put("/",function(req,res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;   
    }
    res.json({});
})

app.post("/",function(req,res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg:"Done"
    })
})

app.delete("/",function(req,res) {
    if(atleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({msg:"Unhealthy kidneys removed successfully"}) 
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
        }

})


function atleastOneUnhealthyKidney(params) {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
           atleastOneUnhealthyKidney = true ; 
        }
    }

    return atleastOneUnhealthyKidney;

}

app.listen(3000);