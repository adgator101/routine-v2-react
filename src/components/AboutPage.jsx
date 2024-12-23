import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      <div className="container py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold font-poppins text-dark dark:text-white">About Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-manrope">Building tools to make student life easier</p>
          </div>

          <div className="grid gap-8 mt-12">
            <div className="p-6 rounded-4xl bg-card-1 dark:bg-opacity-10">
              <h2 className="text-xl font-bold font-poppins mb-3">Our Mission</h2>
              <p className="font-manrope text-gray-700 dark:text-gray-300">We're a small community of IT students creating practical solutions for everyday academic challenges.</p>
            </div>

            <div className="p-6 rounded-4xl bg-card-2 dark:bg-opacity-10">
              <h2 className="text-xl font-bold font-poppins mb-3">What We Do</h2>
              <p className="font-manrope text-gray-700 dark:text-gray-300">Our routine management app helps students organize their academic life, making daily tasks more manageable and efficient.</p>
            </div>

            <div className="p-6 rounded-4xl bg-card-3 dark:bg-opacity-10">
              <h2 className="text-xl font-bold font-poppins mb-3">Community First</h2>
              <p className="font-manrope text-gray-700 dark:text-gray-300">Built by students, for students. We understand your challenges because we face them too.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;