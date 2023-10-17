import { useEffect, useState } from 'react';
import { Container } from './App.styled';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';

function App() {
  const localData = JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState(() =>
    localData && localData.length !== 0
      ? localData
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ]
  );
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const getLocalData = () => {
      return JSON.parse(localStorage.getItem('contacts'));
    };
    if (getLocalData() && getLocalData().length !== 0) {
      setContacts(getLocalData());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactsId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactsId));
  };

  const onSubmitContact = item => {
    const { name, number } = item;
    if (contacts.find(namePhonsbooks => namePhonsbooks.name === name)) {
      alert('Sory, your phonebook have same name yet');
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts(prevState => [newContact, ...prevState]);
    console.log(contacts);
    return;
  };

  const hendleChange = event => {
    setFilter(event.target.value);
  };

  const filterContactsByName = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filterContactsByName();
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmitContact={onSubmitContact} />
      <h2>Contacts</h2>
      <Filter hendleChange={hendleChange} value={filter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </Container>
  );
}

export default App;
