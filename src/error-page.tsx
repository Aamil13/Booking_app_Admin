import { Link, useRouteError } from 'react-router-dom';
import icon from '../public/favicon-32x32.png';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen justify-between">
      <Link
        to={'/'}
        className=" fixed flex w-full items-center justify-start gap-3 py-5 px-6"
      >
        <img src={icon} alt="icon" />
        <h1 className="text-xl font-bold text-white">Booking-Admin</h1>
      </Link>
      <img
        src={
          'https://cdn.pixabay.com/photo/2024/05/24/18/14/astronaut-8785566_960_720.png'
        }
        alt="Image"
        className="w-3/4 max-xl:w-2/3 max-lg:w-1/2 max-sm:hidden object-cover"
      />
      {/* //login  */}
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <p className="text-5xl font-bold font-sans">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
