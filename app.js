const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const https=require("https");
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");

})
app.post("/",function(req,res)
{
    const query=req.body.cityname;
    const key="ffce44c7cd1ae4f13e2be66c7a828cca";
    const units="metric";
    const url=  "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid="+key+"&units="+units;

    https.get(url,function(response){
    console.log(response.statusCode)
    response.on("data",function(data)
  {
  const weatherdata=JSON.parse(data);
  // console.log(weatherdata);
  const temp=weatherdata.main.temp;
  const weatherdesc=weatherdata.weather[0].description;
  const icon=weatherdata.weather[0].icon;
  const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
  res.write("<h1>the temperature is "+temp+" degree celsius</h1>");
  res.write("<p>the weather is "+weatherdesc +"</p>");
  res.write("<img src="+imageurl+">");
  res.send();
  })
    })
})
app.listen(3000,function(){
  console.log("server has started");
})
