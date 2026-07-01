import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pricingRules = [
  ["low", 11, 1, 3, 31, 1, 1, 110],
  ["low", 11, 1, 3, 31, 2, 3, 100],
  ["low", 11, 1, 3, 31, 4, 7, 90],
  ["low", 11, 1, 3, 31, 8, 15, 80],
  ["low", 11, 1, 3, 31, 16, 30, 70],
  ["shoulder", 4, 1, 6, 30, 1, 1, 125],
  ["shoulder", 4, 1, 6, 30, 2, 3, 115],
  ["shoulder", 4, 1, 6, 30, 4, 7, 105],
  ["shoulder", 4, 1, 6, 30, 8, 15, 95],
  ["shoulder", 4, 1, 6, 30, 16, 30, 85],
  ["shoulder", 9, 1, 10, 31, 1, 1, 125],
  ["shoulder", 9, 1, 10, 31, 2, 3, 115],
  ["shoulder", 9, 1, 10, 31, 4, 7, 105],
  ["shoulder", 9, 1, 10, 31, 8, 15, 95],
  ["shoulder", 9, 1, 10, 31, 16, 30, 85],
  ["high", 7, 1, 8, 31, 1, 1, 150],
  ["high", 7, 1, 8, 31, 2, 3, 140],
  ["high", 7, 1, 8, 31, 4, 7, 125],
  ["high", 7, 1, 8, 31, 8, 15, 110],
  ["high", 7, 1, 8, 31, 16, 30, 95],
];

async function main() {
  const car = await prisma.car.upsert({
    where: { id: "default-car" },
    update: {},
    create: {
      id: "default-car",
      make: "Volkswagen",
      model: "Passat",
      year: 2013,
      engine: "2.5",
      transmission: "Automatic",
      fuel: "Petrol + LPG",
      seats: 5,
      bodyType: "Sedan",
      luggageCapacity: "3 suitcases",
      location: "Batumi, Georgia",
      description:
        "One privately owned VW Passat for request-to-book rental in Batumi.",
      active: true,
    },
  });

  await prisma.settings.upsert({
    where: { id: "default-settings" },
    update: {},
    create: {
      id: "default-settings",
      ownerName: "Owner",
      ownerEmail: "owner@example.com",
      ownerWhatsappNumber: "+995555000000",
      ownerTelegramUsername: "batumi_car_rental",
      primaryCurrency: "GEL",
      showUsdEquivalent: false,
      minimumDriverAge: 21,
      minimumDrivingExperienceYears: 2,
      depositAmountGel: 300,
      insuranceIncluded: true,
      insuranceSummary:
        "Insurance details are confirmed before final approval. Damage, fines, missing fuel, smoking, off-road use, beach driving, and unreported accidents may be charged separately.",
      mileagePolicy:
        "Unlimited mileage for rentals of 2+ days. One-day rentals include 200 km, then 0.50 GEL per extra km.",
      oneDayKmLimit: 200,
      extraKmPriceGel: 0.5,
      termsVersion: "v1",
      privacyVersion: "v1",
    },
  });

  await prisma.carImage.upsert({
    where: { id: "default-hero-image" },
    update: {},
    create: {
      id: "default-hero-image",
      carId: car.id,
      url: "/batumi-private-car-hero.png",
      altText: "VW Passat rental placeholder image in Batumi",
      sortOrder: 1,
      isPrimary: true,
    },
  });

  await prisma.pricingRule.deleteMany();
  await prisma.pricingRule.createMany({
    data: pricingRules.map(
      ([
        seasonName,
        startMonth,
        startDay,
        endMonth,
        endDay,
        minDays,
        maxDays,
        dailyPriceGel,
      ]) => ({
        seasonName,
        startMonth,
        startDay,
        endMonth,
        endDay,
        minDays,
        maxDays,
        dailyPriceGel,
      }),
    ),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
