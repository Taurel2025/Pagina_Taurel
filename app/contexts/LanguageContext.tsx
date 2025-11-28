import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = language === 'es' ? translations.es : translations.en;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Traducciones
const translations = {
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      aboutUs: 'Sobre Nosotros',
      contact: 'Contáctanos',
      trackShipment: 'Rastrea tu embarque',
      jobs: 'Empleo'
    },
    footer: {
      tagline: 'Impulsamos tu negocio de principio a fin.',
      recentPosts: 'Publicaciones Recientes',
      quickContact: 'Contacto rápido',
      name: 'Nombre y Apellido',
      email: 'Correo electrónico',
      send: 'Enviar',
      sending: 'Enviando...',
      copyright: 'Copyright 2025 Taurel. RIF: J-00035914-8',
      contactWhatsApp: 'Contactar por WhatsApp',
      viewLocation: 'Ver ubicación en Google Maps',
      errorRequired: 'es requerido',
      errorInvalidEmail: 'Formato de correo inválido',
      successMessage: '¡Mensaje enviado exitosamente!',
      errorMessage: 'Error al enviar el mensaje. Por favor, inténtelo de nuevo.'
    },
    home: {
      hero: {
        title: 'Somos su aliado logístico de principio a fin, comprometidos en cada paso: desde la planificación inicial hasta el destino final.',
        cta: 'Conoce nuestras soluciones'
      },
      stats: {
        title: 'Taurel: un legado de más de 100 años',
        subtitle: 'Algunos datos curiosos sobre nuestra compañía',
        offices: 'Oficinas a nivel Nacional',
        partners: 'Aliados a nivel global para conectar sus operaciones',
        employees: 'Colaboradores para satisfacer sus necesidades',
        clients: 'Clientes que confían en nuestras soluciones innovadoras'
      },
      timeline: {
        title: 'Nuestra Historia, Tu Confianza...',
        year1911: 'Comenzamos con una pequeña oficina aduanal manejando trámites portuarios básicos de recepción de mercancías en puerto.',
        year1945: 'Decidimos expandir nuestras actividades al manejo del transporte de carga vía marítima, construyendo un edificio emblemático en La Guaira – Venezuela.',
        year1994: 'Seleccionados como Agente de Aduanas y Asesor en Materia de Aduanas del METRO DE CARACAS C.A. durante 4 años (Línea 3).',
        year1999: 'Primer Certificado del Servicio de Gestión de la Calidad. Bajo la norma COVENIN-ISO 9002:1995.',
        year2002: 'Representación de la naviera ZIM en Venezuela. Desde 2002, representación exclusiva con la creación de ZIM Venezuela.',
        year2024: 'Innovamos a nivel tecnológico con la creación de DragOn, nuestra APP.'
      },
      certification: {
        title: 'Certificación ISO 9001:2025'
      }
    },
    services: {
      slider: {
        service1: {
          title: 'Asesoría Técnica',
          description: 'Este servicio te ayuda a tramitar permisos para importar, exportar y mover mercancías. Además, ofrece asesoría especializada en aduanas y comercio exterior, basándose en el marco legal del Arancel de Aduanas para que todos los procesos sean correctos.'
        },
        service2: {
          title: 'Agenciamiento Aduanal',
          description: 'Atendemos las Importaciones, Exportaciones y/o Tránsito de sus embarques, alineados con la cambiante normativa tanto nacional como internacional, contando con oficinas a través de todas las Aduanas habilitadas marítimas, aéreas y terrestres.'
        },
        service3: {
          title: 'Transporte de Carga Internacional',
          description: 'Llegamos a más de 180 países del mundo, lo que nos permite ofrecerte: Cobertura en todos los continentes, Servicios consolidados aéreos, marítimos y multimodal, Servicio de contenedores completos (FCL) y carga fraccionada (LCL), Transporte terrestre internacional en furgones completos (FTL) y fraccionados (LTL).'
        },
        service4: {
          title: 'Transporte Terrestre',
          description: 'La empresa ofrece un servicio de flete terrestre nacional para asegurar que tus cargas lleguen a tiempo y de forma segura. Este servicio incluye: Control y calidad en el manejo de la carga. Seguimiento en tiempo real del estado de tu envío a través de su aplicación Servicios en Línea.'
        },
        service5: {
          title: 'Servicios Navieros',
          description: 'Tenemos una vasta experiencia que nos ha posicionado como agente de confianza en Venezuela para las líneas navieras más importantes del mundo. Actuando como: agente general, portuario, protector, manejo de carga pesada y voluminosa, coordinación de las operaciones de carga y descarga.'
        },
        service6: {
          title: 'Almacenamiento',
          description: 'Contamos con almacenes equipados y operativos que ofrecen soluciones de embalaje y llenado/vaciado de contenedores. También disponen de un Depósito Aduanero In Bond y se encargan de la gestión completa de la cadena de suministros.'
        },
        service7: {
          title: 'Compras Internacionales',
          description: 'Ponemos a tu disposición un equipo capacitado y de alto rendimiento que te guiará en cada paso durante todo el proceso, desde donde realizar tus compras hasta colocarlo en la puerta de tu fábrica. Cubriendo demanda desde Asia hasta Latinoamérica.'
        }
      },
      page: {
        title: 'Nuestras Soluciones Logísticas',
        advisory: {
          title: 'Asesoría técnica',
          description: 'Ponemos a tu disposición asesoría técnica especializada en materia de aduanas, comercio internacional e integración económica.',
          list1: 'Asesoramos.',
          list2: 'Informamos.',
          list3: 'Apoyamos',
          extraInfo: 'Trámite de permisos requeridos, por las autoridades aduaneras, para el ingreso o extracción de mercancías relacionadas con el territorio nacional.'
        },
        international: {
          title: 'Transporte de Carga Internacional:',
          highlight: 'Llegamos a más de 180 países del mundo, lo que nos permite ofrecerte:',
          list1: 'Cobertura en todos los continentes.',
          list2: 'Servicios consolidados aéreos, marítimos y multimodal.',
          list3: 'Servicio de contenedores completos (FCL) y carga fraccionada (LCL).',
          list4: 'Transporte terrestre internacional en furgones completos (FTL) y fraccionados (LTL).'
        },
        landTransport: {
          title: 'Transporte Terrestre:',
          description: 'De manera eficiente, segura e integrada, colocamos a tu disposición el servicio de flete terrestre nacional, a fin de garantizar que tus cargas lleguen a tiempo en el lugar exacto, bajo el cuidado de la misma empresa, con los controles y estándares de calidad.'
        },
        storage: {
          title: 'Almacenamiento y Distribución:',
          description: 'Contamos con almacenes equipados y operativos que ofrecen soluciones de embalaje y llenado/vaciado de contenedores. También disponen de un Depósito Aduanero In Bond y se encargan de la gestión completa de la cadena de suministros.',
        },
        internationals: {
          title: 'Compras Internacionales:',
          description: 'Ponemos a tu disposición un equipo capacitado y de alto rendimiento que te guiará en cada paso durante todo el proceso, desde donde realizar tus compras hasta colocarlo en la puerta de tu fábrica. Cubriendo demanda desde Asia hasta Latinoamérica. ',
          list1: 'Soluciones integrales en compras y logísticas, con envíos aéreos y marítimos.',
          list2: 'Consolidación de carga, sin importar el tamaño y ubicación.',
          list3: 'Networking, investigación de mercado para importación y exportación.',
          list4: 'Envío de carga desde Miami a Venezuela, haciendo entrega en almacenes u oficinas.'
        },
        maritime: {
          title: 'Servicios Navieros',
          description: 'Desde 1945, hemos perfeccionado nuestro servicio para ofrecer la excelencia que tu negocio merece. Nuestra vasta experiencia nos ha posicionado como agentes de confianza en Venezuela para las líneas navieras más importantes del mundo.',
          containers: {
            title: 'Manejo de contenedores llenos y vacíos:',
            list1: 'Gestión total de contenedores: llenos y vacíos con movilización eficiente en los principales puertos de Venezuela.',
            list2: 'Control y monitoreo en tiempo real: ofrecemos visibilidad y control sobre el estatus de sus equipos.',
            list3: 'Seguridad: garantizamos la integridad de su mercancía y el resguardo de los contenedores.',
            list4: 'Reparaciones de contenedores: operamos bajo estándares internacionales.'
          },
          actingAs: {
            title: 'Actuando como:',
            list1: 'Agente general',
            list2: 'Agente portuario',
            list3: 'Agente protector',
            list4: 'Manejo de carga pesada y voluminosa, y coordinación de las operaciones de carga y descarga.'
          }
        },
        customs: {
          title: 'Agenciamiento Aduanal:',
          description: 'Con más de 110 años de experiencia en el mercado venezolano, atendemos tus importaciones, exportaciones y/o tránsito de embarques; así como tu reimportación, reexportación, reexpedición, almacenamiento o depósito y/o la aplicación de los Regímenes Aduaneros Especiales, a través de todas las aduanas habilitadas marítimas, aéreas y terrestres, en las que tenemos presencia.'
        },
        logisticsChain: {
          title: 'NUESTRA CADENA LOGÍSTICA...'
        }
      }
    },
    aboutUs: {
      mission: {
        title: 'Misión',
        paragraph1: 'Nuestra misión fundamental es facilitar el comercio internacional a través de un servicio de logística integral, actuando como el puente estratégico que conecta mercados y oportunidades.',
        paragraph2: 'Nos dedicamos a transformar la experiencia logística en su totalidad, priorizando la calidad en cada eslabón de la cadena de suministro, desde el origen hasta el destino final.'
      },
      vision: {
        title: 'Visión',
        paragraph1: 'Nos visualizamos como el agente transformador del sector logístico venezolano, impulsando un cambio profundo mediante la introducción de estándares de clase mundial, innovación tecnológica y prácticas operativas de vanguardia.',
        paragraph2: 'Aspiramos a alcanzar niveles de desempeño tan excelso que no solo redefinan los parámetros de la industria local, sino que nos proyecten con fuerza en el escenario internacional, estableciendo alianzas globales y ampliando nuestro radio de acción.'
      },
      values: {
        header: 'En nuestra empresa, construimos cada logro sobre una base firme de valores.',
        subtitle: 'Ellos son la brújula que guía nuestras decisiones, impulsan nuestro crecimiento y reflejan la esencia de nuestra cultura organizacional.',
        value1: {
          title: 'Pasión por el Servicio',
          text: 'Nos mueve el entusiasmo por ayudarle y convertir cada reto en una solución.'
        },
        value2: {
          title: 'Respeto e Inclusión',
          text: 'Creemos en la diversidad y valoramos a cada persona que forma parte de nuestro camino.'
        },
        value3: {
          title: 'Ética y Calidad',
          text: 'Hacemos lo correcto y buscamos siempre superar los más altos estándares.'
        },
        value4: {
          title: 'Compromiso',
          text: 'Honramos nuestra palabra y cumplimos lo que ofrecemos.'
        },
        value5: {
          title: 'Innovación',
          text: 'Pensamos diferente y encontramos nuevas formas de generar valor.'
        },
        value6: {
          title: 'Optimización',
          text: 'Perfeccionamos procesos de manera constante para alcanzar mejores resultados.'
        }
      },
      chambers: {
        title: 'Participación activa en gremios y cámaras',
        subtitle: 'Ofrecemos mucho más que logística'
      }
    },
    contact: {
      title: 'Contáctanos',
      formTitle: '¿Cómo podemos ayudarte?',
      formDescription: 'Nuestro equipo de expertos está a su disposición para resolver atender sus consultas y ofrecer soluciones de logística. ¡Escríbenos!',
      requestPlaceholder: 'Indique su solicitud o requerimiento...',
      namePlaceholder: 'Nombre y Apellido',
      emailPlaceholder: 'Correo Electrónico',
      phonePlaceholder: 'Número de teléfono',
      companyPlaceholder: 'Empresa',
      sendButton: 'Enviar',
      sendingButton: 'Enviando...',
      mapTitle: 'Taurel va a donde tú estés',
      mapSubtitle: 'Tu destino fácil de encontrar, visitanos en la ubicación de preferencia',
      officeHours: 'Horario de atención: ',
      officeHoursDetails: 'Lunes a Viernes. 8:00am - 5:00pm.',
      errors: {
        requestRequired: 'Por favor, indique su solicitud o requerimiento',
        nameRequired: 'El nombre y apellido es requerido',
        emailRequired: 'El correo electrónico es requerido',
        emailInvalid: 'Por favor, ingrese un correo electrónico válido',
        phoneRequired: 'El número de teléfono es requerido',
        companyRequired: 'El nombre de la empresa es requerido'
      }
    },
    locationsBanner: {
      tagline: 'Impulsamos tu negocio de principio a fin.'
    },
    modals: {
      job: {
        title: 'Empleo',
        description: 'Queremos saber más de ti, envíanos tus datos y nos pondremos en contacto pronto.',
        namePlaceholder: 'Nombre y Apellido',
        countryPlaceholder: 'País',
        cityPlaceholder: 'Ciudad',
        emailPlaceholder: 'Correo electrónico',
        attachCV: 'Adjunte su CV',
        messagePlaceholder: 'Mensaje',
        sendButton: 'Enviar',
        successMessage: '¡Formulario enviado correctamente!',
        errors: {
          nameRequired: 'Nombre y Apellido es requerido',
          countryRequired: 'País es requerido',
          cityRequired: 'Ciudad es requerido',
          emailRequired: 'Correo electrónico es requerido',
          emailInvalid: 'Correo electrónico inválido',
          messageRequired: 'Mensaje es requerido'
        }
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      aboutUs: 'About Us',
      contact: 'Contact Us',
      trackShipment: 'Track your shipment',
      jobs: 'Jobs'
    },
    footer: {
      tagline: 'We drive your business from start to finish.',
      recentPosts: 'Recent Posts',
      quickContact: 'Quick Contact',
      name: 'Full Name',
      email: 'Email',
      send: 'Send',
      sending: 'Sending...',
      copyright: 'Copyright 2025 Taurel. Tax ID: J-00035914-8',
      contactWhatsApp: 'Contact via WhatsApp',
      viewLocation: 'View location on Google Maps',
      errorRequired: 'is required',
      errorInvalidEmail: 'Invalid email format',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Error sending message. Please try again.'
    },
    home: {
      hero: {
        title: 'We are your logistics partner from start to finish, committed at every step: from initial planning to final destination.',
        cta: 'Discover our solutions'
      },
      stats: {
        title: 'Taurel: it\'s a 100-year legacy',
        subtitle: 'Some interesting facts about our company',
        offices: 'Offices nationwide',
        partners: 'Global partners to connect your operations',
        employees: 'Employees to meet your needs',
        clients: 'Clients who trust our innovative solutions'
      },
      timeline: {
        title: 'Our History, Your Trust...',
        year1911: 'We started with a small customs office handling basic port procedures for receiving goods at port.',
        year1945: 'We decided to expand our activities to sea freight transport management, building an iconic building in La Guaira – Venezuela.',
        year1994: 'Selected as Customs Agent and Customs Advisor for CARACAS METRO C.A. for 4 years (Line 3).',
        year1999: 'First Quality Management Service Certificate. Under COVENIN-ISO 9002:1995 standard.',
        year2002: 'Representation of ZIM shipping line in Venezuela. Since 2002, exclusive representation with the creation of ZIM Venezuela.',
        year2024: 'We innovated technologically with the creation of DragOn, our APP.'
      },
      certification: {
        title: 'ISO 9001:2025 Certification'
      }
    },
    services: {
      slider: {
        service1: {
          title: 'Technical Advisory',
          description: 'This service helps you process permits to import, export and move goods. It also offers specialized advice on customs and foreign trade, based on the legal framework of the Customs Tariff to ensure all processes are correct.'
        },
        service2: {
          title: 'Customs Agency',
          description: 'We handle Imports, Exports and/or Transit of your shipments, aligned with changing national and international regulations, with offices at all authorized maritime, air and land Customs.'
        },
        service3: {
          title: 'International Freight Transport',
          description: 'We reach more than 180 countries worldwide, which allows us to offer you: Coverage on all continents, Consolidated air, sea and multimodal services, Full container (FCL) and less than container load (LCL) service, International land transport in full truckload (FTL) and less than truckload (LTL).'
        },
        service4: {
          title: 'Land Transport',
          description: 'The company offers a national land freight service to ensure your cargo arrives on time and safely. This service includes: Control and quality in cargo handling. Real-time tracking of your shipment status through our Online Services application.'
        },
        service5: {
          title: 'Shipping Services',
          description: 'We have vast experience that has positioned us as a trusted agent in Venezuela for the world\'s most important shipping lines. Acting as: general agent, port agent, protective agent, handling heavy and bulky cargo, coordination of loading and unloading operations.'
        },
        service6: {
          title: 'Warehousing',
          description: 'We have equipped and operational warehouses that offer packaging and container stuffing/unstuffing solutions. They also have an In Bond Customs Warehouse and handle complete supply chain management.'
        },
        service7: {
          title: 'International Purchases',
          description: 'We provide you with a trained and high-performance team that will guide you at every step throughout the entire process, from where to make your purchases to placing it at your factory door. Covering demand from Asia to Latin America.'
        }
      },
      page: {
        title: 'Our Logistics Solutions',
        advisory: {
          title: 'Technical Advisory',
          description: 'We provide specialized technical advice on customs, international trade and economic integration.',
          list1: 'We advise.',
          list2: 'We inform.',
          list3: 'We support',
          extraInfo: 'Processing of permits required by customs authorities for the entry or extraction of goods related to national territory.'
        },
        international: {
          title: 'International Freight Transport:',
          highlight: 'We reach more than 180 countries worldwide, which allows us to offer you:',
          list1: 'Coverage on all continents.',
          list2: 'Consolidated air, sea and multimodal services.',
          list3: 'Full container (FCL) and less than container load (LCL) service.',
          list4: 'International land transport in full truckload (FTL) and less than truckload (LTL).'
        },
        landTransport: {
          title: 'Land Transport:',
          description: 'In an efficient, safe and integrated manner, we provide you with the national land freight service to guarantee that your cargo arrives on time at the exact location, under the care of the same company, with controls and quality standards.'
        },
        storage: {
          title: 'Storage and Distribution:',
          description: 'We have equipped and operational warehouses that offer packaging and container stuffing/unstuffing solutions. They also have an In Bond Customs Warehouse and handle complete supply chain management.'
        },
        internationals: {
          title: 'International Purchases:',
          description: 'We provide you with a trained and high-performance team that will guide you at every step throughout the entire process, from where to make your purchases to placing it at your factory door. Covering demand from Asia to Latin America.',
          list1: 'Comprehensive purchasing and logistics solutions, with air and sea shipments.',
          list2: 'Cargo consolidation, regardless of size and location.',
          list3: 'Networking, market research for import and export.',
          list4: 'Cargo shipping from Miami to Venezuela, delivering to warehouses or offices.'
        },
        maritime: {
          title: 'Shipping Services',
          description: 'Since 1945, we have perfected our service to offer the excellence your business deserves. Our vast experience has positioned us as trusted agents in Venezuela for the world\'s most important shipping lines.',
          containers: {
            title: 'Full and empty container handling:',
            list1: 'Total container management: full and empty with efficient mobilization at Venezuela\'s main ports.',
            list2: 'Real-time control and monitoring: we offer visibility and control over the status of your equipment.',
            list3: 'Security: we guarantee the integrity of your goods and the safeguarding of containers.',
            list4: 'Container repairs: we operate under international standards.'
          },
          actingAs: {
            title: 'Acting as:',
            list1: 'General agent',
            list2: 'Port agent',
            list3: 'Protective agent',
            list4: 'Handling heavy and bulky cargo, and coordination of loading and unloading operations.'
          }
        },
        customs: {
          title: 'Customs Agency',
          description: 'With more than 110 years of experience in the Venezuelan market, we handle your imports, exports and/or transit of shipments; as well as your re-importation, re-exportation, re-shipment, storage or deposit and/or the application of Special Customs Regimes, through all authorized maritime, air and land customs where we have presence.'
        },
        logisticsChain: {
          title: 'OUR LOGISTICS CHAIN...'
        }
      }
    },
    aboutUs: {
      mission: {
        title: 'Mission',
        paragraph1: 'Our fundamental mission is to facilitate international trade through a comprehensive logistics service, acting as the strategic bridge that connects markets and opportunities.',
        paragraph2: 'We are dedicated to transforming the logistics experience in its entirety, prioritizing quality in every link of the supply chain, from origin to final destination.'
      },
      vision: {
        title: 'Vision',
        paragraph1: 'We envision ourselves as the transforming agent of the Venezuelan logistics sector, driving profound change through the introduction of world-class standards, technological innovation and cutting-edge operational practices.',
        paragraph2: 'We aspire to achieve levels of performance so excellent that not only redefine local industry parameters, but also project us strongly on the international stage, establishing global alliances and expanding our radius of action.'
      },
      values: {
        header: 'In our company, we build every achievement on a solid foundation of values.',
        subtitle: 'They are the compass that guides our decisions, drives our growth and reflects the essence of our organizational culture.',
        value1: {
          title: 'Passion for Service',
          text: 'We are driven by enthusiasm to help you and turn every challenge into a solution.'
        },
        value2: {
          title: 'Respect and Inclusion',
          text: 'We believe in diversity and value every person who is part of our journey.'
        },
        value3: {
          title: 'Ethics and Quality',
          text: 'We do what is right and always seek to exceed the highest standards.'
        },
        value4: {
          title: 'Commitment',
          text: 'We honor our word and deliver what we promise.'
        },
        value5: {
          title: 'Innovation',
          text: 'We think differently and find new ways to generate value.'
        },
        value6: {
          title: 'Optimization',
          text: 'We constantly perfect processes to achieve better results.'
        }
      },
      chambers: {
        title: 'Active participation in guilds and chambers',
        subtitle: 'We offer much more than logistics'
      }
    },
    contact: {
      title: 'Contact Us',
      formTitle: 'How can we help you?',
      formDescription: 'If you have any questions about Taurel or how we can help with any logistics-related matter, please contact our service staff.',
      requestPlaceholder: 'Indicate your request or requirement...',
      namePlaceholder: 'Full Name',
      emailPlaceholder: 'Email',
      phonePlaceholder: 'Phone Number',
      companyPlaceholder: 'Company',
      sendButton: 'Send',
      sendingButton: 'Sending...',
      mapTitle: 'Taurel goes wherever you are',
      mapSubtitle: 'Your destination easy to find, visit us at your preferred location',
      officeHours: 'Office hours: ',
      officeHoursDetails: 'Monday to Friday. 8:00am - 5:00pm.',
      errors: {
        requestRequired: 'Please indicate your request or requirement',
        nameRequired: 'Full name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        phoneRequired: 'Phone number is required',
        companyRequired: 'Company name is required'
      }
    },
    locationsBanner: {
      tagline: 'We drive your business from start to finish.'
    },
    modals: {
      job: {
        title: 'Jobs',
        description: 'We want to know more about you, send us your details and we will contact you soon.',
        namePlaceholder: 'Full Name',
        countryPlaceholder: 'Country',
        cityPlaceholder: 'City',
        emailPlaceholder: 'Email',
        attachCV: 'Attach your CV',
        messagePlaceholder: 'Message',
        sendButton: 'Send',
        successMessage: 'Form submitted successfully!',
        errors: {
          nameRequired: 'Full name is required',
          countryRequired: 'Country is required',
          cityRequired: 'City is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Invalid email',
          messageRequired: 'Message is required'
        }
      }
    }
  }
};
