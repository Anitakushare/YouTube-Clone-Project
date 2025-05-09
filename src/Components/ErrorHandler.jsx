import { useRouteError, Link } from "react-router-dom";

function ErrorHandler() {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="min-h-screen bg-white text-center px-4">
      <div className=" p-8 rounded-xl w-full">
        <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!!!</h1>

        <h3 className="text-xl text-gray-800 font-semibold mb-2">
          {err.status} - {err.statusText || "Unexpected Error"}
        </h3>

        {err.data && (
          <p className="text-md text-gray-600 italic mb-6">{err.data}</p>
        )}

        
      </div>
    </div>
  );
}

export default ErrorHandler;
