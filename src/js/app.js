
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
		console.log(AddressbookMessage)
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

function log_protobuf(){
	var input = document.getElementById("search").elements[0];
	console.log(input.value);


	var protobuf = require("protobufjs");
	var axios = require('axios');
	

	var LogMessage;

	protobuf.load("static/log_collection.proto", function(err, root){
		if (err)
	        console.log(err)
		LogMessage = root.lookupType("tutorial.LogCollection");
	});

	axios.post("http://127.0.0.1:5000/pid",{
		pid: input.value
	},{
		responseType: "arraybuffer"
	}).then(function(response){
		console.log('response', response)
		var msg = LogMessage.decode(new Uint8Array(response.data)) 
		console.log('msg', msg)
		var resObj = LogMessage.toObject(msg)
		console.log('resObj', resObj)
	})

	
}

window.get_json_test=get_json_test;
window.get_protobuf_test=get_protobuf_test;
window.log_protobuf=log_protobuf;


