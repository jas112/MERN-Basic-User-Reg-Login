import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {

        if(!user){
            navigate('/login')
        }

    }, [user, navigate, dispatch])

  return (
      <>
        <section className='heading'>
            <h1> Welcome {user && user.firstName + ' ' + user.lastName}</h1>
            <p>You are logged in!!!!</p>
        </section>

    </>

  )
}

export default Dashboard;