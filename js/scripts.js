var importedJSON;
function loadLists(data2) {
    var splash = document.getElementById("splashscreen");
    var content = document.getElementById("bob");
    content.removeAttribute("hidden"); 
    splash.setAttribute("hidden", true); 




    //console.log('START SCRIPT');
        importedJSON = data2;
        var myNode = document.getElementById("mapsListDiv");
        var myNode2 = document.getElementById("nodelete");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        myNode.appendChild(myNode2);

        $.each(data2, function(index, element) {
            //console.log(element);
            if (index == "Types") {
                $.each(element, function(indx, elemnt) {
                    //console.log(elemnt.displayName);
                    const a = document.createElement('button');
                    a.setAttribute('type', "button");
                    a.setAttribute('class', "list-group-item collapsed");
                    a.setAttribute("aria-controls", "variant0");
                    a.setAttribute('data-toggle', "collapse");
                    //a.setAttribute('href', "#variant0");
                    a.setAttribute('aria-expanded', "false");
                    a.setAttribute('data-toggle', "modal");
                    a.setAttribute('data-target', "#exampleModal");
                    a.setAttribute('data-dispname', elemnt.displayName);
                    a.setAttribute('data-typename', elemnt.typeName);
                    a.setAttribute('data-newtype', "false");
                    if (typeof elemnt.SpecificMaps != "undefined") {

                        var mapslist = "";
                        $.each(elemnt.SpecificMaps, function(index, elemeno) {
                           mapslist = mapslist + elemeno.mapName + "=" + elemeno.displayName + ",";
                    
                         });
                        if (mapslist.substring(mapslist.length-1) == ",") {
                            mapslist = mapslist.substring(0, mapslist.length-1);
                         }
                        a.setAttribute('data-spefmaps', mapslist);
                    }
                    



                    const displayname = document.createElement('div');
                    displayname.setAttribute('class', "variantContent");
                    displayname.textContent = elemnt.displayName;

                    const typename = document.createElement('div');
                    typename.setAttribute('class', "variantContent");
                    typename.textContent = elemnt.typeName;


                    const spefmaps = document.createElement('div');
                    spefmaps.setAttribute('class', "variantContent");

                    if (typeof elemnt.SpecificMaps != "undefined") {
                        spefmaps.textContent = elemnt.SpecificMaps.length;
                    }
                    else {
                        spefmaps.textContent = '0'
                    }

                    const cmds = document.createElement('div');
                    cmds.setAttribute('class', "variantContent");
                    if (typeof elemnt.commands != "undefined") {
                        a.setAttribute('data-cmds', elemnt.commands);
                        cmds.textContent = elemnt.commands.length;
                    }
                    else {
                        cmds.textContent = '0'
                    }

                    //a.textContent = elemnt.displayName;
                    var app = document.getElementById("mapsListDiv");
                    app.appendChild(a);
                    a.appendChild(displayname);
                    a.appendChild(typename);
                    a.appendChild(cmds);
                    a.appendChild(spefmaps);

                });
            }
            
        });

}

$('#btnSubmit').unbind().click(function (e) {
    
   // var newtype = document.getElementById("btnSubmit").data('newtype');
   var modal = $(this)
    var newtype = false;
    var input_displayName = $("#exampleModal").find('.modal-body #display-name').val();
    var input_typeName = $("#exampleModal").find('.modal-body #type-name').val();
    var input_cmds = $("#exampleModal").find('.modal-body #commands-text').val();
    var input_spefMaps = $("#exampleModal").find('.modal-body #maps-text').val();
    var ogname = $("#exampleModal").find('.modal-title').text();
    if (ogname == 'New Entry') {
        newtype = true;
    }
    if (!newtype) {
        console.log("EDITIG AN EXISTING ENTRY YOU DUMBO")
        $.each(importedJSON, function(index, element) {
        if (index == "Types") {
            $.each(element, function(indx, elemnt) {
                //console.log(elemnt.displayName);
                
                    if (elemnt.displayName == ogname.substring(15)){
                        elemnt.displayName = input_displayName;
                        elemnt.typeName = input_typeName;
                        if (input_cmds.substring(input_cmds.length-1) == ",") {
                            input_cmds = input_cmds.substring(0, input_cmds.length-1);                
                        }
                        elemnt.commands = input_cmds.split(",");

                        var temparray = input_spefMaps.split(",");
                        var temp = []
                        
                        temparray.forEach(function(mappair, i) {
                            //console.log(mappair);
                            var temparray2 = mappair.split("=");

                            var temp2 = {
                                "displayName": "DeathCurve.v4",
                                "mapName": "DeathCurve.v4"
                            };
                            temp2.displayName = temparray2[1];
                            temp2.mapName = temparray2[1];
                             temp.push(temp2);
                             var ismapalready = false
                                $.each(importedJSON, function(index, elementt) {
                                    if (index == "Maps") {
                                         $.each(elementt, function(indx, elemntt) {   
                                         if (elemntt.mapName == temp2.mapName){
                                            ismapalready = true
                                         }
                                        
                                        }) 
                                    }
                                })
                                if (!ismapalready) {
                                    importedJSON.Maps[importedJSON.Maps.length] = temp2;
                                }
                                
                             


                             //console.log (temp)
                        });    
                    
                        elemnt.SpecificMaps = temp;
                    }
                
                

            });
        }
        
        });
    }
    else if (newtype) {
        console.log("CREATING A NEW TYPE YOU IDIOT")
        var temp =  {
            "displayName": "GooseHunt",
            "typeName": "GooseHunt",
            "commands": [
              "Server.SprintEnabled 0",
              "Server.AssassinationEnabled 0",
              "Server.NumberOfTeams 2"
            ],
            "SpecificMaps": [
              
            ]
          };
        var temp2 = {
                "displayName": "DeathCurve.v4",
                "mapName": "DeathCurve.v4"
        };
        temp.displayName = input_displayName;
        temp.typeName = input_typeName;
        temp.commands = input_cmds.split(",");

        var temparray = input_spefMaps.split(",");
            temparray.forEach(function(mappair, i) {
                //console.log(mappair);
                var temparray2 = mappair.split("=");
                temp2.displayName = temparray2[1];
                temp2.mapName = temparray2[1];
                temp.SpecificMaps[temp.SpecificMaps.length] = temp2;
                var ismapalready = false
                                $.each(importedJSON, function(index, elementt) {
                                    if (index == "Maps") {
                                         $.each(elementt, function(indx, elemntt) {   
                                         if (elemntt.mapName == temp2.mapName){
                                            ismapalready = true
                                         }
                                        
                                        }) 
                                    }
                                })
                                if (!ismapalready) {
                                    importedJSON.Maps[importedJSON.Maps.length] = temp2;
                                }

                //console.log(mappair);

            });    
            importedJSON.Types[importedJSON.Types.length] = temp;
            
            

        //console.log(importedJSON);

    }
    //console.log(importedJSON);
    loadLists(importedJSON);
    

});

$('#btnDelete').unbind().click(function (e) {
    
    // var newtype = document.getElementById("btnSubmit").data('newtype');
    var modal = $(this)
    //var newtype = modal.data('newtype');
     var ogname = $("#exampleModal").find('.modal-title').text();
     if (ogname != 'New Entry') {
         $.each(importedJSON, function(index, element) {
         if (index == "Types") {
             $.each(element, function(indx, elemnt) {
                 //console.log(elemnt.displayName);
                 
                     if (elemnt.displayName == ogname.substring(15)){
                         delete elemnt.displayName;
                         delete elemnt.typeName;
                         delete elemnt.commands;
                         delete elemnt.SpecificMaps;
                         element.splice(indx,1);

                         return false;
                     }
                 
                 
 
             });
         }
         
         });
     }
     console.log(importedJSON);
     loadLists(importedJSON);
     
 
 });
 


$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var displaynome = button.data('dispname') // Extract info from data-* attributes
    var typname = button.data('typename')
    var cmnds = button.data('cmds')
    var smaps = button.data('spefmaps')
    var newdata = button.data('newtype')
   //var savebtn = document.getElementById("btnSubmit");
    //savebtn.setAttribute('data-newtype', newdata);

    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    if (newdata == true) {
        modal.find('.modal-title').text('New Entry')
    }
    else {
        modal.find('.modal-title').text('Editing Entry: ' + displaynome)
    }
    modal.find('.modal-body #display-name').val(displaynome)
    modal.find('.modal-body #type-name').val(typname)
    modal.find('.modal-body #commands-text').val(cmnds)
    modal.find('.modal-body #maps-text').val(smaps)

    
  })

  const {ipcRenderer} = require('electron')
  require('electron').ipcRenderer.on('save', (event, message) => {
   ipcRenderer.send('saveme', JSON.stringify(importedJSON, null, 4))

  })