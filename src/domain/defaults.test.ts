import { describe, expect, it } from "vitest";

import { defaultCar, defaultSettings, forbiddenTravelAreas } from "./defaults";

describe("business defaults", () => {
  it("seeds the single VW Passat rental car", () => {
    expect(defaultCar).toMatchObject({
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
      active: true,
    });
  });

  it("keeps deposit, driver requirements, and insurance editable defaults explicit", () => {
    expect(defaultSettings.depositAmountGel).toBe(300);
    expect(defaultSettings.minimumDriverAge).toBe(21);
    expect(defaultSettings.minimumDrivingExperienceYears).toBe(2);
    expect(defaultSettings.insuranceSummary).not.toMatch(/full insurance/i);
  });

  it("lists forbidden travel areas required by the Batumi rental rules", () => {
    expect(forbiddenTravelAreas).toContain("Abkhazia");
    expect(forbiddenTravelAreas).toContain("South Ossetia");
  });
});
