import React from 'react';

export const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
          <div className="p-4">
            <p className="text-4xl md:text-5xl font-extrabold text-black mb-2">$2B+</p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Loan Volume Generated</p>
          </div>
          <div className="p-4">
            <p className="text-4xl md:text-5xl font-extrabold text-black mb-2">50k+</p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Leads Delivered</p>
          </div>
          <div className="p-4">
            <p className="text-4xl md:text-5xl font-extrabold text-black mb-2">300+</p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Brokers Supported</p>
          </div>
          <div className="p-4">
            <p className="text-4xl md:text-5xl font-extrabold text-black mb-2">100%</p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Canadian Focused</p>
          </div>
        </div>
      </div>
    </section>
  );
};