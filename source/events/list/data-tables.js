$(document).ready( function () {
    var eventsTable = $('#eventsTable').DataTable({
      "processing": true,
      ajax: {
        url: "https://q28yt6nr65.execute-api.us-east-1.amazonaws.com/dev/events",
        "type": "GET",
        "cache": true,
        "complete": function(xhr, status) {
          //console.log(xhr.responseText);
          console.log(status);
        }
      },
      "columnDefs": [
      {
            "targets": 0,
            "data": "event_id",
            "visible": false
        },
        {
            "targets": 1,
            "data": "source_id",
            "visible": false
        },
        {
            "targets": 2,
            "data": "title",
        },
        {
            "targets": 3,
            "data": "host",
             "render":  function ( data, type, row, meta ) {
              if(data) {
                return data
              }
              return data;
            }
        },
        {
            "targets": 4,
            "orderDate": [ 4, 0 ],
            "data": "start_time",
            "render":  function ( data, type, row, meta ) {
              var date = new Date(data * 1000);
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var day = date.getDate();
              var hours = date.getHours();
              var minutes = ("00" + date.getMinutes()).slice(-2);
              return year + "-" + month + "-" + day + " " + hours + ":" + minutes
            }
        },
        {
            "targets": 5,
            "data": "end_time",
            "render":  function ( data, type, row, meta ) {
              var date = new Date(data * 1000);
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var day = date.getDate();
              var hours = date.getHours();
              var minutes = ("00" + date.getMinutes()).slice(-2);
              return year + "-" + month + "-" + day + " " + hours + ":" + minutes
            }
        },
        {
            "targets": 6,
            "data": "location",
            "render":  function ( data, type, row, meta ) {
              return data.name + '<br/>' + data.street + '<br/>' + data.city + ' ' + data.state + ', ' + data.zip;
            }
        }
      ]
    });

    var detailsTable = $('#detailsTable').DataTable();



    $('#eventsTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            eventsTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var event_id = eventsTable.row( this ).data().event_id;
            detailsTable.clear().destroy()
            detailsTable = $('#detailsTable').DataTable({
              ajax: {
                url: "https://q28yt6nr65.execute-api.us-east-1.amazonaws.com/dev/event/" + event_id,
                "type": "GET",
                "cache": true,
                "complete": function(xhr, status) {
                  //console.log(xhr.responseText);
                  console.log(status);
                }
              },
              "columnDefs": [
              {
                    "targets": 0,
                    "data": "image",
                    "render":  function ( data, type, row, meta ) {
                      return '<img src="' + data + '" style="max-width:300px;max-height:300px;float:bottom;"> </img>';
                    }
                },
                {
                    "targets": 1,
                    "data": "description",
                    "render":  function ( data, type, row, meta ) {
                      return '<div style="padding-bottom:50px">' + data + '</div>';
                    }
                },
                {
                    "targets": 2,
                    "data": "source_url",
                    "render":  function ( data, type, row, meta ) {
                      return '<a href="' + data + '"> Go to Event Page </a>';
                    }
                }
              ]
            });
        }
    } );





    $(".segmented label input[type=radio]").each(function(){
        $(this).on("change", function(){
            if($(this).is(":checked")){
               $(this).parent().siblings().each(function(){
                    $(this).removeClass("checked");
                });
                $(this).parent().addClass("checked");
            }
        });
    });


  });