const Home = ({ returnedProps }) => {
  return (
    <>
      {" "}
      <h1>Hello World!</h1> <p>{JSON.stringify(returnedProps)}</p>{" "}
      <input
        type={"button"}
        onClick={() => {
          throw new Error();
        }}
      />{" "}
    </>
  );
};
export const getStaticProps = async () => {
  console.log(`Called getStaticProps in hello-world.tsx`);
  return { props: { returnedProps: { hello: "world" } } };
};

export default Home;
