import React, { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();


  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a  New Meetup</title>
        <meta name='description' content='Add your new meetups and create amazing network opportinities!' />
      </Head>

      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;