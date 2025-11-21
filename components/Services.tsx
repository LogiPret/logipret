import React from 'react';
import { ArrowRight, Megaphone, Users, TrendingUp } from 'lucide-react';

const offerings = [
  {
    id: '01',
    title: "MARKETING",
    icon: Megaphone,
    summary: "AUTORITÉ OMNICANALE",
    description: "Nous ne faisons pas seulement de la publicité : nous construisons des marques dominantes. Au moyen de campagnes à haute fréquence, d’un branding cohérent et de narratifs stratégiques, nous positionnons votre courtage comme la référence incontestable de votre territoire. Notre objectif : que la valeur perçue précède la rencontre."
  },
  {
    id: '02',
    title: "GÉNÉRATION DE LEADS",
    icon: Users,
    summary: "ACQUISITION À HAUTE INTENTION",
    description: "Nous créons des systèmes d’acquisition qui génèrent des demandes qualifiées à volume constant, sans dépendre d’une seule plateforme. Publicité, contenu, porte à porte, ciblage dynamique, segmentation d’intérêt : chaque contact est dirigé vers la bonne offre, au bon moment."
  },
  {
    id: '03',
    title: "COACHING / FORMATION",
    icon: TrendingUp,
    summary: "ARCHITECTURE DE CONVERSION",
    description: "Nous ne “motiverons” pas votre équipe. Nous la rendons prévisible et rentable. Grâce à des méthodes structurées, des scripts évolutifs, et un système de suivi basé sur les chiffres, nous transformons vos courtiers en véritables opérateurs commerciaux."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="bg-transparent text-white relative">
      {offerings.map((item, index) => (
        <div 
          key={item.id}
          className="group relative border-b border-white/20 transition-all duration-500 ease-in-out hover:bg-white hover:text-brand-blue cursor-default overflow-hidden"
        >
          <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-10 md:py-16 lg:py-20 flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-12 transition-all duration-500 group-hover:py-24">
            
            {/* ID & Icon */}
            <div className="flex items-center gap-4 md:w-1/6">
              <span className="font-mono text-sm md:text-base font-bold opacity-50 group-hover:opacity-100">
                ({item.id})
              </span>
              <item.icon size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
            </div>

            {/* Title */}
            <div className="md:w-2/6">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-500">
                {item.title}
              </h2>
              <p className="font-mono text-[10px] md:text-xs mt-2 uppercase tracking-wider md:tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                // {item.summary}
              </p>
            </div>

            {/* Description - Hidden/Collapsed initially on mobile, subtly placed on desktop, Expands on Hover */}
            <div className="md:w-3/6 overflow-hidden grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
              <div className="min-h-0">
                 <div className="pt-6 md:pt-0 pl-0 md:pl-8 border-l-0 md:border-l border-current opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-base sm:text-lg md:text-2xl font-medium leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Bottom decorative border */}
      <div className="h-4 bg-white/10 w-full backdrop-blur-sm"></div>
    </section>
  );
};