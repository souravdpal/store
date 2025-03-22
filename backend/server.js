const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit-contact') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = JSON.parse(body);
            const filePath = path.join(__dirname, 'details.json');

            fs.readFile(filePath, (err, data) => {
                let json = [];
                if (!err && data.length > 0) {
                    json = JSON.parse(data);
                }
                json.push(formData);

                fs.writeFile(filePath, JSON.stringify(json, null, 2), err => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' // Allow CORS
                        });
                        res.end(JSON.stringify({ message: 'Error saving data' }));
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' // Allow CORS
                        });
                        res.end(JSON.stringify({ message: 'Data saved successfully' }));
                    }
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3000; // Change to 8080 if needed
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});