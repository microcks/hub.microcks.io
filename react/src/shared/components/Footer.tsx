/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {
//   FaDiscord,
//   FaGithub,
//   FaLinkedin,
//   FaTwitter,
//   FaYoutube,
// } from "react-icons/fa";

const sections = [
  {
    title: 'Microcks',
    links: [
      { name: 'What is Microcks?', href: '#' },
      { name: 'About hub.microcks.io', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'GitHub', href: '#' },
      { name: 'File an issue', href: '#' },
      { name: 'Join Discord', href: '#' },
      { name: 'Join Zulip', href: '#' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { name: 'Twitter', href: '#' },
      { name: 'LinkedIn', href: '#' },
      { name: 'YouTube', href: '#' },
      { name: 'Bluesky', href: '#' },
      { name: 'Mastodon', href: '#' },
    ],
  },
];

interface FooterMicrocksProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}

export const Footer = ({
  logo = {
    url: 'https://microcks.io',
    // src: "https://hub.microcks.io/assets/images/hub-microcks.svg",
    src: '/microcks.svg',
    alt: 'Microcks Logo',
    title: 'Microcks.io',
  },
}: FooterMicrocksProps) => {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="container px-4 mx-auto">
        <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          {/* Left: Logo + Description + Social Icons */}
          <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2">
              <a href={logo.url} tabIndex={0}>
                <img src={logo.src} alt={logo.alt} className="h-10" />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Microcks is an open-source Kubernetes-native tool for mocking and testing APIs and microservices.
            </p>
            {/* <ul className="flex items-center space-x-6 text-gray-300">
              <li className="hover:text-white">
                <a href="#"><FaTwitter className="size-5" /></a>
              </li>
              <li className="hover:text-white">
                <a href="#"><FaLinkedin className="size-5" /></a>
              </li>
              <li className="hover:text-white">
                <a href="#"><FaYoutube className="size-5" /></a>
              </li>
              <li className="hover:text-white">
                <a href="#"><FaGithub className="size-5" /></a>
              </li>
              <li className="hover:text-white">
                <a href="#"><FaDiscord className="size-5" /></a>
              </li>
            </ul> */}
          </div>

          {/* Right: Link Sections */}
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-20">
            {sections.map(section => (
              <div key={section.title}>
                <h3 className="mb-4 text-base font-semibold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {section.links.map(link => (
                    <li key={link.name} className="hover:text-white transition-colors">
                      <a href={link.href} tabIndex={0}>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-gray-600 pt-6 text-center text-sm text-gray-400 lg:flex-row lg:items-center lg:text-left">
          <p>© {new Date().getFullYear()} Microcks.io. All rights reserved.</p>
          <ul className="flex justify-center gap-4 lg:justify-start">
            <li className="hover:text-white">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" tabIndex={0}>
                Terms & Conditions
              </a>
            </li>
            <li className="hover:text-white">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" tabIndex={0}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
