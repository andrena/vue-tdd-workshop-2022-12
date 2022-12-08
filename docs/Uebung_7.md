# Übung 7: Akzeptanztests mit Cucumber.js

## Aktivierung-Workflow mit Cucumber testen

Weil der Fachbereich selten Code versteht und damit man sich über die Anforderungen einfach einigen kann, kann man die
Gherkin Sprache nutzen, um Akzeptanz-Tests zu definieren.

### Aufgabe

Implementiert den gleichen Test wie in Übung 6, aber nutzt Cucumber statt den Playwright Test-runner. Versucht die
Schritte so "menschenfreundlich" wie möglich zu machen.

### Hinweise

- Eine Feature File liegt bereits in [Customer.feature](../frontend-vue/test/cucumber/features/Customer.feature) vor
- Step Definitions sind in [customer.steps.ts](../frontend-vue/test/cucumber/step_definitions/customer.steps.ts)
- Cucumber ist bereits konfiguriert und ist über die run config `test:cucumber` ausführbar

[< Vorherige Übung](./Uebung_6.md)
