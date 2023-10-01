const express = require('express');
const app = express();
app.use(express.json());
const data = [];
//allow my http file to send json file to the backend. To bypass the No 'Access-Control-Allow-Origin.
//allow share resources to all the requests
//After make it online, will make sure only share with front end page
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) =>{
    res.send("Welcome to the app!");
})

app.get('/balance', (req, res) =>{
    const balance = {}
    for(var i=0; i< data.length; i++){
        if(balance[data[i].payer]==null){
            balance[data[i].payer]= data[i].points
        }  
        else{
            balance[data[i].payer]= data[i].points+ balance[data[i].payer];  
        }
    }  
    res.status(200).send(balance);
})

app.post('/add', (req, res) =>{
    const point = {
        payer: req.body.payer,
        points: Number(req.body.points),
        timestamp: req.body.timestamp
    };
    data.push(point);
    res.sendStatus(200);
});

app.post('/spend', (req, res) =>{
    const points_spend = req.body.points;
    //check total poionts
    let existing_points = 0;
    for (var point of data){
        existing_points = existing_points + point.points;
    }
    if(existing_points<points_spend){
        res.status(400).send("The user doesn’t have enough points");
    }
    else{
        let remaining_spend = points_spend;
        const spend_data = [];
        let i = 0;
        while(remaining_spend!=0){
            let deduct_points = Math.min(data[i].points,remaining_spend);
            let in_or_not = false;
            for(const already_in_list of spend_data){
                if(already_in_list.payer==data[i].payer){
                    already_in_list.points =  already_in_list.points-deduct_points;
                    in_or_not = true;
                }
            }
            if(!in_or_not){
                spend_data.push({payer:data[i].payer , points:-deduct_points});
            }
            remaining_spend = remaining_spend - deduct_points;
            data[i].points = data[i].points - deduct_points;
            i = i+1;
        }
        res.status(200).send(spend_data);
    }
});

app.listen(8000, () => console.log('Listening on port 8000...'))
