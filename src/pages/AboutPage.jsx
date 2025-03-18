import React from 'react';

const AboutPage = () => {
  return (
      <div className="container pt-10 pb-24 sm:pb-10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold font-poppins text-dark dark:text-white">About Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-manrope max-w-2xl mx-auto">Building tools to make student life easier</p>
          </div>

          <div className="grid gap-8">
            <div className="p-6 rounded-2xl bg-card-1 bg-opacity-30 shadow-md border border-transparent hover:shadow-lg hover:-translate-y-1 transition-[shadow_transform]">
              <h2 className="text-2xl font-bold font-poppins mb-3">Our Mission</h2>
              <div className="h-1 w-12 bg-card-1 mb-5 rounded-full"></div>
              <p className="font-manrope text-gray-700 dark:text-gray-300">We're a small community of IT students creating practical solutions for everyday academic challenges.</p>
            </div>

            <div className="p-6 rounded-2xl bg-card-2 bg-opacity-30 shadow-md border border-transparent hover:shadow-lg hover:-translate-y-1 transition-[shadow_transform]">
              <h2 className="text-2xl font-bold font-poppins mb-3">What We Do</h2>
              <div className="h-1 w-12 bg-card-2 mb-5 rounded-full"></div>
              <p className="font-manrope text-gray-700 dark:text-gray-300">Our routine management app helps students organize their academic life, making daily tasks more manageable and efficient.</p>
            </div>

            <div className="p-6 rounded-2xl bg-card-3 bg-opacity-30 shadow-md border border-transparent hover:shadow-lg hover:-translate-y-1 transition-[shadow_transform]">
              <h2 className="text-2xl font-bold font-poppins mb-3">Community First</h2>
              <div className="h-1 w-12 bg-card-3 mb-5 rounded-full"></div>
              <p className="font-manrope text-gray-700 dark:text-gray-300">Built by students, for students. We understand your challenges because we face them too.</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AboutPage;