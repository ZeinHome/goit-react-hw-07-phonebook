import {
  ContactList,
  ContactItem,
  Delete,
  WatchWrapper,
} from './Contact.styled';
import { changeFilter } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Watch } from 'react-loader-spinner';
import { useDeleteContactMutation } from '../../redux/api-service';

export default function Contact({
  contacts: { data: contacts, isFetching, isError },
}) {
  const filterValue = useSelector(state => state.filter);
  const value = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <>
      {isFetching && (
        <WatchWrapper>
          <Watch color="#00BFFF" height={200} width={200} ariaLabel="loading" />
        </WatchWrapper>
      )}

      {!isFetching && !isError && contacts && (
        <div>
          <input
            type="text"
            name="filter"
            value={value}
            onChange={e => dispatch(changeFilter(e.currentTarget.value))}
          />
          <ContactList>
            {contacts
              .filter(({ name }) =>
                name.toLowerCase().includes(filterValue.toLowerCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ id, name, number }) => {
                return (
                  <ContactItem key={id}>
                    {name}: {number}
                    <Delete
                      id={id}
                      onClick={() => deleteContact(id)}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Deleting...' : 'Delete'}
                    </Delete>
                  </ContactItem>
                );
              })}
          </ContactList>
        </div>
      )}
    </>
  );
}
