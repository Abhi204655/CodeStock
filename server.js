const express = require('express');
const path = require('path');
const cors = require('cors');
const HackerEarth = require("hackerearth-node");
require('dotenv').config();


const hackerEarth = new HackerEarth(process.env.HACKEREARTH_API_KEY);


const app = express();
app.use(cors())
app.use(express.json())

app.post('/compile', async (req, res) => {
    if (!req.body.code) {
        return res.status(400).json({
            status: 'error',
            msg: 'Code is required'
        })
    }
    try {
        const config = {
            time_limit: 1,
            memory_limit: 323244,
            source: req.body.code,
            input: req.body.input ? req.body.input : '',
            language: req.body.language,
        }
        let result = await hackerEarth.run(config);
        result = JSON.parse(result);
        if (result.run_status.status === 'AC') {
            return res.status(200).json({
                status: 'success',
                output: result.run_status.output
            })
        }
        else if (result.run_status.status === 'CE') {
            return res.status(200).json({
                status: "error",
                output: result.compile_status,
            });
        } else {
            return res.json({
                status: "error",
                output: result.compile_status,
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            msg: err.message
        });
    }
})


const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('client/build'));
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname + '/client/build/index.html'));
    })
}


app.listen(port, () => console.log(`server is running at ${port}`))