import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb"; // If used only in server side code, Next.js will ommit it when bundling the client code
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <MeetupDetail
        {...props.meetupData}
      /></Fragment>

  );
};

export async function getStaticPaths() {
  // fetch supported ids from a db
  const client = await MongoClient.connect("mongodb+srv://Cristian:T5ykxDSjBnpBKJPN@cluster0.rxv84.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); // can also be  another name than the db name

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //! why to 1??

  client.close();

  return {
    // if fallback is false, then if meetupId is not pre-defiend, then 404 page
    // if fallback is true, //! check the section
    // we may pre-generate only the most visited if we have too many pages 
    fallback: true,
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))

    // [
    //   {
    //     params: {
    //       meetupId: 'm1'
    //     }
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2'
    //     }
    //   }
    // ],

  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data for a single meetup using meetup id
  const client = await MongoClient.connect("mongodb+srv://Cristian:T5ykxDSjBnpBKJPN@cluster0.rxv84.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); // can also be  another name than the db name

  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: meetupId,
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  }
}

export default MeetupDetails;