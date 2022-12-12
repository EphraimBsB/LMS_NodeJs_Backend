let isbn = require('node-isbn');


let oclcB;
const oclcFunction = async(oclc) => {
     isbn.resolve(oclc, cb);
     console.log(oclcB);
}

const cb = async(err, book) => {
        if (err) {
            return null;
        } else {
            oclcB = book;
        }
    }
module.exports = oclcFunction ;