import { Link, useRouteError } from 'react-router-dom';
import errorImage from '../../assets/error/error.png';
import { Button } from 'antd';

const ErrorPage = () => {
  const error = useRouteError();

  const errorMessage = error?.message || "An unexpected error occurred.";

  return (
    <div className="mx-auto max-w-screen-xl mt-24 text-center">
      <img className="mx-auto w-[800px] h-[400px]" src={errorImage} alt="Error" />
      <h1 className="text-center text-2xl text-primary">{errorMessage}</h1>
      <Link to="/">
        <Button className="primary-btn mt-12">Back To Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
