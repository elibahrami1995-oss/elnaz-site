import Anthropic from '@anthropic-ai/sdk';
import { searchDocuments } from './rag.js';
import {
  getShortTermMemory,
  addToShortTerm,
  getLongTermMemory,
  saveLongTermMemory,
} from './memory.js';
import { toolDefinitions, executeTool } from './tools.js';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_SYSTEM = `تو دستیار هوشمند الناز بهرامی هستی — متخصص تولید محتوا با هوش مصنوعی.

شخصیت:
- گرم، صادق، و حرفه‌ای
- فارسی روان و دوستانه (نه رسمی خشک)
- کوتاه و به‌جا پاسخ بده؛ نه دیوار متن

وظایف اصلی:
۱. پاسخ به سوالات درباره الناز، خدماتش، دوره‌های آموزشی، و هوش مصنوعی
۲. راهنمایی کاربران برای ثبت‌نام یا دریافت مشاوره
۳. ثبت اطلاعات علاقه‌مندان (lead) وقتی کاربر اطلاعات تماس می‌دهد
۴. بررسی وضعیت ثبت‌نام کاربران

محدودیت:
- فقط درباره الناز بهرامی، خدماتش، هوش مصنوعی و تولید محتوا صحبت کن
- اطلاعات شخصی را بدون اجازه به اشتراک نگذار
- اگر سوالی خارج از حوزه‌ات است، صادقانه بگو

زبان: همیشه فارسی، مگر اینکه کاربر به زبان دیگری بنویسد.`;

/**
 * processMessage — central brain entry point
 * @param {Object} params
 * @param {string} params.message   - User's text
 * @param {string} params.sessionId - Unique per conversation (for short-term memory)
 * @param {string} [params.userId]  - Persistent user ID (for long-term memory)
 * @param {string} [params.source]  - 'website' | 'telegram' | 'widget'
 * @returns {Promise<string>}       - Assistant's reply
 */
export async function processMessage({ message, sessionId, userId, source = 'website' }) {
  // 1. Fetch short-term conversation history (before this turn)
  const history = getShortTermMemory(sessionId);

  // 2. RAG: find relevant knowledge-base chunks
  const [ragDocs, longTermMems] = await Promise.all([
    searchDocuments(message).catch(() => []),
    userId ? getLongTermMemory(userId, message).catch(() => []) : Promise.resolve([]),
  ]);

  // 3. Build system prompt with injected context
  let system = BASE_SYSTEM;
  if (ragDocs.length > 0) {
    const ragContext = ragDocs.map(d => d.content).join('\n\n---\n\n');
    system += `\n\n## اطلاعات مرتبط از پایگاه دانش:\n${ragContext}`;
  }
  if (longTermMems.length > 0) {
    const memContext = longTermMems.map(m => m.content).join('\n\n');
    system += `\n\n## یادداشت‌های قبلی از این کاربر:\n${memContext}`;
  }
  if (source) {
    system += `\n\nکانال: ${source}`;
  }

  // 4. Build messages for Claude
  const messages = [
    ...history,
    { role: 'user', content: message },
  ];

  // 5. Call Claude (with tool use loop)
  let response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system,
    tools: toolDefinitions,
    messages,
  });

  // 6. Agentic tool-use loop
  const workingMessages = [...messages];
  while (response.stop_reason === 'tool_use') {
    const toolUseBlocks = response.content.filter(b => b.type === 'tool_use');

    // Execute all requested tools in parallel
    const toolResults = await Promise.all(
      toolUseBlocks.map(async (block) => {
        const result = await executeTool(block.name, block.input);
        return {
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(result),
        };
      })
    );

    workingMessages.push({ role: 'assistant', content: response.content });
    workingMessages.push({ role: 'user', content: toolResults });

    response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system,
      tools: toolDefinitions,
      messages: workingMessages,
    });
  }

  // 7. Extract final text
  const finalText = response.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');

  // 8. Persist to short-term memory
  addToShortTerm(sessionId, 'user', message);
  addToShortTerm(sessionId, 'assistant', finalText);

  // 9. Persist meaningful turns to long-term memory (fire and forget)
  if (userId && message.length > 25 && finalText.length > 25) {
    saveLongTermMemory(
      userId,
      `کاربر: ${message}\nدستیار: ${finalText}`
    ).catch(() => {});
  }

  return finalText;
}
