# Übung 4: Refactoring und Komponenten-Design

## Ein komplexeres Formular

Bisher haben wir einfache Customers erstellt, die nur eine Adresse besitzen. Unser Model erlaubt aber, dass einem
Customer mehrere Adressen zugewiesen werden.

### Aufgabe

Erweitert (testgetrieben) das in der [CustomerPage.vue](../frontend-vue/src/pages/customers/CustomerPage.vue) aktuelle Formular, um von 1 bis zu 3 Adressen hinzufügen zu können.

- Das Formular enthält ursprünglich nur eine (leere) Adresse
- Wenn der Nutzer auf "Add new address" klickt
  - Wenn es weniger als 3 Adressen gibt, wird ein Unterformular für eine weitere Adresse angezeigt. Dieses enthält
    alle bisherige Felder: "Street and number", "Zip code", "City" und "Country".
  - Wenn es bereits 3 Adressen gibt, passiert nichts.
- Wenn der Nutzer auf "Remove address" klickt
  - Wenn es mehr als eine Adresse gibt, wird das letzte Unterformular ausgeblendet. Die Daten sind dann verloren.
  - Wenn es nur eine Adresse gibt, passiert nichts.
- Wenn der Nutzer mehrere Adressen ausgefüllt hat, dann werden alle Adressen gespeichert.

### Hinweise

Der Teil des Formulars, der für die Adresse zuständig ist, lässt sich gut als eigene Komponente auslagern. Dafür muss
man aber die Interaktion zwischen den Komponenten gut gestalten, sodass sie immer "synchronisiert" bleiben.

Wenn die Tests des Formulars nicht zu sehr von der Implementierung abhängen, sollten sie nach der Umbau immer noch grün
sein.

[< Vorherige Übung](./Uebung_3.md) - [Nächste Übung >](./Uebung_5.md)
