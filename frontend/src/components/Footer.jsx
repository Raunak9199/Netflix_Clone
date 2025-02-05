import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="hover:underline cursor-pointer">FAQ</p>
            <p className="hover:underline cursor-pointer">Help Center</p>
            <p className="hover:underline cursor-pointer">Account</p>
            <p className="hover:underline cursor-pointer">Media Center</p>
          </div>
          <div>
            <p className="hover:underline cursor-pointer">Investor Relations</p>
            <p className="hover:underline cursor-pointer">Jobs</p>
            <p className="hover:underline cursor-pointer">Ways to Watch</p>
            <p className="hover:underline cursor-pointer">Terms of Use</p>
          </div>
          <div>
            <p className="hover:underline cursor-pointer">Privacy</p>
            <p className="hover:underline cursor-pointer">Cookie Preferences</p>
            <p className="hover:underline cursor-pointer">
              Corporate Information
            </p>
            <p className="hover:underline cursor-pointer">Contact Us</p>
          </div>
          <div>
            <p className="hover:underline cursor-pointer">Speed Test</p>
            <p className="hover:underline cursor-pointer">Legal Notices</p>
            <p className="hover:underline cursor-pointer">Only on Netflix</p>
          </div>
        </div>

        {/* Built By */}
        <div className="mt-8 text-center text-xs text-white">
          <a href="https://github.com/Raunak9199/Netflix_Clone" target="_blank">
            © Built by Raunak ❤️
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
