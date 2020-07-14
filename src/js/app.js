
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

// async function get_protobuf_test(){
// 	var messages = require('./addressbook_pb.js');
// 	var protobuf = require("protobufjs");

// 	// var message = new messages.AddressBook();

// 	// $.ajax('/protobuf',{
// 	// 	dataType: 'text',
// 	//     success:function (data,status,xhr) {
// 	//     	console.log(data)
// 	//     	// console.log(data.data)
// 	//         let ab = messages.AddressBook.deserializeBinary(data)
// 	//   //       let pl = ab.getPeopleList()
// 	// 		// console.log(pl) 
// 	// 		console.log(ab.toObject())
// 	// 		// console.log("success")
// 	//     },error:function (jqXhr, textStatus, errorMessage) {
// 	//         console.log(errorMessage)
// 	//     }
// 	// });
// 	const response = await axios.get("http://127.0.0.1:5000/protobuf", {
//         responseType: "arraybuffer"
//       });

// 	let ab = messages.AddressBook.decode(new Uint8Array(response.data))
// 	console.log(ab.toObject())
// }

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
		var msg = AddressbookMessage.decode(new Uint8Array(response.data)) // new Uint8Array() 坑点！
		console.log('msg', msg)
		var resObj = AddressbookMessage.toObject(msg)
		console.log('resObj', resObj)
	})

	// protobuf.load("addressbook.proto", function(err, root) {
	//     if (err)
	//         throw err;

	//     // Obtain a message type
	//     AddressbookMessage = root.lookupType("tutorial.AddressBook");

	//     console.log(AddressbookMessage)

	// 	var xhr = new XMLHttpRequest()
	// 	var url = "http://127.0.0.1:5000/protobuf"
	// 	xhr.open('GET', url, true)
	// 	xhr.responseType = 'arraybuffer' // 坑点！
	// 	// xhr.setRequestHeader('Content-Type', 'application/protobuf') //坑点！
	// 	xhr.onload = function (response) {
	// 		console.log('response', response)
	// 		var msg = AddressbookMessage.decode(new Uint8Array(xhr.response)) // new Uint8Array() 坑点！
	// 		console.log('msg', msg)
	// 		var resObj = AddressbookMessage.toObject(msg)
	// 		console.log('resObj', resObj)
	// 	}
	// 	xhr.send()
	// });

	
}

window.get_json_test=get_json_test;
window.get_protobuf_test=get_protobuf_test;


