import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // input check
    if (!name || !email || !message) {
      return Response.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    // send email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "valdis.vascenkovs@gmail.com",
      subject: "Новое сообщение с веб-страницы 88barbershop.lv",
      html: `
                <div style="font-family:sans-serif;padding:16px;color:#1f1f1f;">
                <h2 style="margin-bottom:8px;">Новое сообщение с веб-страницы 88barbershop.lv</h2>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Электронная почта:</strong> ${email}</p>
                <p><strong>Сообщение:</strong></p>
                <p style="white-space:pre-line;">${message}</p>
                </div>
            `,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
