import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { CheckSquare } from 'lucide-react';

// Dock Item Component
const DockItem = ({ children, ...props }) => {
  const ref = useRef(null);
  const distance = useMotionValue(0);
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      whileHover={{ y: -10 }}
      className="aspect-square cursor-pointer flex items-center justify-center border border-gray-600 rounded-full hover:border-[#7148CC] transition-colors bg-black"
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Dock Container Component  
const Dock = ({ children, ...props }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      {...props}
      className="hidden md:flex h-16 items-end gap-4 rounded-2xl bg-transparent backdrop-blur-md px-4 pb-3"
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { mouseX });
      })}
    </motion.div>
  );
};

// Enhanced Dock Item with mouse interaction
const EnhancedDockItem = ({ mouseX, children, ...props }) => {
  const ref = useRef(null);

  // Initialize with a large distance to keep icons small initially
  const distance = useMotionValue(Infinity);
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  React.useEffect(() => {
    const updateDistance = () => {
      if (ref.current && mouseX) {
        const rect = ref.current.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distanceFromMouse = mouseX.get() - itemCenterX;
        distance.set(distanceFromMouse);
      }
    };

    const unsubscribe = mouseX?.onChange(updateDistance);
    return unsubscribe;
  }, [mouseX, distance]);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      whileHover={{ y: -10 }}
      className="aspect-square cursor-pointer flex items-center justify-center border border-gray-600 rounded-full hover:border-[#7148CC] transition-colors bg-black/50 backdrop-blur-sm"
      {...props}
    >
      {children}
    </motion.div>
  );
};

const Footer = () => {
  const socialIcons = [
    { icon: FaFacebook, href: "https://www.facebook.com/jyotshna.jha.9693/" },
    { icon: FaInstagram, href: "https://www.instagram.com/jyotshna.jha.9693/" },
    { icon: FaGithub, href: "https://github.com/jyotsna-jha" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/jyotsna-jha-655596250/" }
  ];

  return (
    <>
      <style>{`
        .footer-link {
          position: relative;
          display: inline-block;
          color: #9ca3af;
          transition: transform 0.3s ease, color 0.3s ease;
          padding-left: 0;
        }
        .footer-link::before {
          content: "";
          position: absolute;
          left: -16px;
          top: 50%;
          transform: translateY(-50%) translateX(-8px);
          width: 12px;
          height: 2px;
          background-color: white;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          border-radius: 1px;
        }
        .footer-link:hover {
          transform: translateX(12px);
          color: white;
        }
        .footer-link:hover::before {
          opacity: 1;
          transform: translateY(-50%) translateX(-4px);
        }
        .footer-contact-link {
          color: #9ca3af;
          cursor: default;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-contact-link:hover {
          color: white;
        }
      `}</style>

      <footer className="bg-black text-white px-4 py-6 font-poppins text-sm overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-4">
            {/* Logo and Description */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#7148CC] to-[#A213C5] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                <CheckSquare className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-[#7148CC] to-[#A213C5] bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-500">Organize beautifully</p>
              </div>
            </div>

            {/* Social Media Icons - Shifted Downwards */}
            <div className="flex justify-center mt-4 lg:mt-6">
              {/* Desktop: Dock Animation */}
              <Dock>
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <EnhancedDockItem key={index}>
                      <a 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full"
                      >
                        <IconComponent className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </a>
                    </EnhancedDockItem>
                  );
                })}
              </Dock>
              
              {/* Mobile: Static Icons */}
              <div className="md:hidden flex gap-3 mt-2">
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index} 
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm hover:border-[#7148CC] transition-colors"
                    >
                      <IconComponent className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-4">
            <p className="text-gray-500 text-xs text-center">
              <span className="text-[#7148CC]">© Copyright 2025 by TaskFlow</span>. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;