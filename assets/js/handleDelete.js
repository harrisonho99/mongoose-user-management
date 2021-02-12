const aList = document.querySelectorAll('.delete');
const main = document.querySelector('main');
NodeList.prototype.forEach = Array.prototype.forEach;

aList.forEach((a) => {
  a.onclick = (e) => {
    e.preventDefault();
    if (window.axios) {
      // eslint-disable-next-line no-undef
      axios
        .delete(a.href)
        .then(() => {
          //handle if success
          // if (response.data.message === 'Delete Success!') {
          // }
          window.location = '/';
        })
        .catch((err) => {
          console.error(err.message);
          main.innerHTML = 'An Error Occured, Please Try Again.';
        });
    } else {
      main.innerHTML = 'An Error Occured, Please Try Again.';
    }
  };
});
