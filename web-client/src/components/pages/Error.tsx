import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError() as {statusText?: string, message?: string};
  console.error(error);

  const message = error && error.statusText ? error.statusText : 
    error && error.message ? error.message :
      null;

  return (
    <div id="error-page">
      <h1>Error</h1>
      <p>Sorry, an error has occurred or the page does not exist.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}