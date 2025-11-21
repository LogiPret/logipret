import React from 'react';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-brand-blue rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-brand-blue/30">
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to scale your business?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join hundreds of top-producing Canadian brokers who trust Logiprêt for their pipeline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-white text-brand-blue px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-lg">
                    Book a Strategy Call
                </button>
                <button className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                    Explore Software
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};