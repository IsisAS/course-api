import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const CursosMockup = [
  {
    name: "Desenvolvimento Web com React e Next.js",
    description: "Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.",
    cover: "https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg",
    enrollmentsCount: 1234,
    startDate: new Date(2024, 5, 20),
  },
  {
    name: "Introdução à Inteligência Artificial",
    description: "Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.",
    cover: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos.jpeg",
    enrollmentsCount: 5678,
    startDate: new Date(2024, 6, 15),
  },
  {
    name: "Fotografia para Iniciantes",
    description: "Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.",
    cover: "https://img-c.udemycdn.com/course/240x135/1680762_24a3_4.jpg",
    enrollmentsCount: 9012,
    startDate: new Date(2024, 7, 10),
  },
  {
    name: "Inglês Instrumental para o Mercado de Trabalho",
    description: "Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.",
    cover: "https://img-c.udemycdn.com/course/240x135/2927102_7440_13.jpg",
    enrollmentsCount: 13579,
    startDate: new Date(2024, 8, 5),
  },
  {
    name: "Finanças Pessoais para Iniciantes",
    description: "Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.",
    cover: "https://img-c.udemycdn.com/course/750x422/1021106_fa99_6.jpg",
    enrollmentsCount: 17263,
    startDate: new Date(2024, 9, 1),
  },
  {
    name: "Culinária Vegetariana",
    description: "Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.",
    cover: "https://img-c.udemycdn.com/course/750x422/2846294_d765_5.jpg",
    enrollmentsCount: 21947,
    startDate: new Date(2024, 9, 20),
  },
  {
    name: "Yoga para Iniciantes",
    description: "Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.",
    cover: "https://img-c.udemycdn.com/course/240x135/1222344_23a3_2.jpg",
    enrollmentsCount: 26631,
    startDate: new Date(2024, 10, 15),
  },
  {
    name: "Produtividade Pessoal",
    description: "Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.",
    cover: "https://img-c.udemycdn.com/course/750x422/1692770_85c5_4.jpg",
    enrollmentsCount: 31315,
    startDate: new Date(2024, 11, 5),
  },
];

async function init() {
  await prisma.course.createMany({
    data: CursosMockup,
    skipDuplicates: true,
  });

  console.log("✅ Cursos populados com sucesso!");
}

init()
  .catch((e) => {
    console.error("❌ Erro ao popular cursos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });