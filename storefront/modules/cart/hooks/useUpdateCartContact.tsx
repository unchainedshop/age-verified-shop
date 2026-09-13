import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

const UPDATE_CART_CONTACT_MUTATION = gql`
  mutation UpdateCartContact(
    $contact: ContactInput
    $meta: JSON
    $billingAddress: AddressInput
  ) {
    updateCart(
      contact: $contact
      meta: $meta
      billingAddress: $billingAddress
    ) {
      _id
      contact {
        emailAddress
        telNumber
      }
    }
  }
`;

const useUpdateCartContact = () => {
  const [updateCartContactMutation] = useMutation<any>(
    UPDATE_CART_CONTACT_MUTATION,
  );

  const updateCartContact = async ({ contact, meta }) => {
    await updateCartContactMutation({
      variables: { contact, meta, billingAddress: {} },
    });
  };

  return {
    updateCartContact,
  };
};

export default useUpdateCartContact;
