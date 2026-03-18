import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, whatsapp, asunto, mensaje } = await req.json();

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "alejomira96@gmail.com",
      subject: `Contacto Portfolio: ${asunto}`,
      replyTo: email,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        whatsapp ? `WhatsApp: ${whatsapp}` : null,
        `Asunto: ${asunto}`,
        "",
        `Mensaje:`,
        mensaje,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
