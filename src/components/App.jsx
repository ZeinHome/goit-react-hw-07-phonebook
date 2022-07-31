import { Container } from './Appp.styled';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import Contact from './Contact/Contact';
import { useFetchContactsQuery } from '../redux/api-service';

export default function App() {
  const fetchContacts = useFetchContactsQuery();

  return (
    <Container>
      <Section title="Phonebook" />
      <ContactForm contacts={fetchContacts} />

      <Section title="Contacts" />
      <Contact contacts={fetchContacts} />
    </Container>
  );
}
