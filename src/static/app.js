
var messages = require('./addressbook_pb.js');

// var message = new messages.AddressBook();

$.ajax({
	type: 'GET',
    url:'http://127.0.0.1:5000/test',
    headers: {'contentType':'application/x-protobuf'},
    success:function (data) {
        let ab = messages.AddressBook.deserializeBinary(data)
		console.log(ab.toObject()) 
    },error:function (error) {
        console.log(error)
    }
});

