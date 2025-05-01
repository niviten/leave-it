import React from 'react';
import { Link } from 'react-router';

function Home() {
    return <>
        <h3>Leave year</h3>
        <hr />
        <ul>
            <li><Link to={'/add'}>Add</Link></li>
        </ul>
    </>
}

export default Home;
