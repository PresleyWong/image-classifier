import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  const Content = (props) => (
    <main className="max-w-screen-lg mx-auto">
      <>{props.children}</>
    </main>
  );

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
