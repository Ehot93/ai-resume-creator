import { educationListData, EducationListItemData } from "./education";
import { SkillItemData, skillListData } from "./skills";
import { personalDataUnwrapped, PersonalInfoData } from "./personal";
import { WorkListItemData, workListData } from "./work";
import { atom } from "@reatom/core";
import { reatomAsync, withCache, withDataAtom } from "@reatom/framework";


export interface FullData {
    personal: PersonalInfoData;
    work: WorkListItemData[];
    education: EducationListItemData[];
    skills: SkillItemData[];
}

const testData: FullData = {
    personal: {
      name: "Иван Петров",
      job: "Senior Frontend Developer",
      email: "ivan.petrov@example.com",
      phone: "+7 (900) 123-45-67",
      location: "Москва, Россия"
    },
    work: [
      {
        id: "work1",
        company: "ТехноПро",
        position: "Senior Frontend Developer",
        startDate: "2020-01",
        endDate: "н.в.",
        description: "Возглавлял команду фронтенд-разработчиков в проекте по созданию корпоративной платформы для управления данными. Внедрил React и TypeScript в рабочий процесс, что увеличило скорость разработки на 35%. Оптимизировал производительность загрузки приложения, сократив время загрузки на 60%."
      },
      {
        id: "work2",
        company: "ИнноваСофт",
        position: "Frontend Developer",
        startDate: "2017-03",
        endDate: "2019-12",
        description: "Разрабатывал пользовательские интерфейсы для высоконагруженных веб-приложений. Создал библиотеку многоразовых компонентов, которая ускорила разработку новых страниц на 25%. Внедрил современные практики тестирования, что снизило количество ошибок при деплое на 40%."
      },
      {
        id: "work3",
        company: "ДиджиталВеб",
        position: "Junior Developer",
        startDate: "2015-09",
        endDate: "2017-02",
        description: "Участвовал в разработке пользовательских интерфейсов для клиентских веб-приложений. Освоил HTML5, CSS3, JavaScript и фреймворк Angular. Разработал модуль аналитики, который помог компании лучше понимать поведение пользователей."
      }
    ],
    education: [
      {
        id: "edu1",
        institution: "Московский Государственный Технический Университет",
        degree: "Магистр",
        fieldStudy: "Компьютерные науки и информационные технологии",
        start: "2013-09",
        end: "2015-06"
      },
      {
        id: "edu2",
        institution: "Московский Государственный Технический Университет",
        degree: "Бакалавр",
        fieldStudy: "Прикладная математика и информатика",
        start: "2009-09",
        end: "2013-06"
      }
    ],
    skills: [
      {
        id: "skill1",
        name: "JavaScript/TypeScript"
      },
      {
        id: "skill2",
        name: "React"
      },
      {
        id: "skill3",
        name: "Redux"
      },
      {
        id: "skill4",
        name: "Next.js"
      },
      {
        id: "skill5",
        name: "Node.js"
      },
      {
        id: "skill6",
        name: "GraphQL"
      },
      {
        id: "skill7",
        name: "Webpack"
      },
      {
        id: "skill8",
        name: "Jest/Testing Library"
      },
      {
        id: "skill9",
        name: "CI/CD"
      },
      {
        id: "skill10",
        name: "Git"
      },
      {
        id: "skill11",
        name: "Адаптивная верстка (HTML5/CSS3)"
      },
      {
        id: "skill12",
        name: "UX/UI дизайн"
      }
    ]
  };

export const fullDataUnwrapped = atom<FullData>((ctx) => {
    return testData;
    // return {
    //     personal: ctx.spy(personalDataUnwrapped),
    //     work: ctx.spy(workListData),
    //     education: ctx.spy(educationListData),
    //     skills: ctx.spy(skillListData),
    // }
})

export const generateResume = reatomAsync(async (ctx) => {
    const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify(ctx.get(fullDataUnwrapped)),
    })
    return response.json()
}).pipe(withDataAtom(), withCache({staleTime:1000}));
