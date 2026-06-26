import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Tool schemas sent to Claude
export const toolDefinitions = [
  {
    name: 'capture_lead',
    description: `وقتی کاربر اطلاعات تماس می‌دهد یا می‌خواهد مشاوره بگیرد، ثبت‌نام کند، یا قیمت بداند، این ابزار را صدا بزن.
اطلاعاتی که کاربر ارائه داده را ثبت کن — نیازی نیست همه فیلدها پر باشند.`,
    input_schema: {
      type: 'object',
      properties: {
        name:     { type: 'string', description: 'نام کاربر' },
        phone:    { type: 'string', description: 'شماره موبایل' },
        email:    { type: 'string', description: 'ایمیل' },
        interest: { type: 'string', description: 'موضوع مورد علاقه یا درخواست (مثلاً: مشاوره تولید محتوا، دوره AI)' },
        source:   { type: 'string', description: 'کانال ورود (telegram / website / widget)' },
      },
      required: ['interest'],
    },
  },
  {
    name: 'check_registration_status',
    description: `وضعیت ثبت‌نام کاربر در دوره‌های الناز بهرامی را بررسی کن.
وقتی کاربر می‌پرسد "ثبت‌نامم چی شد"، "کِی دوره شروع میشه"، یا هر سوالی درباره وضعیت ثبت‌نامش.`,
    input_schema: {
      type: 'object',
      properties: {
        phone: { type: 'string', description: 'شماره موبایل کاربر' },
        email: { type: 'string', description: 'ایمیل کاربر' },
      },
    },
  },
];

// Execute a tool and return a result object
export async function executeTool(name, input) {
  if (name === 'capture_lead') {
    const { error } = await supabase.from('leads').insert({
      name:     input.name     || null,
      phone:    input.phone    || null,
      email:    input.email    || null,
      interest: input.interest,
      source:   input.source   || 'unknown',
    });
    if (error) {
      console.error('Lead capture error:', error.message);
      return { success: false };
    }
    return { success: true };
  }

  if (name === 'check_registration_status') {
    if (!input.phone && !input.email) {
      return { found: false, reason: 'no_identifier' };
    }

    let query = supabase.from('registrations').select('course_name, status, created_at');
    if (input.phone) query = query.eq('phone', input.phone);
    else             query = query.eq('email', input.email);

    const { data, error } = await query;
    if (error) {
      console.error('Registration check error:', error.message);
      return { found: false, reason: 'error' };
    }
    if (!data || data.length === 0) {
      return { found: false, reason: 'not_found' };
    }
    return {
      found: true,
      registrations: data.map(r => ({
        course: r.course_name,
        status: r.status,
        date:   r.created_at?.split('T')[0],
      })),
    };
  }

  return { error: 'unknown_tool' };
}
