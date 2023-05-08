import { getSession } from 'next-auth/client';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  // we can use getSession on the server side too!
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: {}
  }
}

export default ProfilePage;
