import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb"; // If used only in server side code, Next.js will ommit it when bundling the client code
import Head from "next/head";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?cs=srgb&dl=pexels-fabian-wiktor-994605.jpg&fm=jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is the first meetup'
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?cs=srgb&dl=pexels-fabian-wiktor-994605.jpg&fm=jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is the second meetup'
  }
];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// This doesn't run on deployment, but always on the server: 
export async function getServerSideProps(context) {
  const req = context.req; //! check the Next.js section
  const res = context.res;

  // fetch data from an API // Only in next you can use fetch for server side rendering code
  const client = await MongoClient.connect("mongodb+srv://Cristian:T5ykxDSjBnpBKJPN@cluster0.rxv84.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); // can also be  another name than the db name

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  console.log(meetups);

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description
      }))
    },
  }
  // revalidate doesn't make sense here
}



// - SSG: Static Site Generation:
// - this code runs only when we build the project for production:
// - the props returned here are the "pageProps" passed in _app.js:
// - the problem here can be that the data fetched in here may become outdated:
// export async function getStaticProps() {
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//     // with this line, it becomes ISG (Incremental Static Generation):
//     revalidate: 10
//   }
// }

export default HomePage;