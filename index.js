import express from 'express';
import bodyParser from 'body-parser';
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const url = "https://api.weatherapi.com/v1/current.json?key=4379683ff5b245b895b00455241407&q="
const key = "4379683ff5b245b895b00455241407"

app.get("/", (req, res) =>{
    res.render("index.ejs")
});


app.post("/weather", async(req, res) =>{
    const pos = req.body.position

    try {
        const result = await axios.get(url+pos);
        res.render("index.ejs", {content_icon: result.data.current.condition.icon, city: result.data.location.name, 
            sky: result.data.current.condition.text, precipit: result.data.current.precip_mm, temp: result.data.current.temp_c
          });
    
        
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data)})
      };

     
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });