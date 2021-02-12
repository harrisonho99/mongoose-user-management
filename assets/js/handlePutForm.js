const form = document.querySelector('form');

form.onsubmit = (e) => {
  e.preventDefault();
  const firstName = document.querySelector('input[name="firstName"]').value;
  const lastName = document.querySelector('input[name="lastName"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const gender = form.elements.gender.value;
  const status = form.elements.status.value;
  const id = document.querySelector('#id').value;
  // Content-Type: application/x-www-form-urlencoded
  const params = new URLSearchParams();
  params.append('firstName', firstName);
  params.append('lastName', lastName);
  params.append('email', email);
  params.append('gender', gender);
  params.append('status', status);

  // eslint-disable-next-line no-undef
  if (window.axios) {
    window
      .axios({
        method: 'PUT',
        url: `http://localhost:3000/api/users/${id}`,
        data: params,
      })
      .then(() => {
        return (window.location = '/');
      })
      .catch((err) => {
        console.error(err.message);
      });
  } else {
    return (window.location = '/');
  }
};
