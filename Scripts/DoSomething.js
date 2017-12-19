var db = openDatabase('monkerDB', '1.0', 'Test DB', 2 * 1024 * 1024);


db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM weights', [], function (tx, results) {
        var len = results.rows.length, i;
        
        for (i = 0; i < len; i++) {
            msg = "<p><b>" + results.rows.item(i).log + "</b></p>";

            var documentIDus= '#us' + results.rows.item(i).weightClass;
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

function clearCache() {
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE weights');
    });

    window.location.reload(true);
    getFinalScore();
};



function AddDomElem() {

    var parentNode = $("#TestAppend");
    
   
    var weightClassPanel = document.createElement("div");
    weightClassPanel.id = "test";
    weightClassPanel.class = "weightClassPanel";



    var weightLabel = document.createElement("label");
    weightLabel.appendChild(document.createTextNode("this is my test"));

    weightClassPanel.append(weightLabel);


    var weightClassOptions = document.createElement("div");
    weightClassOptions.id = "ustest";
    weightClassOptions.class = "weightClassPanel";


    var weightClassSelect = document.createElement("select");
    var weightClassSelect1 = document.createElement("option");
        weightClassSelect1.append(new Option("3", "3"));
    var weightClassSelect2 = document.createElement("option");
        weightClassSelect2.append(new Option("4", "4"));
    var weightClassSelect3 = document.createElement("option");
        weightClassSelect3.append(new Option("5", "5"));
    var weightClassSelect4 = document.createElement("option");
        weightClassSelect4.append(new Option("6", "6"));

        weightClassSelect.appendChild(weightClassSelect1);
        weightClassSelect.appendChild(weightClassSelect2);
        weightClassSelect.appendChild(weightClassSelect3);
        weightClassSelect.appendChild(weightClassSelect4);

        weightClassOptions.appendChild(weightClassSelect);

    //    < div id= "285" class="weightClassPanel" >
    //    <div class="weightClassLabel">
    //        <label>285</label>
    //    </div>
    //    <div class="weightClassOptions">
    //        <select id="us285" onchange="CalcScore(us285)" class="weightSelectUs">
    //            <option>0</option>
    //            <option>3</option>
    //            <option>4</option>
    //            <option>5</option>
    //            <option>6</option>
    //        </select>
    //    </div>

    //    <div class="weightClassOptions">
    //        <select id="them285" onchange="CalcScore(them285)" class="weightSelectThem">
    //            <option>0</option>
    //            <option>3</option>
    //            <option>4</option>
    //            <option>5</option>
    //            <option>6</option>
    //        </select>
    //    </div>
    //</div>

   // parentNode.appendChild(t);

    parentNode.append(weightClassPanel);
    parentNode.append(weightClassOptions);


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
    if (first === 'us'){
        //check them to see if there is a value, if there is, 0 it out
        var themElem = '#them' + weight;
        $(themElem).val('0');
    }
    else {
        var usElem = '#us' + weight;
        $(usElem).val('0');
    }
    

};