const Footer = () => {
  return (
    <footer className="bg-pink-100 mt-auto py-6 text-center text-gray-700">
      <p>© {new Date().getFullYear()} BookNest. All rights reserved.</p>
      <p className="text-sm mt-2">Built with ❤️ by Your Team</p>
    </footer>
  );
};

export default Footer;
