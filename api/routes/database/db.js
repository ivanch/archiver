const fs = require('fs');

// json database
var db = {'urls': []};

// load database from file if it exists
readFromFile();

const _getLastId = () => {
    let lastId = 0;
    if (db['urls'].length > 0) {
        let lastIndex = db['urls'].length - 1
        lastId = db['urls'][lastIndex]['id'];
    }
    return lastId;
};

// function to write to json file
function writeToFile(data) {
    fs.writeFile('./data/db.json', JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

// function to read json file
function readFromFile() {
    // check if file exists
    if (fs.existsSync('./data/db.json')) {
        // read file
        fs.readFile('./data/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            db = JSON.parse(data);
        });
    }
}

// function to add new url to database with title, url, filename, and date
function saveUrl(url, title, filename) {
    data = {
        id: _getLastId() + 1,
        title: title,
        url: url,
        filename: filename,
        date: new Date().toISOString().slice(0, 10),
        hms: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)
    }

    db['urls'].push(data);
    writeToFile(db);
}

// function to delete a url from database based on id
function deleteUrl(id) {
    for (var i = 0; i < db['urls'].length; i++) {
        if (db['urls'][i]['id'] == id) {
            db['urls'].splice(i, 1);
        }
    }

    writeToFile(db);
}


// function to get all urls from database
function getUrls() {
    // return db as a copy
    let urls = Object.assign({}, db['urls']);
    return {'urls': urls};
}

// function to check if an url is in database
function checkUrl(url) {
    for (var i = 0; i < db['urls'].length; i++) {
        if (db['urls'][i]['url'] === url) {
            return true;
        }
    }
    return false;
}

// function to get a url from database based on id
function getUrlInfo(id) {
    // convert id to int
    id = parseInt(id);

    for (var i = 0; i < db['urls'].length; i++) {
        if (db['urls'][i]['id'] === id) {
            return db['urls'][i];
        }
    }
    return null;
}


// exports all functions
module.exports = {
    saveUrl: saveUrl,
    deleteUrl: deleteUrl,
    getUrls: getUrls,
    checkUrl: checkUrl,
    getUrlInfo: getUrlInfo
};