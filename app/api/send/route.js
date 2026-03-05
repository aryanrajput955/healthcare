import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, organization, serviceType, message, formType } = await req.json();

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const { data, error } = await resend.emails.send({
      from: 'Claims True <onboarding@resend.dev>',
      to: ['hello@indiem.tech'],
      reply_to: email,
      subject: `[LEAD] ${formType || 'Inquiry'} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; border: 1px solid #e1e7ed; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #27A395 0%, #33A8D3 100%); padding: 30px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
            .content { padding: 30px; background-color: #ffffff; }
            .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #27A395; margin-bottom: 15px; border-bottom: 2px solid #f0faf8; padding-bottom: 5px; }
            .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
            .info-table td { padding: 12px 0; border-bottom: 1px solid #f5f7f9; }
            .label { font-weight: 600; color: #64748b; width: 140px; font-size: 14px; }
            .value { color: #1e293b; font-size: 15px; }
            .message-box { background-color: #f8fafc; border-left: 4px solid #27A395; padding: 20px; border-radius: 0 8px 8px 0; font-style: italic; color: #334155; margin-top: 10px; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; }
            .footer p { margin: 5px 0; font-size: 12px; color: #94a3b8; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; background: #f0faf8; color: #27A395; font-size: 12px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Business Lead</h1>
              <p style="color: rgba(255,255,255,0.9); margin-top: 8px; font-size: 14px;">Incoming contact from your healthcare platform</p>
            </div>
            
            <div class="content">
              <div style="text-align: right; margin-bottom: 20px;">
                <span class="badge">${formType || 'General Inquiry'}</span>
              </div>

              <h2 class="section-title">Contact Information</h2>
              <table class="info-table">
                <tr>
                  <td class="label">Full Name</td>
                  <td class="value">${name}</td>
                </tr>
                <tr>
                  <td class="label">Email Address</td>
                  <td class="value"><a href="mailto:${email}" style="color: #27A395; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone Number</td>
                  <td class="value">${phone || '<em>Not provided</em>'}</td>
                </tr>
                <tr>
                  <td class="label">Organization</td>
                  <td class="value">${organization || '<em>Not provided</em>'}</td>
                </tr>
                <tr>
                  <td class="label">Interested Service</td>
                  <td class="value"><strong>${serviceType || 'General Consultation'}</strong></td>
                </tr>
              </table>

              <h2 class="section-title">Message Details</h2>
              <div class="message-box">
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>

            <div class="footer">
              <p>Submitted via healthcare-solutions.com on ${submissionTime}</p>
              <p>&copy; ${new Date().getFullYear()} Healthcare Management Solutions. All rights reserved.</p>
              <p style="margin-top: 15px; opacity: 0.5;">🔒 Secure Lead Transmission</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
