import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1e1360] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Good Finance</h4>
            <p className="text-sm leading-relaxed">
              Script,
              <br />
              44 Featherstone Street,
              <br />
              London, EC1Y 8RN
            </p>

            <a
              href="mailto:info@goodfinance.org.uk"
              className="block mt-4 text-sm underline hover:text-yellow-400"
            >
              info@goodfinance.org.uk
            </a>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Trusted Partners</h4>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="/partners/cfc.png"
                alt=""
                className="bg-white p-2 rounded"
              />
              <img
                src="/partners/locality.png"
                alt=""
                className="bg-white p-2 rounded"
              />
              <img
                src="/partners/plunkett.png"
                alt=""
                className="bg-white p-2 rounded"
              />
              <img
                src="/partners/unltd.png"
                alt=""
                className="bg-white p-2 rounded"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Social Media Links</h4>

            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-yellow-400">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Equality, Diversity & Inclusion
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Jargon Buster
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 text-center text-sm py-4">
        © {new Date().getFullYear()} Good Finance. All rights reserved.
      </div>
    </footer>
  );
}
