import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHeart, FiTruck, FiShield, FiClock, 
  FiFacebook, FiTwitter, FiInstagram, FiGithub, FiMail,
  FiMapPin, FiPhone, FiAward, FiStar, FiTrendingUp,
  FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { FaGem, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // داده‌های فوتر
  const sections = {
    quickLinks: {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/", isLink: true },
        { name: "Cart", path: "/cart", isLink: true },
        { name: "New Arrivals", path: "#", isLink: false },
        { name: "Best Sellers", path: "#", isLink: false },
        { name: "Sale Collection", path: "#", isLink: false },
        { name: "Gift Cards", path: "#", isLink: false },
      ]
    },
    categories: {
      title: "Categories",
      links: [
        { name: "👔 Men's Fashion", path: "#" },
        { name: "👗 Women's Fashion", path: "#" },
        { name: "💎 Jewelery", path: "#" },
        { name: "💻 Electronics", path: "#" },
        { name: "👜 Handbags", path: "#" },
        { name: "⌚ Watches", path: "#" },
      ]
    },
    support: {
      title: "Customer Support",
      links: [
        { name: "FAQ", path: "#" },
        { name: "Shipping Info", path: "#" },
        { name: "Returns & Exchanges", path: "#" },
        { name: "Size Guide", path: "#" },
        { name: "Track Order", path: "#" },
        { name: "Contact Us", path: "#" },
      ]
    }
  };

  // آیکون‌های شبکه‌های اجتماعی (با لینکدین اضافه شده)
  const socialIcons = [
    { Icon: FiInstagram, color: "text-gold", hoverColor: "hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] hover:text-gray-900", link: "#" },
    { Icon: FiFacebook, color: "text-gold", hoverColor: "hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] hover:text-gray-900", link: "#" },
    { Icon: FiTwitter, color: "text-gold", hoverColor: "hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] hover:text-gray-900", link: "https://x.com/N_Rahimi78?t=08MGoBszWhbYyCavmhmALA&s=09" },
    { Icon: FaLinkedin, color: "text-gold", hoverColor: "hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] hover:text-gray-900", link: "https://www.linkedin.com/in/nadima-rahimi-webdevdesign/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BLv1%2BiqrYRFaQqg8JowUiTg%3D%3D" },
    { Icon: FiGithub, color: "text-gold", hoverColor: "hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] hover:text-gray-900", link: "https://github.com/N-rahimi" },
  ];

  return (
    <footer className="mt-20 bg-white/60 dark:bg-gray-900/80 backdrop-blur-2xl border-t border-gold/30 dark:border-gold/30">
      
      {/* Newsletter Section */}
      <div className="py-16 px-5 bg-gradient-to-br from-gold/8 to-gold/3 dark:from-gold/15 dark:to-gold/5 border-b border-gold/20 dark:border-gold/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] rounded-full flex items-center justify-center mx-auto mb-5 text-2xl text-gray-900 animate-[float_3s_ease_infinite]">
            <FaGem />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent mb-3">
            Join the ShopHub
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-7">
            Subscribe to receive exclusive offers, early access to new collections, and VIP treatment.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-5 py-3.5 rounded-full border border-gold/40 dark:border-gold/40 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
            <button type="submit" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 transition-all duration-300">
              Subscribe ✨
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Main Footer - با آکاردئون در موبایل */}
      <div className="py-16 px-5">
        <div className="max-w-[1400px] mx-auto">
          
          {/* دسکتاپ ویو - نمایش ستونی */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1 - Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-5 justify-center lg:justify-start">
                <span className="text-3xl">👑</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent">
                  HUB<span className="text-gold font-normal text-base">STORE</span>
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 text-center lg:text-left">
                Experience the pinnacle of luxury shopping. Curated collections from world-renowned brands, 
                delivered with white-glove service.
              </p>
              <div className="flex gap-3 justify-center lg:justify-start mb-6 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 dark:bg-gold/15 backdrop-blur-md rounded-full text-xs font-semibold text-gold">
                  <FiAward /> Premium Quality
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 dark:bg-gold/15 backdrop-blur-md rounded-full text-xs font-semibold text-gold">
                  <FiStar /> 5-Star Service
                </span>
              </div>
              <div className="flex gap-3 justify-center lg:justify-start">
                {socialIcons.map(({ Icon, color, hoverColor, link }, i) => (
                  <a 
                    key={i} 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-gold/10 dark:bg-gold/15 backdrop-blur-md flex items-center justify-center ${color} ${hoverColor} hover:-translate-y-1 transition-all duration-300`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* سایر ستون‌ها در دسکتاپ */}
            <div className="text-center lg:text-left">
              <h4 className="text-base font-bold text-gray-800 dark:text-white mb-6 inline-block lg:inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] lg:after:left-0 after:left-1/2 after:-translate-x-1/2 lg:after:translate-x-0">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {sections.quickLinks.links.map((item, i) => (
                  <li key={i}>
                    {item.isLink ? (
                      <Link to={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2">
                        {item.name}
                      </Link>
                    ) : (
                      <a href={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2">
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="text-base font-bold text-gray-800 dark:text-white mb-6 inline-block lg:inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] lg:after:left-0 after:left-1/2 after:-translate-x-1/2 lg:after:translate-x-0">
                Categories
              </h4>
              <ul className="space-y-3">
                {sections.categories.links.map((item, i) => (
                  <li key={i}>
                    <a href={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="text-base font-bold text-gray-800 dark:text-white mb-6 inline-block lg:inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] lg:after:left-0 after:left-1/2 after:-translate-x-1/2 lg:after:translate-x-0">
                Customer Support
              </h4>
              <ul className="space-y-3">
                {sections.support.links.map((item, i) => (
                  <li key={i}>
                    <a href={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 - Contact */}
            <div className="text-center lg:text-left">
              <h4 className="text-base font-bold text-gray-800 dark:text-white mb-6 inline-block lg:inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] lg:after:left-0 after:left-1/2 after:-translate-x-1/2 lg:after:translate-x-0">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm justify-center lg:justify-start">
                  <FiMapPin className="text-gold flex-shrink-0" />
                  <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm justify-center lg:justify-start">
                  <FiPhone className="text-gold flex-shrink-0" />
                  <span>+1 (888) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm justify-center lg:justify-start">
                  <FiMail className="text-gold flex-shrink-0" />
                  <span>concierge@luxestore.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm justify-center lg:justify-start">
                  <FiClock className="text-gold flex-shrink-0" />
                  <span>24/7 Concierge Service</span>
                </li>
              </ul>
            </div>
          </div>

          {/* موبایل ویو - آکاردئون */}
          <div className="md:hidden space-y-4">
            {/* Brand Section - همیشه باز */}
            <div className="text-center pb-4 border-b border-gold/20">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl">👑</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent">
                  HUB<span className="text-gold font-normal text-base">STORE</span>
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                Experience the pinnacle of luxury shopping. Curated collections from world-renowned brands.
              </p>
              <div className="flex gap-3 justify-center mb-4 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 dark:bg-gold/15 rounded-full text-xs font-semibold text-gold">
                  <FiAward /> Premium Quality
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 dark:bg-gold/15 rounded-full text-xs font-semibold text-gold">
                  <FiStar /> 5-Star Service
                </span>
              </div>
              <div className="flex gap-3 justify-center">
                {socialIcons.map(({ Icon, color, hoverColor, link }, i) => (
                  <a 
                    key={i} 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-gold/10 dark:bg-gold/15 flex items-center justify-center ${color} ${hoverColor} transition-all duration-300`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Accordion */}
            <div className="border-b border-gold/20">
              <button
                onClick={() => toggleSection('quickLinks')}
                className="w-full py-4 flex justify-between items-center text-left font-bold text-gray-800 dark:text-white"
              >
                <span>Quick Links</span>
                {openSections.quickLinks ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSections.quickLinks && (
                <div className="pb-4 space-y-3 animate-fade-in">
                  {sections.quickLinks.links.map((item, i) => (
                    <div key={i}>
                      {item.isLink ? (
                        <Link to={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold block py-2">
                          {item.name}
                        </Link>
                      ) : (
                        <a href={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold block py-2">
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Categories Accordion */}
            <div className="border-b border-gold/20">
              <button
                onClick={() => toggleSection('categories')}
                className="w-full py-4 flex justify-between items-center text-left font-bold text-gray-800 dark:text-white"
              >
                <span>Categories</span>
                {openSections.categories ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSections.categories && (
                <div className="pb-4 space-y-3 animate-fade-in">
                  {sections.categories.links.map((item, i) => (
                    <a key={i} href={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold block py-2">
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Support Accordion */}
            <div className="border-b border-gold/20">
              <button
                onClick={() => toggleSection('support')}
                className="w-full py-4 flex justify-between items-center text-left font-bold text-gray-800 dark:text-white"
              >
                <span>Customer Support</span>
                {openSections.support ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSections.support && (
                <div className="pb-4 space-y-3 animate-fade-in">
                  {sections.support.links.map((item, i) => (
                    <a key={i} href={item.path} className="text-gray-500 dark:text-gray-400 text-sm hover:text-gold block py-2">
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Section - همیشه باز */}
            <div className="pt-2">
              <h4 className="text-base font-bold text-gray-800 dark:text-white mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                  <FiMapPin className="text-gold flex-shrink-0" />
                  <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                  <FiPhone className="text-gold flex-shrink-0" />
                  <span>+1 (888) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                  <FiMail className="text-gold flex-shrink-0" />
                  <span>concierge@luxestore.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                  <FiClock className="text-gold flex-shrink-0" />
                  <span>24/7 Concierge Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="py-10 px-5 bg-gold/5 dark:bg-gold/10 backdrop-blur-lg border-y border-gold/20 dark:border-gold/30">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: FiTruck, title: 'Free Express Shipping', desc: 'On orders over $500' },
            { icon: FiShield, title: 'Secure Payment', desc: '256-bit SSL encryption' },
            { icon: FiHeart, title: '24/7 VIP Support', desc: 'Dedicated concierge team' },
            { icon: FiTrendingUp, title: 'Price Match Guarantee', desc: 'Best luxury prices' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 justify-center lg:justify-start">
              <feature.icon className="text-2xl text-gold" />
              <div>
                <h5 className="text-sm font-bold text-gray-800 dark:text-white">{feature.title}</h5>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 px-5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-xs text-black dark:text-white text-center md:text-left">
            <p>
              © {currentYear} LUXESTORE. All rights reserved. | 
              <a href="#" className="hover:text-gold transition-colors ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-gold transition-colors ml-1">Terms of Service</a>
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <FaCcVisa className="text-2xl text-black dark:text-white hover:text-gold hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" />
            <FaCcMastercard className="text-2xl text-black dark:text-white hover:text-gold hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" />
            <FaCcPaypal className="text-2xl text-black dark:text-white hover:text-gold hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" />
            <FaCcAmex className="text-2xl text-black dark:text-white hover:text-gold hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" />
            <span className="text-gold text-xs font-semibold ml-2">Secure Checkout</span>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;