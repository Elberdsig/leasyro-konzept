import { describe, expect, test } from "vitest";

import { developerJob, jobs } from "@/content/jobs";

/** The live site states no salary, so nothing in this file may state one. */
const gehaltsFelder = /(salary|gehalt|lohn|verguetung|vergütung|entgelt)/i;

describe("Stellenanzeige", () => {
  test("datePosted ist ein gültiges ISO-Datum", () => {
    expect(developerJob.datePosted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const datum = new Date(developerJob.datePosted);
    expect(Number.isNaN(datum.getTime())).toBe(false);
    expect(datum.toISOString().slice(0, 10)).toBe(developerJob.datePosted);
  });

  test("dateModified liegt nicht vor datePosted", () => {
    expect(developerJob.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(new Date(developerJob.dateModified).getTime()).toBeGreaterThanOrEqual(
      new Date(developerJob.datePosted).getTime(),
    );
  });

  test("Titel, Ort und Beschreibung sind nicht leer", () => {
    expect(developerJob.title.trim().length).toBeGreaterThan(0);
    expect(developerJob.location.trim().length).toBeGreaterThan(0);
    expect(developerJob.intro.trim().length).toBeGreaterThan(40);
    expect(developerJob.introSecond.trim().length).toBeGreaterThan(40);
  });

  test("Aufgaben, Qualifikation und Benefits sind gefüllt", () => {
    expect(developerJob.tasks.length).toBeGreaterThan(0);
    expect(developerJob.requirements.length).toBeGreaterThan(0);
    expect(developerJob.benefitGroups.length).toBeGreaterThan(0);
    for (const gruppe of developerJob.benefitGroups) {
      expect(gruppe.title.trim().length).toBeGreaterThan(0);
      expect(gruppe.items.length).toBeGreaterThan(0);
    }
  });

  test("kein Gehalt, weil es dafür keine Quelle gibt", () => {
    for (const feld of Object.keys(developerJob)) {
      expect(gehaltsFelder.test(feld), `Feld ${feld}`).toBe(false);
    }
    const alsText = JSON.stringify(developerJob);
    expect(alsText).not.toContain("€");
    expect(alsText).not.toContain("EUR");
  });

  test("die drei offenen Stellen sind vollständig beschrieben", () => {
    expect(jobs).toHaveLength(3);
    expect(jobs[0].slug).toBe("software-developer");
    for (const stelle of jobs) {
      expect(stelle.title.trim().length).toBeGreaterThan(0);
      expect(stelle.area.trim().length).toBeGreaterThan(0);
      expect(stelle.employment.trim().length).toBeGreaterThan(0);
      expect(stelle.teaser.trim().length).toBeGreaterThan(0);
    }
  });
});
