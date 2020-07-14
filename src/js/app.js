
function get_json_test(){
	$.ajax('/json',{
		dataType: 'json',
		success: function (data,status,xhr) {   // success callback function
	        $('p#json').append(data.name + ' ' + data.ID);
	    },
	    error: function (jqXhr, textStatus, errorMessage) { // error callback 
	        $('p#json').append('Error: ' + errorMessage);
	    }
	});
}

function get_protobuf_test(){

	var protobuf = require("protobufjs");
	var axios = require('axios');
	

	var AddressbookMessage;

	protobuf.load("static/addressbook.proto", function(err, root){
		if (err)
	        console.log(err)
		AddressbookMessage = root.lookupType("tutorial.AddressBook");
	});

	axios.get("http://127.0.0.1:5000/protobuf",{
		responseType: "arraybuffer"
	}).then(function(response){
		console.log('response', response)
		var msg = AddressbookMessage.decode(new Uint8Array(response.data)) 
		console.log('msg', msg)
		var resObj = AddressbookMessage.toObject(msg)
		console.log('resObj', resObj)
		$('p#protobuf').append('name:'+resObj.people[0].name + ' id:' + resObj.people[0].id +' email:' + resObj.people[0].email + ' phoneNumber:' + resObj.people[0].phones[0].number);
	})
}

window.get_json_test=get_json_test;
window.get_protobuf_test=get_protobuf_test;


