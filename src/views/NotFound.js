function NotFound({ isSignedIn }) {
  const homePagePath = isSignedIn ? '/app' : '/';
  return (
    <>
      <h1 className="display-1">404</h1>
      <h1 className="display-3">Not Found</h1>
      <h1>The page you are looking for could not be found.</h1>
      <h3>Please double check that the url is correct in the address bar or go to the <a href={homePagePath}>home page</a>.</h3>
    </>
  );
}
