/* app.js */
const content = document.getElementById('content');
const display = document.getElementById('display');

let events = [];
let locations = [];
let contacts = [];

document.getElementById('events-link').addEventListener('click', () => {
    loadEvents();
    displayRecords(events, 'Eventos');
});
document.getElementById('locations-link').addEventListener('click', () => {
    loadLocations();
    displayRecords(locations, 'Ubicaciones');
});
document.getElementById('contacts-link').addEventListener('click', () => {
    loadContacts();
    displayRecords(contacts, 'Contactos');
});

function loadEvents() {
    content.innerHTML = `
        <h2>Eventos</h2>
        <form id="event-form">
            <label for="title">Título:</label>
            <input type="text" id="title" name="title" required><br>
            <label for="guests">Invitados:</label>
            <input type="text" id="guests" name="guests"><br>
            <label for="date">Fecha:</label>
            <input type="date" id="date" name="date" required><br>
            <label for="time">Hora:</label>
            <input type="time" id="time" name="time" required><br>
            <label for="timezone">Zona Horaria:</label>
            <input type="text" id="timezone" name="timezone" required><br>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description"></textarea><br>
            <label for="recurrence">Repetición:</label>
            <input type="text" id="recurrence" name="recurrence"><br>
            <label for="reminder">Recordatorio:</label>
            <input type="text" id="reminder" name="reminder"><br>
            <label for="category">Clasificación:</label>
            <input type="text" id="category" name="category"><br>
            <label for="location">Lugar:</label>
            <input type="text" id="location" name="location"><br>
            <button type="submit">Agregar Evento</button>
        </form>
    `;
    document.getElementById('event-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const event = {
            title: document.getElementById('title').value,
            guests: document.getElementById('guests').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            timezone: document.getElementById('timezone').value,
            description: document.getElementById('description').value,
            recurrence: document.getElementById('recurrence').value,
            reminder: document.getElementById('reminder').value,
            category: document.getElementById('category').value,
            location: document.getElementById('location').value
        };
        events.push(event);
        displayRecords(events, 'Eventos');
    });
}

function loadLocations() {
    content.innerHTML = `
        <h2>Ubicaciones</h2>
        <form id="location-form">
            <label for="loc-title">Título:</label>
            <input type="text" id="loc-title" name="loc-title" required><br>
            <label for="address">Dirección:</label>
            <input type="text" id="address" name="address" required><br>
            <label for="coordinates">Coordenadas:</label>
            <input type="text" id="coordinates" name="coordinates" required><br>
            <button type="submit">Agregar Ubicación</button>
        </form>
    `;
    document.getElementById('location-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const location = {
            title: document.getElementById('loc-title').value,
            address: document.getElementById('address').value,
            coordinates: document.getElementById('coordinates').value
        };
        locations.push(location);
        displayRecords(locations, 'Ubicaciones');
    });
}

function loadContacts() {
    content.innerHTML = `
        <h2>Contactos</h2>
        <form id="contact-form">
            <label for="salutation">Saludo:</label>
            <input type="text" id="salutation" name="salutation" required><br>
            <label for="full-name">Nombre Completo:</label>
            <input type="text" id="full-name" name="full-name" required><br>
            <label for="id-number">Número de Identificación:</label>
            <input type="text" id="id-number" name="id-number" required><br>
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required><br>
            <label for="phone">Teléfono:</label>
            <input type="text" id="phone" name="phone" required><br>
            <label for="photo">Fotografía:</label>
            <input type="file" id="photo" name="photo"><br>
            <button type="submit">Agregar Contacto</button>
        </form>
    `;
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const contact = {
            salutation: document.getElementById('salutation').value,
            fullName: document.getElementById('full-name').value,
            idNumber: document.getElementById('id-number').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        contacts.push(contact);
        displayRecords(contacts, 'Contactos');
    });
}

function displayRecords(records, type) {
    display.innerHTML = `<h2>${type} Registrados</h2><ul>${records.map((record, index) => `
        <li>
            <h3>${record.title || record.fullName || 'Registro'}</h3>
            <p>${Object.entries(record).map(([key, value]) => `<strong>${key}:</strong> ${value}`).join('<br>')}</p>
            <button class="edit-button" onclick="editRecord('${type}', ${index})">Editar</button>
            <button class="delete-button" onclick="deleteRecord('${type}', ${index})">Eliminar</button>
        </li>
    `).join('')}</ul>`;
}

function editRecord(type, index) {
    let record = {};
    if (type === 'Eventos') {
        record = events[index];
        loadEvents();
        document.getElementById('title').value = record.title;
        document.getElementById('guests').value = record.guests;
        document.getElementById('date').value = record.date;
        document.getElementById('time').value = record.time;
        document.getElementById('timezone').value = record.timezone;
        document.getElementById('description').value = record.description;
        document.getElementById('recurrence').value = record.recurrence;
        document.getElementById('reminder').value = record.reminder;
        document.getElementById('category').value = record.category;
        document.getElementById('location').value = record.location;
        document.getElementById('event-form').addEventListener('submit', (e) => {
            e.preventDefault();
            events[index] = {
                title: document.getElementById('title').value,
                guests: document.getElementById('guests').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                timezone: document.getElementById('timezone').value,
                description: document.getElementById('description').value,
                recurrence: document.getElementById('recurrence').value,
                reminder: document.getElementById('reminder').value,
                category: document.getElementById('category').value,
                location: document.getElementById('location').value
            };
            displayRecords(events, 'Eventos');
        });
    } else if (type === 'Ubicaciones') {
        record = locations[index];
        loadLocations();
        document.getElementById('loc-title').value = record.title;
        document.getElementById('address').value = record.address;
        document.getElementById('coordinates').value = record.coordinates;
        document.getElementById('location-form').addEventListener('submit', (e) => {
            e.preventDefault();
            locations[index] = {
                title: document.getElementById('loc-title').value,
                address: document.getElementById('address').value,
                coordinates: document.getElementById('coordinates').value
            };
            displayRecords(locations, 'Ubicaciones');
        });
    } else if (type === 'Contactos') {
        record = contacts[index];
        loadContacts();
        document.getElementById('salutation').value = record.salutation;
        document.getElementById('full-name').value = record.fullName;
        document.getElementById('id-number').value = record.idNumber;
        document.getElementById('email').value = record.email;
        document.getElementById('phone').value = record.phone;
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            contacts[index] = {
                salutation: document.getElementById('salutation').value,
                fullName: document.getElementById('full-name').value,
                idNumber: document.getElementById('id-number').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            displayRecords(contacts, 'Contactos');
        });
    }
}

function deleteRecord(type, index) {
    if (type === 'Eventos') {
        events.splice(index, 1);
        displayRecords(events, 'Eventos');
    } else if (type === 'Ubicaciones') {
        locations.splice(index, 1);
        displayRecords(locations, 'Ubicaciones');
    } else if (type === 'Contactos') {
        contacts.splice(index, 1);
        displayRecords(contacts, 'Contactos');
    }
}
