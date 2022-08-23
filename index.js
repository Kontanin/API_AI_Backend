import axios from 'axios';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const HTTP =  'http://3.1.189.234:8091/data'

const init=async ()=>{
  const api=axios.get(`${HTTP}/ttntest`);
  
  const [ttntest]= await Promise.all([
    api
  ])
  

  console.log(
    {ttntest:ttntest.data.length});

  let array=ttntest.data
  let max_d=Math.max(...array.map(o=> { return o.data} ));
  let min_d=Math.min(...array.map(o=> { return o.data} ));
  let avg_d = array.reduce((sum, record) =>{ return sum+record.data},0) / array.length;
  
  let max_d2=Math.max(...array.map(o=> { return o.data2} ));
  let min_d2=Math.min(...array.map(o=> { return o.data2} ));
  let avg_d2 = array.reduce((sum, record) =>{ return sum+record.data2},0) / array.length;

  let NewMax = Math.ceil(max_d)
  let NewMin = Math.floor(min_d) 
  let range=NewMax-NewMin
  
  let NewMax2 = Math.ceil(max_d2)
  let NewMin2 = Math.floor(min_d2) 

  var obj = {};
  var obj2 = {};
  for (let step =NewMin; step < NewMax;step=step+200) {obj[step] =0; }
  for (let step =0; step < array.length; step++) {
      for (const i in obj){
         if(array[step].data<(parseInt(i)+199)){
          console.log(array[step].data,(parseInt(i)+199))
          obj[i]++
          break;
         }
      }
  }
 


}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/chart", (req, res) => {
  let statusBack=200
  console.log("test")
  res.status(statusBack).send(init())
});


app.listen(port, () => {
  console.log("Starting node.js at port " + port);
  });