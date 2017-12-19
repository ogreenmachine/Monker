var db = openDatabase('monkerDB', '1.0', 'Test DB', 2 * 1024 * 1024);


db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM weights', [], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {
            msg = "<p><b>" + results.rows.item(i).log + "</b></p>";

            var documentIDus = '#us' + results.rows.item(i).weightClass;
            var documentIDthem = '#them' + results.rows.item(i).weightClass;

            //$(documentID).select(results.rows.item(i).them);
            $(documentIDus).val(results.rows.item(i).us);
            $(documentIDthem).val(results.rows.item(i).them);

            if (results.rows.item(i).them > 0)
                $(documentIDthem).addClass('highlight');
            else if (results.rows.item(i).us > 0)
                $(documentIDus).addClass('highlight');
        }
        getFinalScore();
    }, null);


});

//populate weightclassStart
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM weightTemplate', [], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {
            $('#startingWeightClassSlect').append(new Option(results.rows.item(i).weightClass), results.rows.item(i).weightClass);
        }

    }, null);


});
function arrangeWeights(event) {

    var seedID;
    var totalRecords;
    var updateCTR = 1;

    //grab total # of records in weights tempalte
    db.transaction(function (tx) {
        tx.executeSql("select *  from weightTemplate", [], function (tx, results) {

            totalRecords = results.rows.length;

        }, null);
    });

    //weightTemplate
    db.transaction(function (tx) {
        tx.executeSql("update weightTemplate set sort=? where weightClass=?", [0, event.value], function (transaction, result) {
        }, function (transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);

    ///get rowID of updated record
    db.transaction(function (tx) {
        tx.executeSql("select rowid from weightTemplate where weightClass=?", [event.value], function (tx, results) {

            seedID = results.rows.item(0).rowid;

        }, null);
    });


    ///Update records after
    db.transaction(function (tx) {
        //find # records left
        var offsetRecords = totalRecords - seedID;

        //  tx.executeSql("select weightTemplate LIMIT ? OFFSET ?", [14, seedID], function (tx, results) {
        tx.executeSql("select weightClass from weightTemplate", [], function (tx, results) {
            var len = results.rows.length, i;

            for (i = 0; i < len; i++) {
                var weightToUpdate = results.rows.item(i).weightClass;
                db.transaction(function (tx) {
                    tx.executeSql("update weightTemplate set sort=? where weightClass=?", ["1", weightToUpdate], function (transaction, results) {
                    }, function (transaction, error) {
                        console.log(error);
                    });
                }, transError, transSuccess);


                updateCTR++;

            }

        }, null);
    });





    function transError(t, e) {
        console.log(t);
        console.log(e);
        console.error("Error occured ! Code:" + e.code + " Message : " + e.message);
    }

    function transSuccess(t, r) {
        console.info("Transaction completed Successfully!");
        console.log(t);
        console.log(r);
    }

};

function clearCache() {
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE weights');
    });

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE weightTemplate');
    });




    window.location.reload(true);
    getFinalScore();
};



function AddDomElem() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM weightTemplate ORDER by sort', [], function (tx, results) {
            var len = results.rows.length, i;

            for (i = 0; i < len; i++) {
                var documentWeightClass = results.rows.item(i).weightClass;

                var parentNode = $("#buildWeightClasses");

                var weightClassPanel = $("<div id='" + documentWeightClass + "'>");
                weightClassPanel.addClass('weightClassPanel');

                var weightLabellDiv = $("<div>");
                weightLabellDiv.addClass('weightClassLabel');

                var weightLabel = $("<label>");
                weightLabel.text(documentWeightClass);
                weightLabellDiv.append(weightLabel);
                weightClassPanel.append(weightLabellDiv);



                //###################################################################
                //add weight options us
                //###################################################################
                var weightClassOptionsUS = $("<div>");
                weightClassOptionsUS.addClass('weightClassOptions');
                var weightClassSelectUS = $("<select id='us" + documentWeightClass + "'>");

                var weightClassSelect1US = document.createElement("option");
                weightClassSelect1US.append(new Option("0", "0"));

                var weightClassSelect2US = document.createElement("option");
                weightClassSelect2US.append(new Option("3", "3"));

                var weightClassSelect3US = document.createElement("option");
                weightClassSelect3US.append(new Option("4", "4"));

                var weightClassSelect4US = document.createElement("option");
                weightClassSelect4US.append(new Option("5", "5"));

                var weightClassSelect5US = document.createElement("option");
                weightClassSelect5US.append(new Option("6", "6"));

                weightClassSelectUS.append(weightClassSelect1US);
                weightClassSelectUS.append(weightClassSelect2US);
                weightClassSelectUS.append(weightClassSelect3US);
                weightClassSelectUS.append(weightClassSelect4US);
                weightClassSelectUS.append(weightClassSelect5US);

                weightClassOptionsUS.append(weightClassSelectUS);
                weightClassOptionsUS.attr("onchange", "CalcScore(us" + documentWeightClass + ")");
                weightClassOptionsUS.addClass("weightSelectUs");
                //###################################################################
                //###################################################################




                //###################################################################
                //add weight options them
                //###################################################################
                var weightClassOptionsTHEM = $("<div>");
                weightClassOptionsTHEM.addClass('weightClassOptions');
                var weightClassSelectTHEM = $("<select id='them" + documentWeightClass + "'>");

                var weightClassSelect1THEM = document.createElement("option");
                weightClassSelect1THEM.append(new Option("0", "0"));

                var weightClassSelect2THEM = document.createElement("option");
                weightClassSelect2THEM.append(new Option("3", "3"));

                var weightClassSelect3THEM = document.createElement("option");
                weightClassSelect3THEM.append(new Option("4", "4"));

                var weightClassSelect4THEM = document.createElement("option");
                weightClassSelect4THEM.append(new Option("5", "5"));

                var weightClassSelect5THEM = document.createElement("option");
                weightClassSelect5THEM.append(new Option("6", "6"));

                weightClassSelectTHEM.append(weightClassSelect1THEM);
                weightClassSelectTHEM.append(weightClassSelect2THEM);
                weightClassSelectTHEM.append(weightClassSelect3THEM);
                weightClassSelectTHEM.append(weightClassSelect4THEM);
                weightClassSelectTHEM.append(weightClassSelect5THEM);

                weightClassOptionsTHEM.append(weightClassSelectTHEM);
                weightClassOptionsTHEM.attr("onchange", "CalcScore(them" + documentWeightClass + ")");
                weightClassOptionsTHEM.addClass("weightSelectThem");

                weightClassPanel.append(weightClassOptionsUS);
                weightClassPanel.append(weightClassOptionsTHEM);


                parentNode.append(weightClassPanel);
            }
        }, null);


    });

};

function CalcScore(event) {


    validateBox(event.id);
    addHighlight(event);


    var first = event.id.substr(0, 2);
    var weight = event.id.substr(event.id.length - 3);
    var usThem;
    if (first === 'us')
        usThem = 'us';
    else
        usThem = 'them';

    if (usThem == 'us') {
        db.transaction(function (tx) {
            tx.executeSql('update weights set us =?, them = 0 where weightClass=?', [parseInt(event.value), weight], function (transaction, result) {
            }, function (transaction, error) {
                console.log(error);
            });
        }, transError, transSuccess);
    }
    else {
        db.transaction(function (tx) {
            tx.executeSql('update weights set them =?, us = 0 where weightClass=?', [parseInt(event.value), weight], function (transaction, result) {
            }, function (transaction, error) {
                console.log(error);
            });
        }, transError, transSuccess);
    }

    function transError(t, e) {
        console.log(t);
        console.log(e);
        console.error("Error occured ! Code:" + e.code + " Message : " + e.message);
    }

    function transSuccess(t, r) {
        console.info("Transaction completed Successfully!");
        console.log(t);
        console.log(r);
    }


    getFinalScore();

};



function getFinalScore() {
    var scoreUs = 0;
    $('.weightSelectUs  option:selected').each(function () {
        scoreUs += parseInt($(this).text());
    });



    var scoreThem = 0;
    $('.weightSelectThem  option:selected').each(function () {
        scoreThem += parseInt($(this).text());
    });

    $('#us').html(scoreUs);
    $('#them').html(scoreThem);


    if (scoreUs > scoreThem) {
        $('#finalUs').addClass('highlight');
        $('#finalThem').removeClass('highlight');
    }
    else if (scoreUs < scoreThem) {
        $('#finalUs').removeClass('highlight');
        $('#finalThem').addClass('highlight');
    }
    else if (scoreUs === 0 && scoreThem === 0) {
        $('#finalUs').removeClass('highlight');
        $('#finalThem').removeClass('highlight');
    }
    else {
        $('#finalUs').addClass('highlight');
        $('#finalThem').addClass('highlight');
    }


};

function addHighlight(elemName) {
    $(elemName).addClass('highlight');

    var first = elemName.id.substr(0, 2);
    var weight = elemName.id.substr(elemName.id.length - 3);
    if (first === 'us') {
        //check them to see if there is a value, if there is, 0 it out
        var themElem = '#them' + weight;
        $(themElem).removeClass('highlight');
    }
    else {
        var usElem = '#us' + weight;
        $(usElem).removeClass('highlight');
    }


};

function validateBox(eleName) {

    var first = eleName.substr(0, 2);
    var weight = eleName.substr(eleName.length - 3);
    if (first === 'us') {
        //check them to see if there is a value, if there is, 0 it out
        var themElem = '#them' + weight;
        $(themElem).val('0');
    }
    else {
        var usElem = '#us' + weight;
        $(usElem).val('0');
    }


};