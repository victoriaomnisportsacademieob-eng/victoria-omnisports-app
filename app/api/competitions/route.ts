import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const competitions = await prisma.competition.findMany({
      include: {
        players: true,
      },
    });

    return NextResponse.json(competitions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des compétitions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, date, location, opponent, result, score, userId } = await request.json();

    const competition = await prisma.competition.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
        opponent,
        result,
        score,
        userId,
      },
    });

    return NextResponse.json(competition, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création de la compétition' },
      { status: 500 }
    );
  }
}
