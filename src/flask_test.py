import http.client

from flask import Flask, request, send_file, render_template, jsonify, json, make_response
import jsons
import addressbook_pb2
import io

app = Flask(__name__)
address_book = addressbook_pb2.AddressBook()

def ListPeople(address_book):
    data = []
    for person in address_book.people:
        person_data = {}
        person_data['id'] = person.id
        person_data['name'] = person.name
        
        if person.HasField('email'):
            person_data['email'] = person.email

        phone_numbers = []

        for phone_number in person.phones:
            phone = {}
            if phone_number.type == addressbook_pb2.Person.MOBILE:
                phone['type'] = 'Mobile'
            elif phone_number.type == addressbook_pb2.Person.HOME:
                phone['type'] = 'Home'
            elif phone_number.type == addressbook_pb2.Person.WORK:
                phone['type'] = 'Work'
            phone['number'] = phone_number.number
            phone_numbers.append(phone)

        person_data['phones'] = phone_numbers

        data.append(person_data)

    return data


@app.route('/load', methods=['POST'])
def load():
    address_book.ParseFromString(request.data)

    print (address_book)

    return '', http.client.NO_CONTENT


@app.route('/save', methods=['GET'])
def save():
    return send_file(
        io.BytesIO(address_book.SerializeToString()),
        as_attachment=False,
        mimetype='attachment/x-protobuf'
    )

user = {
    "name": "siyu",
    "ID": 1
}

@app.route('/json', methods=['GET'])
def test_json():
    return jsonify(name=user["name"], ID=user["ID"])

@app.route('/protobuf', methods=['GET'])
def test_protobuf():  
    # with open("protofile1.pb") as f:
    #     return jsonify(f.read())
    people = address_book.people.add()
    people.id = 3
    people.name = "siyu"
    people.email = "test_protobuf@amazon.com"

    phone = people.phones.add()
    phone.number = "1234567"
    phone.type = addressbook_pb2.Person.WORK

    print(address_book)

    # proto_people = []
    
    # proto_people.append(addressbook_pb2.Person(
    #     name = "siyu",
    #     id = 4,
    #     PhoneType = 
    # ))
    
    # article_collection_pb2.ArticleCollection(articles = proto_articles)

    # ab_serialized = address_book.SerializeToString()

    # print(ab_serialized)

    # ab_dict = jsons.dump(ab_serialized)

    # print(ab_dict)

    # return jsonify(ab_dict)

    # return send_file(
    #     io.BytesIO(address_book.SerializeToString()),
    #     mimetype='application/x-protobuf'
    # )

    return address_book.SerializeToString()

@app.route('/')
def index():
    return render_template('home.html')

if __name__=='__main__':
    app.run(debug=True)