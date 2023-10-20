const express = require('express');
const app = express();

app.get('/', (_, res) => {
    const obj = {
        name: 'wali',
        email: 'wali@email.com'
    }
    res.json(obj);
});

app.listen(4000, () => {
    console.log('app is listening');
});