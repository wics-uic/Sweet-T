document.getElementById('email-input-data').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email-input').value;

    // Now you have the data in JavaScript variables: username, email
    // You can then store this data using Web Storage API (localStorage or sessionStorage)
    sessionStorage.setItem('savedEmail', email);

    alert('Data saved!');
});