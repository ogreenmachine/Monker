var db = openDatabase('monkerDB', '1.0', 'Test DB', 2 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS weights (weightClass unique, us,them)');
    tx.executeSql('INSERT INTO weights VALUES("106",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("113",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("120",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("126",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("132",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("138",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("145",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("152",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("160",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("170",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("182",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("195",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("220",0,0)');
    tx.executeSql('INSERT INTO weights VALUES("285",0,0)');
});



//weight template
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS weightTemplate (weightClass unique, sort)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("106",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("113",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("120",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("126",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("132",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("138",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("145",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("152",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("160",99)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("170",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("182",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("195",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("220",0)');
    tx.executeSql('INSERT INTO weightTemplate VALUES("285",0)');
});