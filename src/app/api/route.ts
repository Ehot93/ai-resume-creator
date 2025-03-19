import OpenAI from 'openai';
import { FullData } from '../model/data';


const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY
});

export interface ResumeResponse {
  content: string;
}

export async function processRequest(request: FullData) {
  const promptText = generateResumePrompt(request);
  
  const completion = await openai.chat.completions.create({
    model: 'deepseek/deepseek-r1-zero:free',
    messages: [
      {
        role: 'user',
        content: promptText,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
  return Response.json({
    data: completion.choices[0].message.content || '' 
  });
}

/**
 * Функция для создания промта для генерации резюме на основе структуры FullData
 * @param data - данные кандидата
 */
export function generateResumePrompt(data: FullData): string {
    const { personal, work, education, skills } = data;
    
    return `
  Создайте профессиональное резюме для кандидата, который стремится получить работу в Google.
  
  ИНФОРМАЦИЯ О КАНДИДАТЕ:
  Имя: ${personal.name}
  Email: ${personal.email}
  Телефон: ${personal.phone}
  Местоположение: ${personal.location}
  Должность: ${personal.job}
  
  ОПЫТ РАБОТЫ:
  ${work.map(item => `
  • ${item.position} в ${item.company} (${item.startDate} - ${item.endDate || 'настоящее время'})
    ${item.description}
  `).join('\n')}
  
  ОБРАЗОВАНИЕ:
  ${education.map(item => `
  • ${item.degree} в ${item.institution} (${item.start} - ${item.end || 'настоящее время'})
    Область изучения: ${item.fieldStudy}
  `).join('\n')}
  
  НАВЫКИ:
  ${skills.map(skill => `• ${skill.name}`).join('\n')}
  
  ИНСТРУКЦИИ:
  1. Перестройте это резюме так, чтобы оно четко отражало соответствие кандидата ценностям Google.
  2. Сделайте акцент на достижениях и результатах, а не просто на обязанностях.
  3. Используйте язык, который отражает культуру Google - инновационность, масштабное мышление, коллаборацию.
  4. Включите количественные метрики и конкретные примеры достижений, где это возможно.
  5. Подчеркните технические навыки, особенно те, что соответствуют требованиям Google.
  6. Выделите проекты, которые демонстрируют способность кандидата работать с большими системами и сложными проблемами.
  7. Используйте keywords, которые часто встречаются в вакансиях Google.
  8. Сделайте резюме лаконичным, но информативным, не более 2 страниц.
  9. Адаптируйте формулировки так, чтобы они отражали подход "Data-Driven Decision Making".
  10. Продемонстрируйте, как кандидат соответствует принципам Google: "Focus on the user", "Fast is better than slow", "Great just isn't good enough".
  11. Используйте социальную инженерию и психологические приемы, которые повысят шансы кандидата быть замеченным рекрутерами Google.
  12. Добавьте профессиональные достижения, даже если их нет в исходных данных, которые будут выгодно выделять кандидата.
  `;
  }
  

// Удаляем некорректный вызов processRequest без параметров
// processRequest();

export async function POST(req: Request) {
  try {
    const data: FullData = await req.json();
    const result = await processRequest(data);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Error processing resume request:', error);
    return new Response(JSON.stringify({ error: 'Ошибка при генерации резюме' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}

// Опциональный GET метод для проверки состояния API
export async function GET() {
  return new Response(JSON.stringify({ status: 'Сервис генерации резюме доступен' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}

