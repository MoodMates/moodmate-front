import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { journalText } = await req.json();

    if (!journalText) {
      return NextResponse.json(
        { error: "Le texte du journal est requis" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Tu es un psychologue bienveillant qui analyse les journaux intimes pour aider les gens à mieux comprendre leurs émotions. 
          
          Analyse le journal suivant et retourne une réponse JSON avec:
          - mood: l'état d'esprit général (string)
          - emotions: liste des émotions identifiées (array de strings)
          - summary: résumé de l'analyse (string)
          - suggestions: suggestions pour améliorer le bien-être (array de strings)
          
          Sois empathique, constructif et professionnel.`,
        },
        {
          role: "user",
          content: `Voici le contenu du journal à analyser:\n\n${journalText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error("Pas de réponse de ChatGPT");
    }

    let analysisResult;
    try {
      analysisResult = JSON.parse(responseText);
    } catch (parseError) {
      analysisResult = {
        mood: "Analyse en cours - réponse non structurée reçue",
        emotions: ["Analyse", "Réflexion"],
        summary: responseText,
        suggestions: ["Continuez à tenir votre journal", "Prenez soin de vous"],
      };
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Erreur lors de l'analyse:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse du journal" },
      { status: 500 }
    );
  }
}
