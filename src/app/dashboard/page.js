import React from 'react'

export const Dashboard = () => {

    const Logout = (e) => {
        e.preventDefault();
        const email1 = localStorage.getItem('email');
        const email = JSON.parse(email1);
        console.log("emailemail", email)

        fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
            .then((res) => res.json())
            .then((results) => {
                if (results.status === 200) {
                    window.location.href = '/dashboard';
                }
            })
            .catch((err) => { console.log(err) });
    }

    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <header class="navigation">
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
                </nav>
                <a href="/" class="logout" >Logout</a>
            </header>

            <h2>Welcome to the dashboard!</h2>
        </div>
    )
}

export default Dashboard;
