const yaml = require('js-yaml');
const fs = require('fs');

try {
    const data = yaml.safeLoad(fs.readFileSync('./holidays.yml', 'utf8'));

    const result = Object.keys(data).map(function(key) {
        const d = new Date(key);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day =  ('0' + d.getDate()).slice(-2);

        return {date: `${year}-${month}-${day}`, name: this[key]};
    }, data);

    const output = {
        dates: result
    }

    fs.writeFile('holidays.json', JSON.stringify(output, null, '  '));
} catch(e) {
    console.log(e);
}