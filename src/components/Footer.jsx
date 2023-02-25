const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <>
      <footer className="text-center text-gray-500 bg-gray-200 py-3 mt-10">
        <div>© {year} Copyright</div>
      </footer>
    </>
  );
};

export default Footer;
