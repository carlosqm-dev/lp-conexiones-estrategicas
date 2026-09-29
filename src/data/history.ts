export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    year: '1989',
    title: 'El primer movimiento',
    description:
      'Desde el vehículo, la ruta y la operación diaria se construyó un conocimiento que no se aprende únicamente en la academia: son 37 años entendiendo los tiempos, necesidades del cliente, las condiciones del camino y la responsabilidad que existe detrás de cada entrega.',
  },
  {
   year: '2006',
   title: 'Una segunda generación acompaña el camino',
   description:
     'Desde los 16 años, Santiago comenzó a conducir camión, entendio la operación desde adentro con cada una de sus variables. Al mismo tiempo, su formación como Ingeniero en Productividad y Calidad, complementada con una Especialización en Creatividad Estratégica, abrió una nueva perspectiva atravez del conocimiento técnico.',
 },
 {
   year: '2012',
   title: 'Crecer para responder',
   description:
     'La adquisición de nuevos vehículos respondió a un mercado que estaba cambiando. Cada nuevo recurso, cada operación y cada aprendizaje fueron dando forma a una compañía con mayor capacidad para entender y atender las necesidades de sus clientes.',
 },
 {
   year: '2023',
   title: 'Una nueva identidad',
   description:
     'Formalizamos nuestra operación como Conexiones Estratégicas G&S. El nombre representa algo que ya estaba presente desde mucho antes: entender que nuestro trabajo no consiste únicamente en transportar. Conectamos personas, empresas, operaciones y procesos para que las cosas avancen en función de la efectividad.',
 },
 {
   year: 'hoy',
   title: 'Experiencia que evoluciona',
   description:
     'Dos generaciones que trabajan articulando la experiencia de quien conoce la operación desde hace 37 años y la visión de quien aprendió la operación desde adentro y la llevó al terreno técnico y estratégico. Esa combinación define nuestra manera de hacer las cosas, no buscamos quedarnos con lo que ya sabemos hacer, tomamos la experiencia, la cuestionamos, la mejoramos y la ponemos al servicio de lo que viene.',
 },
];

export const foundersQuote = {
  text: 'Construimos esto camión a camión, cliente a cliente.',
  attribution: 'Gentil y Santiago',
  confirmed: false,
};

export interface HistoryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const historyPhotos: HistoryPhoto[] = [
  {
    src: '/images/historia/cabina-padre-hijo.webp',
    alt: 'Los fundadores de G&S Conexiones Estratégicas junto a uno de los camiones de la flota',
    width: 1200,
    height: 1800,
  },
  {
    src: '/images/historia/fundadores.webp',
    alt: 'Dos integrantes del equipo de G&S de pie frente a la cabina de un camión',
    width: 1000,
    height: 1500,
  },
  {
    src: '/images/historia/fundador.webp',
    alt: 'Dos integrantes del equipo revisan una tableta dentro de la cabina de un camión',
    width: 1000,
    height: 1298,
  },
  {
    src: '/images/historia/fundador-camion.webp',
    alt: 'Un integrante del equipo posa junto al frente de un camión de la flota',
    width: 1000,
    height: 1608,
  },
  {
    src: '/images/historia/flota.webp',
    alt: 'Un operario asegura una carga de pacas de PET para reciclaje',
    width: 1000,
    height: 1778,
  },
];
