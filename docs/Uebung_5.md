# Übung 5: Playwright und Page-Objects Pattern

Zusätzlich zu den Unit-Tests soll nun ein Oberflächentest ergänzt werden, um sicherzustellen:
* das die Anwendung selbst integrativ funktioniert (und nicht nur einzelne Pages)
* das die Anwendung mit den gängigen Browser-Engines (Chromium, Firefox, Webkit) kompatibel ist

Um die Tests gut les- und wartbar umsetzen zu können, soll ein Page Object Model verwendet werden.
Hierfür existiert bereits die Klasse [CustomerPage](../frontend-vue/test/pages/CustomerPage.ts) und deren Test-Datei [CustomerPage.spec.ts](../frontend-vue/test/ui/CustomerPage.spec.ts).

## Aufgabe 1

Implementiert einen UI-Test, der testet, dass die Liste der Customer angezeigt wird, und 2-3 vom Test vorgegebene Customer darin angezeigt werden.

## Aufgabe 2

Implementiert einen UI-Test, der einen neuen Customer hinzufügt und sicher stellt, dass dieser anschließend in der Tabelle angezeigt wird.

## Hinweise

Da diese Tests nur die Oberfläche testen sollen (und nicht vom Backend abhängig sein sollen), müssen die Aufrufe an das Backend vom Test gemockt werden.
Lasst euch hierzu `backendMock` in den Test injecten und nutzt dann die `intercept`-Methode.

[< Vorherige Übung](./Uebung_4.md) - [Nächste Übung >](./Uebung_6.md)
