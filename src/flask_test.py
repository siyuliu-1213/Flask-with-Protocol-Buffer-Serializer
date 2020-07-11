import http.client

from flask import Flask, request, send_file, render_template
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

@app.route('/test', methods=['GET'])
def test():
    return json.dumps(data,ensure_ascii=False)

@app.route('/')
def index():
    return render_template('home.html', name=name)

if __name__=='__main__':
    app.run(debug=True)